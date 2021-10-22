import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class ShopCommand extends BaseCommand {
  constructor() {
    super('shop', 'currency', [], 1, 'The shop to get stuff from', {
      argsDescription: '[item]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('shop command works');
  }
}
