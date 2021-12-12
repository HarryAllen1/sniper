import { Message, MessageAttachment } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import status from 'minecraft-server-util';
import { reply } from '../../utils/helpers/message.js';

export default class MinecraftCommand extends BaseCommand {
  constructor() {
    super('minecraft', 'general', ['mc'], 15000, 'Displays info.');
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    if (!args[0] && message.guildId === '882695828140073052') {
      args[0] = 'bridgecam.minehut.gg';
    } else if (!args[0]) {
      return reply(message, {
        title: 'Please provide a server address.',
        color: 'RED',
      });
    }
    const flags = args.filter((arg) => arg.startsWith('--'));
    if (flags.includes('--bedrock'))
      status
        .statusBedrock(
          args[0],
          args[1] && args[1].startsWith('--')
            ? 19132
            : !args[1]
            ? 19132
            : parseInt(args[1])
        )
        .then((res) => {
          reply(message, {
            description: `Players: ${res.players.online}/${res.players.max}\nMessage of the Day: ${res.motd.clean}`,
          });
        })
        .catch((err) => {
          if (err.message) {
            reply(message, {
              title: err.message,
              description: `${
                (err.message as string).includes(
                  'Socket closed unexpectedly while waiting for data'
                )
                  ? 'This probably means that this server is offline.'
                  : 'Try again later.'
              }`,
            });
          }
        });
    else
      status
        .status(args[0], 25565)
        .then((res) => {
          reply(
            message,
            {
              description: `Players: ${res.players.online}/${res.players.max}\nMessage of the Day: ${res.motd.clean}`,
            },
            {
              files: res.favicon
                ? [
                    new MessageAttachment(
                      Buffer.from(
                        (res.favicon as string).split(',')[1],
                        'base64'
                      ),
                      'favicon.png'
                    ),
                  ]
                : [],
            }
          );
        })
        .catch((err) => {
          if (err.message) {
            reply(message, {
              title: err.message,
              description: `${
                (err.message as string).includes(
                  'Socket closed unexpectedly while waiting for data'
                )
                  ? 'This probably means that this server is offline.'
                  : 'Try again later.'
              }`,
            });
          }
        });
  }
}
