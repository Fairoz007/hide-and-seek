import { RoomState, Player } from "@shadow-seek/shared"

export class Lobby {
  state: RoomState

  constructor(roomId: string, hostId: string, hostName: string) {
    this.state = {
      roomId,
      state: "LOBBY",
      players: []
    }
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
      position: { x: 0, y: 0 },
      rotation: 0,
      isAlive: true
    })
  }

  removePlayer(id: string) {
    this.state.players = this.state.players.filter(p => p.id !== id)
    if (this.state.players.length > 0) {
      // Host migration
      if (!this.state.players.find(p => p.isHost)) {
        this.state.players[0].isHost = true
      }
    }
  }

  setReady(id: string, isReady: boolean) {
    const player = this.state.players.find(p => p.id === id)
    if (player) {
      player.isReady = isReady
    }
  }
}
