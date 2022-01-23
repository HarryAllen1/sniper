import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { snipes } from '../../lib/snipes.js';

@ApplyOptions<Command.Options>({
  name: 'snipe',
  detailedDescription:
    "After a message is deleted, this command shows what it was. If the creator of the deleted message doesn't want that message to be shown, they can use the `unsnipe` command.",
  description: 'Shows the last deleted message of this channel.',
  cooldownDelay: 3000,
})
export class SnipeCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    snipes;
    reply(message, await args.pick('string').catch(() => 'no args'));
    reply(
      message,
      (await args.pick('boolean').catch(() => 'no args')).toString()
    );
    reply(
      message,
      (await args.pick('channel').catch(() => 'no adfs args')).toString()
    );
  }
}
