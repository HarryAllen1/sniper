import { Message, MessageAttachment } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import { apiKeys } from '../../../slappey.json';
import axios from 'axios';
import { MWResponse } from './DictionaryTypes';

export default class DefineCommand extends BaseCommand {
  constructor() {
    super('define', 'general', [], 1000, 'Gets a definition', {
      argsDescription:
        '<word or term> [dictionary to use (can be oxford, urban, or mw (which stands for Merriam Webster)). Defaults to Oxford]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, { title: 'You must specify a search term', color: 'RED' });
      return;
    }
    let defaultDictionary = 'oxford';

    if (!args[1]) {
    } else if (
      args[1].toLowerCase() === 'mw' ||
      args[1].toLowerCase() === 'urban'
    ) {
      defaultDictionary = args[1];
    }
    if (defaultDictionary === 'urban') {
      const definition = await axios.get<{
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
      }>(`https://api.urbandictionary.com/v0/define?term=${args[0]}`);
      reply(message, {
        title: `Definition of ${definition.data.list[0].word}`,
        description: `From Urban Dictionary\nPermalink: ${definition.data.list[0].permalink}`,
        fields: [
          {
            name: 'Definition',
            value: `${definition.data.list[0].definition}`,
          },
          { name: 'Example', value: definition.data.list[0].example },
        ],
        footer: {
          text: `Thumbs up: ${definition.data.list[0].thumbs_up}\nThumbs down: ${definition.data.list[0].thumbs_down}\nAuthor: ${definition.data.list[0].author}`,
        },
      });
    } else if (defaultDictionary === 'mw') {
      const definition = await axios.get<MWResponse[]>(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${args[0]}?key=${apiKeys.mw.apiKey}`
      );

      const data = definition.data;
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
            title: `${data[0].fl} ${data[0].hwi.hw}`,
            fields: [
              {
                name: 'Definitions',
                value: data[0].shortdef.map((val) => `\n${val}`).toString(),
              },
            ],
          }
          // {
          //   attachments: [
          //     new MessageAttachment(
          //       `https://media.merriam-webster.com/audio/prons/en/us/mp3/${data[0].hwi.prs[0].sound.audio[0]}/${data[0].hwi.prs[0].sound.audio[0]}.mp3`
          //     ),
          //   ],
          // }
        );
      }

      // if (data.)
      // reply(message, { title: data.meta.id , description: ''}, {attachments: [new MessageAttachment(``)]});
    }
  }
}
