import { ShardingManager } from 'discord.js';
import { readFileSync } from 'fs';
const { token } = JSON.parse(readFileSync('./slappey.json').toString());
import { log } from './utils/helpers/console.js';

const manager = new ShardingManager('./src/sniper.ts', {
  totalShards: 'auto',
  token: token,
});

manager.on('shardCreate', (shard) => log(`launched shard ${shard.id}`));

manager.spawn({ amount: 20, delay: 5500 });
