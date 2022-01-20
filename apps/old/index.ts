import {
  Client,
  Intents,
  MessageEmbed,
  TextChannel,
  Collection,
  GuildEmoji,
  RoleResolvable,
  User,
  Emoji,
  PartialUser,
  ReactionEmoji,
} from 'discord.js';
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'REACTION', 'USER'],
});
import { token } from './config.json';
export type UniversalEmoji = GuildEmoji | ReactionEmoji | Emoji;
interface SnipeContent {
  author?: User;
  content?: string;
  createdAt: number | null;
  id?: string;
  emoji?: UniversalEmoji;
  messageURL?: string;
  user?: User | PartialUser;
}

interface Snipe {
  [channelId: string]: SnipeContent;
}

let snipes: Snipe = {};
let editSnipes: Snipe = {};
let reactionSnipes: Snipe = {};

const formatEmoji = (emoji: UniversalEmoji | undefined) => {
  // this is a little confusing, but ill try to explain:
  // The outer statement checks if the emoji exists. If it doesn't, it returns an empty string.
  // The inner statement checks if the bot can use the emoji, then returns it as a string.
  return emoji
    ? !emoji.id || (emoji as GuildEmoji).available
      ? emoji.toString() // bot has access or unicode emoji
      : `[:${emoji.name}:](${emoji.url})`
    : ''; // bot cannot use the emoji
};

client.on('ready', (client) => {
  console.log(`[sniper] :: Logged in as ${client.user.tag}.`);
  client.user.setActivity({
    name: 'deleted messages',
    type: 'WATCHING',
  });
});

client.on('messageDelete', async (message) => {
  if (message.partial) return; // content is null
  console.log(message.guild!.name + ': ' + message.content);
  snipes[message.channel.id] = {
    author: message.author,
    content: message.content,
    createdAt: message.createdTimestamp,
  };
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.partial) return; // content is null
  if (oldMessage.author.id !== '270904126974590976')
    console.log(
      `old message (${
        oldMessage.guild!.name
      }):\n${oldMessage}\nnew message:\n${newMessage}`
    );
  editSnipes[oldMessage.channel.id] = {
    author: oldMessage.author,
    content: oldMessage.content,
    createdAt: newMessage.editedTimestamp,
    id: newMessage.id,
  };
});

