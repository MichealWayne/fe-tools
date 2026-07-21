import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import tailwindcss from '@tailwindcss/postcss';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
