import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

import { reply } from '../../utils/helpers/reply.js';

export default class PrefixCommand extends BaseCommand {
  constructor() {
    super(
      'prefix',
      'general',
      ['prefixes'],
      5000,
      'shows the prefixes that this bot has'
    );
  }

  async run(client: DiscordClient, message: Message) {
    reply(message, {
      title: 'Prefixes',
      description: client.prefix.map((val) => `\`${val}\``).toString(),
    });
  }
}
