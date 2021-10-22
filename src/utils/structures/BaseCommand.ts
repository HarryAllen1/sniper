import {
  CommandInteraction,
  CommandInteractionOptionResolver,
  Message,
} from 'discord.js';
import DiscordClient from '../../client/client';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';

interface ExtraCommandOptions {
  cooldownMessage?: string;
  argsDescription?: string;
}

export default abstract class BaseCommand {
  /**
   * @param _name the name of the command
   * @param _category category
   * @param _aliases other words to trigger the command
   * @param _cooldown how long (in ms) before the same command can be triggered again. defaults to 0
   * @param _description description in the help command
   */
  constructor(
    private _name: string,
    private _category: string,
    private _aliases: Array<string>,
    private _cooldown: number,
    private _description: string,
    private extraCommandOptions?: ExtraCommandOptions
  ) {}

  get name(): string {
    return this._name;
  }
  get category(): string {
    return this._category;
  }
  get aliases(): Array<string> {
    return this._aliases;
  }
  get cooldown(): number {
    return this._cooldown ? this._cooldown : 0;
  }
  get description(): string {
    return this._description ? this._description : '';
  }
  get cooldownMessage(): string {
    return this.extraCommandOptions?.cooldownMessage
      ? this.extraCommandOptions.cooldownMessage
      : "you can't use this command yet";
  }
  get argsDescription(): string | boolean {
    return this.extraCommandOptions?.argsDescription
      ? this.extraCommandOptions.argsDescription
      : false;
  }

  slashCommand?: RESTPostAPIApplicationCommandsJSONBody;

  abstract run(
    client: DiscordClient,
    message: Message | CommandInteraction,
    args: Array<string> | CommandInteractionOptionResolver | null
  ): Promise<void>;
}
