import { Message, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class ClearCommand extends BaseCommand {
  constructor() {
    super(
      'clear',
      'moderation',
      [],
      0,
      'Clears the past <args> messages from the channel'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (
      !message.member?.guild.me?.permissions.has('MANAGE_MESSAGES') &&
      message.author.id !== '696554549418262548'
    ) {
      message.reply('you dont have the required perms lol');
      return;
    }
    if (!args[0]) {
      message.reply({
        embeds: [
          {
            title: 'please specify the number of messages to clear.',
            color: 'RED',
          },
        ],
      });
      return;
    }
    if (isNaN(parseInt(args[0]))) {
      message.reply({
        embeds: [
          {
            title:
              'the amount of messages you want me to clear must be a valid number below 100',
            color: 'RED',
          },
        ],
      });
      return;
    }
    if (parseInt(args[0]) > 100) {
      message.reply({
        embeds: [
          {
            title: "I can't clear that many messages",
            description:
              "the discord api doesn't let me. Number of messages must be below 100.",
            color: 'RED',
          },
        ],
      });
      return;
    }
    if (parseInt(args[0]) < 1) {
      message.reply('i have to delete at least 1 message');
      return;
    }

    await message.channel.messages
      .fetch({ limit: parseInt(args[0]) + 1 })
      .then(async (messages) => {
        await (message.channel as TextChannel).bulkDelete(messages);
        message.channel
          .send({
            embeds: [
              {
                title: `Deleted ${args[0]} + 1 message.`,
                description:
                  'Why +1? because you sent a command. that needs to be deleted.',
                color: 'GREEN',
              },
            ],
          })
          .then((message) =>
            setTimeout(() => {
              message.delete();
            }, 5000)
          );
      });
  }
}
