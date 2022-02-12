import {
  ButtonInteraction,
  InteractionCollector,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEditOptions,
} from 'discord.js';

interface StartOptions {
  message: Message;
  time?: number;
}

export class Paginator {
  /**
   * @param {MessageEditOptions[]} data Array with edit options for each page.
   */
  constructor(private data: MessageEditOptions[]) {
    if (!this.data?.length)
      throw new TypeError('Paginator data must have at least one value.');

    this.currentPage = 0; // 0-indexed
    this.row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('first')
        .setLabel('<<')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('previous')
        .setLabel('<')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('currentPage')
        .setStyle('SECONDARY')
        .setDisabled(true),
      new MessageButton().setCustomId('next').setLabel('>').setStyle('PRIMARY'),
      new MessageButton().setCustomId('last').setLabel('>>').setStyle('PRIMARY')
    );
    this.stopRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('stop')
        .setLabel('Stop')
        .setStyle('DANGER')
    );
  }

  currentPage: number;
  row: MessageActionRow;
  stopRow;

  /**
   * Starts the paginator.
   * @param {StartOptions} options
   * @returns {Promise<Message>}
   */
  async start({ message, time = 30000 }: StartOptions): Promise<Message> {
    const msg = await message.reply({
      ...(this.getPage(0) as any),
    });

    const collector = msg.createMessageComponentCollector({
      time,
      filter: (i) => {
        return i.user.id === message.author.id;
      },
      componentType: 'BUTTON',
    });
    collector.on('collect', (i) => this.onClicked(i, collector));
    collector.on('end', () => this.onEnd(msg));
    return msg;
  }

  /**
   * Listener for when a button is clicked.
   * @param {ButtonInteraction} interaction
   * @param {InteractionCollector} collector
   * @returns {Promise<void>}
   */
  async onClicked(
    interaction: ButtonInteraction,
    collector: InteractionCollector<ButtonInteraction>
  ): Promise<void> {
    if (interaction.customId === 'first') {
      if (this.currentPage === 0) {
        interaction.deferUpdate();
        return;
      }
      await interaction.update(this.getPage(0));
    } else if (interaction.customId === 'previous') {
      if (this.currentPage === 0) {
        await interaction.deferUpdate();
        return;
      }
      await interaction.update(this.getPage(this.currentPage - 1));
    } else if (interaction.customId === 'next') {
      if (this.currentPage === this.data.length - 1) {
        await interaction.deferUpdate();
        return;
      }
      await interaction.update(this.getPage(this.currentPage + 1));
    } else if (interaction.customId === 'last') {
      if (this.currentPage === this.data.length - 1) {
        await interaction.deferUpdate();
        return;
      }
      await interaction.update(this.getPage(this.data.length - 1));
    } else if (interaction.customId === 'stop') {
      collector.stop();
    }
  }

  /**
   * Listener for when the collector ends.
   * @param {CommandInteraction} message
   * @returns {Promise<void>}
   */
  async onEnd(message: Message): Promise<void> {
    this.row.components.forEach((component) => component.setDisabled(true));
    // if (message && message.editable)
    await message.edit({ components: [this.row] });
  }

  /**
   * Gets the send options for a page.
   * @param {number} number
   */
  getPage(number: number): MessageEditOptions {
    this.currentPage = number;
    (
      this.row.components.find(
        (component) =>
          component?.customId === 'currentPage' && component.type === 'BUTTON'
      ) as MessageButton
    )?.setLabel(`${number + 1}/${this.data.length}`);
    return { ...this.data[number], components: [this.row, this.stopRow] };
  }
}
