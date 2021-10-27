import esbuild from 'esbuild';

async () => {
  esbuild.build({
    platform: 'node',
    outdir: './out',
    entryPoints: ['./src/sniper.ts'],
  });
};
