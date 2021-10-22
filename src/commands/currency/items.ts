export interface Item {
  name: string;
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
      description: 'Gives you infinite coins',
      price: 100000,
    },
  ],
};
