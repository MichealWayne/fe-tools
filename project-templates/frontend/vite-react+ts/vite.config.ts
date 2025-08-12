import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const tailwindcss = require('tailwindcss');

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
      plugins: [
        tailwindcss({
          content: ['./src/**/*.{js,ts,jsx,tsx}'],
        }),
      ],
    },
  },
});
