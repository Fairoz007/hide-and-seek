// Smooth third-person follow camera with mouse orbit, zoom, collision avoidance
// against world props, dynamic FOV on sprint, and a decaying shake impulse.

import * as THREE from "three"
import { damp } from "@shared/math"

export interface CameraColliderBox {
  min: THREE.Vector3
  max: THREE.Vector3
}

export class ThirdPersonCamera {
  yaw = 0
  pitch = 0.35
  private distance = 6
  private targetDistance = 6
  private readonly minDist = 2.5
  private readonly maxDist = 11
  private shake = 0
  private baseFov = 60
  private currentFov = 60
  private tmp = new THREE.Vector3()
  private desired = new THREE.Vector3()
  private ray = new THREE.Raycaster()

  constructor(private camera: THREE.PerspectiveCamera) {}

  rotate(dx: number, dy: number) {
    this.yaw -= dx * 0.0025
    this.pitch = THREE.MathUtils.clamp(this.pitch - dy * 0.0025, -0.2, 1.2)
  }

  zoom(delta: number) {
    this.targetDistance = THREE.MathUtils.clamp(this.targetDistance + delta * 0.01, this.minDist, this.maxDist)
  }

  addShake(amount: number) {
    this.shake = Math.min(1, this.shake + amount)
  }

  /** The yaw used to orient player movement (where the camera looks). */
  get facingYaw() {
    return this.yaw
  }

  update(dt: number, target: THREE.Vector3, sprinting: boolean, colliders: THREE.Box3[]) {
    this.distance = damp(this.distance, this.targetDistance, 10, dt)

    // Shoulder offset for AAA cinematic feel
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    const focus = this.tmp.set(target.x, target.y + 1.4, target.z).addScaledVector(right, 0.6)
    
    const dir = new THREE.Vector3(
      Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      Math.cos(this.yaw) * Math.cos(this.pitch),
    )

    // Collision: shorten the boom if a prop is between the player and camera.
    let dist = this.distance
    this.ray.set(focus, dir)
    let nearest = dist
    for (const box of colliders) {
      const hit = this.ray.ray.intersectBox(box, this.desired)
      if (hit) {
        const d = focus.distanceTo(this.desired)
        if (d < nearest) nearest = d - 0.3
      }
    }
    dist = Math.max(this.minDist, Math.min(dist, nearest))

    const camPos = focus.clone().add(dir.multiplyScalar(dist))

    // Shake offset.
    if (this.shake > 0.001) {
      camPos.x += (Math.random() - 0.5) * this.shake * 0.4
      camPos.y += (Math.random() - 0.5) * this.shake * 0.4
      this.shake *= Math.exp(-6 * dt)
    }

    // Heavy lerp for cinematic camera lag
    this.camera.position.lerp(camPos, 1 - Math.exp(-12 * dt))
    
    // Look past the player slightly to prevent the player model from completely blocking the center
    const lookAtTarget = focus.clone().addScaledVector(dir, -4.0)
    
    // Smoothly rotate the camera instead of snapping instantly
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(this.camera.position, lookAtTarget, this.camera.up))
    this.camera.quaternion.slerp(targetQuat, 1 - Math.exp(-15 * dt))

    // Dynamic FOV.
    const targetFov = sprinting ? this.baseFov + 8 : this.baseFov
    this.currentFov = damp(this.currentFov, targetFov, 6, dt)
    if (Math.abs(this.camera.fov - this.currentFov) > 0.01) {
      this.camera.fov = this.currentFov
      this.camera.updateProjectionMatrix()
    }
  }
}
