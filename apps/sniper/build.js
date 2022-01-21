import glob from 'glob';

glob('src/**/*.ts', {}, async (err, files) => {
  (await import('esbuild')).buildSync({
    platform: 'node',
    outdir: 'out',
    entryPoints: files,
  });
});
