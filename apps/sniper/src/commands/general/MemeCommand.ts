import type { Message } from 'discord.js';
import type DiscordClient from '../../client/client.js';
import type { RedditRes } from '../../typings/types.js';
import { fetch } from '../../utils/helpers/fetch.js';
import { reply } from '../../utils/helpers/message.js';
import randomNumber from '../../utils/helpers/randomNumber.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'general', [], 3000, 'gets a meme from r/memes');
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.sendTyping();

    // if (memes) {
    //   res = memes;
    // } else {
    const res = await fetch<RedditRes>(
      'https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100'
    );
    // setMemes(res);
    // }
    const json = res;
    const body = json.data;
    if (!body) {
      reply(message, { title: 'something happened' });
    }
    const posts = body.children;
    if (!posts) {
      reply(message, { title: 'something happened' });
    }
    const post = posts[randomNumber(0, 100)];
    reply(message, {
      title:
        post.data.title.length > 256
          ? `${post.data.title.slice(0, 253)}...`
          : post.data.title,
      url: `https://www.reddit.com${post.data.permalink}`,
      description: post.data.selftext,
      image: {
        url: post.data.url,
      },
      footer: {
        text: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`,
      },
    });
  }
}
