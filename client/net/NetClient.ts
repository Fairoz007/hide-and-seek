// Thin typed wrapper over socket.io-client. Owns the connection, exposes typed
// emit helpers, measures ping, and lets systems subscribe to server events.

import { io, type Socket } from "socket.io-client"
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@shared/protocol"

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export class NetClient {
  readonly socket: ClientSocket
  private _ping = 0
  private _connected = false

  constructor(url?: string) {
    // In dev, vite proxies /socket.io to :3001; in prod we connect to origin.
    this.socket = io(url ?? "", {
      transports: ["websocket"],
      autoConnect: true,
    })

    this.socket.on("connect", () => {
      this._connected = true
      this.startPingLoop()
    })
    this.socket.on("disconnect", () => {
      this._connected = false
    })
    this.socket.on("pong2", (clientTime: number) => {
      this._ping = Date.now() - clientTime
    })
  }

  private startPingLoop() {
    setInterval(() => {
      if (this._connected) this.socket.emit("ping2", Date.now())
    }, 2000)
  }

  get ping() {
    return this._ping
  }

  get connected() {
    return this._connected
  }

  get id() {
    return this.socket.id ?? ""
  }

  /** Convenience: typed emit. */
  emit<E extends keyof ClientToServerEvents>(
    event: E,
    ...args: Parameters<ClientToServerEvents[E]>
  ) {
    // @ts-expect-error variadic forwarding is sound at runtime
    this.socket.emit(event, ...args)
  }

  /** Convenience: typed subscribe; returns an unsubscribe fn. */
  on<E extends keyof ServerToClientEvents>(event: E, handler: ServerToClientEvents[E]) {
    // @ts-expect-error variadic forwarding is sound at runtime
    this.socket.on(event, handler)
    return () => {
      // @ts-expect-error variadic forwarding is sound at runtime
      this.socket.off(event, handler)
    }
  }
}
