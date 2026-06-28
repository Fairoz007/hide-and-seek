// Turns a deterministic GeneratedMap into renderable Three.js geometry. Uses
// instanced meshes grouped by prop kind for GPU efficiency, builds the floor +
// walls, and exposes Box3 colliders for the camera.

import * as THREE from "three"
import type { GeneratedMap, MapProp, PropKind } from "@shared/mapgen"

export class MapBuilder {
  readonly group = new THREE.Group()
  readonly cameraColliders: THREE.Box3[] = []
  private disposables: Array<{ dispose: () => void }> = []

  build(map: GeneratedMap): THREE.Group {
    this.buildFloor(map)
    this.buildProps(map)
    return this.group
  }

  private buildFloor(map: GeneratedMap) {
    const size = map.half * 2
    const geo = new THREE.PlaneGeometry(size, size, 1, 1)
    const mat = new THREE.MeshStandardMaterial({ color: map.floorColor, roughness: 0.95 })
    const floor = new THREE.Mesh(geo, mat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    this.group.add(floor)
    this.disposables.push(geo, mat)
  }

  private geometryFor(kind: PropKind): THREE.BufferGeometry {
    switch (kind) {
      case "cylinder":
        return new THREE.CylinderGeometry(1, 1, 2, 16)
      case "plant":
        return new THREE.ConeGeometry(1, 2, 10)
      default:
        return new THREE.BoxGeometry(2, 2, 2)
    }
  }

  private buildProps(map: GeneratedMap) {
    // Group props by kind so each becomes a single InstancedMesh.
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
      const mat = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0.05 })
      const inst = new THREE.InstancedMesh(geo, mat, props.length)
      inst.castShadow = true
      inst.receiveShadow = true
      inst.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(props.length * 3), 3)

      props.forEach((p, i) => {
        dummy.position.set(p.position.x, p.position.y, p.position.z)
        dummy.rotation.set(0, p.rotationY, 0)
        // BoxGeometry/Cylinder are built at size 2 / radius 1, so scale by half-extent.
        dummy.scale.set(p.size.x, p.size.y, p.size.z)
        dummy.updateMatrix()
        inst.setMatrixAt(i, dummy.matrix)
        color.setHex(p.color)
        inst.setColorAt(i, color)

        // Collider box for camera occlusion (walls + tall props).
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
