/**
 * @author Wayne
 * @Date 2024-01-02 13:45:57
 * @LastEditTime 2025-08-04 21:49:53
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const { npm_lifecycle_event } = process.env;

const IS_PROD_ENV = npm_lifecycle_event?.includes('prod');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    open: true,
  },
  build: {
    sourcemap: !IS_PROD_ENV,
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
