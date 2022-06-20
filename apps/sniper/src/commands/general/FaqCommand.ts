import { Message, MessageEmbed } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { BaseCommand } from '../../utils/structures/BaseCommand.js';

export default class FaqCommand extends BaseCommand {
  constructor() {
    super('faq', 'general', [], 1000, 'faq... pretty obvious');
  }

  async run(client: DiscordClient, message: Message) {
    reply(
      message,
      new MessageEmbed()
        .setTitle('Frequently asked questions')
        .addField(
          '<insert name of command> is rigged!',
          'No, its not. Proof is in this bots [source code.](https://github.com/MajesticString/sniper)'
        )
        .addField(
          '<insert name of command> is broken!',
          'Submit an issue on our [Github issues page.](https://github.com/MajesticString/sniper/issues)'
        )
        .addField(
          'I have a suggestion for this bot',
          "That's great! If you know how to code, you can [submit a pull request](https://github.com/MajesticString/sniper/pulls). If you don't, you can submit your feature on our [Github issues page](https://github.com/MajesticString/sniper/issues) (preferred)."
        )
    );
  }
}
