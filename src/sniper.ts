import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
import { Intents } from 'discord.js';
import admin from 'firebase-admin';

try {
  const client = new DiscordClient({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_PRESENCES,
    ],
  });

  admin.initializeApp({
    credential: admin.credential.cert(require('../firebase-credental.json')),
    projectId: 'discord-sniper-5c7f0',
  });

  (async () => {
    client.prefix = config.prefix || client.prefix;
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(config.token);
  })();
} catch (error) {
  console.error(error);
}
