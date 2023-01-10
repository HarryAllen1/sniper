import { writeFile } from 'fs/promises';

if (import.meta.url.includes('/home/harry'))
  await writeFile(
    './src/config.ts',
    `export const config = {
  owners: [],
  discordToken: '${process.env.DISCORD_TOKEN}',
  statcord: '${process.env.STATCORD_KEY}',
  ownerGuilds: [],
}`
  );
