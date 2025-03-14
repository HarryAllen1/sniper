import {
  ActionRowBuilder,
  APIEmbed,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  Embed,
  EmbedBuilder,
  Message,
  MessageActionRowComponentBuilder,
  MessageCollectorOptionsParams,
} from 'discord.js';
import { isFunction } from 'lodash-es';
import EventEmitter from 'node:events';

export const disableAllComponents = (message: Message) => {
  if (!message.components && !message.components[0]) return message;

  const componentsClone = Object.assign({}, message.components);

  componentsClone.forEach((component) => {
    component.components.forEach((v) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- whatever
      v.disabled = true;
    });
  });
  return message.edit({
    components: componentsClone,
  });
};

export const removeAllComponents = (message: Message) => {
  if (!message.components && !message.components[0]) return message;

  return message.edit({
    components: [],
  });
};
export interface ConfirmationMessageOptions {
  disableComponentsOnDeny?: boolean;
  deleteComponentsOnDeny?: boolean;
  disableComponentsOnConfirm?: boolean;
  deleteComponentsOnConfirm?: boolean;
  confirmButtonLabel?: string;
  denyButtonLabel?: string;
  confirmButtonStyle?: ButtonStyle;
  denyButtonStyle?: ButtonStyle;
  confirmButtonCustomId?: string;
  denyButtonCustomId?: string;
  /**
   * If set, the `confirmButtonCustomId` property must be set.
   */
  customConfirmButton?:
    | ButtonBuilder
    | ((builder: ButtonBuilder) => ButtonBuilder);
  /**
   * If set, the `denyButtonCustomId` property must be set.
   */
  customDenyButton?:
    | ButtonBuilder
    | ((builder: ButtonBuilder) => ButtonBuilder);
  collectorOptions?: MessageCollectorOptionsParams<ComponentType.Button>;
}

export interface ConfirmationMessageI {
  on(event: 'confirm' | 'deny', listener: (i: ButtonInteraction) => void): this;
}

export class ConfirmationMessage
  extends EventEmitter
  implements ConfirmationMessageI
{
  private embed;
  public constructor(
    private message: Message | CommandInteraction,
    embed:
      | Embed
      | EmbedBuilder
      | APIEmbed
      | ((builder: EmbedBuilder) => EmbedBuilder),
    private options?: ConfirmationMessageOptions
  ) {
    super({ captureRejections: true });
    this.embed = isFunction(embed)
      ? embed(new EmbedBuilder()).toJSON()
      : embed instanceof EmbedBuilder
      ? embed.toJSON()
      : embed;

    void this.createCollector();
  }

  private async createCollector() {
    const msg = (await this.message.reply({
      embeds: [this.embed],
      components: [
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          (isFunction(this.options?.customDenyButton)
            ? this.options?.customDenyButton(new ButtonBuilder())
            : this.options?.customDenyButton) ??
            new ButtonBuilder()
              .setCustomId(this.options?.denyButtonCustomId ?? 'confirm')
              .setLabel(this.options?.denyButtonLabel ?? 'Yes')
              .setStyle(this.options?.denyButtonStyle ?? ButtonStyle.Success),
          (isFunction(this.options?.customDenyButton)
            ? this.options?.customDenyButton(new ButtonBuilder())
            : this.options?.customDenyButton) ??
            new ButtonBuilder()
              .setCustomId(this.options?.denyButtonCustomId ?? 'deny')
              .setLabel(this.options?.denyButtonLabel ?? 'No')
              .setStyle(this.options?.denyButtonStyle ?? ButtonStyle.Danger)
        ),
      ],
    })) as Message;
    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      dispose: this.options?.collectorOptions?.dispose,
      time: this.options?.collectorOptions?.time,
      idle: this.options?.collectorOptions?.idle ?? 15 * 1000,
      max: this.options?.collectorOptions?.max,
      filter:
        this.options?.collectorOptions?.filter ??
        ((m) =>
          m.user.id ===
          (this.message instanceof Message
            ? this.message.author
            : this.message.user
          ).id),
    });
    collector.on('collect', async (i) => {
      switch (i.customId) {
        case this.options?.confirmButtonCustomId ?? 'confirm':
          if (this.options?.disableComponentsOnConfirm !== false)
            await disableAllComponents(i.message);
          if (this.options?.deleteComponentsOnConfirm !== false)
            await removeAllComponents(i.message);
          this.emit('confirm', i);
          break;
        case this.options?.denyButtonCustomId ?? 'deny':
          collector.stop();
          if (this.options?.disableComponentsOnDeny !== false)
            await disableAllComponents(i.message);
          if (this.options?.deleteComponentsOnDeny !== false)
            await removeAllComponents(i.message);
          this.emit('deny', i);
          break;
        default:
          break;
      }
    });
    collector.on('dispose', async () => {
      await disableAllComponents(msg);
    });
  }
}
