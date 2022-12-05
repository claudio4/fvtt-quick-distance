import {info} from './logger.mjs';
import {setupHooks} from './hooks.mjs';
import {MODULE_ID, SETTINGS, registerSettings} from './settings.mjs';

Hooks.once('init', async function() {
  await registerSettings();
  if (game.settings.get(MODULE_ID, SETTINGS.enabled)) {
    setupHooks();
  }

  info('Loaded');
});
