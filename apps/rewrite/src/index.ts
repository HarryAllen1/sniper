import {
  ApplicationCommandRegistries,
  container,
  LogLevel,
  RegisterBehavior,
} from '@sapphire/framework';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-hmr/register';
import type { Message } from 'discord.js';
import { SniperClient } from './client.js';
import { config } from './config.js';

export const harrysDiscordID = '696554549418262548';

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.Overwrite
);

export const client: SniperClient = new SniperClient({
  intents: [
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILDS',
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
        type: 'WATCHING',
      },
    ],
  },
  failIfNotExists: true,
  caseInsensitiveCommands: true,
  logger: {
    level: LogLevel.Debug,
  },
  defaultCooldown: {
    delay: 3000,
    filteredUsers: [harrysDiscordID],
  },
});

(async () => {
  await client.initDB();
  void client.login(config.discordToken);
})();
