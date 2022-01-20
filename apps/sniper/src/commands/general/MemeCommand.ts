import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import randomNumber from '../../utils/helpers/randomNumber.js';
import { RedditRes } from '../../typings/types.js';
import { reply } from '../../utils/helpers/message.js';

export default class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'general', [], 3000, 'gets a meme from r/memes');
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.sendTyping();

    // if (memes) {
    //   res = memes;
    // } else {
    const get = await fetch(
      'https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100'
    );
    const res = (await get.json()) as RedditRes;
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
