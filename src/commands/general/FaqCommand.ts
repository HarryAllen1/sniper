import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';

export default class FaqCommand extends BaseCommand {
  constructor() {
    super('faq', 'general', [], 1000, 'faq... pretty obvious');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
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
          "That's great! If you know how to code, you can [submit a pull request](https://github.com/MajesticString/sniper/pulls). If you don't, you can submit your feature on our [Github issues page](https://github.com/MajesticString/sniper/issues) (preferred). Or you can [DM this bot](https://discord.com/channels/@me/897633081127743528). Yes, i can see this bots DM's."
        )
    );
  }
}
