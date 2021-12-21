// import { Client, Message, PermissionString } from 'discord.js';
// import DiscordClient from '../../client/client.js';
// import { client } from '../../sniper.js';
// import BaseCommand from '../../utils/structures/BaseCommand.js';

// export interface CommandOptions {
//   name: string;
//   category: string;
//   arguments?: {
//     value: string[];
//     required?: boolean;
//   };
//   aliases?: string[];
//   description?: string;
//   cooldownMessage?: string;
//   permissions?: PermissionString[];
//   cooldown?: {
//     value?: number;
//     message?: string;
//   };
//   disabled?: boolean;
// }

// export interface BaseCommand {
//   run: (
//     client: DiscordClient,
//     message: Message,
//     args: string[]
//   ) => Promise<any>;
// }

// interface ExtraCommandOptions {
//   cooldownMessage?: string;
//   argsDescription?: string;
//   argsRequired?: boolean;
//   permissions?: PermissionString[];
//   disabled?: boolean;
// }

// class ExperimentalBaseCommand {
//   /**
//    * @param _name the name of the command
//    * @param _category category
//    * @param _aliases other words to trigger the command
//    * @param _cooldown how long (in ms) before the same command can be triggered again. defaults to 0
//    * @param _description description in the help command
//    */
//   constructor(
//     private _name: string,
//     private _category: string,
//     private _aliases: Array<string>,
//     private _cooldown: number,
//     private _description: string,
//     private extraCommandOptions: ExtraCommandOptions = {
//       cooldownMessage: "You can't use this command yet",
//       argsDescription: undefined,
//       argsRequired: false,
//       permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
//       disabled: false,
//     },
//     private _run: (
//       client: DiscordClient,
//       message: Message,
//       args: string[]
//     ) => Promise<any>
//   ) {}

//   message?: Message;
//   get run() {
//     return this._run;
//   }

//   get name(): string {
//     return this._name;
//   }
//   get category(): string {
//     return this._category;
//   }
//   get aliases(): Array<string> {
//     return this._aliases;
//   }
//   get cooldown(): number {
//     return this._cooldown || 0;
//   }
//   get description(): string {
//     return this._description || '';
//   }
//   get cooldownMessage(): string {
//     return (
//       this.extraCommandOptions?.cooldownMessage ||
//       "you can't use this command yet"
//     );
//   }
//   get argsDescription(): string | undefined {
//     return this.extraCommandOptions?.argsDescription ?? undefined;
//   }
//   get permissionsRequired(): PermissionString[] {
//     return (
//       this.extraCommandOptions?.permissions || [
//         'SEND_MESSAGES',
//         'READ_MESSAGE_HISTORY',
//         'VIEW_CHANNEL',
//       ]
//     );
//   }
//   get argsRequired(): boolean {
//     return this.extraCommandOptions?.argsRequired ?? false;
//   }
//   get disabled(): boolean {
//     return this.extraCommandOptions?.disabled ?? false;
//   }

//   // /**
//   //  *
//   //  * @param {DiscordClient} client
//   //  * @param {Message | CommandInteraction} message
//   //  * @param {Array<string> | CommandInteractionOptionResolver | null} args
//   //  * @returns {Promise<void>}
//   //  */
//   // abstract run(
//   //   client: DiscordClient,
//   //   message: Message | CommandInteraction,
//   //   args: Array<string> | CommandInteractionOptionResolver | null
//   // ): Promise<any>;
// }

// export function Command(options: CommandOptions) {
//   return (constructor: new ()  =>any) => {
//     constructor.

//     new BaseCommand()

//     const command = (
//       options.name,
//       options.category,
//       options.aliases ?? [],
//       options.cooldown?.value ?? 500,
//       options.description ?? '',
//       {
//         argsDescription: options.arguments?.value.join(' '),
//         disabled: options.disabled ?? false,
//         argsRequired: options.arguments?.required ?? false,
//         permissions: options.permissions ?? [
//           'SEND_MESSAGES',
//           'READ_MESSAGE_HISTORY',
//           'VIEW_CHANNEL',
//         ],
//         cooldownMessage: options.cooldown?.message ?? '',
//       },
//       constructor.prototype.run
//     );
//     client.commands.set(command.name, command as any);
//   };
// }
// @Command({
//   name: 'test',
//   category: 'testing',
// })
// export class TestCommand {

//   async run(
//     client: DiscordClient,
//     message: Message<boolean>,
//     args: string[]
//   ): Promise<any> {
//     message.channel.send(args.join(' '));
//   }
// }
