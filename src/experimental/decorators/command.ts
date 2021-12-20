// import { Client, Message, PermissionString } from 'discord.js';
// import { client } from '../../sniper.js';

// export interface CommandOptions {
//   name: string;
//   category: string;
//   args?: string[];
//   argsRequired?: boolean;
//   description?: string;
//   cooldown?: number;
//   cooldownMessage?: string;
//   permissions?: PermissionString[];
// }

// export interface BaseCommand {
//   run: (message: Message, args: string[]) => Promise<any>;
// }

// export function Command(options: CommandOptions) {
//   return (constructor: new (client: Client) => void) => {
//     const command = new constructor(client);
//     client.commands.set(options.name, command)
//   };
// }
// @Command({
//   name: 'test',
//   category: 'testing',

// })
// class TestCommand implements BaseCommand{
//   constructor(private client: Client) { }
//   async run(message: Message<boolean>, args: string[]): Promise<any> {
//     message.channel.send()
//   }
// }
