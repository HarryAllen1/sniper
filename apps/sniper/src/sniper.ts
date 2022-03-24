import { REST } from '@discordjs/rest';
import { createColors } from 'colorette';
import { Routes } from 'discord-api-types/v9';
import { Intents } from 'discord.js';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync } from 'node:fs';
import { AutoPoster } from 'topgg-autoposter';
import DiscordClient from './client/client.js';
import { sleep } from './utils/helpers/misc.js';
import {
  interactions,
  registerCommands,
  registerEvents,
} from './utils/registry.js';

export const ONLY_UPDATE_COMMANDS =
  process.env.ONLY_UPDATE_COMMANDS && process.env.ONLY_UPDATE_COMMANDS === 'y';

export const firebaseCredentials = ONLY_UPDATE_COMMANDS
  ? {}
  : JSON.parse(readFileSync('./firebase-credentials.json').toString());

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  projectId: 'discord-sniper-5c7f0',
});

export const db = getFirestore();

export const slappeyJSON = ONLY_UPDATE_COMMANDS
  ? {}
  : JSON.parse(readFileSync('./slappey-prod.json').toString());

process.on('uncaughtException', console.error);

export const FIREBASE_PROJECT_ID = firebaseCredentials.project_id;
export const harrysDiscordID = '696554549418262548';

createColors();

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
  shards: 'auto',
});

client.db.db = db;

export const main = async (): Promise<void> => {
  try {
    if (ONLY_UPDATE_COMMANDS) writeFileSync('./all-commands.json', '');
    client.prefix = slappeyJSON.prefixes;

    const poster = AutoPoster(slappeyJSON.secrets.topggToken, client);
    poster.on('error', (err) => {
      console.log('topgg autoposter: ' + err.message);
    });
    // fetch(`https://discordbotlist.com/api/v1/bots/sniper-6531/stats`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: slappeyJSON.apiKeys.dbl.auth,
    //   },
    //   body: JSON.stringify({
    //     guilds: client.guilds.cache.size + 2,
    //     users: client.users.cache.size,
    //   }),
    // }).then(console.log);

    await registerCommands(client, './out/commands');

    await registerEvents(client, './out/events');
    await sleep(2000);

    if (
      process.env.ONLY_UPDATE_COMMANDS &&
      process.env.ONLY_UPDATE_COMMANDS === 'y'
    ) {
      console.log('Only registering commands');

      // eslint-disable-next-line no-process-exit
      process.exit(0);
    }
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
main();
