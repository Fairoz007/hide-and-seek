import { RoomState, MoveInput, WorldSnapshot, PlayerSnapshot } from "@shadow-seek/shared"
import { PhysicsValidator } from "../game/PhysicsValidator.js"

export type SnapshotCallback = (roomId: string, snapshot: WorldSnapshot) => void

export class Room {
  state: RoomState
  private inputs: Map<string, MoveInput[]> = new Map()
  private lastProcessedInput: Map<string, number> = new Map()
  private tickTimer: NodeJS.Timeout | null = null
  private tickCounter = 0
  private onSnapshot: SnapshotCallback

  constructor(roomId: string, hostId: string, hostName: string, onSnapshot: SnapshotCallback) {
    this.state = {
      roomId,
      state: "LOBBY",
      players: []
    }
    this.onSnapshot = onSnapshot
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
      position: { x: 400, y: 300 }, // Default spawn
      rotation: 0,
      isAlive: true
    })
    this.inputs.set(id, [])
    this.lastProcessedInput.set(id, 0)
  }

  removePlayer(id: string) {
    this.state.players = this.state.players.filter(p => p.id !== id)
    this.inputs.delete(id)
    this.lastProcessedInput.delete(id)
    
    if (this.state.players.length > 0) {
      if (!this.state.players.find(p => p.isHost)) {
        this.state.players[0].isHost = true
      }
    } else {
      this.stop()
    }
  }

  setReady(id: string, isReady: boolean) {
    const player = this.state.players.find(p => p.id === id)
    if (player) {
      player.isReady = isReady
    }
  }

  queueInput(id: string, input: MoveInput) {
    const playerInputs = this.inputs.get(id)
    if (playerInputs) {
      // Discard older inputs than we've already processed
      const lastProcessed = this.lastProcessedInput.get(id) ?? 0
      if (input.sequence > lastProcessed) {
        playerInputs.push(input)
      }
    }
  }

  start() {
    this.state.state = "ACTIVE"
    // Role assignment could go here
    this.state.players.forEach(p => p.role = "hider") // basic mock
    
    // 20 ticks per second
    this.tickTimer = setInterval(() => this.tick(), 1000 / 20)
  }

  stop() {
    if (this.tickTimer) {
      clearInterval(this.tickTimer)
      this.tickTimer = null
    }
  }

  private tick() {
    this.tickCounter++
    const dt = 1 / 20 // 50ms per tick

    // Process inputs
    this.state.players.forEach(p => {
      const playerInputs = this.inputs.get(p.id) || []
      playerInputs.sort((a, b) => a.sequence - b.sequence)

      for (const input of playerInputs) {
        const { x, y, rotation } = PhysicsValidator.applyInput(p.position, input, dt)
        p.position.x = x
        p.position.y = y
        if (rotation !== 0) {
           p.rotation = rotation
        }
        this.lastProcessedInput.set(p.id, input.sequence)
      }

      // Clear processed inputs
      this.inputs.set(p.id, [])
    })

    // Broadcast snapshot
    const snapshot: WorldSnapshot = {
      tick: this.tickCounter,
      serverTime: Date.now(),
      players: this.state.players.map(p => ({
        id: p.id,
        x: p.position.x,
        y: p.position.y,
        rotation: p.rotation,
        lastProcessedInput: this.lastProcessedInput.get(p.id) || 0
      }))
    }

    this.onSnapshot(this.state.roomId, snapshot)
  }
}
