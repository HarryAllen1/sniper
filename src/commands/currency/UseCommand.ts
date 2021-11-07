import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class UseCommand extends BaseCommand {
  constructor() {
    super('use', 'currency', [], 5000, 'Uses an item');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('use command works');
  }
}
