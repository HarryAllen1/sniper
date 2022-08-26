export const renameKeys = (
  keysMap: { [key: string]: any },
  obj: { [key: string]: any }
): Record<string, unknown> =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );
