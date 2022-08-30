import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ActivityType } from 'discord.js';
import { config } from '../../config.js';

@ApplyOptions<Command.Options>({
  description: 'Sets the status of sniper',
  preconditions: ['OwnerOnly'],
})
export class UserCommand extends Command {
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) =>
        b
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('type')
              .setDescription('The activity prefix')
              .setChoices(
                ...(
                  Object.keys(ActivityType) as Array<keyof typeof ActivityType>
                ).map((k) => ({ name: k, value: ActivityType[k].toString() }))
              )
              .setRequired(true)
          )
          .addStringOption((i) =>
            i
              .setName('activity')
              .setDescription('The activity')
              .setRequired(true)
          )
          .addStringOption((i) =>
            i.setName('url').setDescription('The url').setRequired(false)
          ),
      {
        guildIds: config.ownerGuilds,
      }
    );
  }

  public chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    this.container.client.user?.setActivity({
      name: interaction.options.getString('activity', true),
      type: parseInt(interaction.options.getString('type', true), 10),
      url: interaction.options.getString('url', false) as string | undefined,
    });
  }
}
