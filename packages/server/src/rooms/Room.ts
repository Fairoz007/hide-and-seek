import { RoomState, MoveInput, WorldSnapshot, PlayerSnapshot, Events, Winner } from "@shadow-seek/shared"
import { PhysicsValidator } from "../game/PhysicsValidator.js"
import { GameModeRule } from "../game/modes/GameModeRule.js"
import { ClassicMode } from "../game/modes/ClassicMode.js"

export type SnapshotCallback = (roomId: string, snapshot: WorldSnapshot) => void

export class Room {
  state: RoomState
  private inputs: Map<string, MoveInput[]> = new Map()
  private lastProcessedInput: Map<string, number> = new Map()
  private tickTimer: NodeJS.Timeout | null = null
  private tickCounter = 0
  private onSnapshot: SnapshotCallback
  private gameMode: GameModeRule

  private lastSecondTick: number = 0

  constructor(roomId: string, hostId: string, hostName: string, onSnapshot: SnapshotCallback) {
    this.state = {
      roomId,
      state: "LOBBY",
      players: []
    }
    this.onSnapshot = onSnapshot
    this.gameMode = new ClassicMode()
    this.addPlayer(hostId, hostName, true)
  }

  addPlayer(id: string, name: string, isHost: boolean = false) {
    if (this.state.players.find(p => p.id === id)) return
    this.state.players.push({
      id,
      name,
      isHost,
      isReady: isHost,
      role: "spectator",
      position: { x: 400, y: 300 }, // Default spawn
      rotation: 0,
      isAlive: true
    })
    this.inputs.set(id, [])
    this.lastProcessedInput.set(id, 0)
  }

  removePlayer(id: string) {
    this.state.players = this.state.players.filter(p => p.id !== id)
    this.inputs.delete(id)
    this.lastProcessedInput.delete(id)
    
    if (this.state.players.length > 0) {
      if (!this.state.players.find(p => p.isHost)) {
        this.state.players[0].isHost = true
      }
    } else {
      this.stop()
    }
  }

  setReady(id: string, isReady: boolean) {
    const player = this.state.players.find(p => p.id === id)
    if (player) {
      player.isReady = isReady
    }
  }

  queueInput(id: string, input: MoveInput) {
    const playerInputs = this.inputs.get(id)
    if (playerInputs) {
      const lastProcessed = this.lastProcessedInput.get(id) ?? 0
      if (input.sequence > lastProcessed) {
        playerInputs.push(input)
      }
    }
  }

  start() {
    this.state.state = "COUNTDOWN"
    this.state.countdownSeconds = 5 // 5 second countdown before active
    this.state.winner = null
    this.lastSecondTick = Date.now()

    this.gameMode.onRoundStart(this)
    
    // Reset positions
    this.state.players.forEach((p, idx) => {
      p.position = { x: 200 + (idx * 50), y: 300 }
    })

    if (!this.tickTimer) {
      this.tickTimer = setInterval(() => this.tick(), 1000 / 20)
    }
  }

  stop() {
    if (this.tickTimer) {
      clearInterval(this.tickTimer)
      this.tickTimer = null
    }
  }

  private tick() {
    this.tickCounter++
    const now = Date.now()
    const dt = 1 / 20 // 50ms per tick

    // 1. Timer logic
    if (now - this.lastSecondTick >= 1000) {
      this.lastSecondTick = now
      
      if (this.state.countdownSeconds !== undefined) {
        this.state.countdownSeconds--
        
        if (this.state.countdownSeconds <= 0) {
          if (this.state.state === "COUNTDOWN") {
            // Switch to ACTIVE
            this.state.state = "ACTIVE"
            // Re-apply game mode timer (e.g. 60s)
            this.gameMode.onRoundStart(this) // Wait, onRoundStart already set it to 60. But COUNTDOWN overrode it.
            // Let's just set it directly to 60 for classic
            this.state.countdownSeconds = 60
          } else if (this.state.state === "ROUND_END") {
            // Switch back to LOBBY
            this.state.state = "LOBBY"
            this.stop()
            return // End loop
          }
        }
      }
    }

    if (this.state.state === "ACTIVE") {
      this.gameMode.onTick(this, dt * 1000)

      // 2. Process Inputs
      this.state.players.forEach(p => {
        if (!p.isAlive) return // Spectators or dead hiders can't move for now

        const playerInputs = this.inputs.get(p.id) || []
        playerInputs.sort((a, b) => a.sequence - b.sequence)

        for (const input of playerInputs) {
          const { x, y, rotation } = PhysicsValidator.applyInput(p.position, input, dt)
          p.position.x = x
          p.position.y = y
          if (rotation !== 0) p.rotation = rotation
          this.lastProcessedInput.set(p.id, input.sequence)
        }
        this.inputs.set(p.id, [])
      })

      // 3. Proximity Tagging Logic
      const seekers = this.state.players.filter(p => p.role === "seeker" && p.isAlive)
      const hiders = this.state.players.filter(p => p.role === "hider" && p.isAlive)
      
      for (const seeker of seekers) {
        for (const hider of hiders) {
          const dist = Math.hypot(seeker.position.x - hider.position.x, seeker.position.y - hider.position.y)
          // Tag radius 32 (16 + 16 player radius)
          if (dist < 32) {
            this.gameMode.onTag(this, seeker.id, hider.id)
          }
        }
      }

      // 4. Check Win Condition
      const winner = this.gameMode.checkWinCondition(this)
      if (winner) {
        this.state.state = "ROUND_END"
        this.state.winner = winner
        this.state.countdownSeconds = 5 // Stay in ROUND_END for 5 seconds
      }
    } else {
       // Just clear inputs if not active so they don't buffer up infinitely
       this.state.players.forEach(p => this.inputs.set(p.id, []))
    }

    // 5. Broadcast Snapshot
    const snapshot: WorldSnapshot = {
      tick: this.tickCounter,
      serverTime: now,
      roundState: this.state.state,
      countdownSeconds: this.state.countdownSeconds,
      winner: this.state.winner,
      players: this.state.players.map(p => ({
        id: p.id,
        x: p.position.x,
        y: p.position.y,
        rotation: p.rotation,
        lastProcessedInput: this.lastProcessedInput.get(p.id) || 0,
        role: p.role,
        isAlive: p.isAlive
      }))
    }

    this.onSnapshot(this.state.roomId, snapshot)
  }
}
