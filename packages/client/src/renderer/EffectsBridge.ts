import * as THREE from "three"

export class EffectsBridge {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.OrthographicCamera
  
  // Track lights for players
  private playerLights: Map<string, THREE.PointLight> = new Map()

  constructor() {
    const canvas = document.getElementById("three-layer") as HTMLCanvasElement
    
    // We make alpha true so Phaser is visible underneath!
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    
    // Important: let pointer events pass through to Phaser
    canvas.style.pointerEvents = "none"

    this.scene = new THREE.Scene()
    
    // Orthographic camera matching our screen resolution
    this.camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 0.1, 1000)
    this.camera.position.z = 100

    this.setupWarehousePreset()
  }

  private setupWarehousePreset() {
    // Dim ambient light
    const ambient = new THREE.AmbientLight(0x202545, 0.5)
    this.scene.add(ambient)

    // Add some random dust particles (simple points)
    const particleGeo = new THREE.BufferGeometry()
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i+=3) {
      positions[i] = Math.random() * 1280 * 2 // spread wide
      positions[i+1] = Math.random() * 720 * 2
      positions[i+2] = Math.random() * 50 - 25
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particleMat = new THREE.PointsMaterial({
      color: 0xffaa55,
      size: 4,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })
    
    const particles = new THREE.Points(particleGeo, particleMat)
    this.scene.add(particles)
  }

  // Called every frame from Phaser update loop
  syncCamera(scrollX: number, scrollY: number, width: number, height: number) {
    this.camera.left = scrollX
    this.camera.right = scrollX + width
    this.camera.top = scrollY
    this.camera.bottom = scrollY + height
    this.camera.updateProjectionMatrix()
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height)
    // The camera projection will be updated in syncCamera next frame
  }

  updatePlayerLight(id: string, x: number, y: number) {
    let light = this.playerLights.get(id)
    if (!light) {
      // Create a warm glowing light around the player
      light = new THREE.PointLight(0xffddaa, 1.5, 400)
      this.scene.add(light)
      this.playerLights.set(id, light)
    }
    // Three.js coordinates match Phaser if we flip Y? 
    // Actually, orthographic camera top/bottom was set up directly so y is same as Phaser
    light.position.set(x, y, 10)
  }
  
  removePlayerLight(id: string) {
    const light = this.playerLights.get(id)
    if (light) {
      this.scene.remove(light)
      this.playerLights.delete(id)
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
