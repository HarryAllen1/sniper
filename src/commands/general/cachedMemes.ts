import { RedditRes } from './types';

export interface LiteRedditRes {
  title: string;
  permaLink: string;
  description: string;
  image: string;
  ups: number | string;
  comments: number | string;
}

export let memes: RedditRes;
export const setMemes = (anything: any) => (memes = anything);
