import { ApplyOptions } from '@sapphire/decorators';
import {
  ApplicationCommandRegistry,
  Events,
  Listener,
} from '@sapphire/framework';
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { writeFile } from 'fs/promises';

@ApplyOptions<Listener.Options>({
  event: Events.ApplicationCommandRegistriesRegistered,
})
export class UserListener extends Listener<
  typeof Events.ApplicationCommandRegistriesRegistered
> {
  public async run(registries: Map<string, ApplicationCommandRegistry>) {
    console.log('running');

    if (process.env.ONLY_UPDATE_DOCS) {
      const commands = JSON.parse('{}');
      this.container.stores.get('commands').forEach((cmd) => {
        if (!commands[cmd.category ?? cmd.fullCategory[0]])
          commands[cmd.category ?? cmd.fullCategory[0]] = [];
        commands[cmd.category ?? cmd.fullCategory[0]].push({
          name: cmd.name,
          description: cmd.description,
          filePath: `src/commands/${cmd.fullCategory.join('/')}/${cmd.name}.ts`,
          disabled: !cmd.enabled,
          options:
            // prettier-ignore
            (
              // @ts-expect-error its private; whatever
              cmd.applicationCommandRegistry.apiCalls[0] as {
                builtData: RESTPostAPIChatInputApplicationCommandsJSONBody;
              }
            ).builtData.options,
        });
      });
      await writeFile('./all-commands.json', JSON.stringify(commands, null, 2));
      process.exit(0);
    }
  }
}
