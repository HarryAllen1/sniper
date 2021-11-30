import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { default as axios } from 'axios';

import {
  BingMapsAddressRes,
  WeatherGovGridpointHourlyForecastRes,
  WeatherGovPointRes,
} from '../../typings/types';
import { reply } from '../../utils/helpers/reply.js';

export default class WeatherCommand extends BaseCommand {
  constructor() {
    super('weather', 'util', [], 5000, 'shows the weather', {
      argsDescription:
        '<city> [time period (hourly, daily. defaults to daily)]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, { title: 'You need to specify a city.', color: 'RED' });
      return;
    }
    if (args[1] && args[1] !== 'hourly' && args[1] !== 'daily') {
      reply(message, {
        title: 'time period must be hourly or daily',
      });
    }
    message.channel.sendTyping();
    try {
      const bingRes = (
        await axios.get<BingMapsAddressRes>(
          `https://dev.virtualearth.net/REST/v1/Locations/?locality=${args[0]}&maxResults=1&key=AkH0Laj3oJme_UaDRn7TD4EqBGJB0S9JYUMiHLfY574bJQc51PHPBezMon2rRvQE`
        )
      ).data;
      if (!bingRes.resourceSets[0]?.resources[0]?.point) {
        reply(message, {
          title: "That city wasn't found",
          description:
            'Try again maybe with a larger city nearby or an alternate spelling.',
          color: 'RED',
        });
        return;
      }
      if (
        bingRes.resourceSets[0]?.resources[0].address.countryRegion !==
        'United States'
      ) {
        reply(message, {
          title: 'Only US cities are supported at the moment',
          description: 'sorry',
          color: 'RED',
        });
        return;
      }
      const geoPoint = bingRes.resourceSets[0].resources[0].point.coordinates;

      const resourceInfo = await axios.get<WeatherGovPointRes>(
        `https://api.weather.gov/points/${geoPoint[0]},${geoPoint[1]}`
      );
      if (resourceInfo.status === 404) {
        reply(message, {
          title: 'Only US cities are supported at the moment',
          description: 'sorry',
          color: 'RED',
        });
        return;
      }
      const forecast =
        args[1] === 'hourly'
          ? (
              await axios.get<WeatherGovGridpointHourlyForecastRes>(
                resourceInfo.data.properties.forecastHourly
              )
            ).data.properties.periods
          : (
              await axios.get<WeatherGovGridpointHourlyForecastRes>(
                resourceInfo.data.properties.forecast
              )
            ).data.properties.periods;
      const fields: Array<{ name: string; value: string; inline?: boolean }> =
        [];
      forecast.forEach((period) => {
        fields.push({
          name: `${period.name} between ${new Date(
            period.startTime
          ).toLocaleTimeString()} and ${new Date(
            period.endTime
          ).toLocaleTimeString()}`,
          value: `
          Forecast: ${period.shortForecast}
          Temperature: ${period.temperature}°${period.temperatureUnit}
          Wind: ${period.windSpeed} ${period.windDirection}`,
          inline: true,
        });
      });
      reply(message, {
        title: bingRes.resourceSets[0].resources[0].name,
        description: forecast[0].temperature.toString() + '°F',
        thumbnail: { url: forecast[0].icon },
        fields: fields.slice(0, 9),
        footer: {
          text: 'Data provided by the National Weather Service.',
        },
      });
    } catch (error) {
      reply(message, {
        title: 'US Cities are only supported at the moment.',
        color: 'RED',
      });
    }
  }
}
