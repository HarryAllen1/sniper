import BaseEvent from '../../utils/structures/BaseEvent';
import {
  Message,
  MessageActionRow,
  MessageButton,
  Collection,
} from 'discord.js';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/reply';

const cooldowns = new Map();

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('messageCreate');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;
    if (
      message.channel.id === '894742416345665576' &&
      message.author.id !== '696554549418262548'
    ) {
      if (
        message.content.toLowerCase() === 'science' ||
        message.content.toLowerCase().startsWith('bio')
      ) {
        message.member?.roles
          .add(
            message.guild!.roles.cache.find((role) => role.name === 'verified')!
          )
          .then(() => {
            message.delete();
          });
      }
    }

    if (
      message.content.toLowerCase().startsWith('pls snipe') ||
      message.content.toLowerCase().startsWith('pls reactionsnipe') ||
      message.content.toLowerCase().startsWith('pls editsnipe')
    ) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (!cooldowns.has(command?.name)) {
        cooldowns.set(command?.name, new Collection());
      }

      const currentTime = Date.now();
      const timeStamps = cooldowns.get(command?.name);
      const cooldownAmount = command?.cooldown;
      const cooldownMessage = command?.cooldownMessage;

      if (timeStamps.has(message.author.id)) {
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
    }

    if (
      message.content.substring(0, 4).replace(' ', '').startsWith(client.prefix)
    ) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (!cooldowns.has(command?.name)) {
        cooldowns.set(command?.name, new Collection());
      }

      const currentTime = Date.now();
      const timeStamps = cooldowns.get(command?.name);
      const cooldownAmount = command?.cooldown;
      const cooldownMessage = command?.cooldownMessage;

      if (timeStamps.has(message.author.id)) {
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
    }
  }
}
