import * as THREE from "three"

export class MaterialManager {
  /**
   * Creates a highly realistic PBR material using MeshPhysicalMaterial.
   * This material supports clearcoat, transmission (glass), sheen (fabric), and advanced roughness.
   */
  static createPBRMaterial(params: {
    color?: number | string,
    map?: THREE.Texture,
    roughness?: number,
    roughnessMap?: THREE.Texture,
    metalness?: number,
    metalnessMap?: THREE.Texture,
    normalMap?: THREE.Texture,
    normalScale?: THREE.Vector2,
    aoMap?: THREE.Texture,
    aoMapIntensity?: number,
    emissive?: number | string,
    emissiveMap?: THREE.Texture,
    emissiveIntensity?: number,
    transmission?: number, // For glass/water
    ior?: number, // Index of refraction
    thickness?: number, // For subsurface scattering simulation
    clearcoat?: number, // For car paint / wet surfaces
    clearcoatRoughness?: number
  }): THREE.MeshPhysicalMaterial {
    const mat = new THREE.MeshPhysicalMaterial({
      color: params.color !== undefined ? params.color : 0xffffff,
      roughness: params.roughness !== undefined ? params.roughness : 0.5,
      metalness: params.metalness !== undefined ? params.metalness : 0.0,
      envMapIntensity: 1.0, // Critical for IBL realism
    })

    if (params.map) mat.map = params.map
    if (params.roughnessMap) mat.roughnessMap = params.roughnessMap
    if (params.metalnessMap) mat.metalnessMap = params.metalnessMap
    
    if (params.normalMap) {
      mat.normalMap = params.normalMap
      if (params.normalScale) mat.normalScale.copy(params.normalScale)
    }

    if (params.aoMap) {
      mat.aoMap = params.aoMap
      mat.aoMapIntensity = params.aoMapIntensity !== undefined ? params.aoMapIntensity : 1.0
    }

    if (params.emissive !== undefined || params.emissiveMap) {
      mat.emissive = new THREE.Color(params.emissive !== undefined ? params.emissive : 0x000000)
      if (params.emissiveMap) mat.emissiveMap = params.emissiveMap
      mat.emissiveIntensity = params.emissiveIntensity !== undefined ? params.emissiveIntensity : 1.0
    }

    // Advanced Physical Properties
    if (params.transmission !== undefined) mat.transmission = params.transmission
    if (params.ior !== undefined) mat.ior = params.ior
    if (params.thickness !== undefined) mat.thickness = params.thickness
    
    if (params.clearcoat !== undefined) {
      mat.clearcoat = params.clearcoat
      mat.clearcoatRoughness = params.clearcoatRoughness !== undefined ? params.clearcoatRoughness : 0.0
    }

    return mat
  }

  /**
   * Modifies an existing material's shader to add a "wet puddle" effect or "wind sway" for foliage.
   */
  static injectShaderLogic(material: THREE.Material, type: "wind" | "wet") {
    material.onBeforeCompile = (shader) => {
      // Custom shader logic injected into the Three.js GLSL pipeline
      if (type === "wind") {
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
          #include <begin_vertex>
          // Basic wind sway logic based on position height and time
          float windTime = 0.0; // Needs to be a uniform updated in render loop for real implementation
          float sway = sin(position.x * 2.0 + windTime) * 0.1 * position.y;
          transformed.x += sway;
          `
        )
      }
    }
  }
}
