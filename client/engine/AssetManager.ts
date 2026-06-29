import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// Optional: If you need DRACO compression in the future, import DRACOLoader

export class AssetManager {
  private static instance: AssetManager
  private loader: GLTFLoader
  private cache = new Map<string, THREE.Object3D>()
  private loading = new Map<string, Promise<THREE.Object3D>>()

  private constructor() {
    this.loader = new GLTFLoader()
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager()
    }
    return AssetManager.instance
  }

  /**
   * Loads a GLTF model and returns a cloned Object3D.
   * If the model fails to load, it resolves with null.
   */
  public async loadModel(url: string): Promise<THREE.Object3D | null> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!.clone()
    }

    if (this.loading.has(url)) {
      const model = await this.loading.get(url)!
      return model.clone()
    }

    const loadPromise = new Promise<THREE.Object3D>((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          const model = gltf.scene
          
          // Pre-process model (e.g. enabling shadows)
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          
          this.cache.set(url, model)
          resolve(model)
        },
        undefined, // onProgress
        (error) => {
          console.warn(`[AssetManager] Failed to load model at ${url}. Make sure the asset exists in the public directory.`, error)
          reject(error)
        }
      )
    })

    this.loading.set(url, loadPromise)
    
    try {
      const model = await loadPromise
      return model.clone()
    } catch (e) {
      return null
    }
  }

  /**
   * Helper to extract the first valid BufferGeometry from a loaded model.
   * Useful for InstancedMesh replacement.
   */
  public extractGeometry(model: THREE.Object3D): THREE.BufferGeometry | null {
    let geo: THREE.BufferGeometry | null = null
    model.traverse((child) => {
      if (!geo && (child as THREE.Mesh).isMesh) {
        geo = (child as THREE.Mesh).geometry
      }
    })
    return geo
  }
}
