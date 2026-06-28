// DOM-based UI layer. Each screen is a method that builds markup into the
// #ui-root overlay. The Game orchestrator calls show*() to switch screens and
// passes callbacks for user intents (quick match, create/join room, etc.).

import { MAPS, MODE_DESCRIPTIONS, MODE_LABELS } from "@shared/constants"
import type { GameModeId, LeaderboardEntry, MapId, RoomState, Team } from "@shared/types"
import { BODY_COLORS, COSMETICS, type PlayerProfile } from "@client/cosmetics/catalog"

export interface MenuCallbacks {
  onQuickMatch: (mode: GameModeId) => void
  onCreateRoom: (mode: GameModeId, map: MapId) => void
  onJoinRoom: (code: string) => void
  onProfileChange: (profile: PlayerProfile) => void
}

export interface LobbyCallbacks {
  onStart: () => void
  onAddBots: (n: number) => void
  onLeave: () => void
  onConfig: (patch: { mode?: GameModeId; map?: MapId; maxPlayers?: number }) => void
}

const MODES: GameModeId[] = ["classic", "infection", "final-survivor", "chaos"]

export class UI {
  private root: HTMLElement
  private toastTimer: number | null = null

  constructor() {
    this.root = document.getElementById("ui-root")!
  }

  clear() {
    this.root.innerHTML = ""
  }

  private el(html: string): HTMLElement {
    const wrap = document.createElement("div")
    wrap.innerHTML = html.trim()
    return wrap.firstElementChild as HTMLElement
  }

  toast(message: string, kind: "info" | "error" = "info") {
    let t = document.getElementById("toast")
    if (!t) {
      t = document.createElement("div")
      t.id = "toast"
      document.body.appendChild(t)
    }
    t.textContent = message
    t.className = `toast toast-${kind} show`
    if (this.toastTimer) window.clearTimeout(this.toastTimer)
    this.toastTimer = window.setTimeout(() => {
      t!.className = "toast"
    }, 3200)
  }

