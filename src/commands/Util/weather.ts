import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { config } from '../../config.js';
import { fetch } from '../../lib/index.js';
import { WeatherAPIRes } from '../../typings/index.js';

@ApplyOptions<Command.Options>({
  description: 'Gets weather for a given location.',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('location')
              .setDescription(
                'Location to get weather forecast for. Basically any format works.'
              )
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030262021140537'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const res = await fetch<WeatherAPIRes>(
      'http://api.weatherapi.com/v1/forecast.json',
      {
        query: {
          key: config.weatherAPIKey,
          q: interaction.options.getString('location', true),
          days: 2,
        },
      }
    );
    if (res.error instanceof Error) return interaction.reply(res.error.message);

    return interaction.reply({
      embeds: [
        {
          title: `Weather forecast for ${res.location.name}, ${res.location.region}`,
          description: `**${res.current.condition.text}**`,
          fields: [
            {
              name: 'Temperature',
              value: `${res.current.temp_c}°C / ${res.current.temp_f}°F`,
              inline: true,
            },
            {
              name: 'Feels like',
              value: `${res.current.feelslike_c}°C / ${res.current.feelslike_f}°F`,
              inline: true,
            },
            {
              name: 'Humidity',
              value: `${res.current.humidity}%`,
              inline: true,
            },
            {
              name: 'Wind',
              value: `${res.current.wind_kph} kph / ${res.current.wind_mph} mph`,
              inline: true,
            },
            {
              name: 'Precipitation',
              value: `${res.current.precip_mm} mm / ${res.current.precip_in} in`,
              inline: true,
            },
            {
              name: 'UV index',
              value: res.current.uv.toString(),
              inline: true,
            },
            {
              name: 'Visibility',
              value: `${res.current.vis_km} km / ${res.current.vis_miles} miles`,
              inline: true,
            },
          ],
          thumbnail: {
            url: `https:${res.current.condition.icon}`,
          },
        },
      ],
    });
  }
}
