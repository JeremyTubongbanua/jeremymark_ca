import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
          dest: 'pdfjs'
        }
      ]
    })
  ],
  server: {
    historyApiFallback: true, // Ensures that index.html is served for all routes
  },
  publicDir: 'public', // Specifies the public directory
});