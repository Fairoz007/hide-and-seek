import { MoveInput, isWall } from "@shadow-seek/shared"

// Speeds in units per second (e.g. pixels per second)
const BASE_SPEED = 200
const SPRINT_SPEED = 350
const CROUCH_SPEED = 100

export class PhysicsValidator {
  static applyInput(
    currentPos: { x: number; y: number },
    input: MoveInput,
    dt: number
  ): { x: number; y: number; rotation: number } {
    let speed = BASE_SPEED
    if (input.sprint) speed = SPRINT_SPEED
    if (input.crouch) speed = CROUCH_SPEED

    const mag = Math.hypot(input.dx, input.dy)
    let nx = 0, ny = 0
    if (mag > 0) {
      nx = input.dx / mag
      ny = input.dy / mag
    }

    let newX = currentPos.x + nx * speed * dt
    let newY = currentPos.y + ny * speed * dt
    
    let rotation = 0
    if (mag > 0) {
      rotation = Math.atan2(ny, nx)
    }

    // Basic Point-Radius Collision
    const radius = 16
    const pointsToCheck = [
      { x: newX + radius, y: newY },
      { x: newX - radius, y: newY },
      { x: newX, y: newY + radius },
      { x: newX, y: newY - radius }
    ]

    let collision = false
    for (const p of pointsToCheck) {
      if (isWall(p.x, p.y)) {
        collision = true
        break
      }
    }

    // If collision, just cancel movement entirely for simplicity in Phase 3
    if (collision) {
      newX = currentPos.x
      newY = currentPos.y
    }

    return { x: newX, y: newY, rotation }
  }
}
