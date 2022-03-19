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
  filePath: string;
}
// add template to command docs
writeFileSync(
  './docs/commands/README.md',
  readFileSync('./command-docs-template.md').toString()
);
let commandsMD = readFileSync('./docs/commands/README.md').toString();
const commands: CommandCategories = JSON.parse(
  readFileSync('./apps/sniper/all-commands.json').toString() === ''
    ? '{}'
    : readFileSync('./apps/sniper/all-commands.json').toString()
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
    appendToDocs(`
## ${capitalizeFirstLetter(camelToNormalCase(cat))}
`);
    const commandsInCategory = commands[cat];
    commandsInCategory.forEach((cmd) => {
      appendToDocs(
        `
### ${cmd.disabled ? `~~${cmd.name}~~` : cmd.name}
${cmd.disabled ? '::: warning\nThis command is disabled\n:::' : ''}
${cmd.aliases.length ? cmd.description + '\\' : ''}
${cmd.aliases.length ? `**Aliases:** ${cmd.aliases.join(', ')}\\` : ''}
**Arguments/Usage:** ${
          cmd.args
            ? `
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;${cmd.name} ${cmd.args
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\\/g, '\\\\')}
            </div>
          </div>\n</div>\n</div>\n`
            : 'None\n'
        }
**Cooldown:** ${ms(cmd.cooldown, { long: true })}\\
**Permissions:** ${cmd.permissions
          .map((perm: string) => `\`${_.lowerCase(perm)}\``)
          .join(', ')}
 
<details>
  <summary>Source</summary>

  [Source on Github](${cmd.filePath.replace(
    /^src/,
    'https://github.com/MajesticString/sniper/blob/main/apps/sniper/src'
  )})
  
  [Edit in Github](${cmd.filePath.replace(
    /^src/,
    'https://github.com/MajesticString/sniper/edit/main/apps/sniper/src'
  )})

  [Edit in Github.dev](${cmd.filePath.replace(
    /^src/,
    'https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src'
  )})

@[code ts](${cmd.filePath.replace(/^src/, '../../apps/sniper/src/')})

</details>
`
      );
    });
  });
})();