  // ------------------------------- main menu -------------------------------
  showMenu(profile: PlayerProfile, cb: MenuCallbacks) {
    this.clear()
    const screen = this.el(`
      <div class="screen menu-screen">
        <header class="brand">
          <div class="brand-mark">CH</div>
          <div>
            <h1 class="brand-title">Chroma Hunt</h1>
            <p class="brand-sub">Blend in. Hunt them down. Don't get caught.</p>
          </div>
        </header>

        <div class="menu-grid">
          <section class="card play-card">
            <h2 class="card-title">Play</h2>
            <div class="mode-list" id="mode-list"></div>
            <button class="btn btn-primary btn-lg" id="quick-btn">Quick Match</button>
            <div class="row">
              <button class="btn" id="create-btn">Create Room</button>
              <div class="join-group">
                <input class="input" id="join-code" placeholder="CODE" maxlength="5" />
                <button class="btn" id="join-btn">Join</button>
              </div>
            </div>
          </section>

          <section class="card profile-card">
            <h2 class="card-title">Profile</h2>
            <label class="field">
              <span>Display name</span>
              <input class="input" id="name-input" value="${escapeHtml(profile.name)}" maxlength="16" />
            </label>
            <div class="field">
              <span>Body color</span>
              <div class="swatches" id="color-swatches"></div>
            </div>
            <div class="field">
              <span>Cosmetics</span>
              <div class="cosmetic-grid" id="cosmetic-grid"></div>
            </div>
            <div class="stats-row">
              <div class="stat"><b>${profile.stats.matches}</b><span>Matches</span></div>
              <div class="stat"><b>${profile.stats.discoveries}</b><span>Finds</span></div>
              <div class="stat"><b>${profile.stats.survivals}</b><span>Survived</span></div>
              <div class="stat"><b>${profile.stats.bestCamo}</b><span>Best Camo</span></div>
            </div>
          </section>
        </div>
        <footer class="menu-foot">Built with Three.js + Socket.IO. WASD to move, hold C to camouflage, Space to freeze.</footer>
      </div>
    `)
    this.root.appendChild(screen)

    let selectedMode: GameModeId = "classic"
    const modeList = screen.querySelector("#mode-list")!
    MODES.forEach((m) => {
      const btn = this.el(`
        <button class="mode-btn ${m === selectedMode ? "active" : ""}" data-mode="${m}">
          <b>${MODE_LABELS[m]}</b>
          <span>${MODE_DESCRIPTIONS[m]}</span>
        </button>
      `)
      btn.addEventListener("click", () => {
        selectedMode = m
        modeList.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
      })
      modeList.appendChild(btn)
    })

    // Color swatches
    const swatches = screen.querySelector("#color-swatches")!
    BODY_COLORS.forEach((c) => {
      const sw = this.el(`<button class="swatch" style="background:#${hex(c)}"></button>`)
      if (c === profile.loadout.bodyColor) sw.classList.add("active")
      sw.addEventListener("click", () => {
        profile.loadout.bodyColor = c
        swatches.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"))
        sw.classList.add("active")
        cb.onProfileChange(profile)
      })
      swatches.appendChild(sw)
    })

    // Cosmetic toggles (one per slot, simple cycle)
    const cosmeticGrid = screen.querySelector("#cosmetic-grid")!
    COSMETICS.forEach((item) => {
      const active = (profile.loadout as Record<string, unknown>)[item.slot] === item.id
      const chip = this.el(`<button class="cosmetic-chip rarity-${item.rarity} ${active ? "active" : ""}">${item.name}</button>`)
      chip.addEventListener("click", () => {
        const cur = (profile.loadout as Record<string, string | null>)[item.slot]
        ;(profile.loadout as Record<string, string | null>)[item.slot] = cur === item.id ? null : item.id
        cosmeticGrid.querySelectorAll(`.cosmetic-chip`).forEach((c) => {
          const txt = c.textContent
          const match = COSMETICS.find((x) => x.name === txt)
          if (match && match.slot === item.slot) c.classList.remove("active")
        })
        if ((profile.loadout as Record<string, string | null>)[item.slot] === item.id) chip.classList.add("active")
        cb.onProfileChange(profile)
      })
      cosmeticGrid.appendChild(chip)
    })

    const nameInput = screen.querySelector<HTMLInputElement>("#name-input")!
    nameInput.addEventListener("change", () => {
      profile.name = nameInput.value.trim() || profile.name
      cb.onProfileChange(profile)
    })

    screen.querySelector("#quick-btn")!.addEventListener("click", () => cb.onQuickMatch(selectedMode))
    screen.querySelector("#create-btn")!.addEventListener("click", () => cb.onCreateRoom(selectedMode, "modern-office"))
    screen.querySelector("#join-btn")!.addEventListener("click", () => {
      const code = screen.querySelector<HTMLInputElement>("#join-code")!.value.trim().toUpperCase()
      if (code) cb.onJoinRoom(code)
    })
  }

  // --------------------------------- lobby ---------------------------------
  showLobby(room: RoomState, selfId: string, cb: LobbyCallbacks) {
    this.clear()
    const isHost = room.hostId === selfId
    const screen = this.el(`
      <div class="screen lobby-screen">
        <div class="card lobby-card">
          <div class="lobby-head">
            <div>
              <h2 class="card-title">Lobby</h2>
              <p class="lobby-code">Room code: <b>${room.code}</b></p>
            </div>
            <button class="btn" id="leave-btn">Leave</button>
          </div>

          <div class="lobby-body">
            <div class="lobby-settings">
              <label class="field"><span>Mode</span>
                <select class="input" id="mode-sel" ${isHost ? "" : "disabled"}></select>
              </label>
              <label class="field"><span>Map</span>
                <select class="input" id="map-sel" ${isHost ? "" : "disabled"}></select>
              </label>
              <label class="field"><span>Max players: <b id="mp-val">${room.config.maxPlayers}</b></span>
                <input type="range" min="2" max="24" value="${room.config.maxPlayers}" id="mp-range" ${isHost ? "" : "disabled"} />
              </label>
            </div>
            <div class="lobby-players">
              <h3>Players <span id="pcount"></span></h3>
              <ul class="player-list" id="player-list"></ul>
            </div>
          </div>

          <div class="lobby-actions">
            ${isHost ? `<button class="btn" id="bots-btn">Fill with Bots</button>` : ""}
            ${isHost ? `<button class="btn btn-primary btn-lg" id="start-btn">Start Match</button>` : `<p class="waiting">Waiting for host to start…</p>`}
          </div>
        </div>
      </div>
    `)
    this.root.appendChild(screen)

    const modeSel = screen.querySelector<HTMLSelectElement>("#mode-sel")!
    MODES.concat("custom").forEach((m) => {
      const opt = document.createElement("option")
      opt.value = m
      opt.textContent = MODE_LABELS[m]
      if (m === room.config.mode) opt.selected = true
      modeSel.appendChild(opt)
    })
    const mapSel = screen.querySelector<HTMLSelectElement>("#map-sel")!
    MAPS.forEach((m) => {
      const opt = document.createElement("option")
      opt.value = m.id
      opt.textContent = m.name
      if (m.id === room.config.map) opt.selected = true
      mapSel.appendChild(opt)
    })

    if (isHost) {
      modeSel.addEventListener("change", () => cb.onConfig({ mode: modeSel.value as GameModeId }))
      mapSel.addEventListener("change", () => cb.onConfig({ map: mapSel.value as MapId }))
      const mp = screen.querySelector<HTMLInputElement>("#mp-range")!
      const mpVal = screen.querySelector("#mp-val")!
      mp.addEventListener("input", () => (mpVal.textContent = mp.value))
      mp.addEventListener("change", () => cb.onConfig({ maxPlayers: Number(mp.value) }))
      screen.querySelector("#bots-btn")!.addEventListener("click", () => cb.onAddBots(room.config.maxPlayers - room.players.length))
      screen.querySelector("#start-btn")!.addEventListener("click", () => cb.onStart())
    }
    screen.querySelector("#leave-btn")!.addEventListener("click", () => cb.onLeave())

    this.renderLobbyPlayers(room)
  }

