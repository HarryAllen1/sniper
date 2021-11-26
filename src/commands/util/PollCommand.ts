import { Message, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';

export default class PollCommand extends BaseCommand {
  constructor() {
    super('poll', 'util', [], 10000, 'starts a poll idk', {
      argsDescription: '<the poll>',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'you must actually provide a poll lol',
        color: 'RED',
      });
      return;
    }
    reply(message, {
      title: args.join(' '),
    }).then(async (msg) => {
      if (
        (msg.channel as TextChannel)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .permissionsFor(message.guild!.me!)
          .has('ADD_REACTIONS')
      ) {
        await msg.react('👍');
        await msg.react('👎');
      }
    });
  }
}
