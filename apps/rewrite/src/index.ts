import { LogLevel } from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import '@sapphire/plugin-editable-commands/register';
import { token } from '../config.json';
import { SniperClient } from './client';

export const harrysDiscordID = '696554549418262548';

export const client = new SniperClient({
  intents: [
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILDS',
  ],
  defaultPrefix: ['$', '%'],
  regexPrefix: /^[$|%]/,
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
  disableMentionPrefix: true,
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
  void client.login(token);
})();
