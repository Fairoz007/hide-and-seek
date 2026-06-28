// Core WebGL2 renderer wrapper. Owns the THREE.WebGLRenderer, scene, lighting,
// fog and post-processing-lite (tone mapping). Built to hit 60fps on mid-range
// hardware via shadow tuning and capped pixel ratio.

import * as THREE from "three"
import { PostProcessing } from "./PostProcessing"

export class Renderer {
  readonly renderer: THREE.WebGLRenderer
  readonly scene: THREE.Scene
  readonly camera: THREE.PerspectiveCamera
  readonly postProcessing: PostProcessing
  public usePostProcessing = true

  private hemi!: THREE.HemisphereLight
  private sun!: THREE.DirectionalLight
  private resizeHandler: () => void

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false, // Disabled here because we use SMAA in post-processing
      powerPreference: "high-performance",
    })
    
    // AAA-quality setup
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    // Using physically correct lighting is default in newer Three.js (r169+)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0d1117)

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
    this.camera.position.set(0, 6, 10)

    this.setupLights()
    
    // Initialize Post-Processing Stack
    this.postProcessing = new PostProcessing(this.renderer, this.scene, this.camera, window.innerWidth, window.innerHeight)

    this.resizeHandler = () => this.onResize()
    window.addEventListener("resize", this.resizeHandler)
  }

  private setupLights() {
    this.hemi = new THREE.HemisphereLight(0xcfe8ff, 0x2a2a30, 0.7)
    this.scene.add(this.hemi)

    this.sun = new THREE.DirectionalLight(0xffffff, 4.0) // Increased for PBR realism
    this.sun.position.set(20, 30, 12)
    this.sun.castShadow = true
    this.sun.shadow.mapSize.set(2048, 2048) // High-res shadows
    this.sun.shadow.camera.near = 1
    this.sun.shadow.camera.far = 150
    const s = 40
    this.sun.shadow.camera.left = -s
    this.sun.shadow.camera.right = s
    this.sun.shadow.camera.top = s
    this.sun.shadow.camera.bottom = -s
    this.sun.shadow.bias = -0.0001
    this.sun.shadow.normalBias = 0.02
    this.scene.add(this.sun)
    this.scene.add(this.sun.target)
  }

  /** Apply map-specific atmosphere (fog + ambient tint). */
  setAtmosphere(fogColor: number, density: number) {
    this.scene.fog = new THREE.FogExp2(fogColor, density)
    this.scene.background = new THREE.Color(fogColor)
  }

  setSunColor(color: number, intensity: number) {
    this.sun.color.setHex(color)
    this.sun.intensity = intensity
  }

  /** Keep the shadow frustum centered on the player for crisp shadows. */
  focusShadow(target: THREE.Vector3) {
    this.sun.position.set(target.x + 20, target.y + 30, target.z + 12)
    this.sun.target.position.copy(target)
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.postProcessing.resize(window.innerWidth, window.innerHeight)
  }

  render() {
    if (this.usePostProcessing) {
      this.postProcessing.render()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }

  dispose() {
    window.removeEventListener("resize", this.resizeHandler)
    this.renderer.dispose()
  }
}
