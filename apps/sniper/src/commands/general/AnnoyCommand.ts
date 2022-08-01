import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import Command from '../../utils/structures/BaseCommand.js';
import { users } from './annoy.js';

export default class AnnoyCommand extends Command {
  constructor() {
    super('annoy', 'general', [], 5000, '');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.guildId !== '631138980322344960') return;

    const user = message.mentions.users.first();
    if (!user) return reply(message, 'You must mention a user');

    users.push(user?.id ?? '');

    reply(message, 'Added user to annoy list');
    client.guilds.cache.reduce((acc, g) => (acc += g.memberCount), 0);
  }
}
