import fs from 'fs';

if (!fs.existsSync('./out-esm/src')) {
  $`npm run build`;
}
import { $ } from 'zx';

import { main } from './out-esm/src/sniper.js';

process.stdin.resume();
const start = async () => {
  try {
    main();
  } catch (err) {
    console.error(err);
    // start();
  }
};
start();
process.on('uncaughtException', (a, b) => {
  console.log(
    'HAHAHHAHAHAHAHAHAHAHHAH the bot crashed',
    `Error code: ${a.name}: ${a.message}\n`,
    `whatever "b" is: ${b}`
  );
  // $`node start.js`;
});
