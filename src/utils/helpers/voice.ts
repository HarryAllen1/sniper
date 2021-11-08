import { createAudioResource, demuxProbe } from '@discordjs/voice';
import internal from 'stream';

export async function probeAndCreateResource(
  readableStream: internal.Readable
) {
  const { stream, type } = await demuxProbe(readableStream);
  return createAudioResource(stream, { inputType: type });
}
