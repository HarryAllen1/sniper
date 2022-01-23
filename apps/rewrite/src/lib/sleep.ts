/**
 * @function sleep
 * @param {Number} ms The amount of milliseconds to wait
 * @returns {Promise<void>} An empty promise that will be resolved when the given ms are elapsed
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
