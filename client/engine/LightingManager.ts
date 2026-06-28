import * as THREE from "three"

export class LightingManager {
  private scene: THREE.Scene
  private dynamicLights: THREE.Light[] = []

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  /**
   * Spawns a physically accurate PointLight (e.g., a light bulb, fire).
   */
  spawnPointLight(position: THREE.Vector3, color: number, intensity: number, distance: number, castShadow = false): THREE.PointLight {
    const light = new THREE.PointLight(color, intensity, distance, 2.0) // Decay of 2.0 for physical accuracy
    light.position.copy(position)
    
    if (castShadow) {
      light.castShadow = true
      light.shadow.bias = -0.001
      light.shadow.mapSize.set(512, 512)
    }

    this.scene.add(light)
    this.dynamicLights.push(light)
    return light
  }

  /**
   * Spawns a cinematic SpotLight (e.g., flashlight, street lamp).
   */
  spawnSpotLight(position: THREE.Vector3, target: THREE.Vector3, color: number, intensity: number, distance: number, angle: number, penumbra: number, castShadow = true): THREE.SpotLight {
    const light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, 2.0)
    light.position.copy(position)
    light.target.position.copy(target)
    
    if (castShadow) {
      light.castShadow = true
      light.shadow.bias = -0.001
      light.shadow.mapSize.set(1024, 1024) // Higher res for directional shadows
    }

    this.scene.add(light)
    this.scene.add(light.target)
    this.dynamicLights.push(light)
    return light
  }

  /**
   * Cleans up all dynamic lights created through the manager.
   */
  disposeDynamicLights() {
    for (const light of this.dynamicLights) {
      this.scene.remove(light)
      if (light instanceof THREE.SpotLight) {
        this.scene.remove(light.target)
      }
      light.dispose()
    }
    this.dynamicLights = []
  }
}
