import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class GEndCommand extends BaseCommand {
  constructor() {
    super('gEnd', 'giveaways', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('gEnd command works');
  }
}