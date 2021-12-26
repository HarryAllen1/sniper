import { Message, PermissionString } from 'discord.js';
import ms from 'ms';
import DiscordClient from '../client/client.js';
import { client } from '../sniper.js';
import { StringValue } from '../utils/helpers/misc.js';

export interface CommandOptions {
  name: string;
  category: string;
  arguments?: {
    value: string[];
    required?: boolean;
  };
  aliases?: string[];
  description?: string;
  permissions?: PermissionString[];
  cooldown?: {
    value?: number | StringValue;
    message?: string;
  };
  disabled?: boolean;
}

export const createCommand = (
  options: CommandOptions,
  command: (
    client: DiscordClient,
    message: Message,
    args: string[]
  ) => Promise<any>
) => {
  if (typeof options.cooldown?.value === 'string') {
    options.cooldown.value = ms(options.cooldown.value);
  }
  client.experimentalCommands.set(options.name, [options, command]);
};
