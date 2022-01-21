const glob = require('glob');

glob('src/**/*.ts', {}, (err, files) => {
  require('esbuild').buildSync({
    format: 'cjs',
    platform: 'node',
    outdir: 'out',
    entryPoints: files,
  });
});
