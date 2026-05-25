import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "LearnLoop",
        short_name: "LearnLoop",
        description: "Offline-first AI study assistant powered by Gemma models",
        theme_color: "#1f2937",
        background_color: "#f5f7fb",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
        ],
      },
    }),
  ],
})
