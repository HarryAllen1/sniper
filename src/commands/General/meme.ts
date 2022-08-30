import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { fetch, randomNumber } from '../../lib/index.js';
import { RedditRes } from '../../typings/index.js';

@ApplyOptions<Command.Options>({
  description: 'Gets a meme from Reddit',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    const res = await fetch<RedditRes>(
      'https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100'
    );

    const json = res;
    const body = json.data;

    if (!body) {
      await interaction.reply({ embeds: [{ title: 'something happened' }] });
    }
    const posts = body.children;
    if (!posts) {
      await interaction.reply({ embeds: [{ title: 'something happened' }] });
    }
    const post = posts[randomNumber(0, 100)];
    await interaction.reply({
      embeds: [
        {
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
        },
      ],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030346364403722'],
      }
    );
  }
}
