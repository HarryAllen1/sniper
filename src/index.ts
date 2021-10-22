import { ShardingManager } from 'discord.js';
import { token } from '../slappey.json';
import { log } from './utils/helpers/console';

const manager = new ShardingManager('./src/sniper.ts', {
  totalShards: 'auto',
  token: token,
});

manager.on('shardCreate', (shard) => log(`launched shard ${shard.id}`));

manager.spawn({ amount: 20, delay: 5500 });
