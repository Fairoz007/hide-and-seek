import { NetClient } from "./net/NetClient"
import { Renderer } from "./renderer/Renderer"
import { UI } from "./ui/UI"
import { HUD } from "./ui/HUD"
import { Loop } from "./engine/Loop"
import { Input, type ActionKey } from "./engine/Input"
import { Character } from "./characters/Character"
import { MapBuilder } from "./maps/MapBuilder"
import { ThirdPersonCamera } from "./renderer/ThirdPersonCamera"
import { EnvironmentManager } from "./engine/EnvironmentManager"
import { LightingManager } from "./engine/LightingManager"
import { MaterialManager } from "./engine/MaterialManager"
import { ParticleSystem } from "./engine/ParticleSystem"
import { FoliageSystem } from "./engine/FoliageSystem"
import { WaterSystem } from "./engine/WaterSystem"
import { AudioManager } from "./audio/AudioManager"
import { generateMap, GeneratedMap } from "@shared/mapgen"
import type { PlayerProfile } from "./cosmetics/catalog"
import { clamp, damp, lerp } from "@shared/math"
import * as THREE from "three"
import type { NetPlayerSnapshot, WorldSnapshot } from "@shared/protocol"
import type { Pose } from "@shared/types"

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement
const renderer = new Renderer(canvas)
const ui = new UI()
const hud = new HUD()
const net = new NetClient()
const input = new Input(canvas)
const audio = new AudioManager()
const camera = new ThirdPersonCamera(renderer.camera)
const foliageSystem = new FoliageSystem(renderer.scene)
const mapBuilder = new MapBuilder(foliageSystem)

// Initialize AAA Graphics Managers
const envManager = new EnvironmentManager(renderer.scene, renderer.renderer)
envManager.generateProceduralEnvironment() // Use PMREM for realistic IBL reflections
const lightManager = new LightingManager(renderer.scene)
const waterSystem = new WaterSystem(renderer.scene, renderer.sun)

// AAA Particle Effects
const dustParticles = new ParticleSystem(renderer.scene, 500, "dust")
const leafParticles = new ParticleSystem(renderer.scene, 200, "leaves")
const fireflyParticles = new ParticleSystem(renderer.scene, 100, "fireflies")
const butterflyParticles = new ParticleSystem(renderer.scene, 50, "butterflies")


let currentProfile: PlayerProfile = {
  name: "Player" + Math.floor(Math.random() * 1000),
  loadout: {
    hat: null,
    backpack: null,
    shoes: null,
    brush: null,
    trail: null,
    emote: null,
    bodyColor: 0xffffff,
  },
  stats: {
    matches: 0,
    discoveries: 0,
    survivals: 0,
    bestCamo: 0,
  }
}

let inMatch = false
let myTeam: "hunter" | "mimic" = "mimic"
let myId = ""
let map: GeneratedMap | null = null
const characters = new Map<string, Character>()
let lastSnap: WorldSnapshot | null = null

// Raycaster for paint/tag mechanics
const raycaster = new THREE.Raycaster()
const centerScreen = new THREE.Vector2(0, 0)
let isFrozen = false
let currentPose: Pose = "stand"

function showMainMenu() {
  ui.showMenu(currentProfile, {
    onQuickMatch: (mode) => {
      net.emit("matchmaking:quick", { name: currentProfile.name, mode, cosmetics: currentProfile.loadout })
    },
    onCreateRoom: (mode, mapType) => {
      net.emit("room:create", {
        name: currentProfile.name,
        config: { mode, map: mapType, maxPlayers: 12, matchSeconds: 300, scanCooldownSeconds: 30, isPrivate: false },
        cosmetics: currentProfile.loadout
      })
    },
    onJoinRoom: (code) => {
      net.emit("room:join", { name: currentProfile.name, code, cosmetics: currentProfile.loadout })
    },
    onProfileChange: (p) => {
      currentProfile = p
    }
  })
}

