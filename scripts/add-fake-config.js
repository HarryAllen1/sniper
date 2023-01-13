import { writeFile } from 'fs/promises';

const config = `export const config = {
  owners: [],
  discordToken: '${process.env.DISCORD_TOKEN}',
  statcord: '${process.env.STATCORD_KEY}',
  ownerGuilds: [],
}`;

if (!import.meta.url.includes('/home/harry')) {
  await writeFile('./src/config.ts', config);
  await writeFile('./dist/config.js', config);
}
