import express from 'express';
import { Webhook } from '@top-gg/sdk';
import { slappeyJSON } from './sniper.js';

const app = express();
const wh = new Webhook(slappeyJSON.default.secrets.topggToken);

app.post(
  '/dblwebhook',
  wh.listener((vote) => {
    // vote is your vote object e.g
    console.log(vote.user); // => 321714991050784770
  })
);

app.listen(80);
