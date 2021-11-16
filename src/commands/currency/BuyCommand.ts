import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { items as shopItems } from './items';
import { getUserData, setUserData } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class BuyCommand extends BaseCommand {
  constructor() {
    super(
      'buy',
      'currency',
      [],
      250,
      'Buys an item from the shop. View available items through the `shop` command.',
      { argsDescription: '<item>' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const categories = Object.keys(shopItems);
    const items = [];
    const itemNames = [];
    for (const category of categories) {
      for (const item of shopItems[category]) {
        items.push(item);
        itemNames.push(item.id);
      }

      const item = items.find((i) => i.id === args[0]);
      if (item) {
        const user = await getUserData(message.author.id);
        if (user.coins >= item.price) {
          if (!user.items) {
            user.items = [];
          }
          user.coins -= item.price;
          for (const userItem of user.items) {
            if (userItem.name === item.id) {
              userItem.amount += 1;
              await setUserData(message.author.id, user);
              return;
            }
          }

          user.items.push({ name: item.id, amount: 1 });
          await setUserData(message.author.id, user, { merge: true });
          reply(message, {
            title: `You bought a ${item.name} for ${item.price} coins.`,
            color: 'GREEN',
          });
        } else {
          reply(message, {
            title: `You don't have enough coins to buy that.`,
            color: 'RED',
          });
        }
        // await setUserData(message.author.id, user, { merge: true });
        // reply(message, {
        //   title: `You bought a ${item.name} for ${item.price} coins.`,
        //   description: `You now have ${user.coins} coins.`,
        //   color: 'GREEN',
        // });
      } else {
        reply(message, { title: "That item doesn't exist.", color: 'RED' });
      }
    }
  }
}
