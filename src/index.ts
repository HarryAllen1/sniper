import '@kaname-png/plugin-statcord/register';
import {
  ApplicationCommandRegistries,
  LogLevel,
  RegisterBehavior,
} from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { createColors } from 'colorette';
import { ActivityType, GatewayIntentBits } from 'discord.js';
import { SniperClient } from './client.js';
import { config } from './config.js';

export const harrysDiscordID = '696554549418262548';

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.Overwrite
);

export const client: SniperClient = new SniperClient({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: {
    repliedUser: true,
    parse: ['users'],
  },
  rest: {},
  presence: {
    activities: [
      {
        name: `for deleted messages`,
        type: ActivityType.Watching,
      },
    ],
  },
  failIfNotExists: true,
  caseInsensitiveCommands: true,
  logger: {
    level: LogLevel.Info,
  },
  defaultCooldown: {
    delay: 3000,
    filteredUsers: [harrysDiscordID],
  },
  statcord: {
    key: config.statcord,
    autopost: true,
  },
});

createColors({ useColor: true });

void client.login(config.discordToken);
