import {info} from './logger.mjs';
import {setupHooks} from './hooks.mjs';
import {MODULE_ID, SETTINGS, registerSettings, registerKeybinds} from './settings.mjs';

Hooks.once('init', async function() {
  await registerSettings();
  registerKeybinds();
  if (game.settings.get(MODULE_ID, SETTINGS.enabled)) {
    setupHooks();
  }
  info('Loaded');
});
