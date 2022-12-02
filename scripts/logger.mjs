const LOG_REFIX = 'quick-distance |'

export const error = (...args) => console.error(LOG_REFIX, ...args)
export const info = (...args) => console.info(LOG_REFIX, ...args)
export const log = (...args) => console.log(LOG_REFIX, ...args)
export const warn = (...args) => console.warn(LOG_REFIX, ...args)
