import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  bundle: false,
  dts: false,
  entry: ['src/**/*.ts', '!src/**/*.d.ts'],
  format: ['esm'],
  tsconfig: 'tsconfig.json',
  target: 'esnext',
  splitting: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  silent: true,
  shims: false,
  minify: false,
  keepNames: true,
  outDir: 'dist',
});
