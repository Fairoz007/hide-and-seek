// Server-side AI for filling rooms. Mimics seek a nearby hiding prop, match its
// color, then freeze. Hunters roam, scan on cooldown, and tag mimics they get
// close to. Bots emit the same PlayerInput shape humans do.

import { nearbySurfaceColor } from "@shared/camouflage"
import { HUNTER } from "@shared/constants"
import type { GeneratedMap } from "@shared/mapgen"
import { dist2D } from "@shared/math"
import type { PlayerInput, Team, Vec3 } from "@shared/types"
import type { Room, ServerPlayer } from "./Room"

export class Bot {
  private team: Team = "mimic"
  private seq = 1
  private target: Vec3 | null = null
  private settleTimer = 0
  private wanderTimer = 0

  constructor(private id: string) {}

  setTeam(team: Team) {
    this.team = team
    this.target = null
    this.settleTimer = 0
  }

  /** Produce a movement input toward the bot's current intent. */
  think(dt: number, others: ServerPlayer[], map: GeneratedMap): PlayerInput {
    this.wanderTimer -= dt

    if (this.team === "mimic") {
      return this.thinkMimic(dt, map)
    }
    return this.thinkHunter(dt, others, map)
  }

  private currentPos: Vec3 = { x: 0, y: 0, z: 0 }
  private currentYaw = 0

  /** Called by Room to feed the bot its own latest transform before think(). */
  observe(pos: Vec3, yaw: number) {
    this.currentPos = pos
    this.currentYaw = yaw
  }

  private thinkMimic(dt: number, map: GeneratedMap): PlayerInput {
    if (!this.target || this.settleTimer > 0) {
      if (this.settleTimer > 0) {
        this.settleTimer -= dt
        return this.idleInput()
      }
      // Pick a random hideable prop to nestle against.
      const hideables = map.props.filter((p) => p.hideable && p.size.y > 0.5)
      const choice = hideables[Math.floor(Math.random() * hideables.length)]
      if (choice) {
        this.target = {
          x: choice.position.x + (Math.random() - 0.5) * 1.5,
          y: 0,
          z: choice.position.z + (Math.random() - 0.5) * 1.5,
        }
      }
    }

    if (this.target) {
      const d = dist2D(this.currentPos, this.target)
      if (d < 0.8) {
        this.target = null
        this.settleTimer = 4 + Math.random() * 6 // hold position
        return this.idleInput()
      }
      return this.moveToward(this.target, false)
    }
    return this.idleInput()
  }

  private thinkHunter(dt: number, others: ServerPlayer[], map: GeneratedMap): PlayerInput {
    // Chase the nearest visible mimic; otherwise patrol.
    let nearest: ServerPlayer | null = null
    let nd = Infinity
    for (const o of others) {
      if (o.team !== "mimic" || o.discovered) continue
      const d = dist2D(this.currentPos, o.position)
      if (d < nd) {
        nd = d
        nearest = o
      }
    }
    if (nearest && nd < 12) {
      return this.moveToward(nearest.position, true)
    }
    // Patrol toward a wandering waypoint.
    if (!this.target || this.wanderTimer <= 0) {
      this.target = {
        x: (Math.random() - 0.5) * map.half * 1.6,
        y: 0,
        z: (Math.random() - 0.5) * map.half * 1.6,
      }
      this.wanderTimer = 4 + Math.random() * 4
    }
    return this.moveToward(this.target, Math.random() < 0.3)
  }

  private moveToward(target: Vec3, run: boolean): PlayerInput {
    const dx = target.x - this.currentPos.x
    const dz = target.z - this.currentPos.z
    const yaw = Math.atan2(dx, dz)
    return {
      seq: this.seq++,
      dt: 1 / 30,
      moveX: 0,
      moveZ: 1, // forward in facing direction
      run,
      rotationY: yaw,
      jump: false,
    }
  }

  private idleInput(): PlayerInput {
    return {
      seq: this.seq++,
      dt: 1 / 30,
      moveX: 0,
      moveZ: 0,
      run: false,
      rotationY: this.currentYaw,
      jump: false,
    }
  }

  /** Side-effect actions: camo matching, freezing, scanning, tagging. */
  applyActions(room: Room, self: ServerPlayer) {
    this.observe(self.position, self.rotationY)

    if (this.team === "mimic" && !self.discovered) {
      // Match surroundings and freeze when settled.
      const target = nearbySurfaceColor(room.getMap(), self.position)
      room.setCamo(self.id, { torso: target, head: target, limbs: target })
      const settled = this.settleTimer > 0
      room.setFreeze(self.id, settled)
      room.setPose(self.id, settled ? "curl" : "stand")
    } else if (this.team === "hunter") {
      // Scan on cooldown.
      if (Math.random() < 0.02) room.scan(self.id)
      // Tag any mimic in range.
      for (const o of room.allPlayers()) {
        if (o.team === "mimic" && !o.discovered && dist2D(self.position, o.position) < HUNTER.TAG_RANGE) {
          room.tag(self.id, o.id)
          break
        }
      }
    }
  }
}
