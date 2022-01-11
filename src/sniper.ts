import admin from 'firebase-admin';
// @ts-ignore
import { getFirestore } from 'firebase-admin/firestore';
export const firebaseCredentials = JSON.parse(
  readFileSync('./firebase-credentials.json').toString()
);
admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  projectId: 'discord-sniper-5c7f0',
});

export const db = getFirestore();

import {
  interactions,
  registerCommands,
  registerEvents,
} from './utils/registry.js';
import DiscordClient from './client/client.js';
import { Intents } from 'discord.js';

// import express from 'express';

export const slappeyJSON = JSON.parse(
  readFileSync('./slappey-prod.json').toString()
);

import { AutoPoster } from 'topgg-autoposter';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';

// polyfill the fetch api
global.fetch = fetch as any;

// currently not used
// const app = express();

export const FIREBASE_PROJECT_ID = firebaseCredentials.project_id;
export const harrysDiscordID = '696554549418262548';

export const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
  partials: ['CHANNEL'],
});

client.db.db = db;

export const main = async (): Promise<void> => {
  try {
    client.prefix = slappeyJSON.prefixes;

    const poster = AutoPoster(slappeyJSON.secrets.topggToken, client);
    poster.on('error', (err) => {
      console.log('topgg autoposter: ' + err.message);
    });

    await registerCommands(client, './out-esm/src/commands');
    await registerEvents(client, './out-esm/src/events');
    const rest = new REST({ version: '9' }).setToken(slappeyJSON.token);
    try {
      console.log('Registering interactions....');
      await rest.put(Routes.applicationCommands(slappeyJSON.clientID), {
        body: interactions,
      });
      console.log('Interactions registered.');
    } catch (error) {
      console.log(error);
    }
    await client.login(slappeyJSON.token);
  } catch (error) {
    console.error(error);

    client.users.cache.get('696554549418262548')?.send('error');
  }
};
