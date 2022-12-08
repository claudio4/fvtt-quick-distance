import {calculateDistance} from './distance.mjs';
import {drawTooltip, clearTooltip} from './draw.mjs';
import {roundToNDecimals} from './math.mjs';
import {MODULE_ID, SETTINGS} from './settings.mjs';


/**
 * Add the necessary hooks for this module. This does not apply too essential hooks like init
 * as those hooks will always be stablished.
 * It is safe to call this function even when the hooks are alredy active.
 */
export function setupHooks() {
  if (game.settings.get(MODULE_ID, SETTINGS.onlyInCombat)) {
    removeHoverHooks();
    setupCombatHooks();
  } else {
    removeCombatHooks();
    setupHoverHooks();
  }
}

/**
 * Remove the necessary hooks for this module (useful when the module is enable but not its functionality).
 * This does not apply too essential hooks like init as those hooks will always be stablished.
 * It is safe to call this function even when the hooks are not setup.
 */
export function removeHooks() {
  removeCombatHooks();
  removeHoverHooks();
}


/**
 * Determines whether the hooks related with combat have been stablished or not.
 * @type {boolean}
 */
let combatHooks = false;

/**
 * Add the combat hooks. It also ensure that hover hoos are set-up if there is a combat alredy going on.
 * It is safe to call this function even when the hooks are alredy active.
 */
function setupCombatHooks() {
  if (combatHooks) return;
  Hooks.on('combatStart', handleCombatStart);
  Hooks.on('deleteCombat', handleDeleteCombat);
  combatHooks = true;

  // Hnadle the case where this function is called while a combat is alredy going on.
  const activeCombat = game.combats?.find((c) => c.started);
  if (activeCombat) {
    setupHoverHooks();
  }
}

/**
 * Remove the combat hooks.
 * It also removes the hover hooks as they can be left dangling if the hooks are removed while in combat.
 * It is safe to call this function even when the hooks are not setup.
 */
function removeCombatHooks() {
  if (!combatHooks) return;
  Hooks.off('combatStart', handleCombatStart);
  Hooks.off('deleteCombat', handleDeleteCombat);
  combatHooks = false;
  removeHoverHooks();
}

/**
 * Determines whether the hooks related with hovering have been stablished or not.
 * @type {boolean}
 */
let hoverHooks = false;

/**
 * Add the hooks related with hovering.
 * It is safe to call this function even when the hooks are alredy active.
 */
function setupHoverHooks() {
  if (hoverHooks) return;
  Hooks.on('hoverToken', handleTokenHover);
  Hooks.on('controlToken', clearTooltip);
  hoverHooks = true;
}

/**
 * Remove the hooks related with hovering.
 * It is safe to call this function even when the hooks are not setup.
 */
function removeHoverHooks() {
  if (!hoverHooks) return;
  Hooks.off('hoverToken', handleTokenHover);
  Hooks.off('controlToken', clearTooltip);
  hoverHooks = false;
  // Remove any leftover tooltip, otherwise the tooltip will remain undefinedly.
  clearTooltip();
}

/**
 * Handles the event of a combat starting
 */
function handleCombatStart() {
  setupHoverHooks();
}

/**
 * Handles the event of a combat being deleted
 */
function handleDeleteCombat() {
  const activeCombat = game.combats?.find((c) => c.started);
  if (activeCombat) return;
  removeHoverHooks();
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
