import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { addCoinsToTotal } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class FortniteCommand extends BaseCommand {
  constructor() {
    super(
      'fortnite',
      'currency',
      [],
      5000,
      'fortnite sucks. you have a 1% chance to gain 5 coins'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    try {
      const chance = Math.floor(Math.random() * 100);
      if (chance === 1) {
        const total = await addCoinsToTotal(message.author.id, 5);
        reply(message, {
          description: `you gained 5 coins! you now have ${total} coins!`,
          color: 'GREEN',
        });
      } else {
        const total = await addCoinsToTotal(message.author.id, -1000);
        reply(
          message,
          {
            description: `you lost 1000 coins! you now have ${total} coins! also fortnite sucks`,
            color: 'RED',
          },
          {
            files: [
              {
                attachment:
                  'https://www.myinstants.com/media/sounds/fortnite-funky-dance-earrape.mp3',
                name: 'fortnite.mp3',
              },
            ],
          }
        );
      }
    } catch (error) {
      reply(message, {
        title: `${
          message.guild?.members.cache.get('449750153759424515')?.toString() ||
          'whim#6166'
        }: your bot is stupid`,
        color: 'RED',
      });
    }
  }
}
