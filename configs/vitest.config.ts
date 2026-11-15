import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
      setupFiles: ['configs/vitest.setup.ts'],
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html-spa'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.test.{ts,tsx}', 'src/client/main.tsx'],
        reportsDirectory: 'coverage',
      },
    },
  }),
);
