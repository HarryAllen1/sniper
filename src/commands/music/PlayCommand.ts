import { GuildMember, Message, Snowflake } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { MusicSubscription } from './subscription';
import {
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { Track } from './track';

const subscriptions = new Map<Snowflake, MusicSubscription>();

export default class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'music', [], 1000, 'plays a song i guess');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let subscription = subscriptions.get(message.guild!.id);

    const url = args[0];
    if (!subscription) {
      if (
        message.member instanceof GuildMember &&
        message.member.voice.channel
      ) {
        const channel = message.member.voice.channel;
        subscription = new MusicSubscription(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator as any,
          })
        );
        subscription.voiceConnection.on('error', console.warn);
        subscriptions.set(message.guildId!, subscription);
      }
    }

    if (!subscription) {
      await message.reply('Join a voice channel and then try that again!');
      return;
    }
    try {
      await entersState(
        subscription.voiceConnection,
        VoiceConnectionStatus.Ready,
        20e3
      );
    } catch (error) {
      console.warn(error);
      await message.reply(
        'Failed to join voice channel within 20 seconds, please try again later!'
      );
      // return;
    }

    try {
      // Attempt to create a Track from the user's video URL
      const track = await Track.from(url, {
        onStart() {
          message.reply({ content: 'Now playing!' }).catch(console.warn);
        },
        onFinish() {
          message.reply({ content: 'Now finished!' }).catch(console.warn);
        },
        onError(error) {
          console.warn(error);
          message
            .reply({ content: `Error: ${error.message}` })
            .catch(console.warn);
        },
      });
      // Enqueue the track and reply a success message to the user
      subscription.enqueue(track);
      await message.reply(`Enqueued **${track.title}**`);
    } catch (error) {
      console.warn(error);
      await message.reply('Failed to play track, please try again later!');
    }
  }
}
