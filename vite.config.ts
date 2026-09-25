import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Served from GitHub Pages at /crystals-world-demo/
export default defineConfig({
  base: '/crystals-world-demo/',
  plugins: [react(), tailwindcss()],
})
