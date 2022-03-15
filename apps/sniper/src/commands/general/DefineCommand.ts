import { fetch } from '@sapphire/fetch';
import { Message } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { MWResponse, OxfordRes } from '../../typings/types.js';
import { reply } from '../../utils/helpers/message.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class DefineCommand extends BaseCommand {
  constructor() {
    super('define', 'general', [], 1000, 'Gets a definition', {
      argsDescription:
        '<word or term> [dictionary to use (can be oxford, urban, or mw (which stands for Merriam Webster)). Defaults to Oxford]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const { apiKeys } = (await import('../../sniper.js')).slappeyJSON;
    if (!args[0]) {
      reply(message, { title: 'You must specify a search term', color: 'RED' });
      return;
    }

    let defaultDictionary = 'mw';
    message.channel.sendTyping();
    if (
      (args[1] && args[1].toLowerCase() === 'oxford') ||
      (args[1] && args[1].toLowerCase() === 'urban')
    ) {
      defaultDictionary = args[1];
    }
    if (args[2]) {
      defaultDictionary = 'oxford';
    }

    try {
      if (defaultDictionary === 'oxford') {
        // const lemmas = await axios.get<any>(
        //   `https://od-api.oxforddictionaries.com/api/v2/lemmas/en-us/${args[0]}`,
        //   {
        //     headers: {
        //       app_id: apiKeys.oxford.appId,
        //       app_key: apiKeys.oxford.appKey,
        //     },
        //   }
        // );
        // const lemmaData = lemmas.data;
        // const searchTerm =
        //   lemmaData.results[0]?.lexicalEntries?.inflictionOf[0]?.text;
        // if (!searchTerm) {
        //   reply(message, {
        //     title: "That word wasn't found",
        //     description: 'Try again with a different search term.',
        //     color: 'RED',
        //   });
        // }
        const data = await fetch<OxfordRes>(
          `https://od-api.oxforddictionaries.com/api/v2/entries/${
            encodeURIComponent(args[2]) || 'en-us'
          }/${encodeURIComponent(
            args[0]
          ).toLowerCase()}?fields=definitions,examples,pronunciations`,
          {
            headers: {
              app_id: apiKeys.oxford.appId,
              app_key: apiKeys.oxford.appKey,
            },
          }
        );

        if (data) {
          const examples =
            data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
          let examplesValue = '';
          if (examples)
            examples.forEach((example) => {
              examplesValue += `${example.text}\n`;
            });
          reply(
            message,
            {
              title: `[${data.results[0].lexicalEntries[0].lexicalCategory.id}] ${data.word}`,
              fields: [
                {
                  name: 'Definition',
                  value: `${data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}`,
                },
                {
                  name: 'Examples',
                  value:
                    examplesValue === '' ? 'No examples found' : examplesValue,
                },
              ],
            },
            {
              files: [
                {
                  attachment: data.results[0].lexicalEntries[0]?.entries[0]
                    ?.pronunciations
                    ? data.results[0].lexicalEntries[0]?.entries[0]
                        ?.pronunciations[1].audioFile
                    : 'https://www.google.com/speech-api/v1/synthesize?text=nothing.&enc=mpeg&lang=en-us&speed=0.4&client=lr-language-tts&use_google_only_voices=1',
                  name: 'pron.mp3',
                },
              ],
            }
          );
        }
      } else if (defaultDictionary === 'urban') {
        const data = await fetch<SomeResIDK>(
          `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
            args[0]
          )}`
        );
        interface SomeResIDK {
          list: Array<{
            definition: string;
            permalink: string;
            thumbs_up: number;
            sound_urls: Array<any>;
            author: string;
            word: string;
            written_on: string;
            example: string;
            thumbs_down: number;
          }>;
        }

        reply(message, {
          title: `Definition of ${data.list[0].word}`,
          description: `From Urban Dictionary\nPermalink: ${data.list[0].permalink}`,
          fields: [
            {
              name: 'Definition',
              value: `${data.list[0].definition}`,
            },
            { name: 'Example', value: data.list[0].example },
          ],
          footer: {
            text: `Thumbs up: ${data.list[0].thumbs_up}\nThumbs down: ${data.list[0].thumbs_down}\nAuthor: ${data.list[0].author}`,
          },
        });
      } else if (defaultDictionary === 'mw') {
        const data = await fetch<MWResponse[]>(
          `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
            args[0]
          )}?key=${apiKeys.mw.apiKey}`
        );

        // no word found
        if (!data[0]) {
          reply(message, {
            title: "Couldn't find that word",
            description: 'try again with a different term',
            color: 'RED',
          });
        } else if (typeof data[0] === 'string') {
          reply(message, {
            title: "Couldn't find that word",
            description: `Did you mean one of these?\n${data}`,
          });
        } else {
          reply(
            message,
            {
              title: `[${data[0].fl}] ${data[0].hwi.hw.replaceAll('*', '•')}`,
              fields: [
                {
                  name: 'Definitions',
                  value: data[0].shortdef.map((val) => `\n${val}`).toString(),
                },
              ],
            },
            {
              files: [
                {
                  attachment: `https://media.merriam-webster.com/audio/prons/en/us/mp3/${
                    data[0].hwi.prs[0].sound.audio.startsWith('bix')
                      ? 'bix'
                      : data[0].hwi.prs[0].sound.audio.startsWith('gg')
                      ? 'gg'
                      : data[0].hwi.prs[0].sound.audio
                          .charAt(0)
                          .toLowerCase() ===
                        data[0].hwi.prs[0].sound.audio.charAt(0).toUpperCase()
                      ? 'number'
                      : data[0].hwi.prs[0].sound.audio.charAt(0)
                  }/${data[0].hwi.prs[0].sound.audio}.mp3`,
                  name: 'pron.mp3',
                },
              ],
            }
          );
        }
      }
    } catch (error) {
      reply(
        message,
        {
          title: 'Something went wrong.',
          description:
            'Make sure that word exists, that language code (if you are using it) exists, or maybe try an alternate spelling.',
          color: 'RED',
        },
        {
          files: [
            {
              attachment: `https://www.google.com/speech-api/v1/synthesize?text=${
                args[0] ? encodeURIComponent(args[0]) : 'aaaaaaa'
              }&enc=mpeg&lang=en&speed=0.5&client=lr-language-tts&use_google_only_voices=1`,
              name: 'pron.mp3',
            },
          ],
        }
      );
    }
  }
}
