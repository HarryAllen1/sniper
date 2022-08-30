import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';

export class SniperClient extends SapphireClient {
  public constructor(options: ClientOptions) {
    super(options);
  }

  // public initDB() {
  //   initializeApp({
  //     credential: cert(config.firebaseConfig),
  //     projectId: 'discord-sniper-5c7f0',
  //   });
  //   container.db = getFirestore();
  // }
}

declare module '@sapphire/pieces' {
  export interface Container {
    db: FirebaseFirestore.Firestore;
  }
}
