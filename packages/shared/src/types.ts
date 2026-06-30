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
