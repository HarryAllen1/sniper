import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import axios, { AxiosResponse } from 'axios';
import { CreateGithubIssue, GithubIssue } from '../../utils/typings/Github';
import { token as ghToken } from '../../../github-credentials.json';

export default class FeatureCommand extends BaseCommand {
  constructor() {
    super(
      'feature',
      'general',
      ['requestfeature', 'featurerequest'],
      900000,
      'Requests a feature',
      {
        argsDescription: '<feature>: The requested bot feature.',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'You need to actually say what your feature is',
        description:
          'Try again in 15 minutes. Or you can create a Github Account and submit an issue here: https://github.com/MajesticString/sniper/issues',
        color: 'RED',
      });
      return;
    }
    axios
      .post<CreateGithubIssue, AxiosResponse<GithubIssue>>(
        'https://api.github.com/repos/MajesticString/sniper/issues',
        {
          title: `Feature by ${message.author.tag}. Made from Discord`,
          body: `This issue was created using the \`requestfeature\` command in Discord by ${message.author.tag}.\n${message.cleanContent}`,
          labels: ['feature'],
        },
        {
          headers: {
            Authorization: `token ${ghToken}`,
          },
        }
      )
      .then((res) => {
        reply(message, {
          title: 'Feature request Created',
          description: `[Here is the link to your feature on Github.](${res.data.html_url})`,
          color: 'GREEN',
        });
      })
      .catch((res) =>
        reply(message, {
          title: 'Something went wrong.',
          color: 'RED',
          description:
            'Try again in 15 minutes, or submit an issue [directly on Github.](https://github.com/MajesticString/sniper/issues)',
        })
      );
  }
}
