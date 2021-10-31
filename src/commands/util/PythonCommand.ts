import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class PythonCommand extends BaseCommand {
  constructor() {
    super('python', 'util', [], 0, ':)');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send({
      embeds: [
        {
          title: 'python sucks. use anything else.',
          description:
            '"Python can do anything, just badly"\n         - Michael Reeves',
        },
      ],
    });
  }
}
