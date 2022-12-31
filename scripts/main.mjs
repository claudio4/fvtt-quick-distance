import {info} from './logger.mjs';
import {setupHooks} from './hooks.mjs';
import {MODULE_ID, SETTINGS, registerSettings, registerKeybinds} from './settings.mjs';

Hooks.once('init', async function() {
  await registerSettings();
  registerKeybinds();
  info('initialized');
});

Hooks.once('ready', function() {
  // The onlyInCombat functionality requires us to check for ongoing combat at this point in the code,
  // as it is not possible to do so at the 'init' stage.
  if (game.settings.get(MODULE_ID, SETTINGS.enabled)) {
    setupHooks();
  }
  info('ready');
});
