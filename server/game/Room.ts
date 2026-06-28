// Authoritative room. Owns all player state, the map, the match clock, and the
// fixed-rate simulation. Clients send inputs; the server validates and steps
// movement using the SHARED movement module so client prediction reconciles.

import { CAMO, HUNTER, NET, ROOM } from "@shared/constants"
import { isMimicVisibleTo, nearbySurfaceColor, updateCamoScore } from "@shared/camouflage"
import { generateMap, type GeneratedMap } from "@shared/mapgen"
import { buildColliders, stepMovement } from "@shared/movement"
import { clamp, colorMatch, dist2D } from "@shared/math"
import type {
  CamoRegions,
  CosmeticLoadout,
  LeaderboardEntry,
  MatchPhase,
  PlayerInput,
  PlayerState,
  Pose,
  RoomConfig,
  RoomState,
  Team,
  Vec3,
} from "@shared/types"
import { Bot } from "./Bot"

interface ServerPlayer extends PlayerState {
  lastInputSeq: number
  lastInputAt: number
  scanReadyAt: number
  discoveredAt: number | null
  bot: Bot | null
}

export interface RoomEvents {
  onSnapshot: (room: Room) => void
  onStateChange: (room: Room) => void
  onCountdown: (room: Room, seconds: number) => void
  onMatchStart: (room: Room) => void
  onMatchEnd: (room: Room, winner: Team | null, lb: LeaderboardEntry[]) => void
  onScan: (room: Room, hunterId: string, revealed: string[]) => void
  onDiscovered: (room: Room, playerId: string, byId: string) => void
}

export class Room {
  readonly code: string
  hostId = ""
  phase: MatchPhase = "lobby"
  config: RoomConfig
  private players = new Map<string, ServerPlayer>()
  private map: GeneratedMap
  private colliders = buildColliders(generateMap("modern-office"))
  private timeRemaining = 0
  private countdown = 0
  private winner: Team | null = null
  private tickHandle: NodeJS.Timeout | null = null
  private lastTick = Date.now()
  private chaosTimer = 0

  constructor(code: string, config: RoomConfig, private events: RoomEvents) {
    this.code = code
    this.config = { ...config }
    this.map = generateMap(config.map)
    this.colliders = buildColliders(this.map)
  }

  // --------------------------- player lifecycle ---------------------------
  addPlayer(id: string, name: string, cosmetics: CosmeticLoadout, isBot = false): ServerPlayer {
    if (!this.hostId && !isBot) this.hostId = id
    const spawn = this.pickSpawn()
    const player: ServerPlayer = {
      id,
      name,
      team: "mimic",
      connected: true,
      isBot,
      position: { ...spawn },
      rotationY: 0,
      velocity: { x: 0, y: 0, z: 0 },
      pose: "stand",
      frozen: false,
      camo: { torso: cosmetics.bodyColor, head: cosmetics.bodyColor, limbs: cosmetics.bodyColor },
      camoScore: 0,
      discovered: false,
      score: 0,
      cosmetics,
      ping: 0,
      lastInputSeq: 0,
      lastInputAt: Date.now(),
      scanReadyAt: 0,
      discoveredAt: null,
      bot: isBot ? new Bot(id) : null,
    }
    this.players.set(id, player)
    this.events.onStateChange(this)
    return player
  }

  removePlayer(id: string) {
    const p = this.players.get(id)
    if (!p) return
    if (this.phase === "lobby") {
      this.players.delete(id)
    } else {
      p.connected = false // keep slot for reconnect
    }
    if (id === this.hostId) {
      const next = [...this.players.values()].find((x) => x.connected && !x.isBot)
      this.hostId = next?.id ?? ""
    }
    this.events.onStateChange(this)
  }

  reconnect(id: string) {
    const p = this.players.get(id)
    if (p) {
      p.connected = true
      this.events.onStateChange(this)
    }
    return p
  }

  hasPlayer(id: string) {
    return this.players.has(id)
  }

  get humanCount() {
    return [...this.players.values()].filter((p) => !p.isBot && p.connected).length
  }

