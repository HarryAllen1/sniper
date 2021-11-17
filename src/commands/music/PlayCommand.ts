import { GuildMember, Message, Snowflake, VoiceChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
// import { MusicSubscription } from './subscription';
// import { createReadStream } from 'node:fs';
// import {
//   entersState,
//   joinVoiceChannel,
//   VoiceConnectionStatus,
//   createAudioPlayer,
//   createAudioResource,
//   StreamType,
//   AudioPlayerStatus,
// } from '@discordjs/voice';
// import { Track } from './track';
// import { reply } from '../../utils/helpers/reply';
// import { probeAndCreateResource } from '../../utils/helpers/voice';
// import { createDiscordJSAdapter } from './adapter';

// const subscriptions = new Map<Snowflake, MusicSubscription>();

export default class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'music', [], 1000, 'DOESNT WORK YET!');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    //     const player = createAudioPlayer();
    //     function playSong() {
    //       const resource = createAudioResource(
    //         'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    //         {
    //           inputType: StreamType.Arbitrary,
    //         }
    //       );
    //       player.play(resource);
    //       return entersState(player, AudioPlayerStatus.Playing, 5e3);
    //     }
    //     async function connectToChannel(channel: VoiceChannel) {
    //       const connection = joinVoiceChannel({
    //         channelId: channel.id,
    //         guildId: channel.guild.id,
    //         adapterCreator: createDiscordJSAdapter(channel),
    //       });
    //       try {
    //         await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
    //         return connection;
    //       } catch (error) {
    //         connection.destroy();
    //         throw error;
    //       }
    //     }
    //     await playSong();
    //     const channel = message.member?.voice.channel;
    //     if (channel && channel.type === 'GUILD_VOICE') {
    //       try {
    //         const connection = await connectToChannel(channel);
    //         connection.subscribe(player);
    //         message.reply('Playing now!');
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     } else {
    //       message.reply('Join a voice channel then try again!');
    //     }
  }
}
