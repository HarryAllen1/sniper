import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import ms, { StringValue } from 'ms';

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
      !args[0].endsWith('m') &&
      !args[0].endsWith('h') &&
      !args[0].endsWith('s')
    ) {
      reply(message, { title: 'the length must be h, m, or s', color: 'RED' });
      return;
    }
    const time = args[0].slice(0, -1);
    if (isNaN(parseInt(time))) {
      reply(message, { title: 'thats not a number' });
    }
    const endDate = ms(args[0] as StringValue);
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
