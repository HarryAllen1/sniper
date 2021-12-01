import { registerCommands, registerEvents } from './utils/registry.js';

import DiscordClient from './client/client.js';

import { Intents } from 'discord.js';
import admin from 'firebase-admin';

import express from 'express';

const firebaseCredentials = JSON.parse(
  readFileSync('./firebase-credentials.json').toString()
);

// @ts-ignore -- make the file appear in the compiled js
// void import('../firebase-credentials.json');

import { AutoPoster } from 'topgg-autoposter';
import { Webhook } from '@top-gg/sdk';
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
    const a =
      // process.cwd().endsWith('out-esm')
      // ?
      // @ts-ignore
      await import('../slappey-prod.json');
    // : // @ts-ignore
    // await import('../slappey-prod.json');
    client.prefix = a.default.prefixes;

    const poster = AutoPoster(a.default.secrets.topggToken, client);
    poster.on('error', console.error);

    await registerCommands(client, './out-esm/src/commands');
    await registerEvents(client, './out-esm/src/events');
    await client.login(a.default.token);

    const webhook = new Webhook(a.default.secrets.topggToken);

    app.post(
      '/topggwebhook',
      webhook.listener((vote) => {
        log(vote.user);
      })
    );
    app.listen(6900);
  })();
} catch (error) {
  console.error(error);
}
