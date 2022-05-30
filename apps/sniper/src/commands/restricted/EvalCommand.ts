import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import type { Message } from 'discord.js';
import { inspect } from 'node:util';
import type DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import * as userImport from '../../utils/helpers/user.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as snipesImport from '../util/snipes.js';

export default class EvalCommand extends BaseCommand {
  constructor() {
    super(
      'eval',
      'restricted',
      [],
      0,
      'Executes Javascript code. Can only be used by the owner(s) of the bot.'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id === '696554549418262548') {
      const { result, success, type } = await this.eval(
        client,
        message,
        args.join(' '),
        {
          async: true,
          depth: 10,
          showHidden: false,
        }
      );

      const output = success
        ? codeBlock('js', result)
        : `**ERROR**: ${codeBlock('bash', result)}`;

      const typeFooter = `**Type**: ${codeBlock('typescript', type)}`;

      if (output.length > 2000) {
        return message.reply({
          content: `Output was too long... sent the result as a file.\n\n${typeFooter}`,
          files: [{ attachment: Buffer.from(output), name: 'output.js' }],
        });
      }
      return message.reply(`${output}\n${typeFooter}`);
      // try {
      //   const evalScript = async () => {
      //     eval(args.join(' '));
      //   };
      //   evalScript().catch(console.error);
      //   reply(message, { title: 'success', color: 'GREEN' }).then((msg) =>
      //     setTimeout(() => msg.delete(), 3000)
      //   );
      // } catch (err) {
      //   reply(message, {
      //     title: 'you messed up your code:\n' + err,
      //     color: 'RED',
      //   });
      // }
    } else {
      reply(message, {
        title: "You can't use this command.",
        description:
          'This command is so dangerous (it could literally wipe all files of the server this bot is running on) that only the creator of the bot can use it.',
        color: 'RED',
      });
    }
  }
  private async eval(
    client: DiscordClient,
    message: Message,
    code: string,
    flags: { async: boolean; depth: number; showHidden: boolean }
  ) {
    if (flags.async) code = `(async () => {\n${code}\n})();`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const msg = message;

    let success = true;
    let result = null;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
      const addCoinsToTotal = userImport.addCoinsToTotal;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
      const getTotalCoins = userImport.getTotalCoins;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
      const setTotalCoins = userImport.setTotalCoins;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
      const util = await import('node:util');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
      const snipes = snipesImport;
      // eslint-disable-next-line no-eval
      result = eval(code);
    } catch (error) {
      if (error && error instanceof Error && error.stack) {
        console.error(error);
      }
      result = error;
      success = false;
    }

    const type = new Type(result).toString();
    if (isThenable(result)) result = await result;

    if (typeof result !== 'string') {
      result = inspect(result, {
        depth: flags.depth,
        showHidden: flags.showHidden,
      });
    }

    return { result, success, type };
  }
}
