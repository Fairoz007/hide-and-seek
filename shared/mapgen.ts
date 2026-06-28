// Deterministic procedural layout generator. Given a MapId, both the server
// (for collision + spawns) and the client (for rendering) produce the exact
// same set of props by seeding a PRNG from the map id.

import { MAPS, type MapMeta } from "./constants"
import { hashStringToSeed, makeRng } from "./math"
import type { MapId, Vec3 } from "./types"

export type PropKind = "box" | "cylinder" | "table" | "shelf" | "plant" | "wall" | "tree"

export interface MapProp {
  id: number
  kind: PropKind
  position: Vec3
  size: Vec3 // half-extents for boxes; (radius, height, radius) for cylinders
  rotationY: number
  color: number
  hideable: boolean
}

export interface GeneratedMap {
  meta: MapMeta
  half: number // half world size (square arena)
  floorColor: number
  wallColor: number
  props: MapProp[]
  spawnPoints: Vec3[]
}

const WORLD_HALF = 30

export function getMapMeta(id: MapId): MapMeta {
  return MAPS.find((m) => m.id === id) ?? MAPS[0]
}

export function generateMap(id: MapId): GeneratedMap {
  const meta = getMapMeta(id)
  const rng = makeRng(hashStringToSeed(id))
  const palette = meta.palette
  const props: MapProp[] = []
  let pid = 0

  const pick = () => palette[Math.floor(rng() * palette.length)]

  // Perimeter walls keep players inside the arena.
  const wallH = 4
  const wallColor = palette[0]
  const sides: Array<[number, number, number, number]> = [
    [0, WORLD_HALF, WORLD_HALF, 0.5],
    [0, -WORLD_HALF, WORLD_HALF, 0.5],
    [WORLD_HALF, 0, 0.5, WORLD_HALF],
    [-WORLD_HALF, 0, 0.5, WORLD_HALF],
  ]
  for (const [x, z, sx, sz] of sides) {
    props.push({
      id: pid++,
      kind: "wall",
      position: { x, y: wallH / 2, z },
      size: { x: sx, y: wallH / 2, z: sz },
      rotationY: 0,
      color: wallColor,
      hideable: false,
    })
  }

  // Scatter furniture / cover in a loose grid with jitter. Each cell may hold a
  // prop; this yields hundreds of distinct hiding opportunities per map.
  const cell = 4
  for (let gx = -WORLD_HALF + cell; gx < WORLD_HALF - cell; gx += cell) {
    for (let gz = -WORLD_HALF + cell; gz < WORLD_HALF - cell; gz += cell) {
      if (rng() < 0.45) continue
      const jx = (rng() - 0.5) * cell * 0.6
      const jz = (rng() - 0.5) * cell * 0.6
      const x = gx + jx
      const z = gz + jz
      const roll = rng()
      let kind: PropKind
      let size: Vec3
      let y: number
      if (roll < 0.2) {
        kind = "tree"
        size = { x: 1.5, y: 3.5, z: 1.5 }
        y = 1.75
      } else if (roll < 0.35) {
        kind = "table"
        size = { x: 1.1, y: 0.45, z: 0.7 }
        y = 0.45
      } else if (roll < 0.55) {
        kind = "shelf"
        size = { x: 0.5, y: 1.2, z: 1.4 }
        y = 1.2
      } else if (roll < 0.72) {
        kind = "cylinder"
        size = { x: 0.5, y: 0.6 + rng() * 0.5, z: 0.5 }
        y = size.y
      } else if (roll < 0.86) {
        kind = "plant"
        size = { x: 0.45, y: 0.9, z: 0.45 }
        y = 0.9
      } else {
        kind = "box"
        const s = 0.5 + rng() * 0.7
        size = { x: s, y: s, z: s }
        y = s
      }
      props.push({
        id: pid++,
        kind,
        position: { x, y, z },
        size,
        rotationY: Math.floor(rng() * 4) * (Math.PI / 2),
        color: pick(),
        hideable: true,
      })
    }
  }

  // Spawn points around the edges, away from the centre.
  const spawnPoints: Vec3[] = []
  const ring = WORLD_HALF - 4
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2
    spawnPoints.push({ x: Math.cos(a) * ring, y: MOVEMENT_SPAWN_Y, z: Math.sin(a) * ring })
  }

  return {
    meta,
    half: WORLD_HALF,
    floorColor: palette[2],
    wallColor,
    props,
    spawnPoints,
  }
}

const MOVEMENT_SPAWN_Y = 0.8
