// Lightweight math + color helpers with no engine dependencies so they can be
// reused on the server (no Three.js) and the client alike.

import type { Vec3 } from "./types"

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const damp = (a: number, b: number, lambda: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-lambda * dt))

export const vec3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z })

export const dist2D = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.z - b.z)

export const dist3D = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)

/** Unpack a packed 0xRRGGBB integer into normalized [r,g,b]. */
export function unpackColor(hex: number): [number, number, number] {
  return [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255]
}

export function packColor(r: number, g: number, b: number): number {
  const ri = clamp(Math.round(r * 255), 0, 255)
  const gi = clamp(Math.round(g * 255), 0, 255)
  const bi = clamp(Math.round(b * 255), 0, 255)
  return (ri << 16) | (gi << 8) | bi
}

/** Blend two packed colors by t (0 = a, 1 = b). */
export function blendColors(a: number, b: number, t: number): number {
  const [ar, ag, ab] = unpackColor(a)
  const [br, bg, bb] = unpackColor(b)
  return packColor(lerp(ar, br, t), lerp(ag, bg, t), lerp(ab, bb, t))
}

/**
 * Perceptual-ish closeness between two colors, returned as 0..1 where 1 is a
 * perfect match. Weighted to approximate human luminance sensitivity.
 */
export function colorMatch(a: number, b: number): number {
  const [ar, ag, ab] = unpackColor(a)
  const [br, bg, bb] = unpackColor(b)
  const dr = (ar - br) * 0.9
  const dg = (ag - bg) * 1.2
  const db = (ab - bb) * 0.7
  const d = Math.sqrt(dr * dr + dg * dg + db * db) / Math.sqrt(0.9 * 0.9 + 1.2 * 1.2 + 0.7 * 0.7)
  return clamp(1 - d, 0, 1)
}

export function adjustBrightness(hex: number, factor: number): number {
  const [r, g, b] = unpackColor(hex)
  return packColor(r * factor, g * factor, b * factor)
}

export function adjustSaturation(hex: number, factor: number): number {
  const [r, g, b] = unpackColor(hex)
  const gray = r * 0.299 + g * 0.587 + b * 0.114
  return packColor(lerp(gray, r, factor), lerp(gray, g, factor), lerp(gray, b, factor))
}

/** Mulberry32 seeded PRNG — deterministic for map generation. */
export function makeRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hashStringToSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
