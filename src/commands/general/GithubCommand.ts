import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

export default class GithubCommand extends BaseCommand {
  constructor() {
    super('github', 'general', [], 5000, 'Shows this bots Github repo');
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.send('https://github.com/MajesticString/sniper');
  }
}
