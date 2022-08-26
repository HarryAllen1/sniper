import type {
  ApplicationCommandOptionType,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10.js';

export interface SlashCommandBuilderOptions {
  description: string;
}

export class SlashCommand {
  constructor(
    private name: string,
    private options: SlashCommandBuilderOptions
  ) {
    this.data = {
      name: this.name,
      description: this.options.description,
    };
  }

  private data: RESTPostAPIApplicationCommandsJSONBody;

  // public addOption(option: CommandOption) {}
}

interface CommandOptionOptions {
  description: string;
  required?: boolean;
  autocomplete?: boolean;
}

export class CommandOption {
  constructor(
    private name: string,
    private type: ApplicationCommandOptionType,
    private options: CommandOptionOptions
  ) {}
}
