// Tunable gameplay + networking constants shared across the stack.

import type { GameModeId, MapId, RoomConfig } from "./types"

export const NET = {
  /** Authoritative server simulation rate. */
  TICK_RATE: 30,
  get TICK_MS() {
    return 1000 / this.TICK_RATE
  },
  /** Snapshot broadcast rate (lower than tick to save bandwidth). */
  SNAPSHOT_RATE: 15,
  /** Client interpolation delay in ms to smooth jitter. */
  INTERP_DELAY_MS: 100,
  SERVER_PORT: 3001,
} as const

export const MOVEMENT = {
  WALK_SPEED: 3.2,
  RUN_SPEED: 6.0,
  ACCEL: 28,
  FRICTION: 12,
  ROTATION_LERP: 0.18,
  GRAVITY: -22,
  JUMP_VELOCITY: 7,
  PLAYER_RADIUS: 0.4,
  PLAYER_HEIGHT: 1.6,
} as const

export const CAMO = {
  /** How fast camo score climbs while frozen and well-matched (pts/sec). */
  STILL_BONUS_RATE: 18,
  /** Penalty applied per second while moving. */
  MOVE_PENALTY_RATE: 35,
  /** Distance at which a hunter can visually pick out a mimic by score. */
  DETECTION_RADIUS: 6,
  /** Below this score a still mimic is effectively invisible at range. */
  HIDDEN_THRESHOLD: 80,
  SAMPLE_RADIUS: 3,
  MAX_SCORE: 100,
} as const

export const HUNTER = {
  SCAN_COOLDOWN: 30,
  SCAN_RADIUS: 14,
  TAG_RANGE: 2.5,
  QUICK_DISCOVERY_WINDOW: 45, // seconds for time bonus
  QUICK_BONUS: 250,
  DISCOVERY_SCORE: 100,
} as const

export const ROOM = {
  MAX_PLAYERS: 24,
  MIN_PLAYERS: 2,
  CODE_LENGTH: 5,
  COUNTDOWN_SECONDS: 5,
  /** Bots added to a quick-match room so games feel populated immediately. */
  QUICK_MATCH_BOTS: 7,
} as const

export const MODE_LABELS: Record<GameModeId, string> = {
  classic: "Classic",
  infection: "Infection",
  "final-survivor": "Final Survivor",
  chaos: "Chaos Mode",
  custom: "Custom Lobby",
}

export const MODE_DESCRIPTIONS: Record<GameModeId, string> = {
  classic: "Hunters vs Mimics. Hunters win by finding every Mimic before time expires.",
  infection: "Every discovered Mimic joins the Hunters. Survive the growing swarm.",
  "final-survivor": "No teams swap. The last hidden Mimic standing takes the win.",
  chaos: "The environment shifts every minute — colors, lights and layout mutate.",
  custom: "Configure every rule yourself before launching the match.",
}

export interface MapMeta {
  id: MapId
  name: string
  palette: number[]
  ambient: string
  hidingSpots: number
}

export const MAPS: MapMeta[] = [
  { id: "modern-office", name: "Modern Office", palette: [0x3b4252, 0x88c0d0, 0xeceff4, 0x5e81ac], ambient: "office", hidingSpots: 240 },
  { id: "shopping-mall", name: "Shopping Mall", palette: [0xf0c674, 0xde935f, 0xcc6666, 0xb5bd68], ambient: "mall", hidingSpots: 320 },
  { id: "art-museum", name: "Art Museum", palette: [0xeae6df, 0xd0c9bd, 0x8c7b6b, 0x3a3631], ambient: "museum", hidingSpots: 180 },
  { id: "luxury-mansion", name: "Luxury Mansion", palette: [0x6d5847, 0xb09a76, 0xe8dcc0, 0x40342a], ambient: "mansion", hidingSpots: 280 },
  { id: "university-library", name: "University Library", palette: [0x5a4632, 0x8a6d4b, 0xc9b896, 0x2e241a], ambient: "library", hidingSpots: 300 },
  { id: "warehouse", name: "Warehouse", palette: [0x4d5057, 0x7c818a, 0xb0b4bb, 0x2b2d31], ambient: "warehouse", hidingSpots: 210 },
  { id: "apartment-complex", name: "Apartment Complex", palette: [0x9aa5b1, 0xcfd6dd, 0x6b7480, 0x3d434c], ambient: "apartment", hidingSpots: 260 },
  { id: "japanese-garden", name: "Japanese Garden", palette: [0x4f7942, 0x86a96b, 0xd9c9a3, 0x2e3b22], ambient: "garden", hidingSpots: 190 },
  { id: "factory", name: "Factory", palette: [0x55585e, 0x8a8f96, 0xc7a14a, 0x303236], ambient: "factory", hidingSpots: 230 },
  { id: "theme-park", name: "Theme Park", palette: [0xe05c5c, 0xf2b134, 0x4fb0c6, 0x6bcf63], ambient: "park", hidingSpots: 340 },
]

export const DEFAULT_ROOM_CONFIG: RoomConfig = {
  mode: "classic",
  map: "modern-office",
  maxPlayers: 12,
  matchSeconds: 240,
  scanCooldownSeconds: HUNTER.SCAN_COOLDOWN,
  isPrivate: false,
}
