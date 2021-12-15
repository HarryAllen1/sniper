import { main } from './out-esm/src/sniper.js';

const start = async () => {
  try {
    main();
  } catch (err) {
    console.error(err);
    start();
  }
};
start();
