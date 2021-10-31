import { RedditRes } from './types';

interface Memes {
  [title: string]: LiteRedditRes;
}
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
