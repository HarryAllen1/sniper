import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import ms from 'ms';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class YearlyCommand extends BaseCommand {
  constructor() {
    super('yearly', 'currency', [], 365 * 86400000, 'Collects yearly coins');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    addCoinsToTotal(message.author.id, 1_000_000).then((val) => {
      reply(message, {
        title: 'Yearly coins',
        description: `You received **1_000,000** daily coins.\nYou now have ${val} coins.`,
        color: 'GREEN',
      });
    });
  }
}
