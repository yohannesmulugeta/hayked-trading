import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages supplies /hayked-trading/ through VITE_BASE_PATH.
  // Local development and other hosts continue to use the domain root.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
