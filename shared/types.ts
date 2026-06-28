// Shared domain types used by both the client and the authoritative server.
// Keeping these in one place guarantees the wire format never drifts.

export type Team = "hunter" | "mimic" | "spectator"

export type GameModeId = "classic" | "infection" | "final-survivor" | "chaos" | "custom"

export type MapId =
  | "modern-office"
  | "shopping-mall"
  | "art-museum"
  | "luxury-mansion"
  | "university-library"
  | "warehouse"
  | "apartment-complex"
  | "japanese-garden"
  | "factory"
  | "theme-park"

export type Pose = "stand" | "sit" | "lie" | "curl" | "lean"

export type MatchPhase = "lobby" | "loading" | "countdown" | "active" | "ended"

/** A 3D vector that survives JSON serialization. */
export interface Vec3 {
  x: number
  y: number
  z: number
}

/** Per-body-region color used by the camouflage system. */
export interface CamoRegions {
  torso: number // packed 0xRRGGBB
  head: number
  limbs: number
}

export interface CosmeticLoadout {
  hat: string | null
  backpack: string | null
  shoes: string | null
  brush: string | null
  trail: string | null
  emote: string | null
  bodyColor: number
}

/** Full per-player state replicated to all clients. */
export interface PlayerState {
  id: string
  name: string
  team: Team
  connected: boolean
  isBot: boolean
  position: Vec3
  rotationY: number
  velocity: Vec3
  pose: Pose
  frozen: boolean
  camo: CamoRegions
  camoScore: number // 0..100
  discovered: boolean
  score: number
  cosmetics: CosmeticLoadout
  ping: number
}

export interface RoomConfig {
  mode: GameModeId
  map: MapId
  maxPlayers: number
  matchSeconds: number
  scanCooldownSeconds: number
  isPrivate: boolean
}

export interface RoomState {
  code: string
  hostId: string
  phase: MatchPhase
  config: RoomConfig
  players: PlayerState[]
  timeRemaining: number
  countdown: number
  winner: Team | null
}

export interface ChatMessage {
  id: string
  authorId: string
  authorName: string
  text: string
  ts: number
  system: boolean
}

/** Input sampled on the client and sent to the server each tick. */
export interface PlayerInput {
  seq: number
  dt: number
  moveX: number // -1..1 strafe
  moveZ: number // -1..1 forward
  run: boolean
  rotationY: number
  jump: boolean
}

export interface ScanResult {
  hunterId: string
  revealed: string[] // player ids made visible
  ts: number
}

export interface LeaderboardEntry {
  playerId: string
  name: string
  team: Team
  score: number
  discoveries: number
  survivedSeconds: number
}
