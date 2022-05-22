import { container, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export class SniperClient extends SapphireClient {
  constructor(options: ClientOptions) {
    super(options);
  }

  public async initDB() {
    initializeApp({
      credential: cert(await import('../firebase-credentials.json')),
      projectId: 'discord-sniper-5c7f0',
    });
    container.db = getFirestore();
  }
}

declare module '@sapphire/pieces' {
  export interface Container {
    db: FirebaseFirestore.Firestore;
  }
}
