import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import { green } from 'colorette';
import {
  ActionRowBuilder,
  ActivityType,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  ComponentType,
  Guild,
  MessageActionRowComponentBuilder,
  PermissionFlagsBits,
} from 'discord.js';
import { harrysDiscordID } from '../../index.js';

@ApplyOptions<Listener.Options>({
  event: Events.GuildCreate,
})
export class GuildCreate extends Listener<typeof Events.GuildCreate> {
  public async run(guild: Guild) {
    this.container.client.user?.setActivity({
      name: `for deleted messages in ${this.container.client.guilds.cache.size} servers`,
      type: ActivityType.Watching,
    });
    const owner = await guild.fetchOwner({ force: true });

    await this.container.client.users.cache.get(harrysDiscordID)?.send({
      content: `(+) Now in ${this.container.client.guilds.cache.size} guilds.`,
      embeds: [
        {
          title: 'Added to Guild',
          description: [
            `**Guild Name:** ${guild.name}`,
            `**Guild ID:** ${guild.id}`,
            `**Guild Owner:** ${owner.user.tag} `,
            `**Guild Member Count:** ${guild.memberCount.toLocaleString()}`,
          ].join('\n'),
        },
      ],
    });
    this.container.logger.info(
      green(
        `Joined guild ${guild.name}. Now in ${this.container.client.guilds.cache.size} guilds.`
      )
    );
    if (
      guild.systemChannel &&
      guild.members.me?.permissions.has(PermissionFlagsBits.SendMessages) &&
      guild.members.me?.permissions.has(PermissionFlagsBits.ViewChannel) &&
      guild.systemChannel
        ?.permissionsFor(guild.members.me)
        .has(PermissionFlagsBits.SendMessages) &&
      guild.systemChannel
        ?.permissionsFor(guild.members.me)
        .has(PermissionFlagsBits.ViewChannel)
    ) {
      const msg = await guild.systemChannel?.send({
        embeds: [
          {
            title: 'Hello, I am Sniper',
            description:
              'A general purpose Discord bot. Includes snipe, edit snipe, and reaction snipe commands.',
            color: Colors.White,
            fields: [
              {
                name: 'Prefix:',
                value: '`$` or `%`',
              },
              {
                name: 'Help Command:',
                value: '`$help` or `%help`',
              },
            ],
          },
        ],
        components: [
          new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
            new ButtonBuilder()
              .setLabel('Remove')
              .setCustomId('remove')
              .setStyle(ButtonStyle.Primary)
          ),
        ],
      });
      msg
        .createMessageComponentCollector({
          componentType: ComponentType.Button,
        })
        .on('collect', async (i) => {
          await i.deferUpdate();

          if (i.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
            await msg.delete();
          } else {
            await i.reply({
              content:
                'You cannot delete this messages since you dont have the manage messages permission.',
              ephemeral: true,
            });
          }
        });
    }
  }
}
