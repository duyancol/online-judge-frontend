import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Giả lập __dirname trong môi trường ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias @ -> src
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  // 👇 Add this only if you serve through dev server
  // or need fallback for production (if not using nginx config)
  preview: {
    // This is for `vite preview` (optional)
    port: 4173,
  }
})
