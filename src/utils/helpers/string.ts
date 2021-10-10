export const camelToNormalCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
