import { ShardingManager } from 'discord.js';
import { readFileSync } from 'node:fs';
import { log } from './utils/helpers/console.js';
const { token } = JSON.parse(readFileSync('./slappey-prod.json').toString());

const manager = new ShardingManager('./out/sniper.js', {
  totalShards: 'auto',
  token,
});

manager.on('shardCreate', (shard) => {
  log(`Launched shard ${shard.id}`);
  shard.on('error', console.error);
});

manager.spawn({
  amount: 'auto',
  timeout: 1500,
});
