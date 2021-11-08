import { Message, MessageAttachment } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import 'mathjax';
import sharp from 'sharp';
import { reply } from '../../utils/helpers/reply';

export default class TexCommand extends BaseCommand {
  constructor() {
    super('tex', 'util', ['math', 'latex'], 1000, 'Turns text into math');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'You need to provide some text to turn into math',
        color: 'RED',
      });
      return;
    }
    if (message.content.includes('%')) {
      reply(message, {
        title: 'Please do not use the percent sign in your tex command.',
        color: 'RED',
      });
      return;
    }
    if (message.content.trim().endsWith('\\')) {
      reply(message, {
        title: 'Please do not end your tex command with a backslash.',
        color: 'RED',
      });
      return;
    }
    try {
      require('mathjax')
        .init({
          loader: {
            load: ['input/tex', 'output/svg'],
          },
        })
        .then(async (MathJax: any) => {
          const svg = MathJax.tex2svg(args.join(' '), {
            display: true,
            // fontSize: '1.5em',
          });

          let img = sharp(
            Buffer.from(
              MathJax.startup.adaptor
                .innerHTML(svg)
                // .replaceAll('ex', 'rem')
                .replaceAll('currentColor', '#fff')
                .replace(
                  'vertical-align: -0.025rem;',
                  'vertical-align: -0.025rem; transform: scale(10) translate(100px, 10px)"  '
                )
            ),
            {
              density: 500,
            }
          )
            .png()
            .toBuffer();
          message.channel.send({
            content: message.author.toString(),
            files: [new MessageAttachment(await img, 'tex.png')],
          });
        });
    } catch (error) {
      reply(message, {
        title: 'Error',
        description:
          'An error occurred while trying to convert your text to math\n' +
          (error as any).toString(),
      });
    }
  }
}
