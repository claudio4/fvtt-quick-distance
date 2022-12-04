import {info} from './logger.mjs';
import {setupHooks} from './hooks.mjs';
import {registerSettings} from './settings.mjs';

Hooks.once('init', async function() {
  await registerSettings();
  setupHooks();
  info('Loaded');
});
