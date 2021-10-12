export const log = (...data: any[]) => {
  data.map((val) => `[sniper] :: ${val}`);
  console.log(...data);
};
