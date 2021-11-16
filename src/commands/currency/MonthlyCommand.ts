import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import ms from 'ms';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class MonthlyCommand extends BaseCommand {
  constructor() {
    super('monthly', 'currency', [], ms('30d'), 'Collects monthly coins');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    addCoinsToTotal(message.author.id, 100_000).then((val) => {
      reply(message, {
        title: 'Monthly coins',
        description: `You received **100,000** daily coins.\nYou now have ${val} coins.`,
        color: 'GREEN',
      });
    });
  }
}
