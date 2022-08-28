import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  MessageActionRowComponentBuilder,
} from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Vote for this bot on top.gg and dbl!',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply({
      embeds: [
        {
          title: 'Vote for Sniper',
          color: Colors.White,
        },
      ],
      components: [
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('top.gg')
            .setURL('https://top.gg/bot/893619442712444970/vote'),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('dbl.com')
            .setURL('https://discordbotlist.com/bots/sniper-6531/upvote')
        ),
      ],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1012796152602693703'],
      }
    );
  }
}
