// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate
import { User } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { getUserData, setUserData } from '../utils/helpers/user';

export default class UserUpdateEvent extends BaseEvent {
  constructor() {
    super('userUpdate');
  }

  async run(client: DiscordClient, oldUser: User, newUser: User) {
    // const userData = await getUserData(oldUser.id)
    // const pastUsernames = userData.pastUsernames;
    // setUserData(oldUser.id, {
    //   pastUsernames: []
    // }, {merge: true})
  }
}
