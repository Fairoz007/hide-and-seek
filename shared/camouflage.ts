// Authoritative camouflage scoring. Runs on the server (truth) and can be run
// on the client for instant feedback. Compares the player's painted regions to
// the colors of nearby surfaces and rewards staying still / freezing.

import { CAMO } from "./constants"
import type { GeneratedMap } from "./mapgen"
import { clamp, colorMatch, dist2D } from "./math"
import type { CamoRegions, Vec3 } from "./types"

/** Find the average color of surfaces within sampling range of a position. */
export function nearbySurfaceColor(map: GeneratedMap, position: Vec3): number {
  let nearest = map.floorColor
  let nearestD: number = CAMO.SAMPLE_RADIUS
  for (const p of map.props) {
    if (!p.hideable) continue
    const d = dist2D(p.position, position)
    if (d < nearestD) {
      nearestD = d
      nearest = p.color
    }
  }
  return nearest
}

/** Average match across the three painted body regions vs a target color. */
export function regionMatch(camo: CamoRegions, target: number): number {
  const m = (colorMatch(camo.torso, target) * 0.5 + colorMatch(camo.head, target) * 0.2 + colorMatch(camo.limbs, target) * 0.3)
  return clamp(m, 0, 1)
}

export interface CamoUpdateArgs {
  current: number
  camo: CamoRegions
  map: GeneratedMap
  position: Vec3
  moving: boolean
  frozen: boolean
  dt: number
}

/**
 * Integrate the camouflage score toward its target. Good color match + holding
 * still pushes it up; movement drags it down quickly.
 */
export function updateCamoScore(args: CamoUpdateArgs): number {
  const { current, camo, map, position, moving, frozen, dt } = args
  const target = nearbySurfaceColor(map, position)
  const match = regionMatch(camo, target) // 0..1
  const matchCeiling = match * CAMO.MAX_SCORE

  let next = current
  if (moving) {
    next -= CAMO.MOVE_PENALTY_RATE * dt
  } else {
    // Climb toward the colour-match ceiling, faster when frozen.
    const rate = CAMO.STILL_BONUS_RATE * (frozen ? 1.6 : 1)
    if (next < matchCeiling) next += rate * dt
    else next -= rate * 0.5 * dt
  }
  return clamp(next, 0, CAMO.MAX_SCORE)
}

/**
 * Whether a hunter at hunterPos can perceive a mimic. High camo + distance hides
 * them; close range or low score reveals them.
 */
export function isMimicVisibleTo(mimicPos: Vec3, mimicScore: number, hunterPos: Vec3): boolean {
  const d = dist2D(mimicPos, hunterPos)
  if (d > CAMO.DETECTION_RADIUS) return false
  // Linear falloff: at point-blank even great camo is risky.
  const proximity = 1 - d / CAMO.DETECTION_RADIUS
  const effectiveHidden = mimicScore - proximity * 40
  return effectiveHidden < CAMO.HIDDEN_THRESHOLD
}
