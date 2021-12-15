import { main } from './out-esm/src/sniper.js';

const start = async () => {
  try {
    main();
  } catch (err) {
    console.error(err);
    start();
  }
};
do {
  start().catch((err) => {
    console.error(err);
  });
  await (await import('./out-esm/src/utils/helpers/misc.js')).sleep(1000);

  // eslint-disable-next-line no-constant-condition -- this is to constantly run the bot
} while (true);
