import { Scene } from "phaser"
import { Socket } from "socket.io-client"
import { Events, WorldSnapshot, PlayerSnapshot, MoveInput } from "@shadow-seek/shared"
import { InputController } from "../input/InputController.js"
import { TilemapLoader } from "../maps/TilemapLoader.js"
import { EffectsBridge } from "../renderer/EffectsBridge.js"

const BASE_SPEED = 200
const SPRINT_SPEED = 350
const CROUCH_SPEED = 100

export class GameScene extends Scene {
  private socket!: Socket
  private inputController!: InputController
  private effectsBridge!: EffectsBridge
  
  private localPlayerSprite?: Phaser.GameObjects.Arc
  private remotePlayers: Map<string, Phaser.GameObjects.Arc> = new Map()
  
  private inputSequence = 0
  private pendingInputs: MoveInput[] = []
  private snapshots: WorldSnapshot[] = []

  constructor() {
    super("GameScene")
  }

  create() {
    this.socket = this.registry.get("socket")
    this.inputController = new InputController(this)
    this.effectsBridge = new EffectsBridge()
    
    // Load Map
    TilemapLoader.loadMap(this)

    // Camera follow setup will happen when local player is created

    this.socket.on(Events.STATE_SNAPSHOT, (snapshot: WorldSnapshot) => {
      this.snapshots.push(snapshot)
      if (this.snapshots.length > 5) {
        this.snapshots.shift()
      }
      this.reconcileLocalPlayer(snapshot)
    })
  }

  update(_time: number, delta: number) {
    this.processLocalInput(delta)
    this.interpolateRemotePlayers(Date.now())
    
    // Sync Camera for Three.js
    this.effectsBridge.syncCamera(this.cameras.main.scrollX, this.cameras.main.scrollY)
    
    // Render Three.js overlay
    this.effectsBridge.render()
  }

  private processLocalInput(delta: number) {
    if (!this.localPlayerSprite) {
      this.localPlayerSprite = this.add.circle(400, 300, 16, 0x00ff00)
      this.cameras.main.startFollow(this.localPlayerSprite)
    }

    const inputData = this.inputController.getMovement()
    
    if (inputData.dx !== 0 || inputData.dy !== 0) {
      this.inputSequence++
      const moveInput: MoveInput = {
        ...inputData,
        sequence: this.inputSequence,
        timestamp: Date.now()
      }
      
      this.pendingInputs.push(moveInput)
      this.socket.emit(Events.INPUT_MOVE, moveInput)
      
      const dt = delta / 1000
      this.applyInput(this.localPlayerSprite, moveInput, dt)
    }

    // Update 3D Light
    if (this.localPlayerSprite && this.socket.id) {
      this.effectsBridge.updatePlayerLight(this.socket.id, this.localPlayerSprite.x, this.localPlayerSprite.y)
    }
  }

  private reconcileLocalPlayer(snapshot: WorldSnapshot) {
    if (!this.localPlayerSprite) return

    const mySnapshot = snapshot.players.find(p => p.id === this.socket.id)
    if (!mySnapshot) return

    this.localPlayerSprite.x = mySnapshot.x
    this.localPlayerSprite.y = mySnapshot.y

    this.pendingInputs = this.pendingInputs.filter(input => input.sequence > mySnapshot.lastProcessedInput)

    const replayDt = 1 / 60 
    for (const input of this.pendingInputs) {
      this.applyInput(this.localPlayerSprite, input, replayDt)
    }
  }

  private interpolateRemotePlayers(now: number) {
    if (this.snapshots.length < 2) return

    const renderTime = now - 100 
    
    let s0: WorldSnapshot | null = null
    let s1: WorldSnapshot | null = null

    for (let i = this.snapshots.length - 1; i >= 1; i--) {
      if (this.snapshots[i-1].serverTime <= renderTime && this.snapshots[i].serverTime >= renderTime) {
        s0 = this.snapshots[i-1]
        s1 = this.snapshots[i]
        break
      }
    }

    if (s0 && s1) {
      const t = (renderTime - s0.serverTime) / (s1.serverTime - s0.serverTime)
      
      for (const p1 of s1.players) {
        if (p1.id === this.socket.id) continue 

        const p0 = s0.players.find(p => p.id === p1.id)
        if (p0) {
          const x = p0.x + (p1.x - p0.x) * t
          const y = p0.y + (p1.y - p0.y) * t
          
          let sprite = this.remotePlayers.get(p1.id)
          if (!sprite) {
            sprite = this.add.circle(x, y, 16, 0xff0000)
            this.remotePlayers.set(p1.id, sprite)
          }
          sprite.setPosition(x, y)

          // Update 3D light for remote player
          this.effectsBridge.updatePlayerLight(p1.id, x, y)
        }
      }

      // Cleanup disconnected players
      const currentIds = new Set(s1.players.map(p => p.id))
      for (const [id, sprite] of this.remotePlayers.entries()) {
        if (!currentIds.has(id)) {
          sprite.destroy()
          this.remotePlayers.delete(id)
          this.effectsBridge.removePlayerLight(id)
        }
      }
    }
  }

  private applyInput(target: { x: number, y: number }, input: MoveInput, dt: number) {
    let speed = BASE_SPEED
    if (input.sprint) speed = SPRINT_SPEED
    if (input.crouch) speed = CROUCH_SPEED

    const mag = Math.hypot(input.dx, input.dy)
    if (mag > 0) {
      target.x += (input.dx / mag) * speed * dt
      target.y += (input.dy / mag) * speed * dt
    }
  }
}
