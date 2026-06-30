import { createServer } from "node:http"
import express from "express"
import { Server } from "socket.io"
import { Events, roomCreateSchema, roomJoinSchema } from "@shadow-seek/shared"
import { RoomManager } from "./rooms/RoomManager.js"

const PORT = process.env.PORT || 3001

const app = express()
app.get("/health", (_req, res) => {
  res.json({ ok: true })
})

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: "*" },
  pingInterval: 10000,
  pingTimeout: 8000,
})

const roomManager = new RoomManager()

setInterval(() => roomManager.sweep(), 15000)

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)
  let currentRoomId: string | null = null

  socket.on(Events.ROOM_CREATE, (payload, callback) => {
    try {
      const { name } = roomCreateSchema.parse(payload)
      const room = roomManager.createRoom(socket.id, name)
      currentRoomId = room.state.roomId
      socket.join(currentRoomId)
      
      if (typeof callback === "function") {
        callback({ success: true, roomId: currentRoomId })
      }
      
      io.to(currentRoomId).emit(Events.ROOM_STATE, room.state)
    } catch (e) {
      if (typeof callback === "function") callback({ success: false, error: String(e) })
    }
  })

  socket.on(Events.ROOM_JOIN, (payload, callback) => {
    try {
      const { name, code } = roomJoinSchema.parse(payload)
      if (!code) throw new Error("Room code required")
      
      const room = roomManager.getRoom(code)
      if (!room) throw new Error("Room not found")
      
      currentRoomId = code
      socket.join(currentRoomId)
      room.addPlayer(socket.id, name)
      
      if (typeof callback === "function") {
        callback({ success: true, roomId: currentRoomId })
      }
      
      io.to(currentRoomId).emit(Events.ROOM_STATE, room.state)
    } catch (e) {
      if (typeof callback === "function") callback({ success: false, error: String(e) })
    }
  })

  socket.on(Events.ROOM_LEAVE, () => {
    if (currentRoomId) {
      const room = roomManager.getRoom(currentRoomId)
      if (room) {
        room.removePlayer(socket.id)
        socket.leave(currentRoomId)
        io.to(currentRoomId).emit(Events.ROOM_STATE, room.state)
      }
      currentRoomId = null
    }
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
    if (currentRoomId) {
      const room = roomManager.getRoom(currentRoomId)
      if (room) {
        room.removePlayer(socket.id)
        io.to(currentRoomId).emit(Events.ROOM_STATE, room.state)
      }
    }
  })
})

httpServer.listen(PORT, () => {
  console.log(`[server] Shadow Seek listening on :${PORT}`)
})
