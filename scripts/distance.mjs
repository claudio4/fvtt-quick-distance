import {calculateHypotenuse, cartesianProduct, floorToMultipleOfN} from './math.mjs';
import {MODULE_ID, SETTINGS} from './settings.mjs';

/**
 * A point in a 3D space.
 * X is the separation from the left border of the screen.
 * Y is the separation with top border border of the screen.
 * Z is the distance outside the screen.
 * @typedef {{x: number, y: number, z: number}} Point3d
 */

/**
 * A point in a 2D space.
 * X is the separation from the left border of the screen.
 * Y is the separation with top border border of the screen.
 * @typedef {{x: number, y: number}} Point2d
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
  const pixelsToUnit = canvas.dimensions.distance / canvas.dimensions.size;

  // TODO: Look if this is worth optimizing. This has O(n^2) complexity, but n tends to be small, so maybe using a more
  // "efficient" approach is not worth it.
  const pointsPairs = cartesianProduct(pointsT1, pointsT2);

  const useEuclidean = game.settings.get(MODULE_ID, SETTINGS.forceEuclidean);
  let distanceFunction;

  if (useEuclidean) {
    distanceFunction = ([p1, p2]) => euclideanDistance(p1, p2);
  } else if (t1.document.elevation == t2.document.elevation) {
    // As there is no difference in elevantion, we can use Foundry built-in calculation.
    distanceFunction = ([p1, p2]) => gridAwareHorizontalDistance(p1, p2);
  } else {
    // Previously, euclideanDistance was utilized for elevation differences. However, since grid distance can
    // significantly deviate from euclidean distance, switching to a different method caused abrupt distance changes.
    // To address this, a new approach is adopted: grid distance is retained for horizontal distance, while a
    // 'straight line' distance is calculated for the vertical component, then, these two components are then combined
    // using the Pythagorean theorem.
    distanceFunction = ([p1, p2]) => {
      const horizontalDistance = gridAwareHorizontalDistance(p1, p2);
      // verticalDistance might be negative, but calculateHypotenuse doesn't care.
      // Also thhe point coodinates are in pixels, so we need to transform the distance to units to match the
      // horizontal distance.
      const verticalDistance = (p2.z - p1.z) * pixelsToUnit;
      return calculateHypotenuse(horizontalDistance, verticalDistance);
    };
  }

  const distances = pointsPairs.map(distanceFunction);
  return Math.min(...distances) * (useEuclidean ? pixelsToUnit : 1);
}

/**
 * Calculates the euclidean distance between two 3-dimensional points.
 * @param {Point3d} p1
 * @param {Point3d} p2
 * @return {number} the euclidean distance
 */
function euclideanDistance(p1, p2) {
  return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2) + ((p1.z - p2.z) ** 2));
}

/**
 * Uses Foundry's built-in functionality to calculate the distance while taking into account how the grid
 * handles distances.
 * @param {Point2d} p1
 * @param {Point2d} p2
 * @return {number} the distance within the grid.
 */
function gridAwareHorizontalDistance(p1, p2) {
  return canvas.grid.measureDistance(p1, p2, {gridSpaces: true});
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
    // so it is necessary even if we do not normalize the creature.
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
