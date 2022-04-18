import { Message, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { slappeyJSON } from '../../sniper.js';
import { reply } from '../../utils/helpers/message.js';

export default class ActCommand extends BaseCommand {
  constructor() {
    super(
      'act',
      'general',
      [],
      5000,
      'Sends a command as someone else. Restricted to certain servers. [Open an issue here to apply](https://github.com/MajesticString/sniper/issues)',
      {
        argsDescription: '<mentioned user> message',
        argsRequired: true,
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!(slappeyJSON.actServers as string[]).includes(message.guildId ?? ''))
      return reply(message, {
        title: 'This command is restricted',
        description:
          'This command is restricted to certain servers. [Open an issue here to apply](https://github.com/MajesticString/sniper/issues',
      });

    if (
      !message.guild?.me
        ?.permissionsIn(message.channel as TextChannel)
        .has('MANAGE_WEBHOOKS')
    )
      return reply(message, {
        title: 'I do not have the `Manage Webhooks` permission',
        description:
          'I need the `Manage Webhooks` permission to use this command',
        color: 'RED',
      });
    const user = message.mentions.users.first();
    if (!user)
      return reply(message, { title: 'You must mention a user', color: 'RED' });
    if (!message.channel.isText())
      return reply(message, 'This command can only be used in text channels');
    const wh = await (message.channel as TextChannel).createWebhook(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user!.username,
      {
        avatar: user?.displayAvatarURL({ dynamic: false }),
        reason: 'sniper command',
      }
    );
    message.delete().catch(() => null);
    await wh.send({
      content: args.slice(1).join(' ') ?? '(no content provided)',
      allowedMentions: { parse: [] },
    });
    await wh.delete('sniper cleanup');
  }
}
