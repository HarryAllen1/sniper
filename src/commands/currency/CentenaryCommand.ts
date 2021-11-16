import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import ms from 'ms';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class CentenaryCommand extends BaseCommand {
  constructor() {
    super(
      'Centenary',
      'currency',
      [],
      ms('100y'),
      'Collects coins for a century'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    addCoinsToTotal(message.author.id, 100_000).then((val) => {
      reply(message, {
        title: 'no lol',
        description: `You lost **100,000** coins.\nYou now have ${val} coins.`,
        color: 'PURPLE',
      });
    });
  }
}
