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
 * Calculates the euclidean distance between two 3.dimensional points.
 * @param {Point3d} p1 One of the points
 * @param {Point3d} p2  The other point
 * @return {number} the euclidean distance
 */
export function euclideanDistance(p1, p2) {
  return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2) + ((p1.z - p2.z) ** 2));
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
