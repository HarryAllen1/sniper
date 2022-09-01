import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { time, TimestampStyles } from 'discord.js';
import ms from 'ms';

@ApplyOptions<Command.Options>({
  description: 'Shows information about a user',
  cooldownDelay: ms('5s'),
})
export class PingCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) =>
        b
          .setName(this.name)
          .setDescription(this.description)
          .addUserOption((i) =>
            i
              .setName('user')
              .setDescription('The user to get info about')
              .setRequired(false)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        idHints: ['1014030260876083220', '1014036475161096262'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;

    const member = await interaction.guild.members.fetch(
      interaction.options.getUser('user', false) ?? interaction.user.id
    );
    const { user } = member;

    await interaction.reply({
      embeds: [
        {
          title: `${user.tag}${member.nickname ? ` (${member.nickname})` : ''}`,
          thumbnail: {
            url: user.avatarURL({ extension: 'webp' }) || user.defaultAvatarURL,
          },
          color: member.displayColor,
          fields: [
            {
              name: 'ID',
              value: user.id,
              inline: true,
            },
            {
              name: 'Avatar',
              value: `[Link](${
                user.avatarURL({ extension: 'webp' }) || user.defaultAvatarURL
              })`,
              inline: true,
            },
            {
              name: 'Account Age',
              value: `${time(
                new Date(user.createdTimestamp),
                TimestampStyles.LongDateTime
              )} (${time(
                new Date(user.createdTimestamp),
                TimestampStyles.RelativeTime
              )})`,
              inline: true,
            },
            {
              name: 'Joined Server At',
              value: member.joinedAt
                ? `${time(
                    new Date(member.joinedAt),
                    TimestampStyles.LongDateTime
                  )} (${time(
                    new Date(member.joinedAt),
                    TimestampStyles.RelativeTime
                  )})`
                : "Couldn't get info",
              inline: true,
            },

            {
              name: 'Display Color',
              value: member.displayHexColor,
              inline: true,
            },
            {
              name: 'Permissions',
              value: member.permissions
                .toArray()
                .map((val) => `\`${val}\``)
                .toString(),
              inline: false,
            },
            {
              name: 'Roles',
              value: member.roles.cache
                .sort((f, s) => s.position - f.position)
                .map((val) => `${val}`)
                .toString(),
              inline: true,
            },
          ],
        },
      ],
    });
  }
}
