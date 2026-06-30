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
})

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "app",
    width: "100%",
    height: "100%"
  },
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
