import {info, log} from './logger.mjs';
import {cartesianProduct, euclideanDistance, floorToMultipleOfN} from './math.mjs';

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
  const distances = pointsPairs.map(([p1, p2]) => euclideanDistance(p1, p2));


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
  let {height, width} = token.document;
  const center = token.center;
  if (height < 1) {
    height = 1;
    center.x = floorToMultipleOfN(center.x, pixelsPerSquare) + pixelsPerHalfSquare;
  }
  if (width < 1) {
    width = 1;
    center.y = floorToMultipleOfN(center.y, pixelsPerSquare) + pixelsPerHalfSquare;
  }

  const topLeftMostPoint = {
    x: center.x - pixelsPerHalfSquare * (width - 1),
    y: center.y - pixelsPerHalfSquare * (height - 1),
    z: token.document.elevation * pixelsPerUnit,
  };
  // log(topLeftMostPoint);
  const points = [];

  for (let i = 0; i < token.document.width; i++) {
    for (let j = 0; j < height; j++) {
      points.push({
        x: topLeftMostPoint.x + pixelsPerSquare*i,
        y: topLeftMostPoint.y + pixelsPerSquare*j,
        z: topLeftMostPoint.z,
      });
    }
  }

  return points;
}

Hooks.once('init', function() {
  setupHooks();
  info('Loaded');
});
