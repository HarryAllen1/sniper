import { EmbedField, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import admin from 'firebase-admin';
import { reply } from '../../utils/helpers/reply';

export default class LbCommand extends BaseCommand {
  constructor() {
    super(
      'lb',
      'currency',
      ['leaderboards', 'leaderboard', 'rich', 'richest'],
      3000,
      'Ranks people in order of wealth'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const usersCollection = admin.firestore().collection('users');
    const lb = await usersCollection
      .where('coins', '>', 0)
      .orderBy('coins', 'desc')
      .limit(10)
      .get();
    const fields: EmbedField[] = [];
    let counter = 1;
    lb.forEach((user) => {
      const data = user.data();
      if (message.guild?.members.cache.find((u) => u.user.tag === data.tag)) {
        fields.push({
          name: `${counter} ${data.tag ? data.tag : ''}`,
          value: data.coins.toString(),
          inline: false,
        });
        counter++;
      }
    });
    reply(message, {
      title: message.guild?.name,
      thumbnail: {
        url: message.guild?.iconURL({
          dynamic: true,
          format: 'webp',
          size: 256,
        })!,
      },
      description: 'Richest users. Users must have more than 0 coins.',
      fields,
    });
  }
}
