import type { Message } from 'discord.js';
import ms from 'ms';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { setIntervalLimited } from '../../utils/helpers/misc.js';
import { BaseCommand } from '../../utils/structures/BaseCommand.js';

export default class CancelCommand extends BaseCommand {
  constructor() {
    super(
      'cancel',
      'general',
      [],
      ms('12h'),
      'Mentions a user in a given channel a few times throughout the day.',
      {
        argsDescription:
          '[user (defaults to author >:))] [channel defaults to command channel]',
        argsRequired: false,
        cooldownMessage: 'dont spam people too much lmao',
      }
    );
  }

  async run(client: DiscordClient, message: Message) {
    const channel = message.mentions.channels.first() ?? message.channel;
    if (!channel.isText()) return reply(message, 'That is not a text channel!');
    const user = message.mentions.users.first() ?? message.author;
    message.reply({ content: `${user.toString()} aight, you got it` });
    setIntervalLimited(
      () => {
        channel.send(
          `${user.toString()} (requested by ${message.author.username})`
        );
      },
      ms('3h'),
      12
    );
  }
}
