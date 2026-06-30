import { Scene } from "phaser"
import { Socket } from "socket.io-client"
import { RoomState, Player, Events } from "@shadow-seek/shared"

export class LobbyScene extends Scene {
  private socket!: Socket
  private roomStateText!: Phaser.GameObjects.Text
  private playersGroup!: Phaser.GameObjects.Group

  constructor() {
    super("LobbyScene")
  }

  create() {
    // Retrieve socket instance passed from main.ts, or globally registered
    this.socket = this.registry.get("socket")

    this.add.text(20, 20, "LOBBY", { fontSize: "24px", color: "#ffff00" })
    this.roomStateText = this.add.text(20, 60, "Waiting for state...", { fontSize: "16px", color: "#ffffff" })
    
    this.playersGroup = this.add.group()

    const startBtn = this.add.text(20, 400, "[ START GAME ]", { fontSize: "24px", color: "#00ff00" })
    startBtn.setInteractive()
    startBtn.on('pointerdown', () => {
      this.socket.emit("lobby:ready")
    })

    // Listen for room state updates
    this.socket.on(Events.ROOM_STATE, (state: RoomState) => {
      if (state.state === "ACTIVE" || state.state === "COUNTDOWN") {
        this.scene.start("GameScene")
      } else {
        this.updateLobby(state)
      }
    })

    // Automatically create a room when entering Lobby for now
    this.socket.emit(Events.ROOM_CREATE, { name: "Player1" }, (response: any) => {
      if (response.success) {
        console.log("Joined room:", response.roomId)
      } else {
        console.error("Failed to create room:", response.error)
      }
    })
  }

  updateLobby(state: RoomState) {
    this.roomStateText.setText(`Room ID: ${state.roomId}\nPlayers: ${state.players.length}`)
    
    this.playersGroup.clear(true, true)
    
    state.players.forEach((p: Player, idx: number) => {
      const playerText = this.add.text(20, 120 + (idx * 30), `${p.name} ${p.isHost ? '(HOST)' : ''}`, { 
        fontSize: "16px", 
        color: p.isReady ? "#00ff00" : "#ffffff" 
      })
      this.playersGroup.add(playerText)
    })
  }
}
