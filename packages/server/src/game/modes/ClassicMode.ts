import type { Room } from "../../rooms/Room.js"
import { GameModeRule } from "./GameModeRule.js"
import { Winner } from "@shadow-seek/shared"

export class ClassicMode implements GameModeRule {
  id = "classic"
  
  onRoundStart(room: Room): void {
    // 60 seconds round
    room.state.countdownSeconds = 60
    
    // Simple role assignment: first player is seeker, rest are hiders
    let seekerAssigned = false
    room.state.players.forEach(p => {
      p.isAlive = true
      if (!seekerAssigned) {
        p.role = "seeker"
        seekerAssigned = true
      } else {
        p.role = "hider"
      }
    })
  }

  onTag(room: Room, seekerId: string, hiderId: string): void {
    const hider = room.state.players.find(p => p.id === hiderId)
    if (hider && hider.role === "hider" && hider.isAlive) {
      hider.isAlive = false
      // In classic, dead hiders become spectators
      hider.role = "spectator"
    }
  }

  onTick(room: Room, dtMs: number): void {
    // In Classic mode, we don't do much per tick other than letting the Room handle the timer.
    // The Room's state machine will decrement countdownSeconds and call checkWinCondition.
  }

  checkWinCondition(room: Room): Winner {
    const aliveHiders = room.state.players.filter(p => p.role === "hider" && p.isAlive).length
    
    // Seekers win if all hiders are dead
    if (aliveHiders === 0) {
      return "seekers"
    }
    
    // Hiders win if time runs out
    if ((room.state.countdownSeconds ?? 0) <= 0) {
      return "hiders"
    }
    
    return null
  }
}
