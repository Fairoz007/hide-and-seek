import type { Room } from "../../rooms/Room.js"
import { Winner } from "@shadow-seek/shared"

export interface GameModeRule {
  id: string
  onRoundStart(room: Room): void
  onTag(room: Room, seekerId: string, hiderId: string): void
  onTick(room: Room, dtMs: number): void
  checkWinCondition(room: Room): Winner
}
