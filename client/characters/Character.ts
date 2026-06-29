// Procedural stylized character built entirely from primitives (no external
// model files). Rounded body, big cartoon eyes, segmented limbs that we animate
// procedurally for walk / run / idle / paint / celebrate. Original design.

import * as THREE from "three"
import { unpackColor } from "@shared/math"
import type { CamoRegions, Pose } from "@shared/types"
import { AssetManager } from "../engine/AssetManager"

export type AnimState = "idle" | "walk" | "run" | "paint" | "celebrate"

export class Character {
  readonly group = new THREE.Group()
  private torsoMat: THREE.MeshStandardMaterial
  private headMat: THREE.MeshStandardMaterial
  private limbMat: THREE.MeshStandardMaterial
  private body: THREE.Mesh
  private head: THREE.Group
  private armL: THREE.Group
  private armR: THREE.Group
  private legL: THREE.Group
  private legR: THREE.Group
  private animTime = 0
  private state: AnimState = "idle"
  private pose: Pose = "stand"
  private targetScaleY = 1
  
  private mixer: THREE.AnimationMixer | null = null
  private externalModel: THREE.Object3D | null = null
  private currentAction: THREE.AnimationAction | null = null
  private proceduralParts: THREE.Object3D[] = []

  constructor() {
    this.torsoMat = mat(0xf5f5f5)
    this.headMat = mat(0xffffff)
    this.limbMat = mat(0xe8e8e8)

    // Rounded torso — a slightly squashed sphere.
    const torsoGeo = new THREE.SphereGeometry(0.45, 64, 64)
    this.body = new THREE.Mesh(torsoGeo, this.torsoMat)
    this.body.scale.set(1, 1.15, 0.9)
    this.body.position.y = 0.6
    this.body.castShadow = true
    this.body.receiveShadow = true
    this.group.add(this.body)

    // Head with cartoon eyes.
    this.head = this.buildHead()
    this.head.position.y = 1.2
    this.group.add(this.head)

    this.armL = this.buildLimb(0.12, 0.5)
    this.armL.position.set(-0.42, 0.85, 0)
    this.group.add(this.armL)
    this.armR = this.buildLimb(0.12, 0.5)
    this.armR.position.set(0.42, 0.85, 0)
    this.group.add(this.armR)

    this.legL = this.buildLimb(0.15, 0.45)
    this.legL.position.set(-0.18, 0.4, 0)
    this.group.add(this.legL)
    this.legR = this.buildLimb(0.15, 0.45)
    this.legR.position.set(0.18, 0.4, 0)
    this.group.add(this.legR)
    
    this.proceduralParts.push(this.body, this.head, this.armL, this.armR, this.legL, this.legR)
  }

  public async loadModel() {
    const assets = AssetManager.getInstance()
    const model = await assets.loadModel("/assets/character.glb")
    
    if (model) {
      // Hide procedural parts
      for (const p of this.proceduralParts) p.visible = false
      
      this.externalModel = model
      // Adjust scale if needed for external models, assuming 1 unit = 1 meter
      this.externalModel.scale.setScalar(0.8) 
      this.group.add(this.externalModel)
      
      // Try to find animations in the model's userData (if set up by the loader)
      // or we just set up a basic mixer. 
      // (Advanced GLTF animations would require passing the raw GLTF object from AssetManager,
      // but for this fallback we will just prepare the mixer).
      this.mixer = new THREE.AnimationMixer(this.externalModel)
    }
  }

