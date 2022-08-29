import { lowerCase } from 'lodash';
import ms from 'ms';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';

// add template to command docs
writeFileSync(
  './docs/commands/index.md',
  readFileSync('./command-docs-template.md').toString()
);
let commandsMD = readFileSync('./docs/commands/index.md').toString();
const commands = JSON.parse(
  readFileSync('./apps/sniper/all-commands.json').toString() === ''
    ? '{}'
    : readFileSync('./apps/sniper/all-commands.json').toString()
);

function resetCommandDocs() {
  commandsMD = commandsMD.replace(
    /<!-- start generation -->[\s\S]*/g,
    '<!-- start generation -->'
  );
  writeFileSync('./docs/commands/index.md', commandsMD);
}
function appendToDocs(data) {
  appendFileSync('./docs/commands/index.md', data);
}
const camelToNormalCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const categories = Object.keys(commands).reverse();
resetCommandDocs();
categories.forEach((cat) => {
  appendToDocs(`\n
## ${capitalizeFirstLetter(camelToNormalCase(cat))}
`);
  const commandsInCategory = commands[cat];
  commandsInCategory.forEach((cmd) => {
    appendToDocs(
      `
### ${cmd.disabled ? `~~${cmd.name}~~` : cmd.name}
${cmd.disabled ? '::: warning\nThis command is disabled\n:::\n' : ''}${
        cmd.tip === '' ? '' : `::: tip\n${cmd.tip}\n:::\n`
      }${cmd.aliases?.length ? `${cmd.description}\\\n` : ''}${
        cmd.aliases?.length ? `**Aliases:** ${cmd.aliases.join(', ')}\\\n` : ''
      }
**Arguments/Usage:**
${
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
        .map((perm) => `\`${lowerCase(perm)}\``)
        .join(', ')}
${
  cmd.slashCommand
    ? `\n::: tip\nThis command supports slash commands. Find it by typing \`/${cmd.name}\`\n:::\n`
    : ''
}
 
  [Source on Github](${cmd.filePath.replace(
    /^src/,
    'https://github.com/MajesticString/sniper/blob/main/apps/sniper/src'
  )})
`
    );
  });
});
