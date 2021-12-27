import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import ms from 'ms';

export default class GCreateCommand extends BaseCommand {
  constructor() {
    super(
      'gcreate',
      'giveaways',
      [],
      3000,
      'Creates a giveaway. If no arguments are provided, Sniper will walk you through the creation.',
      {
        argsDescription: '[time] [amount of winners] [prize]',
        argsRequired: false,
        // permissions: ['MANAGE_GUILD']
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let time = 0;
    let winners = 0;
    let prize = '';
    if (
      !message.member?.permissions.has('MANAGE_GUILD') ||
      (!message.member?.permissions.has('MANAGE_GUILD') &&
        !message.member?.roles.cache.every((v) =>
          v.name.toLowerCase().includes('giveaway')
        )) ||
      !message.member?.roles.cache.every((v) =>
        v.name.toLowerCase().includes('giveaway')
      )
    )
      return reply(message, {
        title: "You don't have the permissions to do that.",
      });
    if (!args[0]) {
      await reply(message, {
        title: 'How long do you want this giveaway to last?',
        description: 'If no unit is provided, it will default to seconds.',
      });
      let iteration = 0;
      message.channel
        .createMessageCollector({
          filter: (m) => m.author.id === message.author.id,
        })
        .on('collect', async (msg) => {
          switch (iteration) {
            case 0:
              if (isNaN(Number(msg.content))) {
                if (
                  !/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                    msg.content
                  )
                ) {
                  reply(msg, {
                    title: 'Invalid time.',
                    description:
                      'Please try again with a valid time. The time must be a number or end with some form of unit (single letter or long-form units are both fine)',
                  });
                } else time = ms(msg.content);
              } else {
                time = Number(msg.content);
                await reply(message, {
                  title: `The time has been set to ${ms(time, {
                    long: true,
                  })}. How many winners do you want?`,
                });
                iteration++;
              }
              break;
            case 1:
              if (isNaN(Number(msg.content))) {
                reply(msg, {
                  title: 'Invalid amount of winners.',
                  description: 'The amount of winners must be a valid number.',
                  color: 'RED',
                });
              } else {
                winners = parseInt(msg.content);
                reply(msg, {
                  title: `The amount of winners has been set to ${winners}. What do you want the prize to be?`,
                });
                iteration++;
              }
              break;
            case 2:
              prize = msg.content;
              reply(msg, {
                title: `The prize has been set to ${prize}. Giveaway has been created.`,
                color: 'GREEN',
              });

              return;
          }
        });
    }
  }
}
