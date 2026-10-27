import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': `http://127.0.0.1:${process.env.PORT || 3001}`,
    },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: mode !== 'production',
  },
}));
