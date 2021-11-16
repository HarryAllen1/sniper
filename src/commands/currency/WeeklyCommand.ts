import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import ms from 'ms';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class WeeklyCommand extends BaseCommand {
  constructor() {
    super('weekly', 'currency', [], ms('1w'), 'Collects weekly coins.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    addCoinsToTotal(message.author.id, 15_000).then((val) => {
      reply(message, {
        title: 'Weekly coins',
        description: `You received **15,000** daily coins.\nYou now have ${val} coins.`,
        color: 'GREEN',
      });
    });
  }
}
