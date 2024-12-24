import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const tailwindcss = require('tailwindcss');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
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
