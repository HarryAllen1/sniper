import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { items } from './items';
import { reply } from '../../utils/helpers/reply';

export default class ShopCommand extends BaseCommand {
  constructor() {
    super('shop', 'currency', [], 1, 'The shop to get stuff from', {
      argsDescription: '[category]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      const categories = Object.keys(items);
      reply(message, {
        title: 'Shop',
        description: `Use \`${'$'}shop [category]\` to get a list of items in a category.\n\n${categories.map(
          (category) => `\`${category}\``
        )}`,
      });
    } else {
      if (!items[args[0]]) {
        reply(message, {
          title: 'Shop',
          description: `\`${args[0]}\` is not a valid category.`,
        });
      } else {
        reply(message, {
          title: 'Shop',
          description: `${items[args[0]].map(
            (item) => `\`${item.name}\` - $${item.price}`
          )}`,
        });
      }
    }
  }
}
