import * as THREE from "three"

export class OptimizationManager {
  /**
   * Creates an InstancedMesh from a base geometry and material, placing instances at given positions/rotations.
   * Crucial for dense environments (forests, cities, clutter) in AAA games.
   */
  static createInstancedMesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material | THREE.Material[],
    transforms: { position: THREE.Vector3, rotation?: THREE.Euler, scale?: THREE.Vector3 }[],
    castShadow = true,
    receiveShadow = true
  ): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geometry, material, transforms.length)
    mesh.castShadow = castShadow
    mesh.receiveShadow = receiveShadow

    const dummy = new THREE.Object3D()

    for (let i = 0; i < transforms.length; i++) {
      dummy.position.copy(transforms[i].position)
      
      const rot = transforms[i].rotation
      if (rot) dummy.rotation.copy(rot)
      
      const scl = transforms[i].scale
      if (scl) dummy.scale.copy(scl)
      else dummy.scale.set(1, 1, 1)

      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
    return mesh
  }

  /**
   * Creates a Level of Detail (LOD) object.
   * Provide meshes sorted by detail (high to low) and distances at which they should appear.
   */
  static createLOD(levels: { mesh: THREE.Mesh, distance: number }[]): THREE.LOD {
    const lod = new THREE.LOD()
    
    for (const level of levels) {
      lod.addLevel(level.mesh, level.distance)
    }
    
    return lod
  }
}
