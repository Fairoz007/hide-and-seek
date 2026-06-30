import { Scene } from "phaser"

export class BootScene extends Scene {
  constructor() {
    super("BootScene")
  }

  preload() {
    // Load generic assets here
  }

  create() {
    // Basic startup text
    this.add.text(this.scale.width / 2, this.scale.height / 2, "Shadow Seek...", {
      fontSize: "32px",
      color: "#ffffff"
    }).setOrigin(0.5)

    // Move directly to Lobby for now
    this.time.delayedCall(1000, () => {
      this.scene.start("LobbyScene")
    })
  }
}