net.on("room:joined", ({ selfId, room }) => {
  myId = selfId
  ui.showLobby(room, selfId, {
    onStart: () => net.emit("room:start"),
    onAddBots: (n) => net.emit("room:addBots", n),
    onLeave: () => {
      net.emit("room:leave")
      showMainMenu()
    },
    onConfig: (patch) => net.emit("room:config", patch)
  })
})

net.on("room:state", (room) => {
  ui.updateLobby(room)
})

net.on("match:countdown", (seconds) => {
  ui.showCountdown(seconds)
  if (seconds > 0) audio.play("countdown")
})

net.on("match:started", async (room) => {
  inMatch = true
  ui.clear()
  
  const me = room.players.find(p => p.id === myId)
  myTeam = me ? (me.team as "hunter" | "mimic") : "mimic"
  
  hud.mount(myTeam, () => {
    net.emit("hunter:scan")
  })
  
  map = generateMap(room.config.map)
  const mapGroup = await mapBuilder.build(map)
  renderer.scene.add(mapGroup)
  
  // Use cinematic volumetric fog from EnvironmentManager
  envManager.setCinematicFog(0x88c0d0, 0.015) // Default atmospheric fog
  renderer.setSunColor(0xffffee, 4.0)
  
  audio.startAmbient("forest")
  audio.startDynamicMusic()

  await Promise.all(room.players.map(async p => {
    const char = new Character()
    await char.loadModel()
    char.group.position.copy(p.position)
    char.group.rotation.y = p.rotationY
    char.applyCamo(p.camo)
    renderer.scene.add(char.group)
    char.group.userData = { id: p.id } // For tagging
    characters.set(p.id, char)
  }))
})

net.on("world:snapshot", (snap) => {
  lastSnap = snap
  hud.setTimer(snap.timeRemaining)
  
  let mimicsLeft = 0
  snap.players.forEach(p => {
    if (p.team === "mimic" && !p.discovered) mimicsLeft++
    
    if (p.id === myId) {
      hud.setCamo(p.camoScore)
      hud.setDiscoveredOverlay(p.discovered)
      // Hunter scan cooldown visualization could go here
    }
  })
  hud.setMimicCount(mimicsLeft)
})

net.on("match:ended", ({ winner, leaderboard }) => {
  inMatch = false
  hud.unmount()
  input.exitLock()
  
  renderer.scene.remove(mapBuilder.group)
  mapBuilder.dispose()
  characters.forEach(c => {
    renderer.scene.remove(c.group)
    c.dispose()
  })
  characters.clear()
  
  audio.stopAmbient()
  audio.play("victory")

  ui.showResults(winner, leaderboard, myId, () => {
    showMainMenu()
  })
})

net.on("hunter:scan", ({ hunterId, revealed }) => {
  revealed.forEach(id => {
    const char = characters.get(id)
    if (char) char.setOpacity(0.5)
  })
  setTimeout(() => {
    revealed.forEach(id => {
      const char = characters.get(id)
      if (char) char.setOpacity(1.0)
    })
  }, 2000)
})

net.on("player:discovered", ({ playerId, byId }) => {
  if (playerId === myId) {
    ui.toast("You were discovered!", "error")
    audio.play("discover")
  } else if (byId === myId) {
    ui.toast("You discovered a mimic!", "info")
    audio.play("discover")
  }
})

// Input handling
input.onMouse((dx, dy) => {
  if (inMatch) camera.rotate(dx, dy)
})

input.onWheelDelta((delta) => {
  if (inMatch) camera.zoom(delta)
})

input.onAction("freeze", () => {
  if (!inMatch || myTeam !== "mimic") return
  isFrozen = !isFrozen
  net.emit("player:freeze", isFrozen)
})

