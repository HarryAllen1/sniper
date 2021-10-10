// @ts-nocheck
export const renameKeys = (keysMap: Object, obj: Object) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );
