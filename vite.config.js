import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit
  },
})