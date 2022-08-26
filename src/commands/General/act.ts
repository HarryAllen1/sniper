import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Colors, PermissionFlagsBits, TextChannel } from 'discord.js';
import { config } from '../../config.js';

@ApplyOptions<Command.Options>({
  description: 'Send a message as someone else',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!config.actServers.includes(interaction.guildId ?? ''))
      return interaction.reply({
        embeds: [
          {
            title: 'This command is restricted',
            description:
              'This command is restricted to certain servers. If you are a server admin, [open an issue here to apply](https://github.com/MajesticString/sniper/issues)',
          },
        ],
      });

    if (
      !interaction.guild?.members.me
        ?.permissionsIn(interaction.channel as TextChannel)
        .has(PermissionFlagsBits.ManageWebhooks)
    )
      return interaction.reply({
        embeds: [
          {
            title: 'I do not have the `Manage Webhooks` permission',
            description:
              'I need the `Manage Webhooks` permission to use this command',
            color: Colors.Red,
          },
        ],
      });
    const wh = await (interaction.channel as TextChannel)?.createWebhook({
      name:
        interaction.guild.members.cache.get(
          interaction.options.getUser('user', true).id
        )?.nickname ?? interaction.options.getUser('user', true).username,
      avatar: interaction.options.getUser('user', true).displayAvatarURL(),
      reason: 'sniper command',
    });
    await wh.send({
      content: interaction.options.getString('message', true),
      allowedMentions: { parse: [] },
    });
    await wh.delete('sniper cleanup');
    await interaction.reply({
      content: 'Sent!',
      ephemeral: true,
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
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
          )
          .addStringOption((i) =>
            i
              .setName('message')
              .setDescription('The message to send')
              .setRequired(true)
          ),
      {
        // guildIds: config.actServers,
        idHints: ['988311498440966214'],
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
      }
    );
  }
}
