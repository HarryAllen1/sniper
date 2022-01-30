import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import ms from 'ms';
import { StringValue } from '../../utils/helpers/misc.js';

export default class TimerCommand extends BaseCommand {
  constructor() {
    super(
      'timer',
      'util',
      [],
      5000,
      'Sets a timer. When the timer ends, you will be pinged 3 times.',

      {
        argsDescription: '<timer length> [timer label]',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) return;
    if (
      isNaN(parseInt(args[0])) &&
      !/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.test(
        args.join(' ')
      )
    ) {
      reply(message, {
        title: 'The length must be a valid time unit',
        color: 'RED',
      });
      return;
    }
    const time = args[0].length > 1 ? args[0].slice(0, -1) : args[0];
    if (isNaN(parseInt(time))) {
      reply(message, { title: 'Thats not a number' });
    }

    const endDate = ms(args.join(' ') as StringValue);

    reply(message, { title: 'Set a timer for ' + args[0] });
    setTimeout(() => {
      reply(
        message,
        { title: `Your timer ${args[1] ? `for ${args[1]} ` : ''}has ended.` },
        {
          content: message.author.toString(),
        }
      );
      setTimeout(() => {
        message.reply(message.author.toString());
      }, 1000);
      setTimeout(() => {
        message.reply(message.author.toString());
      }, 1000);
    }, endDate);
  }
}
