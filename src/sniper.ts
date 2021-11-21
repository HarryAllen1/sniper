import { registerCommands, registerEvents } from './utils/registry';

import { project_id } from '../firebase-credentials.json';

import DiscordClient from './client/client';

import { Intents } from 'discord.js';
import admin from 'firebase-admin';

import express from 'express';
import bodyParser from 'body-parser';
import firebaseCredentials from '../firebase-credentials.json';

import { AutoPoster } from 'topgg-autoposter';

export const app = express();

app.use(bodyParser.text({ type: `*/*` }));

export const FIREBASE_PROJECT_ID = project_id;
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
    credential: admin.credential.cert(firebaseCredentials),
    projectId: 'discord-sniper-5c7f0',
  });

  (async () => {
    const { prefixes, token, secrets } = __filename.endsWith('.ts')
      ? await import('../slappey.json')
      : await import('../slappey-prod.json');
    client.prefix = prefixes;

    const poster = AutoPoster(secrets.topggToken, client);
    poster.on('error', console.error);

    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(token);
  })();
} catch (error) {
  console.error(error);
}
