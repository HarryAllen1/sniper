import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getUserData, getUserDataRef } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';
import randomNumber from '../../utils/helpers/randomNumber';

export default class JailBreakCommand extends BaseCommand {
  constructor() {
    super(
      'jailbreak',
      'currency',
      [],
      900000,
      'If you are in jail, this command will attempt to break you out. You could fail however, and have to be in jail for longer.',
      {
        cooldownMessage: 'You need to rest.',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const userData = await getUserData(message.author.id);
    if (!userData.inJailUntil) {
      reply(message, {
        title: 'You can only use this command when you are in jail!',
        description:
          'You are in jail when you commit so many crimes that your balance drops below -5000',
        color: 'RED',
      });
      return;
    }
    const chanceOfSuccess = randomNumber(0, 75, true);
    reply(message, {
      title: `Your chance of success in this jailbreak is ${chanceOfSuccess}%`,
      description:
        'If you fail, you will lose 10k coins and you will be put in jail for an extra 2 hours. You can use this command in 15 minutes.',
      color: 'LUMINOUS_VIVID_PINK',
    });
  }
}
