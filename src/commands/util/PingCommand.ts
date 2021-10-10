import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import admin from 'firebase-admin';
import { getUserData } from '../../utils/user';
import { msToTime } from '../../utils/date';
import { reply } from '../../utils/reply';

const db = admin.firestore();

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

  async run(client: DiscordClient, message: Message, args: Array<string>) {
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
                  name: 'Latency (Date.now() - message.createdTimestamp)',
                  value: `${msg.createdTimestamp - message.createdTimestamp}ms`,
                },
                {
                  name: 'API Latency (client.ws.ping)',
                  value: `${client.ws.ping.toString()}ms`,
                },
                {
                  name: 'Database latency (affects currency commands)',
                  value: `${(dbPing! - messageSendTime).toString()}ms`,
                },
                {
                  name: 'Uptime (how long since the last bot restart; affects `snipe` commands)',
                  value: `${msToTime(client.uptime!)}`,
                },
              ],
            },
          ],
        });
      });
    });
  }
}
