// Turns a deterministic GeneratedMap into renderable Three.js geometry. Uses
// instanced meshes grouped by prop kind for GPU efficiency, builds the floor +
// walls, and exposes Box3 colliders for the camera.

import * as THREE from "three"
import type { GeneratedMap, MapProp, PropKind } from "@shared/mapgen"
import { FoliageSystem } from "../engine/FoliageSystem"
import { AssetManager } from "../engine/AssetManager"

export class MapBuilder {
  readonly group = new THREE.Group()
  readonly cameraColliders: THREE.Box3[] = []
  private disposables: Array<{ dispose: () => void }> = []
  private foliageSystem: FoliageSystem

  constructor(foliageSystem: FoliageSystem) {
    this.foliageSystem = foliageSystem
  }

  async build(map: GeneratedMap): Promise<THREE.Group> {
    this.buildFloor(map)
    await this.buildProps(map)
    
    // Add lush foliage for AAA look
    const bounds = map.half * 2
    await this.foliageSystem.generateGrassField(bounds, 5000)
    // Only generate trees if it's a large outdoorsy map (we assume this for placeholder)
    if (map.floorColor === 0x3d5c3a) {
      await this.foliageSystem.generateForest(bounds, 150)
    }

    return this.group
  }

  private generateTerrainTexture(baseColorHex: number): THREE.CanvasTexture {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    
    // Base grass color
    ctx.fillStyle = '#' + baseColorHex.toString(16).padStart(6, '0')
    ctx.fillRect(0, 0, 1024, 1024)
    
    // Generate complex noise for dirt patches and grass variations
    const imgData = ctx.getImageData(0, 0, 1024, 1024)
    const data = imgData.data
    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % 1024
      const y = Math.floor((i / 4) / 1024)
      
      // Layered noise
      const n1 = (Math.sin(x * 0.02) + Math.cos(y * 0.02)) * 20
      const n2 = (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 10
      const noise = n1 + n2 + (Math.random() - 0.5) * 15
      
      // Dirt patches threshold
      if (n1 > 25) {
        // Dirt color
        data[i] = 80 + Math.random() * 20
        data[i+1] = 60 + Math.random() * 20
        data[i+2] = 40 + Math.random() * 10
      } else {
        // Modulate grass
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise))
        data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise))
      }
    }
    ctx.putImageData(imgData, 0, 0)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(32, 32)
    texture.colorSpace = THREE.SRGBColorSpace
    
    // Set anisotropy for sharper distant textures
    texture.anisotropy = 16
    return texture
  }

  private buildFloor(map: GeneratedMap) {
    const size = map.half * 2
    
    // High-res terrain geometry for displacement/bump in PBR
    const geo = new THREE.PlaneGeometry(size, size, 256, 256)
    
    // Complex procedural bump for terrain: rolling hills, divots, flat areas
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      
      // Macro shapes (Hills)
      let z = Math.sin(x * 0.03) * Math.cos(y * 0.03) * 5.0 + 
              Math.sin(x * 0.08) * Math.cos(y * 0.08) * 2.0
              
      // Micro shapes (Bumps & Divots)
      z += (Math.sin(x * 0.8) * Math.cos(y * 0.8)) * 0.3
      z += (Math.random() - 0.5) * 0.1

      // Flatten the center area slightly for gameplay
      const distToCenter = Math.hypot(x, y)
      if (distToCenter < 30) {
        const flattenFactor = Math.max(0, distToCenter / 30)
        z *= flattenFactor
      }
      pos.setZ(i, z)
    }
    geo.computeVertexNormals()

    const terrainTex = this.generateTerrainTexture(map.floorColor)

    const mat = new THREE.MeshStandardMaterial({ 
      map: terrainTex,
      roughness: 0.85,
      metalness: 0.05,
      bumpMap: terrainTex,
      bumpScale: 0.05
    })
    
    const floor = new THREE.Mesh(geo, mat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    this.group.add(floor)
    
    this.disposables.push(geo, mat)
    this.disposables.push(terrainTex as unknown as { dispose: () => void })
  }

  private geometryFor(kind: PropKind): THREE.BufferGeometry {
    switch (kind) {
      case "cylinder":
        return new THREE.CylinderGeometry(1, 1, 2, 32)
      case "plant":
        return new THREE.ConeGeometry(1, 2, 16)
      case "tree":
        // Fallback procedural tree for MapProp trees (distinct from FoliageSystem forest)
        const g1 = new THREE.ConeGeometry(1.4, 2, 12)
        g1.translate(0, 1, 0)
        const g2 = new THREE.ConeGeometry(1.1, 1.8, 12)
        g2.translate(0, 2.2, 0)
        const g3 = new THREE.ConeGeometry(0.8, 1.5, 12)
        g3.translate(0, 3.2, 0)
        return this.mergeGeometries([g1, g2, g3])
      default:
        // Procedural AAA Building Geometry instead of a simple cube
        return this.generateBuildingGeo()
    }
  }

  private colorizeGeometry(geo: THREE.BufferGeometry, colorHex: number) {
    const count = geo.attributes.position.count
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color(colorHex)
    for (let i = 0; i < count; i++) {
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }

  private mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
    const merged = new THREE.BufferGeometry()
    let positionCount = 0
    let normalCount = 0
    let indexCount = 0
    let uvCount = 0
    let colorCount = 0
    
    geometries.forEach(g => {
      positionCount += g.attributes.position.array.length
      if (g.attributes.normal) normalCount += g.attributes.normal.array.length
      if (g.attributes.uv) uvCount += g.attributes.uv.array.length
      if (g.attributes.color) colorCount += g.attributes.color.array.length
      if (g.getIndex()) indexCount += g.getIndex()!.array.length
    })

    const positions = new Float32Array(positionCount)
    const normals = new Float32Array(normalCount)
    const uvs = new Float32Array(uvCount)
    const colors = new Float32Array(colorCount)
    const indices = []

    let pOffset = 0, nOffset = 0, uOffset = 0, cOffset = 0, vOffset = 0
    
    for (const g of geometries) {
      positions.set(g.attributes.position.array, pOffset)
      pOffset += g.attributes.position.array.length
      
      if (g.attributes.normal) {
        normals.set(g.attributes.normal.array, nOffset)
        nOffset += g.attributes.normal.array.length
      }
      
      if (g.attributes.uv) {
        uvs.set(g.attributes.uv.array, uOffset)
        uOffset += g.attributes.uv.array.length
      }

      if (g.attributes.color) {
        colors.set(g.attributes.color.array, cOffset)
        cOffset += g.attributes.color.array.length
      }
      
      const idx = g.getIndex()
      if (idx) {
        for (let i = 0; i < idx.array.length; i++) {
          indices.push(idx.array[i] + vOffset)
        }
      }
      vOffset += g.attributes.position.count
    }

    merged.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    if (normalCount > 0) merged.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
    if (uvCount > 0) merged.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    if (colorCount > 0) merged.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    merged.setIndex(indices)
    return merged
  }

  private generateBuildingGeo(): THREE.BufferGeometry {
    const parts: THREE.BufferGeometry[] = []
    
    // Wall Base (Stone/Plaster)
    const wallGeo = new THREE.BoxGeometry(2.2, 2.4, 2.2)
    this.colorizeGeometry(wallGeo, 0xe0d6c8)
    wallGeo.translate(0, 0.2, 0)
    parts.push(wallGeo)
    
    // Sloped Roof (Dark Shingles)
    const roofGeo = new THREE.ConeGeometry(2.0, 1.5, 4)
    roofGeo.rotateY(Math.PI / 4)
    roofGeo.translate(0, 2.1, 0)
    this.colorizeGeometry(roofGeo, 0x4a3d35)
    parts.push(roofGeo)
    
    // Side Wing
    const wingGeo = new THREE.BoxGeometry(1.2, 1.8, 1.5)
    wingGeo.translate(1.2, -0.1, 0)
    this.colorizeGeometry(wingGeo, 0xe0d6c8)
    parts.push(wingGeo)
    
    // Wing Roof
    const wingRoof = new THREE.ConeGeometry(1.2, 1.0, 4)
    wingRoof.rotateY(Math.PI / 4)
    wingRoof.translate(1.2, 1.3, 0)
    this.colorizeGeometry(wingRoof, 0x4a3d35)
    parts.push(wingRoof)

    // Chimney (Brick)
    const chimney = new THREE.BoxGeometry(0.4, 1.8, 0.4)
    chimney.translate(-0.8, 2.0, -0.2)
    this.colorizeGeometry(chimney, 0x8a4b3c)
    parts.push(chimney)
    
    // Wooden Beams (Timber framing)
    const beam1 = new THREE.BoxGeometry(2.3, 0.1, 0.1)
    beam1.translate(0, 1.4, 1.1)
    this.colorizeGeometry(beam1, 0x3d2817)
    parts.push(beam1)
    
    const beam2 = new THREE.BoxGeometry(2.3, 0.1, 0.1)
    beam2.translate(0, 0.4, 1.1)
    this.colorizeGeometry(beam2, 0x3d2817)
    parts.push(beam2)
    
    // Door (Dark Wood)
    const doorGeo = new THREE.BoxGeometry(0.6, 1.2, 0.1)
    doorGeo.translate(0, -0.4, 1.1)
    this.colorizeGeometry(doorGeo, 0x2a1a0f)
    parts.push(doorGeo)
    
    // Windows (Glowing / Glass)
    const winGeo = new THREE.BoxGeometry(0.5, 0.7, 0.1)
    winGeo.translate(0.6, 0.5, 1.1)
    this.colorizeGeometry(winGeo, 0x88ccff)
    parts.push(winGeo)
    
    const winGeo2 = winGeo.clone()
    winGeo2.translate(-1.2, 0, 0)
    parts.push(winGeo2)
    
    return this.mergeGeometries(parts)
  }

  private async buildProps(map: GeneratedMap) {
    const byKind = new Map<PropKind, MapProp[]>()
    for (const p of map.props) {
      const arr = byKind.get(p.kind) ?? []
      arr.push(p)
      byKind.set(p.kind, arr)
    }

    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    const assets = AssetManager.getInstance()

    for (const [kind, props] of byKind) {
      let geo: THREE.BufferGeometry | null = null
      let isLoadedAsset = false

      // Try loading external asset
      if (kind === "box") {
        const model = await assets.loadModel("/assets/building.glb")
        if (model) {
          geo = assets.extractGeometry(model)
          if (geo) isLoadedAsset = true
        }
      } else {
        const model = await assets.loadModel(`/assets/prop_${kind}.glb`)
        if (model) {
          geo = assets.extractGeometry(model)
          if (geo) isLoadedAsset = true
        }
      }

      // Fallback to procedural
      if (!geo) {
        geo = this.geometryFor(kind)
        if (kind !== "box" && !geo.attributes.color) {
          this.colorizeGeometry(geo, 0xffffff)
        }
      }

      const mat = new THREE.MeshStandardMaterial({ 
        roughness: 0.8, 
        metalness: 0.1,
        vertexColors: !isLoadedAsset // Only use vertex colors for procedural
      })
      
      const inst = new THREE.InstancedMesh(geo, mat, props.length)
      inst.castShadow = true
      inst.receiveShadow = true
      inst.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(props.length * 3), 3)

      props.forEach((p, i) => {
        dummy.position.set(p.position.x, p.position.y, p.position.z)
        dummy.rotation.set(0, p.rotationY, 0)
        dummy.scale.set(p.size.x, p.size.y, p.size.z)
        dummy.updateMatrix()
        inst.setMatrixAt(i, dummy.matrix)
        color.setHex(p.color)
        inst.setColorAt(i, color)

        if (p.size.y > 0.6) {
          this.cameraColliders.push(
            new THREE.Box3(
              new THREE.Vector3(p.position.x - p.size.x, 0, p.position.z - p.size.z),
              new THREE.Vector3(p.position.x + p.size.x, p.position.y * 2, p.position.z + p.size.z),
            ),
          )
        }
      })
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      inst.frustumCulled = true
      this.group.add(inst)
      this.disposables.push(geo, mat)
    }
  }

  dispose() {
    this.group.clear()
    for (const d of this.disposables) d.dispose()
    this.disposables = []
    this.cameraColliders.length = 0
  }
}
