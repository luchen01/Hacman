import {
  playReadySound,
} from '../sounds'

import {
  makeWall,
  makeHacman,
  makeFood,
  makeGhost,
  // collisionDetection,
  // moveHacman,
  // moveGhost,
} from '../utils'

export const reset = (state, action) => {
  playReadySound()

  return {
    ...state,
    boardWidth: action.w,
    boardHeight: action.h,
    hackman: makeHacman(parseInt(action.h/2) - 32, parseInt(action.w/2) - 32, 'r'),
    ghosts: [
      makeGhost(parseInt(action.h/2) - 32, parseInt(action.w/2) - 128, 'red', 'r'),
    ],
    maze: [
      makeWall(parseInt(action.h/2)+ 35, 40, action.w - 80, 15),
    ],
    prizes: [],
    food: [...Array(4)].map((_, i) => makeFood(parseInt(action.h/2) - 5, parseInt(action.w/2) + 64 + (i * 45))),
  }
}

export const tick = (state, action) => {
  // let { hackman, maze, food, prizes, boardWidth, boardHeight, key } = state

  return { ...state }
}

const LOOKUP_MAP = {
  'ArrowUp': ['u', -10, 0],
  'ArrowDown': ['d', 10, 0],
  'ArrowLeft': ['l', 0, -10],
  'ArrowRight': ['r', 0, 10],
}

export const arrowKey = (state, action) => {
  return { ...state, key:LOOKUP_MAP[action.key] }
}
