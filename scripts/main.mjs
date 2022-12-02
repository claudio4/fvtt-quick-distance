import {info} from './logger.mjs'
info('Hello World!');

/***
 * Determines wether the hooks have been stablished or not.
 * This variables do not represent the state of essential hooks like ini, as those hooks will always be stablished.
 * @type {boolean}
 */
let hookLoaded = false

function setupHooks(){
    if (hookLoaded) return;
    Hooks.on('hoverToken', handleTokenHover)
}

function removeHooks() {
    if (!hookLoaded) return;
    Hooks.off('hoverToken', handleTokenHover)
}


/***
 * Is th
 * @param {Token}  token 
 * @param {boolean} isHovering Wether the mouse is currectly hovering the token or not
 */
function handleTokenHover(token, isHovering) {
    info(token, isHovering)
}
setupHooks()
