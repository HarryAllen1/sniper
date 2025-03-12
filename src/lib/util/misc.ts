/**
 * @function sleep
 * @param {Number} ms The amount of milliseconds to wait
 * @returns {Promise<void>} An empty promise that will be resolved when the given ms are elapsed
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;
export declare type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

/**
 * @param callback What to fire x amount of times
 * @param interval Timeout interval
 * @param x Times to fire
 */
export function setIntervalLimited(
  callback: () => void,
  interval: number,
  x: number
) {
  for (let i = 0; i < x; i++) {
    setTimeout(callback, i * interval);
  }
}

export const renameKeys = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keysMap: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>
): Record<string, unknown> =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );
