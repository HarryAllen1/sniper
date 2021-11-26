import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import axios from 'axios';
import randomNumber from '../../utils/helpers/randomNumber';
import { RedditRes } from '../../utils/typings/types';
import { reply } from '../../utils/helpers/reply';

export default class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'general', [], 3000, 'gets a meme from r/memes');
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.sendTyping();

    // if (memes) {
    //   res = memes;
    // } else {
    const get = await axios.get<RedditRes>(
      'https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100'
    );
    const res = get.data;
    // setMemes(res);
    // }

    const body = res.data;
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
