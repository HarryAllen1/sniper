export interface Item {
  name: string;
  id: string;
  price: number;
  description: string;
  emojiId?: string;
}
export interface Items {
  [category: string]: Item[];
}

export const items: Items = {
  buffs: [
    {
      name: 'Infinite coins',
      id: 'infinitecoins',
      description: 'Gives you infinite coins',
      price: 100000,
    },
  ],
};
