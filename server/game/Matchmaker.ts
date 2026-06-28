// Matchmaking + room registry.
// Owns the set of live Rooms, hands out join codes, performs quick-match by
// game mode, and forwards each room's authoritative events to the network layer
// via a single RoomEvents sink.

import { Room, type RoomEvents } from "./Room"
import { ROOM } from "../../shared/constants"
import { DEFAULT_ROOM_CONFIG } from "../../shared/constants"
import type { GameModeId, RoomConfig } from "../../shared/types"

function makeCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let s = ""
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s
}

export class Matchmaker {
  private rooms = new Map<string, Room>()
  private events: RoomEvents

  constructor(events: RoomEvents) {
    this.events = events
  }

  /** Create a fresh private room with optional config overrides. */
  createRoom(overrides: Partial<RoomConfig> = {}): Room {
    let code = makeCode()
    while (this.rooms.has(code)) code = makeCode()
    const config: RoomConfig = { ...DEFAULT_ROOM_CONFIG, ...overrides }
    const room = new Room(code, config, this.events)
    this.rooms.set(code, room)
    console.log(`[matchmaker] created ${code} (${config.mode}) — ${this.rooms.size} active`)
    return room
  }

  /** Quick-match: reuse a joinable public room for the mode, else make one. */
  quickMatch(mode: GameModeId): Room {
    for (const room of this.rooms.values()) {
      if (room.config.mode === mode && room.phase === "lobby" && !room.isFull) {
        return room
      }
    }
    const room = this.createRoom({ mode })
    // Backfill with bots so quick-match starts feeling populated.
    room.addBots(Math.min(ROOM.QUICK_MATCH_BOTS, room.config.maxPlayers - 1))
    return room
  }

  getRoom(code: string): Room | undefined {
    return this.rooms.get(code.toUpperCase())
  }

  destroyRoom(code: string) {
    const room = this.rooms.get(code)
    if (!room) return
    room.dispose()
    this.rooms.delete(code)
    console.log(`[matchmaker] destroyed ${code} — ${this.rooms.size} active`)
  }

  /** Drop rooms that are empty of humans or finished, freeing memory. */
  sweep() {
    for (const [code, room] of this.rooms) {
      if (room.humanCount === 0 || room.phase === "ended") {
        this.destroyRoom(code)
      }
    }
  }

  listRooms() {
    return [...this.rooms.values()]
      .filter((r) => r.phase === "lobby")
      .map((r) => ({
        code: r.code,
        mode: r.config.mode,
        map: r.config.map,
        players: r.playerCount,
        maxPlayers: r.config.maxPlayers,
      }))
  }

  get roomCount() {
    return this.rooms.size
  }

  get playerCount() {
    let n = 0
    for (const r of this.rooms.values()) n += r.humanCount
    return n
  }
}
