import type { CommandInteraction, Message, TextChannel } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { slappeyJSON } from '../../sniper.js';
import { reply } from '../../utils/helpers/message.js';
import { Command } from '../../utils/structures/BaseCommand.js';

export default class ActCommand extends Command {
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

  async registerApplicationCommands(
    client: DiscordClient,
    registry: Command.CommandsRegistry
  ) {
    registry.registerChatInputCommand(
      (b) =>
        b
          .setName(this.name)
          .setDescription(
            'Sends a command as someone else. Restricted to certain servers.'
          )
          .addUserOption((i) =>
            i
              .setName('user')
              .setDescription('The user to impersonate')
              .setRequired(true)
          ),
      slappeyJSON.actServers
    );
  }

  async chatInputRun(client: DiscordClient, interaction: CommandInteraction) {
    if (
      !(slappeyJSON.actServers as readonly string[]).includes(
        interaction.guildId ?? ''
      )
    )
      return reply(interaction, {
        title: 'This command is restricted',
        description:
          'This command is restricted to certain servers. If you are a server admin, [open an issue here to apply](https://github.com/MajesticString/sniper/issues)',
      });

    if (
      !interaction.guild?.me
        ?.permissionsIn(interaction.channel as TextChannel)
        .has('MANAGE_WEBHOOKS')
    )
      return reply(interaction, {
        title: 'I do not have the `Manage Webhooks` permission',
        description:
          'I need the `Manage Webhooks` permission to use this command',
        color: 'RED',
      });
    const wh = await (interaction.channel as TextChannel)?.createWebhook(
      interaction.guild.members.cache.get(
        interaction.options.getUser('user', true).id
      )?.nickname ?? interaction.options.getUser('user', true).username,
      {
        avatar: interaction.options
          .getUser('user', true)
          .displayAvatarURL({ dynamic: false }),
        reason: 'sniper command',
      }
    );
    await wh.send({
      content: interaction.options.getString('message', true),
      allowedMentions: { parse: [] },
    });
    await wh.delete('sniper cleanup');
    interaction.reply({
      content: 'Sent!',
      ephemeral: true,
    });
  }
  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (
      !(slappeyJSON.actServers as readonly string[]).includes(
        message.guildId ?? ''
      )
    )
      return reply(message, {
        title: 'This command is restricted',
        description:
          'This command is restricted to certain servers. If you are a server admin, [open an issue here to apply](https://github.com/MajesticString/sniper/issues)',
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
      message.mentions.members?.first()?.nickname ?? user!.username,
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
