import * as THREE from "three"
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"
import { EXRLoader } from "three/addons/loaders/EXRLoader.js"

export class EnvironmentManager {
  private scene: THREE.Scene
  private renderer: THREE.WebGLRenderer
  private pmremGenerator: THREE.PMREMGenerator
  
  public currentFog: THREE.FogExp2 | null = null

  constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    this.scene = scene
    this.renderer = renderer
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    this.pmremGenerator.compileEquirectangularShader()
  }

  /**
   * Loads an HDRI (HDR or EXR) and applies it to the scene background and environment for IBL.
   */
  async loadHDRI(url: string, isEXR = false): Promise<void> {
    const loader = isEXR ? new EXRLoader() : new RGBELoader()
    loader.setDataType(THREE.HalfFloatType)

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (texture) => {
          const envMap = this.pmremGenerator.fromEquirectangular(texture).texture
          this.scene.environment = envMap
          this.scene.background = envMap
          
          texture.dispose() // PMREM generator created a new texture
          resolve()
        },
        undefined,
        (err) => reject(err)
      )
    })
  }

  /**
   * Sets up cinematic volumetric fog approximation.
   */
  setCinematicFog(colorHex: number, density: number) {
    if (!this.currentFog) {
      this.currentFog = new THREE.FogExp2(colorHex, density)
      this.scene.fog = this.currentFog
    } else {
      this.currentFog.color.setHex(colorHex)
      this.currentFog.density = density
    }
    
    // In a AAA engine, fog color should blend with the background color for realism
    this.scene.background = new THREE.Color(colorHex)
  }

  /**
   * Generates a procedural sky environment map using PMREM if no HDRI is available.
   * Useful for development or lightweight maps.
   */
  generateProceduralEnvironment() {
    this.scene.environment = this.pmremGenerator.fromScene(new THREE.Scene()).texture
  }
}
