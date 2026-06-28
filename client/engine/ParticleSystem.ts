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

  constructor(scene: THREE.Scene, count: number, type: "rain" | "dust") {
    this.count = count

    // Geometry and Material based on type
    const geometry = type === "rain" 
      ? new THREE.CylinderGeometry(0.01, 0.01, 0.5, 3) 
      : new THREE.PlaneGeometry(0.05, 0.05)
      
    const material = type === "rain"
      ? new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 })
      : new THREE.MeshBasicMaterial({ color: 0xffccaa, transparent: true, opacity: 0.2 })

    this.mesh = new THREE.InstancedMesh(geometry, material, count)
    
    // Initialize positions and velocities
    for (let i = 0; i < count; i++) {
      this.dummy.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 20,
        (Math.random() - 0.5) * 50
      )
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)
      
      if (type === "rain") {
        this.velocities.push(new THREE.Vector3(0, -20 - Math.random() * 10, 0)) // Fall fast
      } else {
        this.velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5)) // Drift slowly
      }
    }

    this.mesh.instanceMatrix.needsUpdate = true
    scene.add(this.mesh)
  }

  update(dt: number) {
    for (let i = 0; i < this.count; i++) {
      this.mesh.getMatrixAt(i, this.dummy.matrix)
      this.dummy.position.setFromMatrixPosition(this.dummy.matrix)
      
      this.dummy.position.addScaledVector(this.velocities[i], dt)
      
      // Reset if out of bounds (looping)
      if (this.dummy.position.y < -5) {
        this.dummy.position.y = 20
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
