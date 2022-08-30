import { writeFile } from 'fs/promises';

await writeFile(
  './src/config.ts',
  `export const config = {
  owners: [],
  token: ${process.env.DISCORD_TOKEN},
  statcord: ${process.env.STATCORD_KEY},
  ownerGuilds: [],
}`
);
