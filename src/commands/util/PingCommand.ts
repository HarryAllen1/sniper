import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getUserData } from '../../utils/helpers/user';
import { msToTime } from '../../utils/helpers/date';
import { reply } from '../../utils/helpers/reply';
import ms from 'ms';

export default class PingCommand extends BaseCommand {
  constructor() {
    super(
      'ping',
      'util',
      [],
      5000,
      'Pings the bot and returns response times.'
    );
  }

  async run(client: DiscordClient, message: Message) {
    reply(message, { title: 'pinging....', color: 'RED' }).then((msg) => {
      const messageSendTime = Date.now();
      let dbPing: number;
      getUserData(message.author.id).then(() => {
        dbPing = Date.now();
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
                  value: `${client.ws.ping.toString()}ms`,
                },
                {
                  name: 'Database latency (affects currency commands)',
                  value: `${(dbPing - messageSendTime).toString()}ms`,
                },
                {
                  name: 'Uptime (how long since the last bot restart; affects `snipe` commands)',
                  value: `${msToTime(client.uptime ?? 0)}`,
                },
              ],
            },
          ],
        });
      });
    });
  }
}
