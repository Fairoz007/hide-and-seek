import * as THREE from "three"

/**
 * A highly optimized InstancedMesh-based particle system for AAA effects (dust, rain, snow).
 * Points-based particles are often used, but InstancedMesh allows for shaded geometry (e.g., lit raindrops).
 */
export class ParticleSystem {
  private mesh: THREE.InstancedMesh
  private count: number
  private dummy = new THREE.Object3D()
  
  // Custom arrays to hold velocity/life data for each instance
  private velocities: THREE.Vector3[] = []

  private type: string
  private time = 0

  constructor(scene: THREE.Scene, count: number, type: "rain" | "dust" | "leaves" | "butterflies" | "fireflies") {
    this.count = count
    this.type = type

    let geometry: THREE.BufferGeometry
    let material: THREE.Material

    if (type === "rain") {
      geometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 3)
      material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 })
    } else if (type === "leaves") {
      geometry = new THREE.PlaneGeometry(0.15, 0.15)
      material = new THREE.MeshBasicMaterial({ color: 0xcc8800, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
    } else if (type === "butterflies") {
      geometry = new THREE.PlaneGeometry(0.1, 0.1)
      material = new THREE.MeshBasicMaterial({ color: 0x00aaff, side: THREE.DoubleSide })
    } else if (type === "fireflies") {
      geometry = new THREE.PlaneGeometry(0.05, 0.05)
      material = new THREE.MeshBasicMaterial({ color: 0xaaff00, transparent: true, opacity: 0.8 })
    } else {
      // dust
      geometry = new THREE.PlaneGeometry(0.05, 0.05)
      material = new THREE.MeshBasicMaterial({ color: 0xffccaa, transparent: true, opacity: 0.2 })
    }

    this.mesh = new THREE.InstancedMesh(geometry, material, count)
    
    // Initialize positions and velocities
    for (let i = 0; i < count; i++) {
      this.dummy.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 20,
        (Math.random() - 0.5) * 50
      )
      this.dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)
      
      if (type === "rain") {
        this.velocities.push(new THREE.Vector3(0, -20 - Math.random() * 10, 0)) // Fall fast
      } else if (type === "leaves") {
        this.velocities.push(new THREE.Vector3((Math.random() - 0.5) * 2, -1 - Math.random() * 2, (Math.random() - 0.5) * 2))
      } else if (type === "butterflies") {
        this.velocities.push(new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 1, (Math.random() - 0.5) * 3))
      } else if (type === "fireflies") {
        this.velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5))
      } else {
        this.velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5))
      }
    }

    this.mesh.instanceMatrix.needsUpdate = true
    scene.add(this.mesh)
  }

  update(dt: number) {
    this.time += dt
    for (let i = 0; i < this.count; i++) {
      this.mesh.getMatrixAt(i, this.dummy.matrix)
      this.dummy.position.setFromMatrixPosition(this.dummy.matrix)
      // Extract rotation correctly
      const rotation = new THREE.Euler().setFromRotationMatrix(this.dummy.matrix)
      this.dummy.rotation.copy(rotation)
      
      if (this.type === "leaves") {
        this.dummy.rotation.x += dt * 2
        this.dummy.rotation.y += dt
        this.dummy.position.x += Math.sin(this.time * 2 + i) * dt
      } else if (this.type === "butterflies") {
        this.dummy.position.y += Math.sin(this.time * 4 + i) * dt * 2
        this.dummy.rotation.y += dt * 3
      } else if (this.type === "fireflies" || this.type === "dust") {
        this.dummy.position.x += Math.sin(this.time + i) * dt * 0.5
        this.dummy.position.z += Math.cos(this.time + i) * dt * 0.5
      }

      this.dummy.position.addScaledVector(this.velocities[i], dt)
      
      // Reset if out of bounds (looping)
      if (this.dummy.position.y < -2 || this.dummy.position.y > 25 || Math.abs(this.dummy.position.x) > 30 || Math.abs(this.dummy.position.z) > 30) {
        this.dummy.position.y = this.type === "leaves" || this.type === "rain" ? 20 : Math.random() * 10
        this.dummy.position.x = (Math.random() - 0.5) * 50
        this.dummy.position.z = (Math.random() - 0.5) * 50
      }

      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)
    }
    this.mesh.instanceMatrix.needsUpdate = true
  }

  dispose(scene: THREE.Scene) {
    scene.remove(this.mesh)
    this.mesh.dispose()
    this.mesh.geometry.dispose()
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach(m => m.dispose())
    } else {
      this.mesh.material.dispose()
    }
  }
}
