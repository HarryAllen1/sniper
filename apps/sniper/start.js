// process.stdin.resume();

const start = async () => {
  try {
    (await import('./out/sniper.js')).main();
  } catch (err) {
    console.error(err);
    // start();
  }
};
start();
process.on('uncaughtException', (a, b) => {
  console.error(
    'HAHAHHAHAHAHAHAHAHAHHAH the bot crashed',
    `Error code: ${a.name}: ${a.message}\n`,
    `whatever "b" is: ${b}`
  );
});
