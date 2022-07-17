export const camelToNormalCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
