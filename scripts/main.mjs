import {info, log} from './logger.mjs';

/**
 * Determines whether the hooks have been stablished or not.
 * This variables do not represent the state of essential hooks like init,
 * as those hooks will always be stablished.
 * @type {boolean}
 */
let hooksLoaded = false;

/**
 * Add the necessary hooks for this module. This does not apply too essential hooks like init
 * as those hooks will always be stablished.
 * It is safe to call this function multiple times
 */
function setupHooks() {
  if (hooksLoaded) return;
  Hooks.on('hoverToken', handleTokenHover);
  hooksLoaded = true;
}

/**
 * Remove the necessary hooks for this module (useful when the module is enable but not its functionality).
 * This does not apply too essential hooks like init as those hooks will always be stablished.
 * It is safe to call this function multiple times.
 */
function removeHooks() {
  if (!hooksLoaded) return;
  Hooks.off('hoverToken', handleTokenHover);
  hooksLoaded = false;
}

/**
 * this function handle the hoverToken hook
 * @param {Token}  token
 * @param {boolean} isHovering Whether the mouse is currently hovering the token or not
 */
function handleTokenHover(token, isHovering) {
  const source = canvas.tokens.controlled[0];
  if (!source || token.id === source.id) return;

  if (isHovering) {
    log(calculateDistance(source, token));
  }
}

/**
 * A point in a 3D space.
 * X is the separation from the left border of the screen.
 * Y is the separation with top border border of the screen.
 * Z is the distance outside the screen.
 * @typedef {{x: number, y: number, z: number}} Point3d
 */

/**
 * Calculates the distance between two tokens.
 * @param {Token} t1
 * @param {Token} t2
 * @return {number} distance in units
 */
function calculateDistance(t1, t2) {
  const unitsPerPixel = canvas.dimensions.distance / canvas.dimensions.size;
  const pointsT1 = tokenToPoints3d(t1);
  const pointsT2 = tokenToPoints3d(t2);
  const pointsPairs = cartesianProduct(pointsT1, pointsT2);
  const distances = pointsPairs.map(([p1, p2]) => euclidean(p1, p2));


  return Math.min(...distances) * unitsPerPixel;
}

/**
 * Give the center point of each square occupied by the token.
 * The position is given in pixels
 * @param {Token} token
 * @return {Point3d[]}
 */
function tokenToPoints3d(token) {
  const pixelsPerSquare = canvas.dimensions.size;
  const pixelsPerHalfSquare = pixelsPerSquare / 2;
  const pixelsPerUnit = pixelsPerSquare / canvas.dimensions.distance;

  const topLeftMostPoint = {
    x: token.center.x - pixelsPerHalfSquare * (token.document.width - 1),
    y: token.center.y - pixelsPerHalfSquare * (token.document.height - 1),
    z: token.document.elevation * pixelsPerUnit,
  };
  log(topLeftMostPoint);
  const points = [];

  for (let i = 0; i < token.document.width; i++) {
    for (let j = 0; j < token.document.height; j++) {
      points.push({
        x: topLeftMostPoint.x + pixelsPerSquare*i,
        y: topLeftMostPoint.y + pixelsPerSquare*j,
        z: topLeftMostPoint.z,
      });
    }
  }

  return points;
}

/**
 * Produces the cartesian product of the provided sets.
 * From https://stackoverflow.com/a/43053803
 * @param  {...any[]} a the operands
 * @return {any[]}
 */
function cartesianProduct(...a) {
  return a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
}

/**
 * Calculates the euclidean distance between two 3.dimensional points.
 * @param {Point3d} p1 One of the points
 * @param {Point3d} p2  The other point
 * @return {number} the euclidean distance
 */
function euclidean(p1, p2) {
  return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2) + ((p1.z - p2.z) ** 2));
}

Hooks.once('init', function() {
  setupHooks();
  info('Loaded');
});
