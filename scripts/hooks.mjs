import {calculateDistance} from './distance.mjs';
import {drawTooltip, clearTooltip} from './draw.mjs';
import {roundToNDecimals} from './math.mjs';
import {MODULE_ID, SETTINGS} from './settings.mjs';

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
export function setupHooks() {
  if (hooksLoaded) return;
  Hooks.on('hoverToken', handleTokenHover);
  hooksLoaded = true;
}

/**
 * Remove the necessary hooks for this module (useful when the module is enable but not its functionality).
 * This does not apply too essential hooks like init as those hooks will always be stablished.
 * It is safe to call this function multiple times.
 */
export function removeHooks() {
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
    const distance = roundToNDecimals(
        calculateDistance(source, token),
        game.settings.get(MODULE_ID, SETTINGS.decimalPlaces),
    );
    const unitName = canvas?.scene?.grid?.units;
    const text = unitName ? `${distance} ${unitName}` : distance;
    drawTooltip(token, text);
  } else {
    clearTooltip();
  }
}
