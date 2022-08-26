import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Colors } from 'discord.js';
import { config } from '../../config.js';
import { fetch } from '../../lib/index.js';
import { MWResponse, OxfordRes } from '../../typings/index.js';

@ApplyOptions<Command.Options>({
  description: 'Defines a word',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    let defaultDictionary =
      interaction.options.getString('dictionary', false) ?? 'oxford';
    await interaction.deferReply();

    if (interaction.options.getString('locale', false)) {
      defaultDictionary = 'oxford';
    }

    try {
      if (defaultDictionary === 'oxford') {
        const data = await fetch<OxfordRes>(
          `https://od-api.oxforddictionaries.com/api/v2/entries/${
            encodeURIComponent(
              interaction.options.getString('locale', false) ?? ''
            ) || 'en-us'
          }/${encodeURIComponent(
            interaction.options.getString('word', true)
          ).toLowerCase()}?fields=definitions,examples,pronunciations`,
          {
            headers: {
              app_id: config.apiKeys.oxford.appId,
              app_key: config.apiKeys.oxford.appKey,
            },
          }
        );

        if (data) {
          const json = data;
          const { examples } =
            json.results[0].lexicalEntries[0].entries[0].senses[0];
          let examplesValue = '';
          if (examples)
            examples.forEach((example) => {
              examplesValue += `${example.text}\n`;
            });
          await interaction.reply({
            embeds: [
              {
                title: `[${json.results[0].lexicalEntries[0].lexicalCategory.id}] ${json.word}`,
                fields: [
                  {
                    name: 'Definition',
                    value: `${json.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}`,
                  },
                  {
                    name: 'Examples',
                    value:
                      examplesValue === ''
                        ? 'No examples found'
                        : examplesValue,
                  },
                ],
              },
            ],
            files: [
              {
                attachment: json.results[0].lexicalEntries[0]?.entries[0]
                  ?.pronunciations
                  ? json.results[0].lexicalEntries[0]?.entries[0]
                      ?.pronunciations[1].audioFile
                  : 'https://www.google.com/speech-api/v1/synthesize?text=nothing.&enc=mpeg&lang=en-us&speed=0.4&client=lr-language-tts&use_google_only_voices=1',
                name: 'pron.mp3',
              },
            ],
          });
        }
      } else if (defaultDictionary === 'urban') {
        const data = await fetch<SomeResIDK>(
          `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
            interaction.options.getString('word', true)
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
        const json = data;

        await interaction.reply({
          embeds: [
            {
              title: `Definition of ${json.list[0].word}`,
              description: `From Urban Dictionary\nPermalink: ${json.list[0].permalink}`,
              fields: [
                {
                  name: 'Definition',
                  value: `${json.list[0].definition}`,
                },
                { name: 'Example', value: json.list[0].example },
              ],
              footer: {
                text: `Thumbs up: ${json.list[0].thumbs_up}\nThumbs down: ${json.list[0].thumbs_down}\nAuthor: ${json.list[0].author}`,
              },
            },
          ],
        });
      } else if (defaultDictionary === 'mw') {
        const data = await fetch<MWResponse[]>(
          `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
            interaction.options.getString('word', true)
          )}?key=${config.apiKeys.mw.apiKey}`
        );
        const json = data;
        // no word found
        if (!json[0]) {
          await interaction.reply({
            embeds: [
              {
                title: "Couldn't find that word",
                description: 'try again with a different term',
                color: Colors.Red,
              },
            ],
          });
        } else if (typeof json[0] === 'string') {
          await interaction.reply({
            embeds: [
              {
                title: "Couldn't find that word",
                description: `Did you mean one of these?\n${json}`,
              },
            ],
          });
        } else {
          await interaction.reply({
            embeds: [
              {
                title: `[${json[0].fl}] ${json[0].hwi.hw.replaceAll('*', '•')}`,
                fields: [
                  {
                    name: 'Definitions',
                    value: json[0].shortdef.map((val) => `\n${val}`).toString(),
                  },
                ],
              },
            ],
            files: [
              {
                attachment: `https://media.merriam-webster.com/audio/prons/en/us/mp3/${
                  json[0].hwi.prs[0].sound.audio.startsWith('bix')
                    ? 'bix'
                    : json[0].hwi.prs[0].sound.audio.startsWith('gg')
                    ? 'gg'
                    : json[0].hwi.prs[0].sound.audio.charAt(0).toLowerCase() ===
                      json[0].hwi.prs[0].sound.audio.charAt(0).toUpperCase()
                    ? 'number'
                    : json[0].hwi.prs[0].sound.audio.charAt(0)
                }/${json[0].hwi.prs[0].sound.audio}.mp3`,
                name: 'pron.mp3',
              },
            ],
          });
        }
      }

      if (
        interaction.options.getString('dictionary', false) !== 'oxford' &&
        interaction.options.getString('locale', false)
      )
        await interaction.followUp({
          content:
            'The locale option is only available for the oxford dictionary',
        });
    } catch (error) {
      await interaction.reply({
        embeds: [
          {
            title: 'Something went wrong.',
            description:
              'Make sure that word exists, that language code (if you are using it) exists, or maybe try an alternate spelling.',
            color: Colors.Red,
          },
        ],
        files: [
          {
            attachment: `https://www.google.com/speech-api/v1/synthesize?text=${
              interaction.options.getString('word', true)
                ? encodeURIComponent(
                    interaction.options.getString('word', true)
                  )
                : 'aaaaaaa'
            }&enc=mpeg&lang=en&speed=0.5&client=lr-language-tts&use_google_only_voices=1`,
            name: 'pron.mp3',
          },
        ],
      });
    }
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('word')
              .setDescription('The word to define')
              .setRequired(true)
          )
          .addStringOption((i) =>
            i
              .setName('dictionary')
              .setDescription('The dictionary to get the definition from')
              .setRequired(false)
              .addChoices(
                { name: 'Oxford (default)', value: 'oxford' },
                { name: 'Urban Dictionary', value: 'urban' },
                { name: 'Merriam-Webster', value: 'mw' }
              )
          )
          .addStringOption((i) =>
            i
              .setName('locale')
              .setDescription('The locale to use. Format: en-us')
              .setRequired(false)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1012580909024821318'],
      }
    );
  }
}
