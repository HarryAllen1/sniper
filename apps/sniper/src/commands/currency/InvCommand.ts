import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

export default class InvCommand extends BaseCommand {
  constructor() {
    super('inv', 'currency', [], 0, 'Shows the items that you currently have', {
      argsDescription: '[userID or mentioned user]',
    });
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.send('not implemented yet');
  }
}
