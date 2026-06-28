// Chroma Hunt authoritative game server.
// Express for health/static, Socket.IO for realtime. All match logic lives in
// Room; this file just translates socket events <-> room method calls and fans
// room events back out to the right clients.

import { createServer } from "node:http"
import express from "express"
import { Server } from "socket.io"
import { NET, ROOM } from "../shared/constants"
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  WorldSnapshot,
} from "../shared/protocol"
import type { CosmeticLoadout, LeaderboardEntry, Team } from "../shared/types"
import { Matchmaker } from "./game/Matchmaker"
import { Room, type RoomEvents } from "./game/Room"

const app = express()
app.get("/health", (_req, res) => {
  res.json({ ok: true, rooms: mm.roomCount, players: mm.playerCount })
})

const httpServer = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    cors: { origin: "*" },
    pingInterval: 10000,
    pingTimeout: 8000,
  },
)

let tickCounter = 0

// Build a compact wire snapshot from the room's full state.
function buildSnapshot(room: Room): WorldSnapshot {
  const state = room.toState()
  return {
    tick: tickCounter,
    serverTime: Date.now(),
    timeRemaining: state.timeRemaining,
    phase: state.phase,
    players: state.players.map((p) => ({
      id: p.id,
      px: p.position.x,
      py: p.position.y,
      pz: p.position.z,
      ry: p.rotationY,
      pose: p.pose,
      frozen: p.frozen,
      camoScore: p.camoScore,
      discovered: p.discovered,
      team: p.team,
      torso: p.camo.torso,
      head: p.camo.head,
      limbs: p.camo.limbs,
    })),
  }
}

// One shared event sink: rooms call these, we forward to the room's socket room.
const events: RoomEvents = {
  onSnapshot(room) {
    tickCounter++
    // Throttle full snapshots to the snapshot rate.
    if (tickCounter % Math.round(NET.TICK_RATE / NET.SNAPSHOT_RATE) !== 0) return
    io.to(room.code).emit("world:snapshot", buildSnapshot(room))
  },
  onStateChange(room) {
    io.to(room.code).emit("room:state", room.toState())
  },
  onCountdown(room, seconds) {
    io.to(room.code).emit("match:countdown", seconds)
  },
  onMatchStart(room) {
    io.to(room.code).emit("match:started", room.toState())
  },
  onMatchEnd(room, winner: Team | null, lb: LeaderboardEntry[]) {
    io.to(room.code).emit("match:ended", { winner, leaderboard: lb })
  },
  onScan(room, hunterId, revealed) {
    io.to(room.code).emit("hunter:scan", { hunterId, revealed, ts: Date.now() })
  },
  onDiscovered(room, playerId, byId) {
    io.to(room.code).emit("player:discovered", { playerId, byId })
  },
}

const mm = new Matchmaker(events)

// Periodic housekeeping: drop dead rooms.
setInterval(() => mm.sweep(), 15000)

io.on("connection", (socket) => {
  socket.data.playerId = socket.id
  socket.data.roomCode = null

  function currentRoom(): Room | null {
    return socket.data.roomCode ? mm.getRoom(socket.data.roomCode) ?? null : null
  }

  function joinRoom(room: Room, name: string, cosmetics: CosmeticLoadout) {
    socket.data.roomCode = room.code
    socket.data.name = name
    socket.join(room.code)
    room.addPlayer(socket.id, name, cosmetics)
    socket.emit("room:joined", { selfId: socket.id, room: room.toState() })
  }

  socket.on("matchmaking:quick", ({ name, mode, cosmetics }) => {
    const room = mm.quickMatch(mode)
    joinRoom(room, name || "Player", cosmetics)
  })

  socket.on("room:create", ({ name, config, cosmetics }) => {
    const room = mm.createRoom(config)
    joinRoom(room, name || "Player", cosmetics)
  })

  socket.on("room:join", ({ name, code, cosmetics }) => {
    const room = mm.getRoom(code)
    if (!room) {
      socket.emit("room:error", { message: `No room with code ${code}` })
      return
    }
    if (room.isFull) {
      socket.emit("room:error", { message: "That room is full" })
      return
    }
    if (room.phase !== "lobby") {
      socket.emit("room:error", { message: "That match has already started" })
      return
    }
    joinRoom(room, name || "Player", cosmetics)
  })

  socket.on("room:leave", () => {
    const room = currentRoom()
    if (room) {
      room.removePlayer(socket.id)
      socket.leave(room.code)
    }
    socket.data.roomCode = null
  })

  socket.on("room:config", (config) => {
    const room = currentRoom()
    if (room && room.hostId === socket.id) room.updateConfig(config)
  })

  socket.on("room:addBots", (count) => {
    const room = currentRoom()
    if (room && room.hostId === socket.id) {
      room.addBots(Math.max(0, Math.min(ROOM.MAX_PLAYERS, count)))
    }
  })

  socket.on("room:start", () => {
    const room = currentRoom()
    if (room && room.hostId === socket.id) room.start()
  })

  socket.on("player:input", (input) => {
    const room = currentRoom()
    const p = room?.getPlayer(socket.id)
    if (room && p) room.applyInput(p, input)
  })

  socket.on("player:pose", (pose) => {
    currentRoom()?.setPose(socket.id, pose)
  })

  socket.on("player:freeze", (frozen) => {
    currentRoom()?.setFreeze(socket.id, frozen)
  })

  socket.on("player:camo", (camo) => {
    currentRoom()?.setCamo(socket.id, camo)
  })

  socket.on("hunter:scan", () => {
    currentRoom()?.scan(socket.id)
  })

  socket.on("hunter:tag", ({ targetId }) => {
    currentRoom()?.tag(socket.id, targetId)
  })

  socket.on("chat:send", (text) => {
    const room = currentRoom()
    if (!room) return
    const trimmed = text.slice(0, 200)
    io.to(room.code).emit("chat:message", {
      id: `${socket.id}-${Date.now()}`,
      authorId: socket.id,
      authorName: socket.data.name || "Player",
      text: trimmed,
      ts: Date.now(),
      system: false,
    })
  })

  socket.on("ping2", (clientTime) => {
    socket.emit("pong2", clientTime)
  })

  socket.on("disconnect", () => {
    const room = currentRoom()
    if (room) {
      room.setPing(socket.id, 0)
      room.removePlayer(socket.id)
    }
  })
})

httpServer.listen(NET.SERVER_PORT, () => {
  console.log(`[server] Chroma Hunt listening on :${NET.SERVER_PORT}`)
})
