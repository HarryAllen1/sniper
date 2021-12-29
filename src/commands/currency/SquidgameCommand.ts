import { Message, MessageActionRow, MessageButton, Util } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import ms from 'ms';
import {
  disableAllComponents,
  removeAllComponents,
  reply,
} from '../../utils/helpers/message.js';
import { sleep } from '../../utils/helpers/misc.js';

export default class SquidgameCommand extends BaseCommand {
  constructor() {
    super(
      'squidgame',
      'currency',
      [],
      ms('5m'),
      `Plays Squid Game. In alpha stage.
      All dying results in your balance being reset to 0.
      How to play:
        * Red light, green light:
          * When the embed is green, you can click the 'Go Forwards' button to go forwards.
          * If the embed is red while you hit that button, you die.
      `,
      {
        argsRequired: false,
        cooldownMessage:
          "You can't use this command since you are recovering from emotional damage.",
        disabled: true,
      }
    );
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.send(
      "This game is in its alpha stage. Expect bugs. Currently doesn't give rewards."
    );

    const gameBoard = await reply(
      message,
      {
        title:
          'Are you sure you want to play? If you die, your balance will be reset to 0.',
        color: 'RED',
      },
      {
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel('Yes')
              .setStyle('SUCCESS')
              .setCustomId('startGame'),
            new MessageButton()
              .setLabel('No')
              .setStyle('DANGER')
              .setCustomId('endGame')
          ),
        ],
      }
    );

    gameBoard
      .createMessageComponentCollector()
      .on('collect', async (collected) => {
        collected.deferUpdate();
        if (collected.customId === 'startGame')
          startGame(client, message, gameBoard);
        else disableAllComponents(gameBoard);
      });
  }
}

const startGame = async (
  client: DiscordClient,
  message: Message,
  gameBoard: Message
) => {
  removeAllComponents(gameBoard);
  gameBoard.edit({
    embeds: [
      {
        title: 'Red Light, Green Light',
        description: 'If you dont know how to play, use `$help squidgame`',
        color: 'GREEN',
      },
    ],
  });
};
