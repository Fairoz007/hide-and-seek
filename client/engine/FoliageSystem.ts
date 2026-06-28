import * as THREE from "three"
import { OptimizationManager } from "./OptimizationManager"

export class FoliageSystem {
  public windMaterials: THREE.Material[] = []
  
  constructor(private scene: THREE.Scene) {}

  /**
   * Generates a dense field of instanced grass.
   */
  public generateGrassField(bounds: number, density: number): THREE.InstancedMesh {
    // A simple blade of grass geometry
    const grassGeo = new THREE.ConeGeometry(0.1, 1.0, 3)
    grassGeo.translate(0, 0.5, 0) // Pivot at bottom

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x4a7c59,
      roughness: 1.0,
      side: THREE.DoubleSide
    })
    
    this.addWindShader(grassMat, 3.0, 0.15)

    const instances = []
    for (let i = 0; i < density; i++) {
      const x = (Math.random() - 0.5) * bounds
      const z = (Math.random() - 0.5) * bounds
      
      // Slight random scale and rotation for natural look
      const scaleY = 0.5 + Math.random() * 0.8
      const rotY = Math.random() * Math.PI * 2
      
      instances.push({
        position: new THREE.Vector3(x, 0, z),
        rotation: new THREE.Euler(0, rotY, 0),
        scale: new THREE.Vector3(1, scaleY, 1)
      })
    }

    const mesh = OptimizationManager.createInstancedMesh(grassGeo, grassMat, instances, false, true)
    this.scene.add(mesh)
    return mesh
  }

  /**
   * Generates a dense forest of trees.
   */
  public generateForest(bounds: number, count: number): THREE.Group {
    const group = new THREE.Group()

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.4, 0.6, 3, 8)
    trunkGeo.translate(0, 1.5, 0)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3b32, roughness: 0.9 })

    // Leaves (Stylized fluffy canopy)
    const leavesGeo = new THREE.SphereGeometry(2.5, 12, 12)
    leavesGeo.translate(0, 4, 0)
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.8 })
    
    this.addWindShader(leavesMat, 1.5, 0.05)

    const trunkInstances = []
    const leavesInstances = []

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * bounds
      const z = (Math.random() - 0.5) * bounds
      
      const scale = 0.8 + Math.random() * 0.6
      const rotY = Math.random() * Math.PI * 2
      
      const transform = {
        position: new THREE.Vector3(x, 0, z),
        rotation: new THREE.Euler(0, rotY, 0),
        scale: new THREE.Vector3(scale, scale, scale)
      }
      
      trunkInstances.push(transform)
      leavesInstances.push(transform)
    }

    const trunkMesh = OptimizationManager.createInstancedMesh(trunkGeo, trunkMat, trunkInstances, true, true)
    const leavesMesh = OptimizationManager.createInstancedMesh(leavesGeo, leavesMat, leavesInstances, true, true)

    group.add(trunkMesh)
    group.add(leavesMesh)
    this.scene.add(group)

    return group
  }

  private addWindShader(material: THREE.Material, speed: number, intensity: number) {
    material.userData.time = { value: 0 }
    
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = material.userData.time
      shader.uniforms.uWindSpeed = { value: speed }
      shader.uniforms.uWindIntensity = { value: intensity }

      shader.vertexShader = `
        uniform float uTime;
        uniform float uWindSpeed;
        uniform float uWindIntensity;
        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        // Sway based on world position and vertex height
        vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float sway = sin(uTime * uWindSpeed + worldPos.x * 0.5 + worldPos.z * 0.5) * uWindIntensity;
        transformed.x += sway * position.y;
        transformed.z += sway * position.y * 0.5;
        `
      )
    }
    
    this.windMaterials.push(material)
  }

  public update(dt: number) {
    for (const mat of this.windMaterials) {
      if (mat.userData.time) {
        mat.userData.time.value += dt
      }
    }
  }
}
