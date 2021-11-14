import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import ms from 'ms';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class DailyCommand extends BaseCommand {
  constructor() {
    super('daily', 'currency', [], ms('1d'), 'Collects daily coins', {
      cooldownMessage: 'this is a *daily* command. it works only once per day.',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    addCoinsToTotal(message.author.id, 10_000).then((val) => {
      reply(message, {
        title: 'Daily coins',
        description: `You received **10,000** daily coins.\nYou now have ${val} coins.`,
        color: 'GREEN',
      });
    });
  }
}
