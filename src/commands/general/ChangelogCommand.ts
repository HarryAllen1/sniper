import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import Axios from 'axios';
import { GithubCommits } from '../../utils/typings/Github';
import { reply } from '../../utils/helpers/reply';

export default class ChangelogCommand extends BaseCommand {
  constructor() {
    super(
      'changelog',
      'general',
      [],
      5000,
      'Shows changes made and plans for the bot.',
      {
        cooldownMessage: 'this cooldown is to prevent spam.',
        argsDescription:
          '[number of changes to get. defaults to 5. this argument cannot go above 10.]',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    Axios.get<GithubCommits>(
      `https://api.github.com/repos/MajesticString/sniper/commits?per_page=${
        args[0] ? (parseInt(args[0]) > 10 ? '10' : args[0]) : '5'
      }`
    ).then((res) => {
      const { data } = res;
      const toReadableDate = (date: string) => {
        return new Date(date).toUTCString();
      };
      let githubCommitMessages: any[] = [];
      data.forEach((commit) => {
        githubCommitMessages.push({
          name: toReadableDate(commit.commit.author.date),
          value: commit.commit.message,
        });
      });
      reply(message, {
        title: 'Changelog',
        fields: githubCommitMessages,
        color: 'WHITE',
      });
    });
  }
}