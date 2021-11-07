import BaseEvent from '../../utils/structures/BaseEvent';
import { Message, Collection } from 'discord.js';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import { log } from '../../utils/helpers/console';
import { getFromBetween } from '../../utils/helpers/charactersBetween';
// import { sleep } from '../../utils/helpers/misc';
// import {
//   getGuildSettings,
//   setDefaultGuildSettings,
// } from '../../utils/helpers/fb';

const cooldowns = new Map();

export default class MessageCreateEvent extends BaseEvent {
  constructor() {
    super('messageCreate');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.content.toLowerCase().includes('cum')) {
      message.react('💦');
    }

    if (
      message.author.id === '493716749342998541' &&
      message.channelId === '888611523881213972'
    ) {
    }
    if (message.author.bot || !message.guild) return;

    if (message.content.toLowerCase().startsWith('pls snipe')) {
      const command = client.commands.get('snipe');
      command?.run(client, message, []);
    } else if (message.content.toLowerCase().startsWith('pls reactionsnipe')) {
      const command = client.commands.get('reactionsnipe');
      command?.run(client, message, []);
    } else if (message.content.toLowerCase().startsWith('pls editsnipe')) {
      const command = client.commands.get('editsnipe');
      command?.run(client, message, []);
    }
    for (let prefix of client.prefix) {
      if (message.content.startsWith(prefix)) {
        const [cmdName, ...cmdArgs] = message.content
          .slice(prefix.length)
          .trim()
          .split(/\s+/);
        const command = client.commands.get(cmdName);
        if (!cooldowns.has(command?.name)) {
          cooldowns.set(command?.name, new Collection());
        }
        log('Used command ' + command?.name);
        const currentTime = Date.now();
        const timeStamps = cooldowns.get(command?.name);
        const cooldownAmount = command?.cooldown;
        const cooldownMessage = command?.cooldownMessage;

        if (
          timeStamps.has(message.author.id) &&
          message.author.id !== '696554549418262548'
        ) {
          const expirationTime =
            timeStamps.get(message.author.id) + cooldownAmount;

          if (currentTime < expirationTime) {
            const timeLeft = expirationTime - currentTime;

            return reply(message, {
              title: cooldownMessage,
              description: `wait ${Math.round(
                timeLeft / 1000
              )} seconds before using this command`,
              color: 'RED',
            });
          }
        }

        timeStamps.set(message.author.id, currentTime);
        setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);
        if (command) {
          try {
            command.run(client, message, cmdArgs);
          } catch (error) {
            reply(message, {
              title: 'An error occurred while running this command.',
              description: `Error: ${error}`,
            });
          }
        }
      } else if (!message.content.startsWith('$')) {
        const $ = getFromBetween.get(message.content, '$', '$');
        for (let thing of $) {
          if (thing.length > 1) {
            const [cmdName, ...cmdArgs] = message.content.trim().split(/\s+/);
            client.commands.get('tex')!.run(client, message, $);
          }
        }
      }
    }
  }
}
