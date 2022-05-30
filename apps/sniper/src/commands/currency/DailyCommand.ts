import type { Message } from 'discord.js';
import ms from 'ms';
import type DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class DailyCommand extends BaseCommand {
  constructor() {
    super(
      'daily',
      'currency',
      [],
      ms('1d'),
      '**DEPRECATED** Collects daily coins'
    );
  }

  async run(client: DiscordClient, message: Message) {
    reply(message, {
      title:
        'This command has been disabled, and will be removed in a future update.',
      description:
        'This is due to a being able to collect daily coins multiple times in a day due to common bot restarts.',
    });
  }
}
