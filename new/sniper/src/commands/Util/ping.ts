import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { reply } from '@sapphire/plugin-editable-commands';
import ms from 'ms';

@ApplyOptions<Command.Options>({
  aliases: ['ping', 'pong'],
  name: 'Ping',
  description: 'Pings the bot and returns response times.',
  cooldownDelay: ms('5s'),
})
export class PingCommand extends Command {
  public messageRun(message: Message) {
    reply(message, { embeds: [{ title: 'pinging....', color: 'RED' }] }).then(
      (msg) => {
        // const messageSendTime = Date.now();
        // let dbPing: number;
        // getUserData(message.author.id).then(() => {
        //   dbPing = Date.now();
        msg.edit({
          embeds: [
            {
              title: 'Pong!',
              description: 'these numbers do *not* represent lag.',
              color: 'GREEN',
              fields: [
                {
                  name: 'Latency',
                  value: `${ms(
                    msg.createdTimestamp - message.createdTimestamp
                  )}`,
                },
                {
                  name: 'API Latency',
                  value: `${this.container.client.ws.ping.toString()}ms`,
                },
                // {
                //   name: 'Database latency (affects currency commands)',
                //   value: `${(dbPing - messageSendTime).toString()}ms`,
                // },
                {
                  name: 'Uptime (how long since the last bot restart; affects `snipe` commands)',
                  value: `${ms(this.container.client.uptime ?? 0)}`,
                },
              ],
            },
          ],
        });
        // });
      }
    );
  }
}