  get playerCount() {
    return this.players.size
  }

  get isFull() {
    return this.playerCount >= this.config.maxPlayers
  }

  private pickSpawn(): Vec3 {
    const used = this.players.size
    const sp = this.map.spawnPoints[used % this.map.spawnPoints.length]
    return { ...sp }
  }

  // ----------------------------- configuration ----------------------------
  updateConfig(patch: Partial<RoomConfig>) {
    if (this.phase !== "lobby") return
    const prevMap = this.config.map
    this.config = { ...this.config, ...patch }
    this.config.maxPlayers = clamp(this.config.maxPlayers, ROOM.MIN_PLAYERS, ROOM.MAX_PLAYERS)
    if (this.config.map !== prevMap) {
      this.map = generateMap(this.config.map)
      this.colliders = buildColliders(this.map)
    }
    this.events.onStateChange(this)
  }

  addBots(count: number) {
    if (this.phase !== "lobby") return
    const palette = this.map.meta.palette
    for (let i = 0; i < count && !this.isFull; i++) {
      const c = palette[i % palette.length]
      this.addPlayer(`bot-${this.code}-${Date.now()}-${i}`, botName(i), {
        hat: null,
        backpack: null,
        shoes: null,
        brush: null,
        trail: null,
        emote: null,
        bodyColor: c,
      }, true)
    }
  }

  // ------------------------------ match flow -------------------------------
  start() {
    if (this.phase !== "lobby") return
    if (this.playerCount < ROOM.MIN_PLAYERS) return
    this.assignTeams()
    this.phase = "countdown"
    this.countdown = ROOM.COUNTDOWN_SECONDS
    this.events.onStateChange(this)

    const cd = setInterval(() => {
      this.countdown--
      this.events.onCountdown(this, this.countdown)
      if (this.countdown <= 0) {
        clearInterval(cd)
        this.beginActive()
      }
    }, 1000)
  }

  private assignTeams() {
    const ids = [...this.players.keys()]
    // ~1 hunter per 4 players, at least 1.
    const hunterCount = Math.max(1, Math.floor(ids.length / 4))
    shuffle(ids)
    ids.forEach((id, idx) => {
      const p = this.players.get(id)!
      p.team = idx < hunterCount ? "hunter" : "mimic"
      p.discovered = false
      p.discoveredAt = null
      p.camoScore = 0
      p.score = 0
      const spawn = this.map.spawnPoints[idx % this.map.spawnPoints.length]
      p.position = { ...spawn }
      if (p.bot) p.bot.setTeam(p.team)
    })
  }

  private beginActive() {
    this.phase = "active"
    this.timeRemaining = this.config.matchSeconds
    this.winner = null
    this.lastTick = Date.now()
    this.events.onMatchStart(this)

    this.tickHandle = setInterval(() => this.tick(), NET.TICK_MS)
  }

  // ------------------------------ simulation -------------------------------
  private tick() {
    const now = Date.now()
    const dt = Math.min(0.1, (now - this.lastTick) / 1000)
    this.lastTick = now

    if (this.phase !== "active") return
    this.timeRemaining -= dt
    this.chaosTimer += dt

    // Chaos mode: mutate prop colors every minute.
    if (this.config.mode === "chaos" && this.chaosTimer >= 60) {
      this.chaosTimer = 0
      this.mutateEnvironment()
    }

    for (const p of this.players.values()) {
      if (p.bot && p.connected) {
        p.bot.observe(p.position, p.rotationY)
        const input = p.bot.think(dt, this.snapshotForBot(p), this.map)
        this.applyInput(p, input)
        p.bot.applyActions(this, p)
      }
      this.updatePlayerCamo(p, dt)
    }

    this.checkProximityReveals()
    this.evaluateWinConditions()

    this.events.onSnapshot(this)
    this.events.onStateChange(this)
  }

  private updatePlayerCamo(p: ServerPlayer, dt: number) {
    if (p.team !== "mimic" || p.discovered) return
    const moving = Math.hypot(p.velocity.x, p.velocity.z) > 0.3
    p.camoScore = updateCamoScore({
      current: p.camoScore,
      camo: p.camo,
      map: this.map,
      position: p.position,
      moving,
      frozen: p.frozen,
      dt,
    })
  }

