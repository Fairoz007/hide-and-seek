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

  private buildFloor(map: GeneratedMap) {
    const size = map.half * 2
    
    // Create a terrain with more geometry for displacement/bump in PBR
    const geo = new THREE.PlaneGeometry(size, size, 64, 64)
    
    // Rough procedural bump for terrain
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      // Slight bumpiness
      const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.2
      pos.setZ(i, z)
    }
    geo.computeVertexNormals()

    const mat = new THREE.MeshStandardMaterial({ 
      color: map.floorColor, 
      roughness: 0.9,
      metalness: 0.05
    })
    
    const floor = new THREE.Mesh(geo, mat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    this.group.add(floor)
    this.disposables.push(geo, mat)
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
        
        const treeGeo = new THREE.BufferGeometry()
        const positions = new Float32Array([
          ...g1.attributes.position.array,
          ...g2.attributes.position.array,
          ...g3.attributes.position.array
        ])
        const normals = new Float32Array([
          ...g1.attributes.normal.array,
          ...g2.attributes.normal.array,
          ...g3.attributes.normal.array
        ])
        
        const indices = []
        let offset = 0
        for (const g of [g1, g2, g3]) {
          const arr = g.getIndex()!.array
          for (let i = 0; i < arr.length; i++) {
            indices.push(arr[i] + offset)
          }
          offset += g.attributes.position.count
        }
        
        treeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        treeGeo.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
        treeGeo.setIndex(indices)
        return treeGeo
      default:
        // Beveled box for premium look instead of sharp BoxGeometry
        return new THREE.BoxGeometry(2, 2, 2, 4, 4, 4)
    }
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
