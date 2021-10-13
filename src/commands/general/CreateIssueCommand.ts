import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import axios, { AxiosResponse } from 'axios';
import { CreateGithubIssue, GithubIssue } from '../../utils/typings/Github';
import { token as ghToken } from '../../../github-credentials.json';

export default class CreateIssueCommand extends BaseCommand {
  constructor() {
    super(
      'createissue',
      'general',
      ['issue', 'createproblem', 'problem'],
      900000,
      'Submits an issue for this bot.',
      {
        argsDescription: '<issue>: The issue with the bot.',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'You need to actually say what your issue is',
        description: 'Try again in 15 minutes',
        color: 'RED',
      });
      return;
    }
    axios
      .post<CreateGithubIssue, AxiosResponse<GithubIssue>>(
        'https://api.github.com/repos/MajesticString/sniper/issues',
        {
          title: `Issue by ${message.author.tag}. Made from Discord`,
          body: `This issue was created using the \`createIssue\` command in Discord by ${message.author.tag}.\n${message.cleanContent}`,
          labels: ['Bug'],
        },
        {
          headers: {
            Authorization: `token ${ghToken}`,
          },
        }
      )
      .then((res) => {
        reply(message, {
          title: 'Issue Created',
          description: `[Here is the link to your issue on Github.](${res.data.html_url})`,
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
