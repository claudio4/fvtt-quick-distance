import {error} from './logger.mjs';

/**
 * Keeps track of the tooltip
 * @type {PreciseText | null}
 */
let tooltip = null;


/**
 * Draws a tooltip over the provided token with the desired text.
 * If another tooltip exists, it will be replaced with a new one.
 * @param {Token} token
 * @param {string} text
 */
export function drawTooltip(token, text) {
  clearTooltip();

  tooltip = new PreciseText(text, CONFIG.canvasTextStyle.clone());
  tooltip.anchor.set(0.5, 1);
  tooltip.position.set(token.w / 2, 0);
  token.addChild(tooltip);
}

/**
 * Deletes the tooltip.
 * If there is no tooltip, calling this function has no effect.
 */
export function clearTooltip() {
  if (!tooltip) return;
  try {
    if (!tooltip.destroyed) {
      tooltip.destroy(true);
    }
  } catch (e) {
    error('Failed to destroy tooltip', e);
  }
  tooltip = null;
}
