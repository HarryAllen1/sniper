import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from '@sapphire/framework';
import { Colors, EmbedBuilder, Message, TextChannel } from 'discord.js';
import ms from 'ms';
import { getGuildSettings } from '../../lib/index.js';
import { snipes, unSnipes } from '../../lib/snipes.js';

@ApplyOptions<Command.Options>({
  name: 'snipe',
  detailedDescription:
    "After a message is deleted, this command shows what it was. If the creator of the deleted message doesn't want that message to be shown, they can use the `unsnipe` command.",
  description: 'Shows the last deleted message of this channel.',
  cooldownDelay: 3000,
  runIn: ['GUILD_ANY'],
})
export class SnipeCommand extends Command {
  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('type')
              .setDescription(
                'The type of message to be sniped. Default: messages'
              )
              .setChoices(
                { name: 'messages', value: 'messages' },
                { name: 'attachments', value: 'attachments' }
              )
              .setRequired(false)
          )
          .setDMPermission(false),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        idHints: ['1014030259131256963', '1014592793462710364'],
      }
    );
  }

  @RequiresGuildContext()
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;

    let type = interaction.options.get('type', false)?.value ?? 'messages';
    const snipe = snipes[interaction.channelId];
    const guildSettings = await getGuildSettings(interaction.guildId);

    if (!snipe)
      return interaction.reply({
        embeds: [
          {
            title: "There's nothing to snipe!",
            description:
              this.container.client.uptime &&
              this.container.client.uptime < ms('1m')
                ? 'The bot was just restarted less than a minute ago. All snipes are wiped after every restart.  The user might have also opted out of data collection.'
                : `Deleted messages can only be sniped within ${
                    guildSettings?.snipeDeleteTime ?? '60'
                      ? `${guildSettings?.snipeDeleteTime ?? '60'} minute(s)`
                      : '1 hour'
                  } of deletion (customizable with ${
                    this.container.client.application?.commands.cache.find(
                      (v) => v.name === 'changesnipedeletetime'
                    )?.id
                      ? `</changesnipedeletetime:${
                          this.container.client.application?.commands.cache.find(
                            (v) => v.name === 'changesnipedeletetime'
                          )?.id
                        }>`
                      : '/changesnipedeletetime'
                  }). The user might have also opted out of data collection.`,
            color: Colors.Red,
          },
        ],
      });

    snipes[interaction.channelId] = {
      ...snipes[interaction.channelId],
      requesterId: interaction.user.id,
    };

    if (!snipe.content && !snipe.embeds?.length && snipe.attachments)
      type = 'attachments';

    if (type === 'messages') {
      if (!snipe.content && snipe.embeds?.length)
        return interaction.reply({
          embeds: [
            {
              title:
                "This message didn't have any content, but it did have an embed. Try this command again with the `embeds` type.",
            },
          ],
        });

      await interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${
                  interaction.user.bot
                    ? "(if there is nothing here, the message was probably an embed and I can't send embeds in embeds)\n"
                    : ''
                }${snipe.content}${
                  snipe.attachments?.length
                    ? `\n\nAttachment(s): ${snipe.attachments
                        .map((val) => ` ${val} `)
                        .toString()}`
                    : ``
                }`
              )
              .setAuthor({
                name: snipe.author?.tag ?? "(couldn't fetch author)",
              })
              .setColor(Colors.Green)
              .setFooter({
                text: `#${
                  (interaction.channel as TextChannel).name
                } | If the original author or the person who requested this snipe wants to remove this message, they can use the \`unsnipe\` command.`,
              })
              .setTimestamp(snipe?.createdAt ? snipe.createdAt : 0),
          ],
          fetchReply: true,
        })
        .then((msg) => {
          unSnipes[interaction.channelId] = {
            msg,
          };
        });
    } else if (type === 'attachments') {
      if (!snipe.attachments?.length)
        return interaction.reply({
          embeds: [
            {
              title:
                "This message doesn't have any attachments. Try this command again with the `embeds` type.",
              color: Colors.Red,
            },
          ],
        });

      const paginator = new PaginatedMessage();
      paginator.addPages(snipe.attachments.map((a) => ({ content: a })));
      const unSnipe = await paginator.run(interaction);
      unSnipes[interaction.channelId] = {
        msg: unSnipe.response as Message,
      };
    }
  }
}
