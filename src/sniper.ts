import { registerCommands, registerEvents } from './utils/registry';

import DiscordClient from './client/client';

import { Intents } from 'discord.js';
import admin from 'firebase-admin';
export const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
try {
  admin.initializeApp({
    credential: admin.credential.cert(require('../firebase-credental.json')),
    projectId: 'discord-sniper-5c7f0',
  });

  (async () => {
    //@ts-ignore
    const { prefixes, token } = __filename.endsWith('\\sniper.ts')
      ? await import('../slappey.json')
      : await import('../slappey-prod.json');
    client.prefix = prefixes;

    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(token);
  })();
} catch (error) {
  console.error(error);
}
