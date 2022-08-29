// lamo just use other stuff

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isNullishOrEmpty } from '@sapphire/utilities';
import type { ApplicationCommandOptionChoiceData } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { helpCommandHelperCollection } from '../../utils/registry.js';
import { Command } from '../../utils/structures/BaseCommand.js';

export default class HelpCommand extends Command {
  constructor() {
    super(
      'help',
      'general',
      ['commands', 'command'],
      1000,
      'Shows all commands and their descriptions',
      {
        argsDescription: '[category or command name]',
        argsRequired: false,
      }
    );
  }

  public override registerApplicationCommands(
    client: DiscordClient,
    registry: Command.CommandsRegistry
  ) {
    const commandChoices: {
      name: string;
      value: string;
    }[] = [];
    client.commands.forEach((cmd) => {
      if (cmd.name) commandChoices.push({ name: cmd.name, value: cmd.name });
    });
    registry.registerChatInputCommand((b) =>
      b
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((i) =>
          i
            .setName('category')
            .setDescription('Shows commands in a category')
            .setRequired(false)
            .setChoices(
              ...[
                ...helpCommandHelperCollection
                  .filter((v) => v.commands.length !== 0)
                  .keys(),
              ].map((v) => ({
                name: v,
                value: v,
              }))
            )
        )
        .addStringOption((i) =>
          i
            .setName('command')
            .setDescription('Gets info about a command')
            .setRequired(false)
            .setAutocomplete(true)
        )
    );
  }

  async autocompleteRun(
    client: DiscordClient,
    interaction: Command.AutocompleteInteraction
  ) {
    if (isNullishOrEmpty(interaction.options.getFocused()))
      return interaction.respond([
        ...client.commands
          .map((c) => ({ name: c.name, value: c.name }))
          .filter((v) => v.name)
          .slice(0, 19),
      ]);

    const query = interaction.options.getFocused().trim().toLowerCase();

    const results: ApplicationCommandOptionChoiceData[] = [];

    if (query.length) {
      for (const [name, command] of client.commands.entries()) {
        const exactKeyword = command.aliases
          ? command.aliases.find((s) => s.toLowerCase() === query.toLowerCase())
          : [];
        const includesKeyword = command.aliases
          ? command.aliases.find((s) =>
              s.toLowerCase().includes(query.toLowerCase())
            )
          : [];
        const isContentMatch = command.aliases
          ? command.name.toLowerCase().includes(query)
          : [];

        if (exactKeyword || includesKeyword || isContentMatch)
          results.push({
            name,
            value: name,
          });
      }
    }
    return interaction.respond(
      [...new Set(results)]
        .slice(0, 19)
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    );
  }
}
