import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getUserData, setUserData } from '../../utils/helpers/user';
import { APIEmbedField } from 'discord-api-types';
import { camelToNormalCase } from '../../utils/helpers/string';
import { reply } from '../../utils/helpers/reply';

export default class SettingsCommand extends BaseCommand {
  constructor() {
    super('settings', 'general', [], 500, 'Displays user settings', {
      argsDescription:
        '[setting to change] <setting value. must be `true` or `false`>',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const userData = await getUserData(message.author.id);

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
          embeds: [
            {
              title: `${message.author.tag}'s settings`,
              description:
                'To set a setting, type `,,settings [name of setting (case sensitive, sorry)] <true or false>`',
              fields: settingsFields,
            },
          ],
        });
      });
    };
    if (!args[0]) {
      if (!userData.settings) {
        reply(message, { title: 'this sometimes takes a while...' }).then(
          (msg) => {
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
          }
        );
      } else {
        reply(message, { title: 'retrieving settings' }).then((msg) => {
          sendSettings(msg);
        });
      }
    } else {
      const settings: any = {};
      settings[args[0]] = {
        value: args[1].toLowerCase() === 'true' ? 'true' : 'false',
      };

      if (!userData.settings[args[0]]) {
        reply(message, {
          title: "This setting doesn't exist.",
          description: 'Remember, capitalization matters.',
          color: 'RED',
        });
        return;
      } else if (
        args[1].toLowerCase() !== 'true' ||
        args[1].toLowerCase() !== 'false'
      ) {
        reply(message, {
          title: 'Setting value must be `true` or `false`',
          color: 'RED',
        });
        return;
      }

      setUserData(
        message.author.id,
        {
          settings: settings,
        },
        { merge: true }
      ).then(() => {
        reply(message, {
          title: `Successfully set ${args[0]} as ${args[1]}`,
          color: 'GREEN',
        });
      });
    }
  }
}
