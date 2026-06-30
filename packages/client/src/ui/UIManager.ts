import { RoundState, Winner } from "@shadow-seek/shared"

export class UIManager {
  private hudRoot: HTMLElement
  private container: HTMLDivElement
  private timerEl: HTMLDivElement
  private roleEl: HTMLDivElement
  private messageEl: HTMLDivElement

  constructor() {
    this.hudRoot = document.getElementById("hud-root") as HTMLElement
    
    this.container = document.createElement("div")
    this.container.style.position = "absolute"
    this.container.style.top = "0"
    this.container.style.left = "0"
    this.container.style.width = "100%"
    this.container.style.height = "100%"
    this.container.style.pointerEvents = "none"
    this.container.style.display = "flex"
    this.container.style.flexDirection = "column"
    this.container.style.alignItems = "center"
    this.container.style.padding = "20px"
    this.container.style.boxSizing = "border-box"
    this.container.style.fontFamily = "'Fredoka', sans-serif"
    this.container.style.color = "white"
    this.container.style.textShadow = "2px 2px 4px rgba(0,0,0,0.8)"

    this.timerEl = document.createElement("div")
    this.timerEl.style.fontSize = "48px"
    this.timerEl.style.fontWeight = "bold"
    
    this.roleEl = document.createElement("div")
    this.roleEl.style.fontSize = "24px"
    this.roleEl.style.marginTop = "10px"

    this.messageEl = document.createElement("div")
    this.messageEl.style.fontSize = "64px"
    this.messageEl.style.fontWeight = "bold"
    this.messageEl.style.marginTop = "auto"
    this.messageEl.style.marginBottom = "auto"
    this.messageEl.style.color = "#ffcc00"

    this.container.appendChild(this.timerEl)
    this.container.appendChild(this.roleEl)
    this.container.appendChild(this.messageEl)

    this.hudRoot.appendChild(this.container)
  }

  updateState(state: RoundState, countdown: number | undefined, winner: Winner | undefined, myRole: string | undefined) {
    if (myRole) {
      this.roleEl.innerText = `You are a ${myRole.toUpperCase()}`
      this.roleEl.style.color = myRole === "seeker" ? "#ff4444" : "#44ff44"
    }

    if (state === "COUNTDOWN") {
      this.messageEl.innerText = "GET READY!"
      this.timerEl.innerText = String(countdown ?? "")
    } else if (state === "ACTIVE") {
      this.messageEl.innerText = ""
      this.timerEl.innerText = String(countdown ?? "")
    } else if (state === "ROUND_END") {
      if (winner === "seekers") {
        this.messageEl.innerText = "SEEKERS WIN!"
      } else if (winner === "hiders") {
        this.messageEl.innerText = "HIDERS WIN!"
      } else {
        this.messageEl.innerText = "ROUND OVER"
      }
      this.timerEl.innerText = ""
    } else {
      this.messageEl.innerText = ""
      this.timerEl.innerText = ""
    }
  }

  destroy() {
    this.hudRoot.innerHTML = ""
  }
}
