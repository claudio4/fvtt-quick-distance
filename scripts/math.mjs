/**
 * Produces the cartesian product of the provided sets.
 * From https://stackoverflow.com/a/43053803
 * @param  {...any[]} a the operands
 * @return {any[]}
 */
export function cartesianProduct(...a) {
  return a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
}

/**
 * Uses the Pythagorean theorem to calculate the hypotenuse of a right triangle given two cathetus.
 * This function does not care wether its argumentes are positive or negative numbers.
 * @param {number} a One of the cathetus.
 * @param {number} b The other cathetus.
 * @return {number} length of the hypotenuse.
 */
export function calculateHypotenuse(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

/**
 * Gives the highest multiple of N that is lower than X.
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
export function floorToMultipleOfN(x, n) {
  return Math.floor(x / n) * n;
}

/**
 * Rounds the number X to the n-th decimal place.
 * @param {number} x The number to be rounded
 * @param {number} n  How many decimals places should be left
 * @return {number}
 */
export function roundToNDecimals(x, n) {
  const factor = Math.pow(10, n);
  return Math.round(x * factor) / factor;
}
