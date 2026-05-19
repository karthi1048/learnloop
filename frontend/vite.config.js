import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "AI Study Assistant",
        short_name: "StudyAI",
        description: "Offline-friendly learning companion powered by Gemma 4",
        theme_color: "#1f2937",
        background_color: "#f5f7fb",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            // "purpose": "maskable"
          },
          {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            // "purpose": "maskable"
          },
        ],
      },
    }),
  ],
})
