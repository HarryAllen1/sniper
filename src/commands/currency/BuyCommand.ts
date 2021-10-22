import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class BuyCommand extends BaseCommand {
  constructor() {
    super(
      'buy',
      'currency',
      [],
      250,
      'Buys an item from the shop. View available items through the `shop` command.',
      { argsDescription: '<item>' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('buy command works');
  }
}
