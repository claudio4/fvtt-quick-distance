import {setupHooks, removeHooks} from './hooks.mjs';

export const MODULE_ID = 'quick-distance';
export const SETTINGS = {
  decimalPlaces: 'decimalPlaces',
  enabled: 'enabled',
  forceEuclidean: 'forceEuclidean',
  normalizeSubSquareCreatures: 'normalizeSubSquareCreatures',
};

/**
 * Register the module settings in Foundry.
 * THIS FUNCTION SHOULD ONLY BE CALLED ONCE.
 * @return {Promise<undefined>}
 */
export async function registerSettings() {
  await game.settings.register(MODULE_ID, SETTINGS.enabled, {
    name: `${MODULE_ID}.settings.${SETTINGS.enabled}.name`,
    hint: `${MODULE_ID}.settings.${SETTINGS.enabled}.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      if (value) {
        setupHooks();
      } else {
        removeHooks();
      }
    },
  });
  await game.settings.register(MODULE_ID, SETTINGS.decimalPlaces, {
    name: `${MODULE_ID}.settings.${SETTINGS.decimalPlaces}.name`,
    hint: `${MODULE_ID}.settings.${SETTINGS.decimalPlaces}.hint`,
    scope: 'client',
    config: true,
    type: Number,
    default: 1,
  });
  await game.settings.register(MODULE_ID, SETTINGS.forceEuclidean, {
    name: `${MODULE_ID}.settings.${SETTINGS.forceEuclidean}.name`,
    hint: `${MODULE_ID}.settings.${SETTINGS.forceEuclidean}.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });
  await game.settings.register(MODULE_ID, SETTINGS.normalizeSubSquareCreatures, {
    name: `${MODULE_ID}.settings.${SETTINGS.normalizeSubSquareCreatures}.name`,
    hint: `${MODULE_ID}.settings.${SETTINGS.normalizeSubSquareCreatures}.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });
}

