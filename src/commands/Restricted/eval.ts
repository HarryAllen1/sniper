import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { inspect } from 'util';
import { config } from '../../config.js';

@ApplyOptions<Command.Options>({
  description: 'Evals any JavaScript code',
  preconditions: ['OwnerOnly'],
})
export class UserCommand extends Command {
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) =>
        b
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((o) =>
            o
              .setName('code')
              .setDescription('The code to eval')
              .setRequired(true)
          )
          .addBooleanOption((o) =>
            o
              .setName('async')
              .setDescription('Whether to run the code in an async function')
              .setRequired(false)
          )
          .addNumberOption((o) =>
            o
              .setName('depth')
              .setDescription('The depth to inspect the result with')
              .setRequired(false)
          )
          .addBooleanOption((o) =>
            o
              .setName('hidden')
              .setDescription('Whether to show hidden properties')
              .setRequired(false)
          )
          .addBooleanOption((o) =>
            o
              .setName('silent')
              .setDescription('Whether to send the result')
              .setRequired(false)
          ),
      {
        guildIds: config.ownerGuilds,
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const code = interaction.options.getString('code', true);

    const { result, success, type } = await this.eval(interaction, code, {
      async: interaction.options.getBoolean('async', false) ?? false,
      depth: Number(interaction.options.getNumber('depth', false)) ?? 0,
      showHidden: interaction.options.getBoolean('hidden', false) ?? false,
    });

    const output = success
      ? codeBlock('js', result)
      : `**ERROR**: ${codeBlock('bash', result)}`;
    if (interaction.options.getBoolean('silent', false)) return null;

    const typeFooter = `**Type**: ${codeBlock('typescript', type)}`;

    if (output.length > 2000) {
      return {
        content: `Output was too long... sent the result as a file.\n\n${typeFooter}`,
        files: [{ attachment: Buffer.from(output), name: 'output.js' }],
      };
    }

    return interaction.reply(`${output}\n${typeFooter}`);
  }

  private async eval(
    interaction: Command.ChatInputCommandInteraction,
    code: string,
    flags: { async: boolean; depth: number; showHidden: boolean }
  ) {
    if (flags.async) code = `(async () => {\n${code}\n})();`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const msg = interaction;

    let success = true;
    let result = null;

    try {
      // eslint-disable-next-line no-eval
      result = eval(code);
    } catch (error) {
      if (error && error instanceof Error && error.stack) {
        this.container.client.logger.error(error);
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
