import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { time } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Gets info about a role or just displays all roles',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addRoleOption((i) =>
            i
              .setName('role')
              .setDescription('The role to get info about')
              .setRequired(false)
          )
          .setDMPermission(false),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030173257084989', '1014592795660517386'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;

    const role = interaction.options.getRole('role', false);

    if (!role)
      return interaction.reply({
        embeds: [
          {
            title: 'Roles',
            description: (await interaction.guild.roles.fetch())
              .map((r) => r.toString())
              .join(', '),
          },
        ],
      });

    await interaction.reply({
      embeds: [
        {
          title: `${role.name}`,
          description: `${role.toString()}`,
          color: role.color,
          fields: [
            {
              name: 'Emoji',
              value: `Role emoji: ${
                role.iconURL({ extension: 'webp' }) || 'none'
              }`,
              inline: true,
            },
            {
              name: 'Color',
              value: `Role color: ${role.hexColor || 'none'}`,
              inline: true,
            },
            {
              name: 'Position',
              value: `Role position: ${role.position}`,
              inline: true,
            },
            {
              name: 'Mentionable',
              value: `${role.mentionable ? 'yes' : 'no'}`,
              inline: true,
            },
            {
              name: 'Hoisted',
              value: `${role.hoist ? 'yes' : 'no'}`,
              inline: true,
            },
            {
              name: 'Managed',
              value: `${role.managed ? 'yes' : 'no'}`,
              inline: true,
            },
            {
              name: 'Created at',
              value: `${time(new Date(role.createdTimestamp), 'F')} (${time(
                new Date(role.createdTimestamp),
                'R'
              )})`,
              inline: true,
            },
            {
              name: 'Permissions',
              value: `${
                role.permissions
                  .toArray()
                  .map((v) => `\`${v}\``)
                  .toString() || 'No permissions'
              }`,
              inline: true,
            },
          ],
        },
      ],
    });
  }
}