  updateLobby(room: RoomState) {
    const list = document.getElementById("player-list")
    if (list) this.renderLobbyPlayers(room)
  }

  private renderLobbyPlayers(room: RoomState) {
    const list = document.getElementById("player-list")
    if (!list) return
    list.innerHTML = ""
    room.players.forEach((p) => {
      const li = this.el(`
        <li class="player-row ${p.id === room.hostId ? "is-host" : ""}">
          <span class="dot" style="background:#${hex(p.cosmetics.bodyColor)}"></span>
          <span class="pname">${escapeHtml(p.name)}</span>
          ${p.id === room.hostId ? '<span class="badge">Host</span>' : ""}
          ${p.isBot ? '<span class="badge badge-bot">Bot</span>' : ""}
        </li>
      `)
      list.appendChild(li)
    })
    const count = document.getElementById("pcount")
    if (count) count.textContent = `${room.players.length}/${room.config.maxPlayers}`
  }

  // ------------------------------- countdown -------------------------------
  showCountdown(n: number) {
    let c = document.getElementById("countdown")
    if (!c) {
      this.clear()
      c = this.el(`<div class="screen countdown-screen"><div class="countdown-num" id="countdown">${n}</div><p>Get into position…</p></div>`)
      this.root.appendChild(c)
      c = document.getElementById("countdown")
    }
    if (c) {
      c.textContent = n > 0 ? String(n) : "GO!"
      c.classList.remove("pop")
      void c.offsetWidth
      c.classList.add("pop")
    }
  }

  // --------------------------------- results -------------------------------
  showResults(winner: Team | null, lb: LeaderboardEntry[], selfId: string, onContinue: () => void) {
    this.clear()
    const title = winner === "hunter" ? "Hunters Win" : winner === "mimic" ? "Mimics Survive" : "Match Over"
    const screen = this.el(`
      <div class="screen results-screen">
        <div class="card results-card">
          <h2 class="results-title team-${winner ?? "none"}">${title}</h2>
          <table class="leaderboard">
            <thead><tr><th>#</th><th>Player</th><th>Team</th><th>Score</th><th>Survived</th></tr></thead>
            <tbody>
              ${lb
                .map(
                  (e, i) => `
                <tr class="${e.playerId === selfId ? "me" : ""}">
                  <td>${i + 1}</td>
                  <td>${escapeHtml(e.name)}</td>
                  <td class="team-${e.team}">${e.team}</td>
                  <td>${e.score}</td>
                  <td>${e.survivedSeconds}s</td>
                </tr>`,
                )
                .join("")}
            </tbody>
          </table>
          <button class="btn btn-primary btn-lg" id="continue-btn">Back to Menu</button>
        </div>
      </div>
    `)
    this.root.appendChild(screen)
    screen.querySelector("#continue-btn")!.addEventListener("click", onContinue)
  }
}

function hex(n: number): string {
  return (n & 0xffffff).toString(16).padStart(6, "0")
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}
