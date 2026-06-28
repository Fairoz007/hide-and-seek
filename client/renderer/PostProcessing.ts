import * as THREE from "three"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { SSAOPass } from "three/addons/postprocessing/SSAOPass.js"
import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js"

export class PostProcessing {
  composer: EffectComposer
  renderPass: RenderPass
  bloomPass: UnrealBloomPass
  ssaoPass: SSAOPass
  smaaPass: SMAAPass
  outputPass: OutputPass

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, width: number, height: number) {
    // We use a high-precision render target for HDR accumulation
    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      colorSpace: THREE.LinearSRGBColorSpace,
      samples: renderer.capabilities.isWebGL2 ? 4 : 0 // Multisampled target
    })

    this.composer = new EffectComposer(renderer, renderTarget)

    // 1. Base Render
    this.renderPass = new RenderPass(scene, camera)
    this.composer.addPass(this.renderPass)

    // 2. Screen Space Ambient Occlusion (SSAO) - Tuned for performance
    this.ssaoPass = new SSAOPass(scene, camera, width, height)
    this.ssaoPass.kernelRadius = 1.0 // Reduced radius
    this.ssaoPass.minDistance = 0.005
    this.ssaoPass.maxDistance = 0.05 // Reduced max distance
    this.composer.addPass(this.ssaoPass)

    // 3. Unreal Bloom (HDR Glow)
    const resolution = new THREE.Vector2(width, height)
    this.bloomPass = new UnrealBloomPass(resolution, 1.2, 0.4, 0.85)
    this.bloomPass.threshold = 1.0 // Only bloom very bright pixels (HDR)
    this.bloomPass.strength = 1.2
    this.bloomPass.radius = 0.5
    this.composer.addPass(this.bloomPass)

    // 4. Anti-Aliasing (SMAA)
    this.smaaPass = new SMAAPass(width, height)
    this.composer.addPass(this.smaaPass)

    // 5. Tone Mapping Output
    this.outputPass = new OutputPass()
    this.composer.addPass(this.outputPass)
  }

  resize(width: number, height: number) {
    this.composer.setSize(width, height)
    this.ssaoPass.setSize(width, height)
  }

  render() {
    this.composer.render()
  }
}
