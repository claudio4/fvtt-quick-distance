import { info } from "./logger.mjs";
import { setupHooks } from "./hooks.mjs";
import {
  MODULE_ID,
  SETTINGS,
  registerSettings,
  registerKeybinds,
} from "./settings.mjs";
import { calculateDistance } from "./distance.mjs";

Hooks.once("init", async function () {
  await registerSettings();
  registerKeybinds();
  registerPublicAPI();
  info("initialized");
});

Hooks.once("ready", function () {
  // The onlyInCombat functionality requires us to check for ongoing combat at this point in the code,
  // as it is not possible to do so at the 'init' stage.
  if (game.settings.get(MODULE_ID, SETTINGS.enabled)) {
    setupHooks();
  }
  info("ready");
});

/**
 * Register the modules public API, to allow other modules and macros to use utilities
 * from this module.
 */
function registerPublicAPI() {
  // The properties in the window variable are exposed as global variables even outside
  // the current JS module.
  window.QuickDistance = {
    calculateDistanceBetweenTokens: calculateDistance,
  };
}
