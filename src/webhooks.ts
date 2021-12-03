import express from 'express';
import { Webhook } from '@top-gg/sdk';
import { slappeyJSON } from './sniper.js';
import { log } from './utils/helpers/console.js';

const app = express();

const webhook = new Webhook(slappeyJSON.default.secrets.topggToken);

app.post(
  '/topggwebhook',
  webhook.listener((vote) => {
    log(vote.user);
  })
);
app.listen(6900);
