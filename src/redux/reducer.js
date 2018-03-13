import {
  playReadySound,
  playEatingSound,
  playEatPillSound,
  playSirenSound,
} from '../sounds'

import {
  makeWall,
  makeHacman,
  makeFood,
  makeGhost,
  collisionDetection,
} from '../utils'

export const reset = (state, action) => {
  // playReadySound()

  return {
    ...state,
    boardWidth: action.w,
    boardHeight: action.h,
    maze: [
      makeWall(65, 0 , 64, 35),
      makeWall(100, 150, 20, 164, {borderRight:0}),
    ],
    hackman: [
      makeHacman(0, 0, 'r')
    ],
    ghosts: [
      makeGhost(150, 40, 'red', 'u')
    ],
    food: [...Array(4)].map((_, i) => makeFood(30, 220 + (i * 45)))
  }
}

export const tick = (state, action) => {
  let { hackman, maze, food, boardWidth, boardHeight } = state

  // playSirenSound()

  if(state.key) {
    hackman = hackman[0]

    let nextHackman = [makeHacman(hackman.style.top + state.key[1], hackman.style.left + state.key[2], state.key[0])]

    const intersects = collisionDetection(nextHackman, maze)
    if(intersects.length) {
      console.log('intersects', intersects)
      const delta = intersects[0][2]
      console.log('delta', delta, hackman.style.top + state.key[1] + delta[1], hackman.style.left + state.key[2] + delta[0])

      nextHackman = [makeHacman(hackman.style.top + state.key[1] + delta[1], hackman.style.left + state.key[2] + delta[0], state.key[0])]
    }

    state = { ...state, hackman: nextHackman }

    const foodIntersects = collisionDetection(nextHackman, food)
    if(foodIntersects.length) {
      playEatingSound()

      let i = foodIntersects.length
      while(i--) {
        const ix = foodIntersects[i][1]
        state.food.splice(ix,1)
      }

      state.food = state.food.concat()
    }
  }

  return state
}

const LOOKUP_MAP = {
  'ArrowUp': ['u', -15, 0],
  'ArrowDown': ['d', 15, 0],
  'ArrowLeft': ['l', 0, -15],
  'ArrowRight': ['r', 0, 15],
}

export const arrowKey = (state, action) => {
  return { ...state, key:LOOKUP_MAP[action.key] }
}
