import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import { Colors, GuildMember, TextChannel } from 'discord.js';

@ApplyOptions<Listener.Options>({
  event: Events.GuildMemberRemove,
})
export default class extends Listener<typeof Events.GuildMemberRemove> {
  public async run(member: GuildMember) {
    if (member.guild.id === '631138980322344960' && !member.user.bot) {
      await (
        member.guild.channels.cache.get('631262532677533726') as TextChannel
      ).send(`${member.user.tag} has left the server.`);
    } else if (member.guild.id === '899035595081396255')
      await (
        this.container.client.channels.cache.get(
          '909122555229642802'
        ) as TextChannel
      ).send({
        embeds: [
          {
            title: `${member.user.tag} has just left the server!`,
            color: Colors.Orange,
          },
        ],
      });
  }
}
