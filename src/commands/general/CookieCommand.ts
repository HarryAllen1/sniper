import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class CookieCommand extends BaseCommand {
  constructor() {
    super('cookie', 'general', ['cookies'], 0, 'idk');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id === '756366146592309288') {
      reply(message, { title: 'no' });
      return;
    }
    message.channel.send(
      'idk. Sophia said cookies when i asked for command ideas. Oh, and btw, you lost 1000000000 coins.'
    );
    addCoinsToTotal(message.author.id, -1000000000);
  }
}
