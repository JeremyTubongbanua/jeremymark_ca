import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures that index.html is served for all routes
  },
  publicDir: 'public', // Specifies the public directory
})