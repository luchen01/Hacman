export const RESET = 'RESET'
export const TICK = 'TICK'
export const ARROW_KEY = 'ARROW_KEY'

export const reset = (w, h) => ({type: RESET, w, h})
export const tick = () => ({type: TICK})
export const arrowKey = (key) => ({type: ARROW_KEY, key})
