import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  bundle: false,
  dts: false,
  entry: ['src/**/*.ts'],
  format: ['esm'],
  minify: true,
  tsconfig: 'tsconfig.json',
  target: 'es2020',
  splitting: false,
  skipNodeModulesBundle: true,
  shims: false,
  keepNames: true,

  outDir: 'dist',
});
