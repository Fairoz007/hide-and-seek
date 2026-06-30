export type Role = "hider" | "seeker" | "spectator"
export type RoundState = "LOBBY" | "COUNTDOWN" | "ACTIVE" | "ROUND_END"

export interface Player {
  id: string
  name: string
  isHost: boolean
  isReady: boolean
  role: Role
  position: { x: number; y: number } // 2D position for Phaser
  rotation: number
  isAlive: boolean
}

export interface RoomState {
  roomId: string
  state: RoundState
  players: Player[]
  countdownSeconds?: number
}

export interface MoveInput {
  dx: number
  dy: number
  sprint: boolean
  crouch: boolean
  sequence: number
  timestamp: number
}

export interface PlayerSnapshot {
  id: string
  x: number
  y: number
  rotation: number
  lastProcessedInput: number
}

export interface WorldSnapshot {
  tick: number
  serverTime: number
  players: PlayerSnapshot[]
}
