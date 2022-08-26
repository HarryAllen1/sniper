import {
  ApplicationCommandRegistries,
  container,
  LogLevel,
  RegisterBehavior,
} from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { createColors } from 'colorette';
import { ActivityType, GatewayIntentBits, type Message } from 'discord.js';
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
  ],
  defaultPrefix: ['$'],
  fetchPrefix: async (message: Message) => {
    const getGuildSettings = async (guildID: string) => {
      const val = await container.db.collection('guilds').doc(guildID).get();
      return val.data();
    };

    return (await getGuildSettings(message.guildId ?? ''))?.prefixes &&
      (await getGuildSettings(message.guildId ?? ''))?.prefixes[0]
      ? (await getGuildSettings(message.guildId ?? ''))?.prefixes
      : client.options.defaultPrefix;
  },
  allowedMentions: {
    repliedUser: true,
    parse: ['users'],
  },
  presence: {
    activities: [
      {
        name: 'for deleted messages',
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
});

(() => {
  // client.initDB();
  createColors({ useColor: true });
  void client.login(config.discordToken);
})();
