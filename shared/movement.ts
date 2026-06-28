// Deterministic capsule-vs-AABB movement resolution shared by the authoritative
// server and the client predictor. Keeping a single implementation here is what
// makes client-side prediction reconcile cleanly against the server.

import { MOVEMENT } from "./constants"
import type { GeneratedMap, MapProp } from "./mapgen"
import { clamp } from "./math"
import type { PlayerInput, Vec3 } from "./types"

export interface MovementBody {
  position: Vec3
  velocity: Vec3
  rotationY: number
}

interface AABB {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
  top: number
}

/** Precompute solid prop bounds once per map for fast collision queries. */
export function buildColliders(map: GeneratedMap): AABB[] {
  return map.props.map((p: MapProp) => ({
    minX: p.position.x - p.size.x,
    maxX: p.position.x + p.size.x,
    minZ: p.position.z - p.size.z,
    maxZ: p.position.z + p.size.z,
    top: p.position.y + p.size.y,
  }))
}

function resolveAxis(px: number, pz: number, r: number, colliders: AABB[], y: number): { x: number; z: number } {
  let x = px
  let z = pz
  for (const c of colliders) {
    // Skip props short enough to stand on / crawl over relative to feet height.
    if (c.top < y + 0.1) continue
    const closestX = clamp(x, c.minX, c.maxX)
    const closestZ = clamp(z, c.minZ, c.maxZ)
    const dx = x - closestX
    const dz = z - closestZ
    const d2 = dx * dx + dz * dz
    if (d2 < r * r) {
      const d = Math.sqrt(d2) || 0.0001
      const push = (r - d) / d
      x += dx * push
      z += dz * push
    }
  }
  return { x, z }
}

/**
 * Advance a body by one input step. Mutates and returns the body.
 * `frozen` players don't accept movement (hiding mode) but still settle.
 */
export function stepMovement(
  body: MovementBody,
  input: PlayerInput,
  map: GeneratedMap,
  colliders: AABB[],
  frozen: boolean,
  speedScale = 1,
): MovementBody {
  const dt = clamp(input.dt, 0, 0.1)
  body.rotationY = input.rotationY

  if (frozen) {
    body.velocity.x *= 0.8
    body.velocity.z *= 0.8
  } else {
    const speed = (input.run ? MOVEMENT.RUN_SPEED : MOVEMENT.WALK_SPEED) * speedScale
    // Convert local input into world-space direction using facing.
    const sin = Math.sin(input.rotationY)
    const cos = Math.cos(input.rotationY)
    const wishX = input.moveX * cos + input.moveZ * sin
    const wishZ = -input.moveX * sin + input.moveZ * cos
    const len = Math.hypot(wishX, wishZ) || 1
    const targetVX = (wishX / len) * speed * Math.min(1, Math.hypot(input.moveX, input.moveZ))
    const targetVZ = (wishZ / len) * speed * Math.min(1, Math.hypot(input.moveX, input.moveZ))

    const accel = MOVEMENT.ACCEL * dt
    body.velocity.x += (targetVX - body.velocity.x) * Math.min(1, accel)
    body.velocity.z += (targetVZ - body.velocity.z) * Math.min(1, accel)
  }

  body.position.x += body.velocity.x * dt
  body.position.z += body.velocity.z * dt

  // Arena bounds.
  const lim = map.half - MOVEMENT.PLAYER_RADIUS
  body.position.x = clamp(body.position.x, -lim, lim)
  body.position.z = clamp(body.position.z, -lim, lim)

  const resolved = resolveAxis(
    body.position.x,
    body.position.z,
    MOVEMENT.PLAYER_RADIUS,
    colliders,
    body.position.y,
  )
  body.position.x = resolved.x
  body.position.z = resolved.z
  body.position.y = MOVEMENT.PLAYER_RADIUS + 0.4 // grounded; flat arena floor

  return body
}
