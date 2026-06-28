// Audio layer built on Howler. Synthesizes simple tones at runtime (so the
// project ships with zero binary audio assets) for UI clicks, countdown beeps,
// paint, footsteps, and victory stings, plus an ambient pad. Positional volume
// is approximated by distance attenuation from the listener.

import { Howl, Howler } from "howler"

type Sfx = "click" | "paint" | "footstep" | "countdown" | "victory" | "discover" | "scan"

/** Generate a short WAV data URI for a tone so we need no asset files. */
function tone(freq: number, ms: number, type: "sine" | "square" | "saw" = "sine", vol = 0.3): string {
  const sampleRate = 22050
  const len = Math.floor((ms / 1000) * sampleRate)
  const buffer = new Uint8Array(44 + len * 2)
  const view = new DataView(buffer.buffer)
  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i))
  }
  writeStr(0, "RIFF")
  view.setUint32(4, 36 + len * 2, true)
  writeStr(8, "WAVE")
  writeStr(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeStr(36, "data")
  view.setUint32(40, len * 2, true)
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate
    const env = Math.min(1, (len - i) / (sampleRate * 0.05)) * Math.min(1, i / (sampleRate * 0.005))
    let s: number
    const ph = freq * t
    if (type === "square") s = Math.sign(Math.sin(ph * Math.PI * 2))
    else if (type === "saw") s = 2 * (ph - Math.floor(ph + 0.5))
    else s = Math.sin(ph * Math.PI * 2)
    const v = s * env * vol
    view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 32767, true)
  }
  let binary = ""
  for (let i = 0; i < buffer.length; i++) binary += String.fromCharCode(buffer[i])
  return "data:audio/wav;base64," + btoa(binary)
}

export class AudioManager {
  private sounds: Record<Sfx, Howl>
  private ambient: Howl | null = null
  private muted = false

  constructor() {
    this.sounds = {
      click: new Howl({ src: [tone(660, 60, "sine", 0.25)] }),
      paint: new Howl({ src: [tone(420, 120, "saw", 0.18)] }),
      footstep: new Howl({ src: [tone(150, 70, "sine", 0.12)] }),
      countdown: new Howl({ src: [tone(880, 180, "square", 0.3)] }),
      victory: new Howl({ src: [tone(523, 500, "sine", 0.35)] }),
      discover: new Howl({ src: [tone(300, 260, "square", 0.3)] }),
      scan: new Howl({ src: [tone(1200, 220, "sine", 0.22)] }),
    }
  }

  play(name: Sfx, volume = 1) {
    if (this.muted) return
    const s = this.sounds[name]
    s.volume(volume)
    s.play()
  }

  /** Distance-attenuated playback for positional cues like footsteps. */
  playAt(name: Sfx, distance: number, maxDistance = 18) {
    const v = Math.max(0, 1 - distance / maxDistance)
    if (v > 0.02) this.play(name, v)
  }

  startAmbient() {
    if (this.ambient || this.muted) return
    // Low sine pad loop.
    this.ambient = new Howl({ src: [tone(110, 2000, "sine", 0.08)], loop: true, volume: 0.4 })
    this.ambient.play()
  }

  stopAmbient() {
    this.ambient?.stop()
    this.ambient = null
  }

  setMuted(v: boolean) {
    this.muted = v
    Howler.mute(v)
  }

  get isMuted() {
    return this.muted
  }
}
