// Strongly-typed Socket.IO event contract shared by client and server.
// Both sides import these interfaces so payloads stay in sync.

import type {
  CamoRegions,
  ChatMessage,
  CosmeticLoadout,
  GameModeId,
  LeaderboardEntry,
  MapId,
  PlayerInput,
  Pose,
  RoomConfig,
  RoomState,
  ScanResult,
  Team,
} from "./types"

/** Compact per-snapshot player record sent at the snapshot rate. */
export interface NetPlayerSnapshot {
  id: string
  px: number
  py: number
  pz: number
  ry: number
  pose: Pose
  frozen: boolean
  camoScore: number
  discovered: boolean
  team: Team
  torso: number
  head: number
  limbs: number
}

export interface WorldSnapshot {
  tick: number
  serverTime: number
  timeRemaining: number
  phase: RoomState["phase"]
  players: NetPlayerSnapshot[]
}

/** Events the server emits to clients. */
export interface ServerToClientEvents {
  "room:joined": (payload: { selfId: string; room: RoomState }) => void
  "room:state": (room: RoomState) => void
  "room:error": (payload: { message: string }) => void
  "match:countdown": (seconds: number) => void
  "match:started": (room: RoomState) => void
  "match:ended": (payload: { winner: Team | null; leaderboard: LeaderboardEntry[] }) => void
  "world:snapshot": (snapshot: WorldSnapshot) => void
  "chat:message": (message: ChatMessage) => void
  "hunter:scan": (result: ScanResult) => void
  "player:discovered": (payload: { playerId: string; byId: string }) => void
  pong2: (clientTime: number) => void
}

/** Events the client emits to the server. */
export interface ClientToServerEvents {
  "matchmaking:quick": (payload: { name: string; mode: GameModeId; cosmetics: CosmeticLoadout }) => void
  "room:create": (payload: { name: string; config: RoomConfig; cosmetics: CosmeticLoadout }) => void
  "room:join": (payload: { name: string; code: string; cosmetics: CosmeticLoadout }) => void
  "room:leave": () => void
  "room:config": (config: Partial<RoomConfig>) => void
  "room:start": () => void
  "room:addBots": (count: number) => void
  "player:input": (input: PlayerInput) => void
  "player:pose": (pose: Pose) => void
  "player:freeze": (frozen: boolean) => void
  "player:camo": (camo: CamoRegions) => void
  "hunter:scan": () => void
  "hunter:tag": (payload: { targetId: string }) => void
  "chat:send": (text: string) => void
  ping2: (clientTime: number) => void
}

export interface InterServerEvents {}

export interface SocketData {
  roomCode: string | null
  playerId: string
  name: string
}

export const MAP_IDS: MapId[] = [
  "modern-office",
  "shopping-mall",
  "art-museum",
  "luxury-mansion",
  "university-library",
  "warehouse",
  "apartment-complex",
  "japanese-garden",
  "factory",
  "theme-park",
]
