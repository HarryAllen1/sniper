import { SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import '@sapphire/plugin-editable-commands/register';
import { token } from '../config.json';

export const harrysDiscordID = '696554549418262548';

export const client = new SapphireClient({
  intents: [
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILDS',
  ],
  defaultPrefix: ['$', '%'],
  defaultCooldown: {
    delay: 3000,
    filteredUsers: [harrysDiscordID],
  },
});

(async () => {
  client.login(token);
})();
