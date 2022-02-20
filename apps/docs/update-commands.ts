import _ from 'lodash';
import ms from 'ms';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
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
let commandsMD = readFileSync('./docs/commands/README.md').toString();
const commands: CommandCategories = JSON.parse(
  readFileSync('../sniper/all-commands.json').toString()
);

function resetCommandDocs() {
  commandsMD = commandsMD.replace(
    /<!-- start generation -->[\s\S]*/g,
    '<!-- start generation -->'
  );
  writeFileSync('./docs/commands/README.md', commandsMD);
}
function appendToDocs(data: string) {
  appendFileSync('./docs/commands/README.md', data);
}
const camelToNormalCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

(async () => {
  const categories = Object.keys(commands).reverse();
  resetCommandDocs();
  categories.forEach((cat) => {
    appendToDocs(`\n## ${capitalizeFirstLetter(camelToNormalCase(cat))}\n`);
    const commandsInCategory = commands[cat];
    commandsInCategory.forEach((cmd: any) => {
      appendToDocs(
        `
### ${cmd.disabled ? `~~${cmd.name}~~` : cmd.name}
${cmd.disabled ? '::: warning\nThis command is disabled\n:::' : ''}
${cmd.aliases.length ? cmd.description + '\\' : ''}
${cmd.aliases.length ? `**Aliases:** ${cmd.aliases.join(', ')}\\` : ''}
**Arguments/Usage:** ${
          cmd.args
            ? `\n<DiscordMessages>\n<DiscordMessage profile="user">\n&#36;${
                cmd.name
              } ${cmd.args
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\\/g, '\\\\')}\n</DiscordMessage>\n</DiscordMessages>`
            : 'None'
        }
**Cooldown:** ${ms(cmd.cooldown, { long: true })}\\
**Permissions:** ${cmd.permissions
          .map((perm: string) => `\`${_.lowerCase(perm)}\``)
          .join(', ')}
`
      );
    });
  });
})();