input.onAction("paint", () => {
  if (!inMatch || myTeam !== "mimic") return
  raycaster.setFromCamera(centerScreen, renderer.camera)
  const hits = raycaster.intersectObject(mapBuilder.group, true)
  if (hits.length > 0) {
    const hit = hits[0]
    let colorHex = 0xffffff
    
    // Check if it's an InstancedMesh (prop) or the floor (Mesh with StandardMaterial)
    if (hit.object instanceof THREE.InstancedMesh && hit.instanceId !== undefined) {
      const color = new THREE.Color()
      hit.object.getColorAt(hit.instanceId, color)
      colorHex = color.getHex()
    } else if (hit.object instanceof THREE.Mesh) {
      const mat = hit.object.material as THREE.MeshStandardMaterial
      if (mat.color) colorHex = mat.color.getHex()
    }
    
    net.emit("player:camo", { torso: colorHex, head: colorHex, limbs: colorHex })
    audio.play("paint")
  }
})

input.onAction("tag", () => {
  if (!inMatch || myTeam !== "hunter") return
  raycaster.setFromCamera(centerScreen, renderer.camera)
  
  // Intersect characters
  const charMeshes: THREE.Object3D[] = []
  characters.forEach((char, id) => {
    if (id !== myId) charMeshes.push(char.group)
  })
  
  const hits = raycaster.intersectObjects(charMeshes, true)
  if (hits.length > 0) {
    // Traverse up to find the group with userData.id
    let obj: THREE.Object3D | null = hits[0].object
    while (obj && !obj.userData.id) {
      obj = obj.parent
    }
    if (obj && obj.userData.id) {
      net.emit("hunter:tag", { targetId: obj.userData.id })
    }
  }
})

input.onAction("scan", () => {
  if (!inMatch || myTeam !== "hunter") return
  net.emit("hunter:scan")
  audio.play("scan")
})

const poses: ActionKey[] = ["pose-stand", "pose-sit", "pose-lie", "pose-curl", "pose-lean"]
poses.forEach(action => {
  input.onAction(action, () => {
    if (inMatch) {
      const poseName = action.split("-")[1] as Pose
      currentPose = poseName
      net.emit("player:pose", poseName)
    }
  })
})

let inputSeq = 0

const loop = new Loop(
  (dt) => {
    if (inMatch && map) {
      const axes = input.axes()
      
      if (lastSnap) {
        lastSnap.players.forEach(p => {
          const char = characters.get(p.id)
          if (char) {
            char.group.position.lerp(new THREE.Vector3(p.px, p.py, p.pz), 0.2)
            char.group.rotation.y = damp(char.group.rotation.y, p.ry, 10, dt)
            
            if (p.frozen) {
              char.setAnim("idle")
            } else {
              char.setAnim(Math.hypot(p.px - char.group.position.x, p.pz - char.group.position.z) > 0.01 ? "walk" : "idle")
            }
            char.setPose(p.pose)
            char.applyCamo({ torso: p.torso, head: p.head, limbs: p.limbs })
            char.update(dt, 1)
          }
        })
      }

      net.emit("player:input", {
        seq: ++inputSeq,
        dt,
        moveX: axes.moveX,
        moveZ: axes.moveZ,
        run: axes.run,
        rotationY: camera.facingYaw,
        jump: axes.jump
      })

      const myChar = characters.get(myId)
      if (myChar) {
        camera.update(dt, myChar.group.position, axes.run, mapBuilder.cameraColliders)
        renderer.focusShadow(myChar.group.position)
        hud.setCrosshairTarget(input.isLocked)
      }
      hud.setMetrics(loop.fps, net.ping)
    }
    
    // Always update ambient effects
    dustParticles.update(dt)
    leafParticles.update(dt)
    fireflyParticles.update(dt)
    butterflyParticles.update(dt)
    foliageSystem.update(dt)
    waterSystem.update(dt)
  },
  () => {
    renderer.render()
  }
)

showMainMenu()
loop.start()
