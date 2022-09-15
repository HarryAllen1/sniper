import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, SapphireClient } from '@sapphire/framework';
import {
  ActivityType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { writeFile } from 'fs/promises';

@ApplyOptions<Listener.Options>({
  event: Events.ClientReady,
})
export class UserEvent extends Listener<typeof Events.ClientReady> {
  public async run(client: SapphireClient<true>) {
    client.logger.info(
      `${client.user.tag} is ready in ${client.guilds.cache.size} guilds`
    );
    client.user.setActivity({
      name: `for deleted messages in ${client.guilds.cache.size} servers`,
      type: ActivityType.Watching,
    });

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
