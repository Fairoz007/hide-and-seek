// In-match heads-up display. Lightweight: builds once, then per-frame setters
// poke textContent / styles directly to avoid re-rendering DOM each tick.

import type { Team } from "@shared/types"

export class HUD {
  private root: HTMLElement
  private el!: HTMLElement
  private camoFill!: HTMLElement
  private camoLabel!: HTMLElement
  private timer!: HTMLElement
  private roleTag!: HTMLElement
  private mimicCount!: HTMLElement
  private scanBtn!: HTMLButtonElement
  private hint!: HTMLElement
  private crosshair!: HTMLElement
  private visible = false

  constructor() {
    this.root = document.getElementById("hud-root")!
  }

  mount(team: Team, onScan: () => void) {
    this.root.innerHTML = ""
    this.visible = true
    const wrap = document.createElement("div")
    wrap.className = "hud"
    wrap.innerHTML = `
      <div class="hud-top">
        <div class="hud-role role-${team}" id="role-tag">${team === "hunter" ? "HUNTER" : "MIMIC"}</div>
        <div class="hud-timer" id="hud-timer">--:--</div>
        <div class="hud-remaining">Mimics left: <b id="mimic-count">0</b></div>
      </div>

      <div class="hud-bottom">
        ${
          team === "mimic"
            ? `<div class="camo-meter">
                 <div class="camo-bar"><div class="camo-fill" id="camo-fill"></div></div>
                 <div class="camo-label" id="camo-label">Camo 0%</div>
               </div>`
            : `<button class="btn scan-btn" id="scan-btn">SCAN <span class="scan-key">F</span></button>`
        }
        <div class="hud-hint" id="hud-hint"></div>
      </div>

      <div class="crosshair" id="crosshair"></div>
    `
    this.root.appendChild(wrap)
    this.el = wrap

    if (team === "mimic") {
      this.camoFill = wrap.querySelector("#camo-fill")!
      this.camoLabel = wrap.querySelector("#camo-label")!
    } else {
      this.scanBtn = wrap.querySelector<HTMLButtonElement>("#scan-btn")!
      this.scanBtn.addEventListener("click", onScan)
    }
    this.timer = wrap.querySelector("#hud-timer")!
    this.roleTag = wrap.querySelector("#role-tag")!
    this.mimicCount = wrap.querySelector("#mimic-count")!
    this.hint = wrap.querySelector("#hud-hint")!
    this.crosshair = wrap.querySelector("#crosshair")!
  }

  unmount() {
    this.root.innerHTML = ""
    this.visible = false
  }

  setTimer(seconds: number) {
    if (!this.visible) return
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    this.timer.textContent = `${m}:${s.toString().padStart(2, "0")}`
    this.timer.classList.toggle("urgent", seconds <= 30)
  }

  setCamo(score: number) {
    if (!this.visible || !this.camoFill) return
    this.camoFill.style.width = `${score}%`
    this.camoLabel.textContent = `Camo ${Math.round(score)}%`
    this.camoFill.classList.toggle("hidden-good", score >= 80)
  }

  setMimicCount(n: number) {
    if (this.visible) this.mimicCount.textContent = String(n)
  }

  setScanCooldown(ready: boolean, secondsLeft: number) {
    if (!this.visible || !this.scanBtn) return
    this.scanBtn.disabled = !ready
    this.scanBtn.classList.toggle("cooling", !ready)
    const label = this.scanBtn.querySelector(".scan-key")
    if (label) label.textContent = ready ? "F" : `${Math.ceil(secondsLeft)}s`
  }

  setHint(text: string) {
    if (this.visible) this.hint.textContent = text
  }

  setCrosshairTarget(active: boolean) {
    if (this.visible) this.crosshair.classList.toggle("on-target", active)
  }

  setDiscoveredOverlay(discovered: boolean) {
    if (!this.visible) return
    this.el.classList.toggle("discovered", discovered)
    if (discovered) this.roleTag.textContent = "SPOTTED"
  }
}
