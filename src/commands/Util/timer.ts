import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Colors } from 'discord.js';
import { DateTime, Duration } from 'luxon';
import ms, { type StringValue } from 'ms';

@ApplyOptions<Command.Options>({
  description: 'Sets a timer. Updates every 5 seconds.',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((option) =>
            option
              .setName('time')
              .setDescription(
                'The time to set the timer for. Can use short units (ex 5m)'
              )
              .setRequired(true)
          )
          .addStringOption((i) =>
            i
              .setName('description')
              .setDescription('The description of the timer')
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030174414712943'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msRegex =
      /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i;

    let time: number;

    if (isNaN(Number(interaction.options.getString('time', true)))) {
      if (msRegex.test(interaction.options.getString('time', true)))
        time = ms(interaction.options.getString('time', true) as StringValue);
      else
        return interaction.reply({
          embeds: [{ title: 'Invalid time.', color: Colors.Red }],
        });
    } else
      time = ms(
        `${interaction.options.getString('time', true)}m` as StringValue
      );

    if (time >= Number.MAX_SAFE_INTEGER || time > ms('596h'))
      return interaction.reply({
        embeds: [
          {
            title: `The time must not exceed ${ms(Number.MAX_SAFE_INTEGER, {
              long: true,
            })}`,
            color: Colors.Red,
          },
        ],
      });
    if (time <= 0)
      return interaction.reply({
        embeds: [
          {
            title: 'The time must be positive.',
            color: Colors.Red,
          },
        ],
      });

    const staticTime = time;

    const endTime = DateTime.now()
      .setZone('America/Los_Angeles')
      .plus(Duration.fromDurationLike(time))
      .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    const msg = await interaction.reply({
      embeds: [
        {
          title: interaction.options.getString('description', true)
            ? `(${ms(time)}) ${interaction.options.getString(
                'description',
                true
              )}`
            : 'Timer',
          description: `${ms(time, { long: true })}`,
          color: Colors.Green,
          footer: {
            text: `Timer for ${ms(staticTime, {
              long: true,
            })}. Ends at ${endTime} PST`,
          },
        },
      ],
      fetchReply: true,
    });
    msg;
    let firstTime = true;

    const interval = setInterval(async () => {
      await msg.edit({
        embeds: [
          {
            title: interaction.options.getString('description', true)
              ? `(${ms(time)}) ${interaction.options.getString(
                  'description',
                  true
                )}`
              : 'Timer',
            description: `${ms(time, { long: true })}`,
            color: time > 0 ? Colors.Green : Colors.Red,
            footer: {
              text: `Timer for ${ms(staticTime, {
                long: true,
              })}. Ends at ${endTime} PST`,
            },
          },
        ],
      });
      time -= firstTime ? 10000 : 5000;
      firstTime = false;
    }, ms('5 seconds'));
    interval;
    setTimeout(async () => {
      clearInterval(interval);
      await msg.edit({
        embeds: [
          {
            title: interaction.options.getString('description', true)
              ? `(${ms(time)}) ${interaction.options.getString(
                  'description',
                  true
                )}`
              : 'Timer',
            description: `Timer has ended`,
            color: Colors.Red,
            footer: {
              text: `Timer for ${ms(staticTime, {
                long: true,
              })}. Ended at ${endTime} PST`,
            },
          },
        ],
      });
      await msg.reply(`${interaction.user.toString()} Your timer has ended.`);
    }, time);
  }
}
