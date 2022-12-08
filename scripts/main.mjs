import {info} from './logger.mjs';
import {setupHooks} from './hooks.mjs';
import {MODULE_ID, SETTINGS, registerSettings, registerKeybinds} from './settings.mjs';

Hooks.once('init', async function() {
  await registerSettings();
  registerKeybinds();
  info('initalized');
});

Hooks.once('ready', function() {
  // It's not posibble if tehre is already an ongoin combat at 'init' time,
  // and that causes problems with the onlyInCombat functionality, so this needs to be done here instead.
  if (game.settings.get(MODULE_ID, SETTINGS.enabled)) {
    setupHooks();
  }
  info('ready');
});
