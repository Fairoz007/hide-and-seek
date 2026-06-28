// Cosmetic catalog + local profile persistence. Cosmetics are purely visual and
// stored client-side (localStorage). Body color is the camo base tint.

import type { CosmeticLoadout } from "@shared/types"

export interface CosmeticItem {
  id: string
  name: string
  slot: "hat" | "backpack" | "shoes" | "brush" | "trail" | "emote"
  rarity: "common" | "rare" | "epic"
}

export const COSMETICS: CosmeticItem[] = [
  { id: "cap", name: "Ball Cap", slot: "hat", rarity: "common" },
  { id: "beanie", name: "Beanie", slot: "hat", rarity: "common" },
  { id: "tophat", name: "Top Hat", slot: "hat", rarity: "rare" },
  { id: "crown", name: "Pixel Crown", slot: "hat", rarity: "epic" },
  { id: "satchel", name: "Satchel", slot: "backpack", rarity: "common" },
  { id: "jetpack", name: "Faux Jetpack", slot: "backpack", rarity: "epic" },
  { id: "sneakers", name: "Sneakers", slot: "shoes", rarity: "common" },
  { id: "boots", name: "Trail Boots", slot: "shoes", rarity: "rare" },
  { id: "roller", name: "Paint Roller", slot: "brush", rarity: "common" },
  { id: "spray", name: "Spray Can", slot: "brush", rarity: "rare" },
  { id: "sparkle", name: "Sparkle Trail", slot: "trail", rarity: "epic" },
  { id: "wave", name: "Wave Emote", slot: "emote", rarity: "common" },
  { id: "dance", name: "Dance Emote", slot: "emote", rarity: "rare" },
]

export const BODY_COLORS = [
  0xe06c75, 0xe5c07b, 0x98c379, 0x56b6c2, 0x61afef, 0xc678dd, 0xd19a66, 0xabb2bf,
]

export interface PlayerProfile {
  name: string
  loadout: CosmeticLoadout
  stats: { matches: number; discoveries: number; survivals: number; bestCamo: number }
}

const KEY = "chroma-hunt-profile"

export function defaultProfile(): PlayerProfile {
  return {
    name: `Player${Math.floor(Math.random() * 9000) + 1000}`,
    loadout: {
      hat: null,
      backpack: null,
      shoes: null,
      brush: "roller",
      trail: null,
      emote: "wave",
      bodyColor: BODY_COLORS[4],
    },
    stats: { matches: 0, discoveries: 0, survivals: 0, bestCamo: 0 },
  }
}

export function loadProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...defaultProfile(), ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return defaultProfile()
}

export function saveProfile(p: PlayerProfile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}
