// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild, MessageActionRow, MessageButton } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { log } from '../../utils/helpers/console.js';
import chalk from 'chalk';
import { harrysDiscordID } from '../../sniper.js';

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {
    client.user?.setActivity({
      name: `$help in ${client.guilds.cache.size} servers`,
      type: 'WATCHING',
    });
    const owner = await guild.fetchOwner({ force: true });

    client.users.cache.get(harrysDiscordID)?.send({
      content: `Now in ${client.guilds.cache.size} guilds.`,
      embeds: [
        {
          title: 'Added to Guild',
          description: [
            `**Guild Name:** ${guild.name}`,
            `**Guild ID:** ${guild.id}`,
            `**Guild Owner:** ${owner.user.tag} [<@${owner.user.id}>]`,
            `**Guild Member Count:** ${guild.memberCount.toLocaleString()}`,
          ].join('\n'),
          image: {
            url:
              guild.iconURL({ dynamic: true, size: 1024 }) ??
              owner.user.avatarURL({ dynamic: true, size: 1024 }) ??
              owner.user.defaultAvatarURL,
          },
        },
      ],
    });
    log(
      chalk.green(
        `Joined guild ${guild.name}. Now in ${client.guilds.cache.size} guilds.`
      )
    );
    if (
      guild.systemChannel &&
      guild.me?.permissions.has('SEND_MESSAGES') &&
      guild.me?.permissions.has('VIEW_CHANNEL') &&
      guild.systemChannel?.permissionsFor(guild.me).has('SEND_MESSAGES') &&
      guild.systemChannel?.permissionsFor(guild.me).has('VIEW_CHANNEL')
    ) {
      const msg = await guild.systemChannel?.send({
        embeds: [
          {
            title: 'Hello, I am Sniper',
            description:
              'A general purpose Discord bot. Includes snipe, edit snipe, and reaction snipe commands.',
            color: 'RANDOM',
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
          new MessageActionRow().addComponents(
            new MessageButton()
              .setEmoji('❌')
              .setCustomId('remove')
              .setStyle('PRIMARY')
          ),
        ],
      });
      msg
        .createMessageComponentCollector({ componentType: 'BUTTON' })
        .on('collect', (i) => {
          i.deferUpdate();
          if (!i.memberPermissions?.has('MANAGE_MESSAGES'))
            return i.reply({
              content:
                'You cannot delete this messages since you dont have the manage messages permission.',
              ephemeral: true,
            });
          else {
            msg.delete();
          }
        });
    }
  }
}
