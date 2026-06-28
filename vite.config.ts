import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

// Vite config for the Chroma Hunt client.
// The Socket.IO dev server runs separately on PORT 3001 and is proxied here.
export default defineConfig({
  resolve: {
    alias: {
      "@client": fileURLToPath(new URL("./client", import.meta.url)),
      "@server": fileURLToPath(new URL("./server", import.meta.url)),
      "@shared": fileURLToPath(new URL("./shared", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/socket.io": {
        target: "http://localhost:3001",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ["@dimforge/rapier3d-compat"],
  },
  build: {
    target: "es2020",
    sourcemap: true,
  },
})
