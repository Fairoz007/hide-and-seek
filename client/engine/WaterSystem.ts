import * as THREE from "three"
import { Water } from "three/addons/objects/Water.js"

export class WaterSystem {
  public water: Water

  constructor(scene: THREE.Scene, sunLight: THREE.DirectionalLight, bounds: number = 1000) {
    const waterGeometry = new THREE.PlaneGeometry(bounds, bounds, 128, 128)

    this.water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', // Placeholder normal map, in a real game we load a high-res normal texture
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    })

    this.water.rotation.x = -Math.PI / 2
    this.water.position.y = -0.5 // Slightly below floor level for puddles/lakes

    // Use the directional light for reflections/specular highlights
    this.water.material.uniforms['sunDirection'].value.copy(sunLight.position).normalize()

    scene.add(this.water)
  }

  update(dt: number) {
    // Animate water waves
    this.water.material.uniforms['time'].value += dt * 0.5
  }
}