  private buildHead(): THREE.Group {
    const g = new THREE.Group()
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.32, 64, 64), this.headMat)
    skull.castShadow = true
    skull.receiveShadow = true
    g.add(skull)

    const eyeWhiteGeo = new THREE.SphereGeometry(0.11, 16, 12)
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
    const pupilGeo = new THREE.SphereGeometry(0.055, 12, 10)
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x14181f, roughness: 0.2 })
    for (const sx of [-1, 1]) {
      const white = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat)
      white.position.set(sx * 0.13, 0.04, 0.26)
      const pupil = new THREE.Mesh(pupilGeo, pupilMat)
      pupil.position.set(sx * 0.13, 0.04, 0.33)
      g.add(white, pupil)
    }
    return g
  }

  private buildLimb(radius: number, length: number): THREE.Group {
    const g = new THREE.Group()
    const geo = new THREE.CapsuleGeometry(radius, length, 16, 32)
    const mesh = new THREE.Mesh(geo, this.limbMat)
    mesh.position.y = -length / 2
    mesh.castShadow = true
    mesh.receiveShadow = true
    g.add(mesh)
    return g
  }

  applyCamo(camo: CamoRegions) {
    const [tr, tg, tb] = unpackColor(camo.torso)
    this.torsoMat.color.setRGB(tr, tg, tb)
    const [hr, hg, hb] = unpackColor(camo.head)
    this.headMat.color.setRGB(hr, hg, hb)
    const [lr, lg, lb] = unpackColor(camo.limbs)
    this.limbMat.color.setRGB(lr, lg, lb)
  }

  setOpacity(o: number) {
    for (const m of [this.torsoMat, this.headMat, this.limbMat]) {
      m.transparent = o < 1
      m.opacity = o
    }
  }

  setAnim(state: AnimState) {
    this.state = state
  }

  setPose(pose: Pose) {
    this.pose = pose
    switch (pose) {
      case "stand":
      case "lean":
        this.targetScaleY = 1
        break
      case "sit":
        this.targetScaleY = 0.7
        break
      case "lie":
      case "curl":
        this.targetScaleY = 0.45
        break
    }
  }

  update(dt: number, speed: number) {
    this.animTime += dt
    const t = this.animTime

    // Pose height blend.
    this.group.scale.y += (this.targetScaleY - this.group.scale.y) * Math.min(1, dt * 8)

    if (this.state === "walk" || this.state === "run") {
      const freq = this.state === "run" ? 11 : 7
      const amp = this.state === "run" ? 0.9 : 0.55
      const swing = Math.sin(t * freq) * amp
      this.legL.rotation.x = swing
      this.legR.rotation.x = -swing
      this.armL.rotation.x = -swing * 0.8
      this.armR.rotation.x = swing * 0.8
      this.body.position.y = 0.6 + Math.abs(Math.sin(t * freq)) * 0.05
    } else if (this.state === "paint") {
      this.armR.rotation.x = Math.sin(t * 12) * 0.6 - 0.4
      this.armL.rotation.x = -0.2
      this.legL.rotation.x = 0
      this.legR.rotation.x = 0
    } else if (this.state === "celebrate") {
      this.armL.rotation.x = -2.4 + Math.sin(t * 10) * 0.2
      this.armR.rotation.x = -2.4 - Math.sin(t * 10) * 0.2
      this.group.position.y = Math.abs(Math.sin(t * 6)) * 0.3
    } else {
      // Idle breathing.
      const b = Math.sin(t * 2.2) * 0.03
      this.body.scale.set(1, 1.15 + b, 0.9)
      this.legL.rotation.x *= 0.85
      this.legR.rotation.x *= 0.85
      this.armL.rotation.x *= 0.85
      this.armR.rotation.x *= 0.85
      this.group.position.y *= 0.85
    }
    
    if (this.mixer) {
      this.mixer.update(dt)
    }
  }

  dispose() {
    this.group.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose()
      }
    })
    this.torsoMat.dispose()
    this.headMat.dispose()
    this.limbMat.dispose()
  }
}

function mat(color: number) {
  // Use PhysicalMaterial for AAA soft rubber-like finish
  return new THREE.MeshPhysicalMaterial({ 
    color, 
    roughness: 0.6, 
    metalness: 0.05,
    clearcoat: 0.1, // Subtle reflections
    clearcoatRoughness: 0.8
  })
}