client.on('messageCreate', async (message) => {
  if (
    message.channel.id === '894742416345665576' &&
    message.author.id !== '696554549418262548'
  ) {
    if (
      message.content.toLowerCase() === 'science' ||
      message.content.toLowerCase().startsWith('bio')
    ) {
      message.member?.roles
        .add(
          message.guild!.roles.cache.find((role) => role.name === 'verified')!
        )
        .then(() => {
          message.delete();
        });
    }
  }
  const channel = message.channel;
  const args = message.content.slice('pls '.length).split(/ +/g);
  if (message.content.toLowerCase().startsWith(',,eval ')) {
    if (message.author.id === '696554549418262548') {
      try {
        eval(message.content.substring(7));
      } catch (err) {
        message.reply('you messed up your code:\n' + err);
      }
    }
  }
  if (args.shift()!.toLowerCase() === 'clear') {
    if (!message.member?.guild.me?.permissions.has('MANAGE_MESSAGES')) {
      message.reply('you dont have the required perms lol');
      return;
    }
    if (!args[0]) {
      message.reply({
        embeds: [
          {
            title: 'please specify the number of messages to clear.',
            color: 'RED',
          },
        ],
      });
      return;
    }
    if (isNaN(parseInt(args[0]))) {
      message.reply({
        embeds: [
          {
            title:
              'the amount of messages you want me to clear must be a valid number below 100',
            color: 'RED',
          },
        ],
      });
      return;
    }
    if (parseInt(args[0]) > 100) {
      message.reply({
        embeds: [
          {
            title: "I can't clear that many messages",
            description:
              "the discord api doesn't let me. Number of messages must be below 100.",
            color: 'RED',
          },
        ],
      });
      return;
    }
    if (parseInt(args[0]) < 1) {
      message.reply('i have to delete at least 1 message');
      return;
    }
    console.log('test');

    await message.channel.messages
      .fetch({ limit: parseInt(args[0]) + 1 })
      .then(async (messages) => {
        await (message.channel as TextChannel).bulkDelete(messages);
        message.channel
          .send({
            embeds: [
              {
                title: `Deleted ${args[0]} + 1 message.`,
                description:
                  'Why +1? becuase you sent a command. that needs to be deleted.',
                color: 'GREEN',
              },
            ],
          })
          .then((message) =>
            setTimeout(() => {
              message.delete();
            }, 5000)
          );
      });
  }
  if (message.content.toLowerCase().startsWith('pls snipe')) {
    message.channel.sendTyping();
    const snipe = snipes[channel.id];

    await message
      .reply(
        snipe
          ? {
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `${
                      message.author.bot
                        ? "(if there is nothing here, the message was probably an embed and i can't send embeds in embeds)\n"
                        : ''
                    }${snipe.content}`
                  )
                  .setAuthor(snipe.author!.tag)
                  .setColor('GREEN')
                  .setFooter(`#${(channel as any).name}`)
                  .setTimestamp(snipe.createdAt ? snipe.createdAt : 0),
              ],
            }
          : "There's nothing to snipe!"
      )
      .then((message) => {
        message.channel.messages.fetch({ limit: 2 }).then((messages) => {
          messages.forEach((message) => {
            if (message.author.id === '270904126974590976') {
              message.delete();
            }
          });
        });
      });
  } else if (message.content.toLowerCase().startsWith('pls editsnipe')) {
    const snipe = editSnipes[channel.id];

    await message.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()

                .addField('Old message:', snipe.content!)
                .addField(
                  'New message:',
                  `[Jump!](https://discord.com/channels/${message.guild!.id}/${
                    message.channel.id
                  }/${snipe.id})`
                )
                .setAuthor(snipe.author!.tag)
                .setColor('RANDOM')
                .setFooter(`#${(channel as any).name}`)
                .setTimestamp(snipe.createdAt ? snipe.createdAt : 0),
            ],
          }
        : "There's nothing to snipe!"
    );
  } else if (message.content.toLowerCase().startsWith('pls reactionsnipe')) {
    const snipe = reactionSnipes[channel.id];

    await message.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `reacted with ${formatEmoji(snipe.emoji)} on [this message](${
                    snipe.messageURL
                  })`
                )
                .setAuthor(snipe.user!.tag!)
                .setColor('RANDOM')
                .setFooter(`#${(channel as any).name}`)
                .setTimestamp(snipe.createdAt!),
            ],
          }
        : "There's nothing to snipe!"
    );
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) reaction = await reaction.fetch();

  reactionSnipes[reaction.message.channel.id] = {
    user,
    emoji: reaction.emoji,
    messageURL: reaction.message.url,
    createdAt: Date.now(),
  };
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const channel =
    interaction.options.getChannel('channel') || interaction.channel;

  if (interaction.commandName === 'snipe') {
    const snipe = snipes[channel!.id];

    await interaction.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()
                .setDescription(snipe.content!)
                .setAuthor(snipe.author!.tag)
                .setFooter(`#${(channel as any).name}`)
                .setTimestamp(snipe.createdAt!),
            ],
          }
        : "There's nothing to snipe!"
    );
  } else if (interaction.commandName === 'editsnipe') {
    const snipe = editSnipes[channel!.id];

    await interaction.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()
                .setDescription(snipe.content!)
                .setAuthor(snipe.author!.tag)
                .setFooter(`#${(channel as any).name}`)
                .setTimestamp(snipe.createdAt!),
            ],
          }
        : "There's nothing to snipe!"
    );
  } else if (interaction.commandName === 'reactionsnipe') {
    const snipe = reactionSnipes[channel!.id];

    await interaction.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `reacted with ${formatEmoji(snipe.emoji)} on [this message](${
                    snipe.messageURL
                  })`
                )
                .setAuthor(snipe.user?.tag!)
                .setFooter(`#${(channel as any).name}`)
                .setTimestamp(snipe.createdAt!),
            ],
          }
        : "There's nothing to snipe!"
    );
  }
});

client.login(token);
