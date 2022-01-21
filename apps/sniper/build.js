import glob from 'glob';

glob('src/**/*.ts', {}, async (err, files) => {
  (await import('esbuild')).buildSync({
    format: 'cjs',
    platform: 'node',
    outdir: 'out',
    entryPoints: files,
  });
});
