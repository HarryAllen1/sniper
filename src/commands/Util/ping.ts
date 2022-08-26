import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Colors, CommandInteraction, Message } from 'discord.js';
import ms from 'ms';

@ApplyOptions<Command.Options>({
  aliases: ['ping', 'pong'],
  name: 'Ping',
  description: 'Pings the bot and returns response times.',
  cooldownDelay: ms('5s'),
})
export class PingCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
      },
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        idHints: ['1012580900476821617'],
      }
    );
  }

  public async chatInputRun(message: CommandInteraction) {
    const msg = await message.reply({
      embeds: [{ title: 'pinging....', color: Colors.Red }],
      fetchReply: true,
    });

    await msg.edit({
      embeds: [
        {
          title: 'Pong!',
          description: 'these numbers do *not* represent lag.',
          color: Colors.Green,
          fields: [
            {
              name: 'Latency',
              value: `${ms(
                (msg as Message).createdTimestamp - message.createdTimestamp
              )}`,
            },
            {
              name: 'API Latency',
              value: `${this.container.client.ws.ping.toString()}ms`,
            },

            {
              name: 'Uptime (how long since the last bot restart; affects `snipe` commands)',
              value: `${ms(this.container.client.uptime ?? 0)}`,
            },
          ],
        },
      ],
    });
  }
}
