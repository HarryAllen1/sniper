import { lowerCase } from 'lodash-es';
import ms from 'ms';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';

// add template to command docs
writeFileSync(
  './docs/commands/index.md',
  readFileSync('./command-docs-template.md').toString()
);
let commandsMD = readFileSync('./docs/commands/index.md').toString();
const commands = JSON.parse(
  readFileSync('./all-commands.json').toString() === ''
    ? '{}'
    : readFileSync('./all-commands.json').toString()
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
      `### ${cmd.disabled ? `~~${cmd.name}~~` : cmd.name}
${cmd.disabled ? '::: warning\nThis command is disabled\n:::\n' : ''}
**Description:** ${cmd.description}

  [Source on Github](${cmd.filePath.replace(
    /^src/,
    'https://github.com/MajesticString/sniper/blob/main/apps/sniper/src'
  )})
`
    );
  });
});
