import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';

export default class RobCommand extends BaseCommand {
  constructor() {
    super('rob', 'currency', [], 30000, '(try) to rob someone!', {
      argsDescription: '<user ID or mentioned user to rob>',
      cooldownMessage: 'You need time to recover!',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'You need to specify a user to rob',
        description: 'dumb',
        color: 'RED',
      });
      return;
    }
    message.channel.send('rob command doesnt work yet');
  }
}
