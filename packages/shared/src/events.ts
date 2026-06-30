export const Events = {
  // Connection / Room
  ROOM_CREATE: "room:create",
  ROOM_JOIN: "room:join",
  ROOM_LEAVE: "room:leave",
  ROOM_HOST_MIGRATED: "room:hostMigrated",
  ROOM_PLAYER_RECONNECTED: "room:playerReconnected",
  ROOM_SPECTATOR_JOIN: "room:spectatorJoin",
  ROOM_STATE: "room:state",
  
  // Matchmaking
  MATCHMAKING_QUEUE: "matchmaking:queue",
  MATCHMAKING_FOUND: "matchmaking:found",

  // Lobby
  LOBBY_READY: "lobby:ready",
  LOBBY_UNREADY: "lobby:unready",
  LOBBY_PLAYER_LIST: "lobby:playerList",
  LOBBY_START_COUNTDOWN: "lobby:startCountdown",

  // Gameplay (Client -> Server)
  INPUT_MOVE: "input:move",
  INPUT_ROLL: "input:roll",
  INPUT_USE_POWERUP: "input:usePowerUp",
  INPUT_TAG_ATTEMPT: "input:tagAttempt",

  // Gameplay (Server -> Client)
  STATE_SNAPSHOT: "state:snapshot",
  STATE_DELTA: "state:delta",
  ROUND_STARTED: "round:started",
  ROUND_ENDED: "round:ended",
  ROUND_ROLE_ASSIGNED: "round:roleAssigned",
  ROUND_ROTATION: "round:rotation",
  PLAYER_TAGGED: "player:tagged",
  PLAYER_ELIMINATED: "player:eliminated",
  KILLFEED_EVENT: "killfeed:event",
} as const

export type EventNames = typeof Events[keyof typeof Events]
