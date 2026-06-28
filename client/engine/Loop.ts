// Fixed-timestep-aware game loop with an FPS/perf sampler. The update callback
// receives a clamped delta; render runs every animation frame.

export type LoopCallback = (dt: number, elapsed: number) => void

export class Loop {
  private raf = 0
  private last = 0
  private elapsed = 0
  private running = false
  private frames = 0
  private fpsAccum = 0
  fps = 60

  constructor(
    private update: LoopCallback,
    private render: () => void,
  ) {}

  start() {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    const tick = (now: number) => {
      if (!this.running) return
      this.raf = requestAnimationFrame(tick)
      let dt = (now - this.last) / 1000
      this.last = now
      if (dt > 0.1) dt = 0.1 // guard against tab-switch spikes
      this.elapsed += dt

      this.update(dt, this.elapsed)
      this.render()

      // FPS sampling once per second.
      this.frames++
      this.fpsAccum += dt
      if (this.fpsAccum >= 0.5) {
        this.fps = Math.round(this.frames / this.fpsAccum)
        this.frames = 0
        this.fpsAccum = 0
      }
    }
    this.raf = requestAnimationFrame(tick)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }
}
