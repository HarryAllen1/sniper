import { Message, MessageActionRow, MessageButton } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import {
  getUserData,
  getUserDataRef,
  setUserData,
} from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';
import randomNumber from '../../utils/helpers/randomNumber';

export default class JailBreakCommand extends BaseCommand {
  constructor() {
    super(
      'jailbreak',
      'currency',
      [],
      900000,
      'If you are in jail, this command will attempt to break you out. You could fail however, and have to be in jail for longer.',
      {
        cooldownMessage: 'You need to rest.',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    // message.channel.send('this command doesnt work lol');
    // return;

    try {
      const userData = await getUserData(message.author.id);
      if (!userData.inJailUntil) {
        reply(message, {
          title: 'You can only use this command when you are in jail!',
          description:
            'You have a 10% chance of being in jail when you use the `crime` command.',
          color: 'RED',
        });
        return;
      }
      const chanceOfSuccess = randomNumber(0, 75, true);
      const msg = await reply(
        message,
        {
          title: `Your chance of success in this jailbreak is ${chanceOfSuccess}%`,
          description:
            'If you fail, you will lose 10k coins and you will be put in jail for an extra 2 hours. You can use this command again in 15 minutes.\nDo you want to continue?',
          color: 'LUMINOUS_VIVID_PINK',
        },
        {
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setLabel('Yes')
                .setStyle('SUCCESS')
                .setCustomId('yes'),
              new MessageButton()
                .setLabel('No')
                .setStyle('DANGER')
                .setCustomId('no')
            ),
          ],
        }
      );
      const collector = msg.createMessageComponentCollector({
        componentType: 'BUTTON',
        // filter: (i) => {
        //   i.deferUpdate();
        //   i.deferReply();
        //   if (i.user.id !== message.author.id) {
        //     i.reply({ content: "This isn't your command.", ephemeral: true });
        //   }
        //   return i.user.id === message.author.id;
        // },
        time: 15000,
      });
      collector.on('collect', async (i) => {
        if (i.member?.user.id !== message.author.id) {
          i.reply({ content: "This isn't your command.", ephemeral: true });
          return;
        }
        if (i.customId === 'yes') {
          const jailBreakChance = randomNumber(0, 100, true);
          if (jailBreakChance > chanceOfSuccess) {
            i.reply({
              embeds: [
                {
                  title: 'You failed!',
                  description:
                    'You failed to break out of jail. You will be put in jail for an extra 2 hours.',
                  color: 'RED',
                },
              ],
            });
            setUserData(
              message.author.id,
              {
                inJailUntil: Date.now() + 7200000,
              },
              {
                merge: true,
              }
            );
          } else {
            i.reply({
              embeds: [
                {
                  title: 'You broke out of jail!',
                  description: 'You broke out of jail!',
                  color: 'GREEN',
                },
              ],
            });
            setUserData(
              message.author.id,
              {
                inJailUntil: null,
              },
              {
                merge: true,
              }
            );
          }
        } else if (i.customId === 'no') {
          msg.edit({
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setStyle('SUCCESS')
                  .setDisabled(true)
                  .setCustomId('yes')
                  .setLabel('Yes'),
                new MessageButton()
                  .setStyle('DANGER')
                  .setCustomId('no')
                  .setDisabled(true)
                  .setLabel('No')
              ),
            ],
          });
          i.reply({ content: 'Cancelled', ephemeral: true });
        }
      });
    } catch (error) {
      reply(message, { title: 'An error occurred.', color: 'RED' });
    }
  }
}
