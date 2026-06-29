// In-match heads-up display matching the AAA target UI reference.

import type { Team } from "@shared/types"

export class HUD {
  private root: HTMLElement
  private el!: HTMLElement
  private camoFill!: HTMLElement
  private camoLabel!: HTMLElement
  private timer!: HTMLElement
  private mimicCount!: HTMLElement
  private scanBtn!: HTMLElement
  private crosshair!: HTMLElement
  private fpsCount!: HTMLElement
  private pingCount!: HTMLElement
  private visible = false

  constructor() {
    this.root = document.getElementById("hud-root")!
  }

  mount(team: Team, onScan: () => void) {
    this.root.innerHTML = ""
    this.visible = true
    const wrap = document.createElement("div")
    wrap.className = "hud"

    // Top Center: Team Scores & Timer
    const topCenter = `
      <div class="hud-top-center">
        <div class="team-panel team-mimics">
          <div class="ghost-icons">
            <span class="icon-ghost"></span><span class="icon-ghost"></span>
            <span class="icon-ghost"></span><span class="icon-ghost"></span>
            <span class="icon-ghost"></span>
          </div>
        </div>
        <div class="score-center">
          <div class="score-col hunter-score">
            <span>HUNTERS</span>
            <b>2</b>
          </div>
          <div class="time-col">
            <b id="hud-timer">03:38</b>
            <span>ROUND 2</span>
          </div>
          <div class="score-col mimic-score">
            <span>MIMICS</span>
            <b id="mimic-count">2</b>
          </div>
        </div>
        <div class="team-panel team-hunters">
          <div class="ghost-icons">
            <span class="icon-ghost"></span><span class="icon-ghost"></span>
            <span class="icon-ghost"></span><span class="icon-ghost"></span>
            <span class="icon-ghost"></span>
          </div>
        </div>
      </div>
    `

    // Top Left: Mission & Tips
    const topLeft = `
      <div class="hud-top-left">
        <div class="info-panel">
          <div class="info-title">OBJECTIVE</div>
          <div class="info-text">Hide and survive<br/>until time runs out!</div>
        </div>
        <div class="info-panel mt-3">
          <div class="info-title">TIPS</div>
          <div class="info-text">Match the color and<br/>material to blend in.</div>
        </div>
      </div>
    `

    // Top Right: Minimap
    const topRight = `
      <div class="hud-top-right">
        <button class="settings-btn">⚙️</button>
        <div class="minimap-container">
          <div class="minimap-circle">
            <!-- Minimap texture would go here -->
          </div>
        </div>
        <div class="map-info">
          <div class="map-name">FOREST ESTATE</div>
          <div class="map-time">14:25 ☀️</div>
        </div>
      </div>
    `

    // Bottom Left: Camouflage & Metrics
    const bottomLeft = `
      <div class="hud-bottom-left">
        <div class="camo-section">
          <div class="camo-title">CAMOUFLAGE</div>
          <div class="camo-value" id="camo-label">86%</div>
          <div class="camo-bar-container">
            <div class="camo-fill" id="camo-fill" style="width: 86%;"></div>
          </div>
        </div>
        <div class="metrics-row">
          <div class="metric"><span class="metric-icon">fps</span> <b id="fps-count">60</b> FPS</div>
          <div class="metric"><span class="metric-icon">ms</span> <b id="ping-count">32</b> ms</div>
        </div>
      </div>
    `

    // Bottom Center: Abilities
    const bottomCenter = `
      <div class="hud-bottom-center">
        <div class="ability-slot">
          <div class="ability-icon icon-taunt"></div>
          <div class="ability-key">1</div>
        </div>
        <div class="ability-slot">
          <div class="ability-icon icon-paint"></div>
          <div class="ability-key">2</div>
        </div>
        <div class="ability-slot active" id="scan-btn">
          <div class="ability-icon icon-scan">SCAN</div>
          <div class="ability-key">E</div>
        </div>
        <div class="ability-slot">
          <div class="ability-icon icon-sprint"></div>
          <div class="ability-key">3</div>
        </div>
      </div>
    `

    // Bottom Right: Actions / Feed
    const bottomRight = `
      <div class="hud-bottom-right">
        <div class="action-buttons">
          <div class="action-btn">
            <span class="action-icon">TAUNT 👻</span>
            <span class="action-key">T</span>
          </div>
          <div class="action-btn">
            <span class="action-icon">POSE 🧘</span>
            <span class="action-key">V</span>
          </div>
        </div>
      </div>
    `

    wrap.innerHTML = `
      ${topLeft}
      ${topCenter}
      ${topRight}
      ${bottomLeft}
      ${bottomCenter}
      ${bottomRight}
      <div class="crosshair" id="crosshair"></div>
    `
    this.root.appendChild(wrap)
    this.el = wrap

    this.camoFill = wrap.querySelector("#camo-fill")!
    this.camoLabel = wrap.querySelector("#camo-label")!
    this.scanBtn = wrap.querySelector("#scan-btn")!
    if (this.scanBtn) {
      this.scanBtn.addEventListener("click", onScan)
    }
    
    this.timer = wrap.querySelector("#hud-timer")!
    this.mimicCount = wrap.querySelector("#mimic-count")!
    this.crosshair = wrap.querySelector("#crosshair")!
    this.fpsCount = wrap.querySelector("#fps-count")!
    this.pingCount = wrap.querySelector("#ping-count")!
  }

  unmount() {
    this.root.innerHTML = ""
    this.visible = false
  }

  setTimer(seconds: number) {
    if (!this.visible) return
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    this.timer.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  setCamo(score: number) {
    if (!this.visible || !this.camoFill) return
    this.camoFill.style.width = `${score}%`
    this.camoLabel.textContent = `${Math.round(score)}%`
  }

  setMetrics(fps: number, ping: number) {
    if (!this.visible) return
    this.fpsCount.textContent = Math.round(fps).toString()
    this.pingCount.textContent = Math.round(ping).toString()
  }

  setMimicCount(n: number) {
    if (this.visible) this.mimicCount.textContent = String(n)
  }

  setScanCooldown(ready: boolean, secondsLeft: number) {
    if (!this.visible || !this.scanBtn) return
    if (!ready) {
      this.scanBtn.classList.add("cooling")
      const key = this.scanBtn.querySelector(".ability-key")
      if (key) key.textContent = `${Math.ceil(secondsLeft)}`
    } else {
      this.scanBtn.classList.remove("cooling")
      const key = this.scanBtn.querySelector(".ability-key")
      if (key) key.textContent = "E"
    }
  }

  setHint(text: string) {
    // In this AAA UI, hints might be handled via a toast or left side info panel.
  }

  setCrosshairTarget(active: boolean) {
    if (this.visible) this.crosshair.classList.toggle("on-target", active)
  }

  setDiscoveredOverlay(discovered: boolean) {
    if (!this.visible) return
    this.el.classList.toggle("discovered", discovered)
  }
}

