import BaseEvent from '../../utils/structures/BaseEvent';
import { Message, Collection } from 'discord.js';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import { log } from '../../utils/helpers/console';

import chalk from 'chalk';
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
    if (message.channel.type === 'DM') return;

    if (message.author.bot || !message.guild) return;

    // const guildSettings = await getGuildSettings(message.guild.id);

    // if (guildSettings!.ranks) {

    // }

    if (message.content === '<@!893619442712444970>') {
      client.commands.get('help')?.run(client, message, []);
    }
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
    for (const prefix of client.prefix) {
      if (message.content.startsWith(prefix.toLowerCase())) {
        if (!message.guild.me?.permissions.has('SEND_MESSAGES')) {
          message.author.send('i cant send messages in that server lol');
        }
        const [cmdName, ...cmdArgs] = message.content
          .slice(prefix.length)
          .trim()
          .split(/\s+/);
        const command = client.commands.get(cmdName.toLowerCase());
        if (!cooldowns.has(command?.name)) {
          cooldowns.set(command?.name, new Collection());
        }

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
          for (const permission of command?.permissionsRequired ?? [
            'SEND_MESSAGES',
            'READ_MESSAGE_HISTORY',
          ]) {
            if (!message.member?.permissions.has(permission)) {
              reply(message, {
                title: `You do not have the permission to use this command.`,
                color: 'RED',
              });
              return;
            }
          }
          try {
            const admin = await import('firebase-admin');
            const db = admin.firestore();

            const commandsIssued = await db
              .collection('bot')
              .doc('stats')
              .get();
            db.collection('bot')
              .doc('stats')
              .set(
                { commandsIssued: commandsIssued.data()?.commandsIssued + 1 },
                { merge: true }
              );
            log('Begin command ' + command?.name + ' in ' + message.guild.name);
            if (
              message.channel
                .permissionsFor(client.user ?? '')
                ?.has('SEND_MESSAGES')
            )
              command.run(client, message, cmdArgs).then(() => {
                log('End Command ' + command?.name);
              });
            else message.author.send("I can't send messages in that channel.");
          } catch (error) {
            log(chalk.red(error));
            reply(message, {
              title: 'An error occurred while running this command.',
              description: `Error: ${error}`,
            });
          }
        }
      } else if (!message.content.startsWith('$')) {
        // const $ = getFromBetween.get(message.content, '$', '$');
        // for (let thing of $) {
        //   if (thing.length > 1) {
        //     const [cmdName, ...cmdArgs] = message.content.trim().split(/\s+/);
        //     client.commands.get('tex')!.run(client, message, $);
        //   }
        // }
      }
    }
  }
}
