import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Dev-only proxy: forwards /api/* to the local backend so you never
  // hard-code localhost in your React code.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  // Ensure the build output directory is predictable
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
