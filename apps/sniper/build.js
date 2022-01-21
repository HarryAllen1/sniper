import glob from 'glob';

glob('src/**/*.ts', {}, (err, files) => {
  (await import('esbuild')).buildSync({
    format: 'cjs',
    platform: 'node',
    outdir: 'out',
    entryPoints: files,
  });
});
