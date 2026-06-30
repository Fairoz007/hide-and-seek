import { Lobby } from "./Lobby.js"

export class RoomManager {
  private rooms = new Map<string, Lobby>()

  createRoom(hostId: string, hostName: string): Lobby {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    const lobby = new Lobby(roomId, hostId, hostName)
    this.rooms.set(roomId, lobby)
    return lobby
  }

  getRoom(roomId: string): Lobby | undefined {
    return this.rooms.get(roomId)
  }

  removeRoom(roomId: string) {
    this.rooms.delete(roomId)
  }

  sweep() {
    for (const [id, room] of this.rooms.entries()) {
      if (room.state.players.length === 0) {
        this.rooms.delete(id)
      }
    }
  }
}
