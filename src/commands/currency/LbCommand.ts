import { EmbedField, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/reply.js';
import { getFirestore } from 'firebase-admin/firestore';

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

  async run(client: DiscordClient, message: Message) {
    const usersCollection = getFirestore().collection('users');
    const lb = await usersCollection.orderBy('coins', 'desc').limit(10).get();

    const fields: EmbedField[] = [];
    let counter = 1;
    lb.forEach((user) => {
      const data = user.data();

      if (
        message.guild?.members.cache.get(user.id) &&
        data.coins !== undefined
      ) {
        fields.push({
          name: `${counter}. ${
            data.tag ||
            message.guild.members.cache.get(user.id)?.user.tag ||
            "couldn't get name"
          }`,
          value: data.coins.toString(),
          inline: false,
        });
        counter++;
      }
    });
    reply(message, {
      title: message.guild?.name,
      thumbnail: {
        url:
          message.guild?.iconURL({
            dynamic: true,
            format: 'webp',
            size: 256,
          }) ?? '',
      },
      description: 'Richest users in this server.',
      fields,
    });
  }
}
