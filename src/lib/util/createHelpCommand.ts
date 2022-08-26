import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Command, StoreRegistryEntries } from '@sapphire/framework';
import { ChatInputCommandInteraction, EmbedBuilder, Message } from 'discord.js';
import ms from 'ms';

export interface HelpCommandOptions {
  /**
   * If you want a custom first page upon first using the help command, you can set this.
   */
  firstPage?: EmbedBuilder | ((embed: EmbedBuilder) => EmbedBuilder);
  /**
   * If a user who didn't start the command tried to use an interaction, this message will be sent.
   */
  wrongUserMessage?: string;
}

export interface HelpPages {
  [category: string]: Command[];
}

/**
 * Creates a help command
 * @param data The CommandStore instance to build the pages. Can be accessed through `this.container.stores.get('commands')`.
 * @param {any} replyTo The message or interaction to reply to when sending the help command.
 * @param options The options for the help command.
 */
export function createHelpCommand(
  data: StoreRegistryEntries['commands'],
  replyTo: ChatInputCommandInteraction | Message,
  options: HelpCommandOptions = {}
): Promise<PaginatedMessage> {
  const pages: HelpPages = {};
  // create a paginated message instance
  const pager = new PaginatedMessage();
  // set the first page

  if (options.firstPage) pager.addPageEmbed(options.firstPage);
  data.forEach((cmd) => {
    if (pages[cmd.category ?? 'No Category'])
      pages[cmd.category ?? 'No Category'].push(cmd);
    else pages[cmd.category ?? 'No Category'] = [cmd];
  });
  const categories = Object.keys(pages);

  categories.forEach((cat) => {
    const commands = pages[cat];

    pager.addPageEmbed((b) =>
      b.setTitle(cat).addFields(
        commands.map((cmd) => ({
          name: cmd.enabled ? cmd.name : `~~${cmd.name}~~ (disabled)`,
          value: `${
            cmd.description
              ? `**Description: **${cmd.description}`
              : typeof cmd.detailedDescription === 'string'
              ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                `**Description: **${cmd.detailedDescription}`
              : ''
          }
${
  cmd.aliases[0]
    ? `**Aliases: **${cmd.aliases.map((alias) => `\`${alias}\``)}`
    : ''
}
${
  typeof cmd.options.options === 'string'
    ? `**Options: **${cmd.options.options}`
    : cmd.options.options === true
    ? `**Options: ** any`
    : ''
}
${
  cmd.options.cooldownDelay
    ? `**Cooldown: **${ms(cmd.options.cooldownDelay)}`
    : ''
}`,
          inline: true,
        }))
      )
    );
  });
  pager.setWrongUserInteractionReply(() => ({
    ephemeral: true,
    content: options.wrongUserMessage ?? "This isn't your command.",
  }));

  return pager.run(replyTo);
}
