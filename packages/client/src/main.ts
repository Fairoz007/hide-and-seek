import Phaser from "phaser"
import { io, Socket } from "socket.io-client"
import { BootScene } from "./scenes/BootScene.js"
import { LobbyScene } from "./scenes/LobbyScene.js"
import { GameScene } from "./scenes/GameScene.js"
import { Events } from "@shadow-seek/shared"

// Initialize Socket.IO connection
// The Vite dev server proxies /socket.io to the backend (port 3001)
const socket: Socket = io()

socket.on("connect", () => {
  console.log("Connected to server:", socket.id)
  
  // For demonstration: automatically create a room when connecting
  socket.emit(Events.ROOM_CREATE, { name: "Player1" }, (response: any) => {
    if (response.success) {
      console.log("Joined room:", response.roomId)
    } else {
      console.error("Failed to create room:", response.error)
    }
  })
})

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "app",
  backgroundColor: "#0d1117",
  scene: [BootScene, LobbyScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  callbacks: {
    preBoot: (game) => {
      // Pass the socket instance to all scenes via the registry
      game.registry.set("socket", socket)
    }
  }
}

new Phaser.Game(config)
