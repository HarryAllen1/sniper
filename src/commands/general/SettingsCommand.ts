import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getUserData, setUserData } from '../../utils/user';
import { APIEmbedField } from 'discord-api-types';
import { camelToNormalCase } from '../../utils/string';

export default class SettingsCommand extends BaseCommand {
  constructor() {
    super('settings', 'general', [], 0, 'Displays user settings');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const sendSettings = (msg: Message) => {
      getUserData(message.author.id).then((data) => {
        const settings = data.settings;
        const settingsArray = Object.keys(settings);

        const settingsFields: Array<APIEmbedField> = [];
        settingsArray.forEach((setting) => {
          settingsFields.push({
            name: `${camelToNormalCase(setting)} (${settings[setting].value})`,
            value: data.settings[setting].description,
          });
        });
        msg.edit({
          content: '(placeholder text bc this cant be empty)',
          embeds: [
            {
              title: `${message.author.tag}'s settings`,
              fields: settingsFields,
            },
          ],
        });
      });
    };
    if (!args[0]) {
      const userData = await getUserData(message.author.id);
      if (!userData.settings) {
        message.reply('this takes a while...').then((msg) => {
          message.channel.sendTyping();
          setUserData(
            message.author.id,
            {
              settings: {
                mentionAuthorOnReply: {
                  value: true,
                  description:
                    'Whether or not Sniper mentions you while using inline replies.',
                },
              },
            },
            { merge: true }
          ).then(() => {
            sendSettings(msg);
          });
        });
      } else {
        message.reply('retrieving settings').then((msg) => {
          sendSettings(msg);
        });
      }
    }
  }
}
