import {
  createAudioResource,
  demuxProbe,
  AudioResource,
} from '@discordjs/voice';
import internal from 'stream';

export async function probeAndCreateResource(
  readableStream: internal.Readable
): Promise<AudioResource<any>> {
  const { stream, type } = await demuxProbe(readableStream);
  return createAudioResource(stream, { inputType: type });
}
