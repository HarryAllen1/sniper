import { container, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from './config.js';

export class SniperClient extends SapphireClient {
  public constructor(options: ClientOptions) {
    super(options);
  }

  public initDB() {
    const app = process.env.ONLY_UPDATE_DOCS
      ? ({} as any)
      : initializeApp({
          credential: cert(config.firebaseConfig),
          projectId: 'discord-sniper-5c7f0',
        });
    container.db = process.env.ONLY_UPDATE_DOCS
      ? ({} as any)
      : getFirestore(app);
  }
}

declare module '@sapphire/pieces' {
  export interface Container {
    db: FirebaseFirestore.Firestore;
  }
}
