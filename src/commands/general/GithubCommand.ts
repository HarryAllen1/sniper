import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class GithubCommand extends BaseCommand {
  constructor() {
    super('github', 'general', [], 5000, 'Shows this bots Github repo');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('https://github.com/MajesticString/sniper');
  }
}
