import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { load } from 'cheerio';
import { readFileSync } from 'node:fs';

const commandsMD = readFileSync('./docs/commands/README.md');
(async () => {
  interface CommandData {
    [category: string]: {
      [command: string]: {
        name: string;
        description: string;
        cooldown: number;
        aliases: string[];
        args: string;
        permissions: string[];
        argsRequired: boolean;
        disabled: boolean;
      };
    };
  }

  const commandData: CommandData = {};

  const categories = await getTableData('commands/');
  categories.forEach(async (cat) => {
    commandData[cat] = {};
    const commands = (await getTableData(`commands/${cat}/`)).filter((val) =>
      val.endsWith('Command.ts')
    );
    commands.forEach(async (cmd) => {
      const commandData = await fetch(
        `https://cdn.jsdelivr.net/gh/majesticstring/sniper@5.0.0/src/commands/${cat}/${cmd}`,
        FetchResultTypes.Text
      );
      const startOfCommandData: RegExp =
        /constructor\(\)( )?{\t?\r?\n?( ){1,}?super\(\t?\r?\n?( ){1,}/gi;
      const endOfCommandData: RegExp =
        /constructor\(\)( )?{\t?\r?\n?( ){1,}?super\(\t?\r?\n?( ){1,}'[a-zA-Z]{1,}',?\t?\r?\n?( ){1,}'[a-zA-Z]{1,}',\t?\r?\n?( ){1,}\[('[a-zA-Z]{1,}',?\t?\r?\n?( )*)*\],?\t?\r?\n?( )*([0-9]*)?,\t?\r?\n?( )*'[^']*',?\t?\r?\n?( )*\{[^\}]*\}/gi;
      const test = startOfCommandData.exec(commandData);
      const test2 = endOfCommandData.exec(commandData);
      console.log(
        'end: ' + test !== null && test !== undefined ? test![0] : 'none'
      );
    });
  });
})();

async function getTableData(subURL: string): Promise<string[]> {
  const data = await fetch(
    `https://cdn.jsdelivr.net/gh/majesticstring/sniper@5.0.0/src/${subURL}`,
    FetchResultTypes.Text
  );
  const $ = load(data);
  const dataContent: string[] = [];
  $('.name > a').each(function (i, el) {
    if (i === 0) return;
    dataContent.push($(el).text());
  });
  return dataContent;
}
document.querySelector('').setAttribute;
