import { Room, SnapshotCallback } from "./Room.js"

export class RoomManager {
  private rooms = new Map<string, Room>()
  private onSnapshot: SnapshotCallback

  constructor(onSnapshot: SnapshotCallback) {
    this.onSnapshot = onSnapshot
  }

  createRoom(hostId: string, hostName: string): Room {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    const room = new Room(roomId, hostId, hostName, this.onSnapshot)
    this.rooms.set(roomId, room)
    return room
  }

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId)
  }

  removeRoom(roomId: string) {
    const room = this.rooms.get(roomId)
    if (room) {
      room.stop()
      this.rooms.delete(roomId)
    }
  }

  sweep() {
    for (const [id, room] of this.rooms.entries()) {
      if (room.state.players.length === 0) {
        room.stop()
        this.rooms.delete(id)
      }
    }
  }
}
