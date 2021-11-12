import { Message, version } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class BotCommand extends BaseCommand {
  constructor() {
    super('bot', 'util', [], 15000, 'Shows information about the bot');
  }

  async run(
    client: DiscordClient,
    message: Message,
    args: Array<string>
  ): Promise<void> {
    message.channel.send({
      embeds: [
        {
          title: `${client.user?.tag}`,
          description: `${
            client.user?.presence?.activities?.length! > 0
              ? client.user?.presence.activities[0].name
              : 'No activity'
          }`,
          fields: [
            {
              name: 'Commands',
              value: client.commands.size.toString(),
              inline: true,
            },
            {
              name: 'ID',
              value: `${client.user?.id}`,
              inline: true,
            },
            {
              name: 'Guilds',
              value: `${client.guilds.cache.size}`,
              inline: true,
            },
            {
              name: 'Bot Age',
              value: `${new Date(
                client.user?.createdTimestamp!
              ).toLocaleDateString()}`,
              inline: true,
            },
            {
              name: 'Discord.js Version',
              value: `${version}`,
              inline: true,
            },
            {
              name: 'Node.js Version',
              value: `${process.version}`,
              inline: true,
            },
            {
              name: 'Uptime',
              value: `${client.uptime}`,
              inline: true,
            },
            {
              name: 'Memory Usage',
              value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                2
              )} MB`,
              inline: true,
            },
            {
              name: 'Size of bot files',
              value: `As of 11/11/2021:\n  With node_modules: 1.3G\n  Without node_modules: 3.4M`,
              inline: true,
            },
            {
              name: 'Github',
              value: 'https://github.com/MajesticString/sniper',
              inline: true,
            },
          ],
          color: 'WHITE',
          footer: {
            text: `Made by ||harry potter||#0014\nMore info can be found using the \`ping\` command.`,
          },
          timestamp: Date.now(),
        },
      ],
    });
  }
}
