import { fileURLToPath, URL } from "node:url";
import { join } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { name, description } from "./package.json"
import { primary } from './src/assets/colors.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: name,
        short_name: name,
        description: description,
        theme_color: primary,
        icons: [
          {
            src: './src/assets/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './src/assets/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./", import.meta.url))
    }
  },
  base: "",
  publicDir: "/dist/"
});
