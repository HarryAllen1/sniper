import { fetch } from '@sapphire/fetch';
import _ from 'lodash';
import ms from 'ms';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';

let commandsMD = readFileSync('./docs/commands/README.md').toString();
(async () => {
  interface CommandCategories {
    [category: string]: Command[];
  }
  interface Command {
    name: string;
    aliases: string[];
    args: string;
    description: string;
    cooldown: number;
    disabled: boolean;
    permissions: string[];
    argsRequired: boolean;
  }
  const commands: CommandCategories = await fetch<CommandCategories>(
    'https://raw.githubusercontent.com/MajesticString/sniper/main/apps/sniper/all-commands.json'
  );

  const categories = Object.keys(commands).reverse();
  resetCommandDocs();
  categories.forEach((cat) => {
    appendToDocs(`\n## ${capitalizeFirstLetter(camelToNormalCase(cat))}\n`);
    const commandsInCategory = commands[cat];
    commandsInCategory.forEach((cmd) => {
      appendToDocs(
        `
### ${cmd.disabled ? `~~${cmd.name}~~` : cmd.name}
${cmd.disabled ? '#### This command is disabled' : ''}
${cmd.description}\\
**Aliases:** ${cmd.aliases.join(', ')}\\
**Arguments:** ${
          cmd.args ? cmd.args.replace(/</g, '\\<').replace(/>/g, '\\>') : 'None'
        }\\
**Cooldown:** ${ms(cmd.cooldown, { long: true })}\\
**Permissions:** ${cmd.permissions
          .map((perm) => `\`${_.lowerCase(perm)}\``)
          .join(', ')}
`
      );
    });
  });
  cleanUp();
})();

function resetCommandDocs() {
  commandsMD = commandsMD.replace(
    /<!-- start generation -->[\s\S]*<!-- end generation -->/,
    '<!-- start generation -->'
  );
  writeFileSync('./docs/commands/README.md', commandsMD);
}
function appendToDocs(data: string) {
  appendFileSync('./docs/commands/README.md', data);
}
function cleanUp() {
  appendToDocs('<!-- end generation -->');
}
const camelToNormalCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
