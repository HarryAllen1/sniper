import {
  CommandInteraction,
  CommandInteractionOptionResolver,
  Message,
  PermissionString,
} from 'discord.js';
import DiscordClient from '../../client/client.js';

interface ExtraCommandOptions {
  cooldownMessage?: string;
  argsDescription?: string;
  argsRequired?: boolean;
  permissions?: PermissionString[];
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
    private extraCommandOptions: ExtraCommandOptions = {
      cooldownMessage: "You can't use this command yet",
      argsDescription: undefined,
      argsRequired: false,
      permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
    }
  ) {}

  message?: Message;

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
    return this._cooldown || 0;
  }
  get description(): string {
    return this._description || '';
  }
  get cooldownMessage(): string {
    return (
      this.extraCommandOptions?.cooldownMessage ||
      "you can't use this command yet"
    );
  }
  get argsDescription(): string | undefined {
    return this.extraCommandOptions?.argsDescription ?? undefined;
  }
  get permissionsRequired(): PermissionString[] {
    return (
      this.extraCommandOptions?.permissions || [
        'SEND_MESSAGES',
        'READ_MESSAGE_HISTORY',
        'VIEW_CHANNEL',
      ]
    );
  }
  get argsRequired(): boolean {
    return this.extraCommandOptions?.argsRequired ?? false;
  }

  /**
   *
   * @param {DiscordClient} client
   * @param {Message | CommandInteraction} message
   * @param {Array<string> | CommandInteractionOptionResolver | null} args
   * @returns {Promise<void>}
   */
  abstract run(
    client: DiscordClient,
    message: Message | CommandInteraction,
    args: Array<string> | CommandInteractionOptionResolver | null
  ): Promise<any>;
}