  /** Auto-reveal mimics that hunters get close to with poor camo. */
  private checkProximityReveals() {
    const hunters = [...this.players.values()].filter((p) => p.team === "hunter" && p.connected)
    for (const m of this.players.values()) {
      if (m.team !== "mimic" || m.discovered) continue
      for (const h of hunters) {
        if (isMimicVisibleTo(m.position, m.camoScore, h.position) && dist2D(m.position, h.position) < HUNTER.TAG_RANGE) {
          this.discover(m, h.id)
          break
        }
      }
    }
  }

  // ------------------------------ player actions ---------------------------
  /** Validate + apply movement input (anti-cheat: clamp dt, speed, bounds). */
  applyInput(p: ServerPlayer, input: PlayerInput) {
    if (this.phase !== "active") return
    if (input.seq <= p.lastInputSeq) return // stale / replayed
    p.lastInputSeq = input.seq
    p.lastInputAt = Date.now()

    const safe: PlayerInput = {
      ...input,
      dt: clamp(input.dt, 0, 0.05), // server caps the step the client may claim
      moveX: clamp(input.moveX, -1, 1),
      moveZ: clamp(input.moveZ, -1, 1),
    }
    const speedScale = p.team === "hunter" ? 1.08 : 1
    stepMovement(p, safe, this.map, this.colliders, p.frozen, speedScale)
  }

  setPose(id: string, pose: Pose) {
    const p = this.players.get(id)
    if (p) p.pose = pose
  }

  setFreeze(id: string, frozen: boolean) {
    const p = this.players.get(id)
    if (p && p.team === "mimic") p.frozen = frozen
  }

  setCamo(id: string, camo: CamoRegions) {
    const p = this.players.get(id)
    if (!p) return
    // Anti-cheat: only allow colors that exist near the player (sampled) or
    // simple adjustments of them. We accept any 24-bit color but clamp range.
    p.camo = {
      torso: camo.torso & 0xffffff,
      head: camo.head & 0xffffff,
      limbs: camo.limbs & 0xffffff,
    }
  }

  /** Hunter active scan: reveals nearby mimics regardless of camo for a moment. */
  scan(hunterId: string): string[] {
    const h = this.players.get(hunterId)
    if (!h || h.team !== "hunter" || this.phase !== "active") return []
    const now = Date.now()
    if (now < h.scanReadyAt) return []
    h.scanReadyAt = now + this.config.scanCooldownSeconds * 1000

    const revealed: string[] = []
    for (const m of this.players.values()) {
      if (m.team !== "mimic" || m.discovered) continue
      if (dist2D(m.position, h.position) <= HUNTER.SCAN_RADIUS) {
        // A scan only reveals mimics whose camo isn't near-perfect.
        if (m.camoScore < 95) revealed.push(m.id)
      }
    }
    this.events.onScan(this, hunterId, revealed)
    return revealed
  }

  /** Hunter tags a specific suspected mimic. Correct = discovery + score. */
  tag(hunterId: string, targetId: string) {
    const h = this.players.get(hunterId)
    const t = this.players.get(targetId)
    if (!h || !t || h.team !== "hunter" || this.phase !== "active") return
    if (t.team !== "mimic" || t.discovered) return
    if (dist2D(h.position, t.position) > HUNTER.TAG_RANGE) return
    this.discover(t, hunterId)
  }

  private discover(mimic: ServerPlayer, byId: string) {
    if (mimic.discovered) return
    mimic.discovered = true
    mimic.discoveredAt = Date.now()
    const hunter = this.players.get(byId)
    if (hunter) {
      hunter.score += HUNTER.DISCOVERY_SCORE
      const elapsed = this.config.matchSeconds - this.timeRemaining
      if (elapsed <= HUNTER.QUICK_DISCOVERY_WINDOW) hunter.score += HUNTER.QUICK_BONUS
    }
    // Infection mode: discovered mimic becomes a hunter.
    if (this.config.mode === "infection") {
      mimic.team = "hunter"
      mimic.discovered = false
      mimic.frozen = false
      if (mimic.bot) mimic.bot.setTeam("hunter")
    }
    this.events.onDiscovered(this, mimic.id, byId)
  }

