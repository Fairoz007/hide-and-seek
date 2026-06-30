import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  resolve: {
    alias: {
      "@shared": fileURLToPath(new URL("../shared/src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 4000,
    strictPort: true,
    proxy: {
      "/socket.io": {
        target: "http://localhost:4001",
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
