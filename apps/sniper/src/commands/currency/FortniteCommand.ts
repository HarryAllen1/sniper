import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { addCoinsToTotal } from '../../utils/helpers/user.js';
import { reply } from '../../utils/helpers/message.js';

export default class FortniteCommand extends BaseCommand {
  constructor() {
    super(
      'fortnite',
      'currency',
      [],
      5000,
      'fortnite sucks. You have a 1% chance to gain 5 coins'
    );
  }

  async run(client: DiscordClient, message: Message) {
    const chance = Math.floor(Math.random() * 100);
    if (chance === 1) {
      const total = await addCoinsToTotal(message.author.id, 5);
      reply(message, {
        description: `You gained 5 coins! you now have ${total} coins!`,
        color: 'GREEN',
      });
    } else {
      const total = await addCoinsToTotal(message.author.id, -1000);
      reply(
        message,
        {
          description: `You lost 1000 coins! you now have ${total} coins! also fortnite is cringe`,
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
  }
}