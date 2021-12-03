import { registerCommands, registerEvents } from './utils/registry.js';

import DiscordClient from './client/client.js';

import { Intents } from 'discord.js';
import admin from 'firebase-admin';

import express from 'express';

export const firebaseCredentials = JSON.parse(
  readFileSync('./firebase-credentials.json').toString()
);
export const slappeyJSON =
  // process.cwd().endsWith('out-esm')
  // ?
  // @ts-ignore
  await import('../slappey-prod.json', { assert: { type: 'json' } });
// : // @ts-ignore
// await import('../slappey-prod.json');

// @ts-ignore -- make the file appear in the compiled js
// void import('../firebase-credentials.json');

import { AutoPoster } from 'topgg-autoposter';

import { log } from './utils/helpers/console.js';
import { readFileSync } from 'fs';

export const app = express();

export const FIREBASE_PROJECT_ID = firebaseCredentials.project_id;
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
    client.prefix = slappeyJSON.default.prefixes;

    const poster = AutoPoster(slappeyJSON.default.secrets.topggToken, client);
    poster.on('error', console.error);

    await registerCommands(client, './out-esm/src/commands');
    await registerEvents(client, './out-esm/src/events');
    await client.login(slappeyJSON.default.token);
  })();
} catch (error) {
  console.error(error);
}
