import { ShardingManager } from 'discord.js';
import { token } from '../slappey.json';

const manager = new ShardingManager('./out/src/sniper.js', {
  token: token,
});

manager.on('shardCreate', (shard) => console.log(`launched shard ${shard.id}`));

manager.spawn({ amount: 20, delay: 5500 });
