import { Message } from 'discord.js';
import ms from 'ms';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class TimerCommand extends BaseCommand {
  constructor() {
    super(
      'timer',
      'util',
      [],
      5000,
      'Sets a timer. Updates every 5 seconds.',

      {
        argsDescription:
          '<timer length><unit (short or long; no spaces)> [timer description]',
        disabled: true,
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message)
      return message.reply(
        'This message is currently being redone. Check back in a day or two.'
      );
    let time: number;
    if (isNaN(Number(args[0]))) {
      if (
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.test(
          args[0] + args[1]
        )
      )
        time = ms(args[0] + args[1]);
      else return reply(message, { title: 'Invalid time.', color: 'RED' });
    }
  }
}
