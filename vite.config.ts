import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Preview build is served from GitHub Pages at /crystals-world-variations/ (override with BASE_PATH).
// NOTE: the live original site on `main` is built from main with base /crystals-world-demo/ and is untouched.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/crystals-world-variations/',
  plugins: [react(), tailwindcss()],
})
