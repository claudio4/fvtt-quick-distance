import {cartesianProduct, euclideanDistance, floorToMultipleOfN} from './math.mjs';
import {MODULE_ID, SETTINGS} from './settings.mjs';

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
export function calculateDistance(t1, t2) {
  const pointsT1 = tokenToPoints3d(t1);
  const pointsT2 = tokenToPoints3d(t2);

  // TODO: Look if this is worth optimizing. This has O(n^2) complexity, but n tends to be small, so maybe using a more
  // "efficient" approach is not worth it.
  const pointsPairs = cartesianProduct(pointsT1, pointsT2);

  const useEuclidean = t1.document.elevation !== t2.document.elevation ||
    game.settings.get(MODULE_ID, SETTINGS.forceEuclidean);
  const distanceFunction = useEuclidean ? ([p1, p2]) => euclideanDistance(p1, p2) :
    ([p1, p2]) => canvas.grid.measureDistance(p1, p2, {gridSpaces: true});

  const distances = pointsPairs.map(distanceFunction);
  return Math.min(...distances) * (useEuclidean ? canvas.dimensions.distance / canvas.dimensions.size : 1);
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
  const normalizeSubSquare = game.settings.get(MODULE_ID, SETTINGS.normalizeSubSquareCreatures);

  let {height, width} = token.document;
  const center = token.center;
  if (height < 1) {
    // Setting the height to one prevents the code downwards from altering the center,
    // so it is necessary even if we do not normalize the creature
    height = 1;
    if (normalizeSubSquare) {
      // Move the center to the center of the square.
      // floorToMultipleOfN gives the first coordinate of the square (the leftmost),
      // and we then add half a square to move it to the center.
      center.x = floorToMultipleOfN(center.x, pixelsPerSquare) + pixelsPerHalfSquare;
    }
  }
  if (width < 1) {
    width = 1;
    if (normalizeSubSquare) {
      center.y = floorToMultipleOfN(center.y, pixelsPerSquare) + pixelsPerHalfSquare;
    }
  }

  const topLeftMostPoint = {
    x: center.x - pixelsPerHalfSquare * (width - 1),
    y: center.y - pixelsPerHalfSquare * (height - 1),
    z: token.document.elevation * pixelsPerUnit,
  };

  const points = [];
  for (let i = 0; i < token.document.width; i++) {
    for (let j = 0; j < height; j++) {
      points.push({
        x: topLeftMostPoint.x + pixelsPerSquare * i,
        y: topLeftMostPoint.y + pixelsPerSquare * j,
        z: topLeftMostPoint.z,
      });
    }
  }

  return points;
}
