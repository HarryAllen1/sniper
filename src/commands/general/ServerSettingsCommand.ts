import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { isAdmin } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';
import { setGuildData } from '../../utils/helpers/fb';

export default class ServerSettingsCommand extends BaseCommand {
  constructor() {
    super(
      'serversettings',
      'general',
      ['ssettings'],
      0,
      'Sets the guild settings. Must have the "Manage server" permission'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!isAdmin(client, message.guild?.id!, message.author.id)) {
      reply(message, {
        title: "you are a normie, you can't use this command lol",
        description: 'you must have the "manage server" permission.',
        color: 'RED',
      });
      return;
    }
    const settings = ['dad', 'ree', 'sec', 'nou'];

    if (!args[0]) {
      reply(message, {
        description: `Available settings are ${settings
          .map((v) => (v = `\`${v}\``))
          .toString()}`,
        color: 'WHITE',
      });
      return;
    }

    if (!settings.includes(args[0])) {
      reply(message, {
        title: 'Thats not a setting.',
        description: `Available settings are ${settings
          .map((v) => (v = `\`${v}\``))
          .toString()}`,
        color: 'RED',
      });
      return;
    }
    if (args[1] !== 'true' && args[1] !== 'false') {
      reply(message, {
        title: 'setting value must be `true` or `false`',
        color: 'RED',
      });
      return;
    }

    const data: any = {};
    data[args[0]] = args[1] === 'true' ? true : false;
    setGuildData(message.guildId!, data);
  }
}
