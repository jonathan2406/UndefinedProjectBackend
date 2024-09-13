import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN_TOKEN_HERE',
      useFactory: () => {
        const serviceAccount = require('../config/serviceAccountKey.json');

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: 'https://<STAR_ME_UP_PROJECT_ID_HERE>.firebaseio.com',
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN_TOKEN_HERE'],
})
export class DatabaseModule {}
