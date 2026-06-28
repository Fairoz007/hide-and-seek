// Keyboard + pointer input. Captures WASD movement, run, jump, action keys, and
// pointer-lock mouse look. Emits semantic actions via a small callback registry.

export type ActionKey =
  | "freeze"
  | "scan"
  | "tag"
  | "pose-stand"
  | "pose-sit"
  | "pose-lie"
  | "pose-curl"
  | "pose-lean"
  | "emote"
  | "paint"
  | "chat"

export class Input {
  private keys = new Set<string>()
  private actionHandlers = new Map<ActionKey, Set<() => void>>()
  private mouseHandlers = new Set<(dx: number, dy: number) => void>()
  private wheelHandlers = new Set<(delta: number) => void>()
  private pointerLocked = false
  private enabled = true
  private el: HTMLElement

  private readonly keyToAction: Record<string, ActionKey> = {
    KeyF: "freeze",
    KeyQ: "scan",
    KeyE: "tag",
    Digit1: "pose-stand",
    Digit2: "pose-sit",
    Digit3: "pose-lie",
    Digit4: "pose-curl",
    Digit5: "pose-lean",
    KeyG: "emote",
    KeyR: "paint",
    Enter: "chat",
  }

  constructor(el: HTMLElement) {
    this.el = el
    window.addEventListener("keydown", this.onKeyDown)
    window.addEventListener("keyup", this.onKeyUp)
    el.addEventListener("mousemove", this.onMouseMove)
    el.addEventListener("wheel", this.onWheel, { passive: true })
    el.addEventListener("click", this.requestLock)
    document.addEventListener("pointerlockchange", this.onLockChange)
  }

  setEnabled(v: boolean) {
    this.enabled = v
    if (!v) this.keys.clear()
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.enabled) return
    // Don't hijack typing in inputs.
    const tag = (e.target as HTMLElement)?.tagName
    if (tag === "INPUT" || tag === "TEXTAREA") return
    this.keys.add(e.code)
    const action = this.keyToAction[e.code]
    if (action) {
      e.preventDefault()
      this.actionHandlers.get(action)?.forEach((h) => h())
    }
  }

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code)
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.pointerLocked || !this.enabled) return
    this.mouseHandlers.forEach((h) => h(e.movementX, e.movementY))
  }

  private onWheel = (e: WheelEvent) => {
    if (!this.enabled) return
    this.wheelHandlers.forEach((h) => h(e.deltaY))
  }

  private requestLock = () => {
    if (this.enabled && !this.pointerLocked) this.el.requestPointerLock?.()
  }

  private onLockChange = () => {
    this.pointerLocked = document.pointerLockElement === this.el
  }

  get isLocked() {
    return this.pointerLocked
  }

  exitLock() {
    if (this.pointerLocked) document.exitPointerLock?.()
  }

  onAction(action: ActionKey, handler: () => void) {
    const set = this.actionHandlers.get(action) ?? new Set()
    set.add(handler)
    this.actionHandlers.set(action, set)
    return () => set.delete(handler)
  }

  onMouse(handler: (dx: number, dy: number) => void) {
    this.mouseHandlers.add(handler)
    return () => this.mouseHandlers.delete(handler)
  }

  onWheelDelta(handler: (delta: number) => void) {
    this.wheelHandlers.add(handler)
    return () => this.wheelHandlers.delete(handler)
  }

  /** Sample current movement axes. */
  axes() {
    let moveX = 0
    let moveZ = 0
    if (this.keys.has("KeyW") || this.keys.has("ArrowUp")) moveZ -= 1
    if (this.keys.has("KeyS") || this.keys.has("ArrowDown")) moveZ += 1
    if (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) moveX -= 1
    if (this.keys.has("KeyD") || this.keys.has("ArrowRight")) moveX += 1
    const run = this.keys.has("ShiftLeft") || this.keys.has("ShiftRight")
    const jump = this.keys.has("Space")
    return { moveX, moveZ, run, jump }
  }

  dispose() {
    window.removeEventListener("keydown", this.onKeyDown)
    window.removeEventListener("keyup", this.onKeyUp)
    this.el.removeEventListener("mousemove", this.onMouseMove)
    this.el.removeEventListener("wheel", this.onWheel)
    this.el.removeEventListener("click", this.requestLock)
    document.removeEventListener("pointerlockchange", this.onLockChange)
  }
}
