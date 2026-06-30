import Phaser from "phaser"

export class InputController {
  private keys: any

  constructor(scene: Phaser.Scene) {
    if (scene.input.keyboard) {
      this.keys = scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        sprint: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        crouch: Phaser.Input.Keyboard.KeyCodes.CTRL,
      })
    }
  }

  getMovement() {
    if (!this.keys) return { dx: 0, dy: 0, sprint: false, crouch: false }

    let dx = 0
    let dy = 0

    if (this.keys.up.isDown) dy -= 1
    if (this.keys.down.isDown) dy += 1
    if (this.keys.left.isDown) dx -= 1
    if (this.keys.right.isDown) dx += 1

    return {
      dx,
      dy,
      sprint: this.keys.sprint.isDown,
      crouch: this.keys.crouch.isDown
    }
  }
}
