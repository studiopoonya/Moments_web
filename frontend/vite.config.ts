import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Plain Vite + React SPA. API requests to /api/* are proxied to the Laravel
// backend during local dev so the frontend can call relative paths.
// NOTE: port 8001, not Laravel's usual 8000 — this machine already has
// another project ("Capture Moments") running on 8000.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
    },
  },
});
