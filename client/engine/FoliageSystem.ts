import * as THREE from "three"
import { OptimizationManager } from "./OptimizationManager"
import { AssetManager } from "./AssetManager"

export class FoliageSystem {
  public windMaterials: THREE.Material[] = []
  
  constructor(private scene: THREE.Scene) {}

  /**
   * Generates a dense field of instanced grass.
   */
  public async generateGrassField(bounds: number, density: number): Promise<THREE.InstancedMesh> {
    const assets = AssetManager.getInstance()
    const model = await assets.loadModel("/assets/grass.glb")
    
    let mergedGeo: THREE.BufferGeometry
    if (model) {
      mergedGeo = assets.extractGeometry(model) || new THREE.PlaneGeometry(0.8, 1.2)
    } else {
      // Fallback Procedural Grass
      const grassGeo = new THREE.PlaneGeometry(0.8, 1.2, 2, 4)
      grassGeo.translate(0, 0.6, 0)
    
    // Create cross planes
    const geo2 = grassGeo.clone()
    geo2.rotateY(Math.PI / 2)
    
    const geo3 = grassGeo.clone()
    geo3.rotateY(Math.PI / 4)
    
    const geo4 = grassGeo.clone()
    geo4.rotateY(-Math.PI / 4)
    
    // Merge planes
    const mergedGeo = new THREE.BufferGeometry()
    const positions = new Float32Array([
      ...grassGeo.attributes.position.array,
      ...geo2.attributes.position.array,
      ...geo3.attributes.position.array,
      ...geo4.attributes.position.array
    ])
    const uvs = new Float32Array([
      ...grassGeo.attributes.uv.array,
      ...geo2.attributes.uv.array,
      ...geo3.attributes.uv.array,
      ...geo4.attributes.uv.array
    ])
    
    const indices = []
    let offset = 0
    for (const g of [grassGeo, geo2, geo3, geo4]) {
      const arr = g.getIndex()!.array
      for (let i = 0; i < arr.length; i++) {
        indices.push(arr[i] + offset)
      }
      offset += g.attributes.position.count
    }
    
    mergedGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      mergedGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
      mergedGeo.setIndex(indices)
      mergedGeo.computeVertexNormals()
    }

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x4a7c59,
      roughness: 0.8,
      side: THREE.DoubleSide,
      alphaTest: 0.1
    })
    
    // Apply wind and gradient shader
    this.addWindShader(grassMat, 3.0, 0.15, true)

    const instances = []
    for (let i = 0; i < density; i++) {
      const x = (Math.random() - 0.5) * bounds
      const z = (Math.random() - 0.5) * bounds
      
      const scaleY = 0.5 + Math.random() * 0.8
      const rotY = Math.random() * Math.PI * 2
      
      instances.push({
        position: new THREE.Vector3(x, 0, z),
        rotation: new THREE.Euler(0, rotY, 0),
        scale: new THREE.Vector3(1, scaleY, 1)
      })
    }

    // Grass casts shadows, but DOES NOT receive them (massive performance save)
    const mesh = OptimizationManager.createInstancedMesh(mergedGeo, grassMat, instances, true, false)
    this.scene.add(mesh)
    return mesh
  }

  public async generateForest(bounds: number, count: number): Promise<THREE.Group> {
    const group = new THREE.Group()
    const assets = AssetManager.getInstance()
    const loadedTree = await assets.loadModel("/assets/tree.glb")

    let trunkGeo: THREE.BufferGeometry
    let leavesGeo: THREE.BufferGeometry
    
    if (loadedTree) {
       // We assume the asset tree has one mesh or we just extract the first one for instancing.
       // In a real AAA pipeline, the tree asset would be split into trunk/leaves for instancing, 
       // but for this fallback we'll extract the first geometry as trunk and skip leaves to avoid breaking.
       trunkGeo = assets.extractGeometry(loadedTree) || new THREE.CylinderGeometry(0.5, 0.7)
       leavesGeo = new THREE.BufferGeometry() // Empty so it doesn't render procedurally
    } else {
      trunkGeo = new THREE.CylinderGeometry(0.5, 0.7, 4, 12)
      trunkGeo.translate(0, 2, 0)
    }
    
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.95, bumpScale: 0.1 })

    // Procedural Pine Leaves (Layered Cones)
    if (!loadedTree) {
      const pineGeo1 = new THREE.ConeGeometry(3, 4, 12)
    pineGeo1.translate(0, 4, 0)
    const pineGeo2 = new THREE.ConeGeometry(2.5, 3.5, 12)
    pineGeo2.translate(0, 6, 0)
    const pineGeo3 = new THREE.ConeGeometry(1.8, 3, 12)
    pineGeo3.translate(0, 8, 0)
    
    // Merge pine layers manually (basic merge for instancing)
    const leavesGeo = new THREE.BufferGeometry()
    const p1 = pineGeo1.attributes.position.array
    const p2 = pineGeo2.attributes.position.array
    const p3 = pineGeo3.attributes.position.array
    const combinedPositions = new Float32Array([...p1, ...p2, ...p3])
    leavesGeo.setAttribute('position', new THREE.BufferAttribute(combinedPositions, 3))
    
    // Combine normals
    const n1 = pineGeo1.attributes.normal.array
    const n2 = pineGeo2.attributes.normal.array
    const n3 = pineGeo3.attributes.normal.array
    const combinedNormals = new Float32Array([...n1, ...n2, ...n3])
    leavesGeo.setAttribute('normal', new THREE.BufferAttribute(combinedNormals, 3))
    
    // Combine indices
    const indices = []
    let offset = 0
    for (const g of [pineGeo1, pineGeo2, pineGeo3]) {
      const idx = g.getIndex()!.array
      for (let i = 0; i < idx.length; i++) {
        indices.push(idx[i] + offset)
      }
      offset += g.attributes.position.count
    }
    leavesGeo.setIndex(indices)
    } // End of !loadedTree block
    
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x1f3d23, roughness: 0.9 })
    
    this.addWindShader(leavesMat, 1.2, 0.1, false)

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
    group.add(trunkMesh)

    if (!loadedTree) {
      const leavesMesh = OptimizationManager.createInstancedMesh(leavesGeo, leavesMat, leavesInstances, true, true)
      group.add(leavesMesh)
    }
    
    // AAA Detail: Add fallen leaves and small rocks around trees
    const leafGeo = new THREE.PlaneGeometry(0.3, 0.3)
    leafGeo.rotateX(-Math.PI / 2)
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 1.0, side: THREE.DoubleSide })
    
    const rockGeo = new THREE.DodecahedronGeometry(0.4, 1)
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.9 })
    
    const detailInstances = []
    const rockInstances = []
    
    for (let i = 0; i < count; i++) {
      const tx = trunkInstances[i].position.x
      const tz = trunkInstances[i].position.z
      
      // 3-5 leaves per tree
      const numLeaves = 3 + Math.floor(Math.random() * 3)
      for (let j = 0; j < numLeaves; j++) {
        const lx = tx + (Math.random() - 0.5) * 4
        const lz = tz + (Math.random() - 0.5) * 4
        detailInstances.push({
          position: new THREE.Vector3(lx, 0.05, lz),
          rotation: new THREE.Euler(0, Math.random() * Math.PI * 2, 0),
          scale: new THREE.Vector3(1, 1, 1)
        })
      }
      
      // 1-2 rocks per tree occasionally
      if (Math.random() > 0.5) {
        const rx = tx + (Math.random() - 0.5) * 3
        const rz = tz + (Math.random() - 0.5) * 3
        const scale = 0.5 + Math.random() * 0.8
        rockInstances.push({
          position: new THREE.Vector3(rx, 0, rz),
          rotation: new THREE.Euler(Math.random(), Math.random(), Math.random()),
          scale: new THREE.Vector3(scale, scale * 0.7, scale)
        })
      }
    }
    
    if (detailInstances.length > 0) {
      const leafMesh = OptimizationManager.createInstancedMesh(leafGeo, leafMat, detailInstances, false, false)
      group.add(leafMesh)
    }
    if (rockInstances.length > 0) {
      const rockMesh = OptimizationManager.createInstancedMesh(rockGeo, rockMat, rockInstances, true, true)
      group.add(rockMesh)
    }

    this.scene.add(group)

    return group
  }

  /**
   * Generates AAA quality bushes and shrubs.
   */
  public async generateBushes(bounds: number, count: number): Promise<THREE.InstancedMesh> {
    const assets = AssetManager.getInstance()
    const model = await assets.loadModel("/assets/bush.glb")
    
    let bushGeo = model ? assets.extractGeometry(model) : null
    if (!bushGeo) bushGeo = new THREE.DodecahedronGeometry(1.2, 1)

    const bushMat = new THREE.MeshStandardMaterial({ color: 0x3a5f2b, roughness: 0.9 })
    
    this.addWindShader(bushMat, 2.0, 0.03, false)
    
    const bushInstances = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * bounds
      const z = (Math.random() - 0.5) * bounds
      const scale = 0.6 + Math.random() * 0.8
      bushInstances.push({
        position: new THREE.Vector3(x, scale * 0.5, z),
        rotation: new THREE.Euler(Math.random(), Math.random(), Math.random()),
        scale: new THREE.Vector3(scale, scale * 0.8, scale)
      })
    }
    
    const bushMesh = OptimizationManager.createInstancedMesh(bushGeo, bushMat, bushInstances, true, true)
    this.scene.add(bushMesh)
    return bushMesh
  }

  /**
   * Generates scattered flowers.
   */
  public async generateFlowers(bounds: number, count: number): Promise<THREE.InstancedMesh> {
    const assets = AssetManager.getInstance()
    const model = await assets.loadModel("/assets/flower.glb")
    
    let mergedGeo: THREE.BufferGeometry
    if (model && assets.extractGeometry(model)) {
       mergedGeo = assets.extractGeometry(model)!
    } else {
      const flowerGeo = new THREE.PlaneGeometry(0.4, 0.4)
      flowerGeo.translate(0, 0.2, 0)
    
    // Cross planes for flowers
    const geo2 = flowerGeo.clone()
    geo2.rotateY(Math.PI / 2)
    const mergedGeo = new THREE.BufferGeometry()
    const positions = new Float32Array([...flowerGeo.attributes.position.array, ...geo2.attributes.position.array])
    const uvs = new Float32Array([...flowerGeo.attributes.uv.array, ...geo2.attributes.uv.array])
    
    const indices = []
    let offset = 0
    for (const g of [flowerGeo, geo2]) {
      const arr = g.getIndex()!.array
      for (let i = 0; i < arr.length; i++) {
        indices.push(arr[i] + offset)
      }
      offset += g.attributes.position.count
    }
    mergedGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      mergedGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
      mergedGeo.setIndex(indices)
      mergedGeo.computeVertexNormals()
    }

    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xff66bb, // Pinkish
      roughness: 0.7,
      side: THREE.DoubleSide
    })
    
    this.addWindShader(flowerMat, 3.5, 0.1, true)
    
    const flowerInstances = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * bounds
      const z = (Math.random() - 0.5) * bounds
      flowerInstances.push({
        position: new THREE.Vector3(x, 0, z),
        rotation: new THREE.Euler(0, Math.random() * Math.PI, 0),
        scale: new THREE.Vector3(1, 1, 1)
      })
    }
    
    const flowerMesh = OptimizationManager.createInstancedMesh(mergedGeo, flowerMat, flowerInstances, false, false)
    this.scene.add(flowerMesh)
    return flowerMesh
  }

  private addWindShader(material: THREE.Material, speed: number, intensity: number, isGrass: boolean) {
    material.userData.time = { value: 0 }
    
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = material.userData.time
      shader.uniforms.uWindSpeed = { value: speed }
      shader.uniforms.uWindIntensity = { value: intensity }

      shader.vertexShader = `
        uniform float uTime;
        uniform float uWindSpeed;
        uniform float uWindIntensity;
        varying float vHeight;
        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float sway = sin(uTime * uWindSpeed + worldPos.x * 0.5 + worldPos.z * 0.5) * uWindIntensity;
        transformed.x += sway * position.y;
        transformed.z += sway * position.y * 0.5;
        vHeight = position.y;
        `
      )

      if (isGrass) {
        // Add color gradient based on local Y height for realistic grass/flowers
        shader.fragmentShader = `
          varying float vHeight;
          ${shader.fragmentShader}
        `.replace(
          'vec4 diffuseColor = vec4( diffuse, opacity );',
          `
          vec3 rootColor = vec3(0.1, 0.2, 0.05); // Dark dirt/green
          vec3 tipColor = diffuse; // Use material color for tips
          vec3 gradColor = mix(rootColor, tipColor, smoothstep(0.0, 1.2, vHeight));
          
          // Multiply standard diffuse with our gradient
          vec4 diffuseColor = vec4( gradColor, opacity );
          
          // Simple transparency mask to make the cross-planes look like blades/petals
          float alpha = 1.0;
          if (vHeight > 0.4) {
             alpha = 1.0 - smoothstep(0.4, 1.5, vHeight);
          }
          diffuseColor.a *= alpha;
          
          // AAA: Discard fully transparent pixels to avoid depth sorting issues
          if (diffuseColor.a < 0.1) discard;
          `
        )
      }
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