  private mutateEnvironment() {
    const palette = this.map.meta.palette
    for (const prop of this.map.props) {
      if (prop.hideable && Math.random() < 0.4) {
        prop.color = palette[Math.floor(Math.random() * palette.length)]
      }
    }
  }

  // --------------------------- win conditions -----------------------------
  private get activeMimics() {
    return [...this.players.values()].filter((p) => p.team === "mimic" && !p.discovered && p.connected)
  }

  private evaluateWinConditions() {
    const mimics = this.activeMimics
    if (this.timeRemaining <= 0) {
      // Time up: mimics survived.
      this.endMatch("mimic")
      return
    }
    if (mimics.length === 0) {
      this.endMatch("hunter")
      return
    }
    if (this.config.mode === "final-survivor" && mimics.length === 1) {
      // Award survivor bonus but let clock run unless everyone else gone.
      mimics[0].score += 5 // trickle survival points
    }
  }

  private endMatch(winner: Team) {
    if (this.phase === "ended") return
    this.phase = "ended"
    this.winner = winner
    if (this.tickHandle) clearInterval(this.tickHandle)
    this.tickHandle = null
    // Survival scoring for mimics.
    for (const p of this.players.values()) {
      if (p.team === "mimic" && !p.discovered) p.score += 300
    }
    this.events.onMatchEnd(this, winner, this.leaderboard())
    this.events.onStateChange(this)
  }

  leaderboard(): LeaderboardEntry[] {
    return [...this.players.values()]
      .map((p) => ({
        playerId: p.id,
        name: p.name,
        team: p.team,
        score: Math.round(p.score),
        discoveries: 0,
        survivedSeconds: p.discoveredAt
          ? Math.round((this.config.matchSeconds - this.timeRemaining))
          : Math.round(this.config.matchSeconds - Math.max(0, this.timeRemaining)),
      }))
      .sort((a, b) => b.score - a.score)
  }

  // ------------------------------ serialization ----------------------------
  setPing(id: string, ping: number) {
    const p = this.players.get(id)
    if (p) p.ping = ping
  }

  private snapshotForBot(self: ServerPlayer) {
    return [...this.players.values()].filter((p) => p.id !== self.id && p.connected)
  }

  toState(): RoomState {
    return {
      code: this.code,
      hostId: this.hostId,
      phase: this.phase,
      config: this.config,
      timeRemaining: Math.max(0, Math.round(this.timeRemaining)),
      countdown: this.countdown,
      winner: this.winner,
      players: [...this.players.values()].map((p) => ({
        id: p.id,
        name: p.name,
        team: p.team,
        connected: p.connected,
        isBot: p.isBot,
        position: p.position,
        rotationY: p.rotationY,
        velocity: p.velocity,
        pose: p.pose,
        frozen: p.frozen,
        camo: p.camo,
        camoScore: Math.round(p.camoScore),
        discovered: p.discovered,
        score: Math.round(p.score),
        cosmetics: p.cosmetics,
        ping: p.ping,
      })),
    }
  }

  getPlayer(id: string) {
    return this.players.get(id)
  }

  allPlayers() {
    return [...this.players.values()]
  }

  getMap() {
    return this.map
  }

  dispose() {
    if (this.tickHandle) clearInterval(this.tickHandle)
  }
}

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

const BOT_NAMES = ["Pixel", "Hue", "Tint", "Shade", "Glimmer", "Prism", "Echo", "Blur", "Mist", "Dapple", "Speck", "Fade", "Sketch", "Maple", "Cobalt", "Olive", "Sienna", "Indigo", "Cyan", "Saffron"]
function botName(i: number) {
  return `${BOT_NAMES[i % BOT_NAMES.length]} (bot)`
}

export type { ServerPlayer }
export { colorMatch, nearbySurfaceColor, CAMO }
