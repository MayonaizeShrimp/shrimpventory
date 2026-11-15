import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const ROOT_DIR = fileURLToPath(new URL('../..', import.meta.url));

export default defineConfig({
  root: ROOT_DIR,
  plugins: [react()],
  resolve: {
    alias: {
      '@client': fileURLToPath(new URL('../../src/client', import.meta.url)),
      '@core': fileURLToPath(new URL('../../src/core', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
