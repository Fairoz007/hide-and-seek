// Turns a deterministic GeneratedMap into renderable Three.js geometry. Uses
// instanced meshes grouped by prop kind for GPU efficiency, builds the floor +
// walls, and exposes Box3 colliders for the camera.

import * as THREE from "three"
import type { GeneratedMap, MapProp, PropKind } from "@shared/mapgen"
import { FoliageSystem } from "../engine/FoliageSystem"

export class MapBuilder {
  readonly group = new THREE.Group()
  readonly cameraColliders: THREE.Box3[] = []
  private disposables: Array<{ dispose: () => void }> = []
  private foliageSystem: FoliageSystem

  constructor(foliageSystem: FoliageSystem) {
    this.foliageSystem = foliageSystem
  }

  build(map: GeneratedMap): THREE.Group {
    this.buildFloor(map)
    this.buildProps(map)
    
    // Add lush foliage for AAA look
    const bounds = map.half * 2
    this.foliageSystem.generateGrassField(bounds, 5000)
    // Only generate trees if it's a large outdoorsy map (we assume this for placeholder)
    if (map.floorColor === 0x3d5c3a) {
      this.foliageSystem.generateForest(bounds, 150)
    }

    return this.group
  }

  private generateTerrainTexture(baseColorHex: number): THREE.CanvasTexture {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Base color
    ctx.fillStyle = '#' + baseColorHex.toString(16).padStart(6, '0')
    ctx.fillRect(0, 0, 512, 512)
    
    // Generate simple noise
    const imgData = ctx.getImageData(0, 0, 512, 512)
    const data = imgData.data
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 40
      data[i] = Math.max(0, Math.min(255, data[i] + noise))
      data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise))
      data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise))
    }
    ctx.putImageData(imgData, 0, 0)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(16, 16)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  private buildFloor(map: GeneratedMap) {
    const size = map.half * 2
    
    // Create a terrain with more geometry for displacement/bump in PBR
    const geo = new THREE.PlaneGeometry(size, size, 128, 128)
    
    // Rough procedural bump for terrain
    // Rough procedural bump for terrain: rolling hills
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      // Compound noise for realistic rolling hills and uneven ground
      let z = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 4.0 + 
              Math.sin(x * 0.15) * Math.cos(y * 0.15) * 1.5 +
              Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.2
      // Flatten the center area slightly for gameplay
      const distToCenter = Math.hypot(x, y)
      if (distToCenter < 20) {
        z *= distToCenter / 20
      }
      pos.setZ(i, z)
    }
    geo.computeVertexNormals()

    const terrainTex = this.generateTerrainTexture(map.floorColor)

    const mat = new THREE.MeshStandardMaterial({ 
      map: terrainTex,
      roughness: 0.95,
      metalness: 0.02
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

  private mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
    const merged = new THREE.BufferGeometry()
    let positionCount = 0
    let normalCount = 0
    let indexCount = 0
    let uvCount = 0
    
    geometries.forEach(g => {
      positionCount += g.attributes.position.array.length
      if (g.attributes.normal) normalCount += g.attributes.normal.array.length
      if (g.attributes.uv) uvCount += g.attributes.uv.array.length
      if (g.getIndex()) indexCount += g.getIndex()!.array.length
    })

    const positions = new Float32Array(positionCount)
    const normals = new Float32Array(normalCount)
    const uvs = new Float32Array(uvCount)
    const indices = []

    let pOffset = 0, nOffset = 0, uOffset = 0, iOffset = 0, vOffset = 0
    
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
    merged.setIndex(indices)
    return merged
  }

  private generateBuildingGeo(): THREE.BufferGeometry {
    // Wall Base
    const wallGeo = new THREE.BoxGeometry(2, 2, 2)
    
    // Sloped Roof
    const roofGeo = new THREE.ConeGeometry(1.6, 1.2, 4)
    roofGeo.rotateY(Math.PI / 4)
    roofGeo.translate(0, 1.6, 0)
    
    // Door
    const doorGeo = new THREE.BoxGeometry(0.5, 1, 0.1)
    doorGeo.translate(0, -0.5, 1.0)
    
    // Window
    const winGeo = new THREE.BoxGeometry(0.6, 0.6, 0.1)
    winGeo.translate(0.5, 0.2, 1.0)
    const winGeo2 = winGeo.clone()
    winGeo2.translate(-1.0, 0, 0)
    
    return this.mergeGeometries([wallGeo, roofGeo, doorGeo, winGeo, winGeo2])
  }

  private buildProps(map: GeneratedMap) {
    const byKind = new Map<PropKind, MapProp[]>()
    for (const p of map.props) {
      const arr = byKind.get(p.kind) ?? []
      arr.push(p)
      byKind.set(p.kind, arr)
    }

    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    for (const [kind, props] of byKind) {
      const geo = this.geometryFor(kind)
      const mat = new THREE.MeshStandardMaterial({ 
        roughness: 0.7, 
        metalness: 0.1 
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
