import {
  playReadySound,
} from '../sounds'

import {
  makeWall,
  makeHacman,
  makeFood,
  makeGhost,
  collisionDetection,
  moveHacman,
  moveGhost,
} from '../utils'

export const reset = (state, action) => {
  playReadySound()

  return {
    ...state,
    boardWidth: action.w,
    boardHeight: action.h,
    hackman: makeHacman(200, 1500, 'l'),
    ghosts: [
      //y, x, color, d
      makeGhost(574, 680, 'red', 'r'),
      makeGhost(210, 680, 'babyblue', 'l'),
      makeGhost(574, 180, 'pink', 'u'),
    ],
    maze: [
      //y, x,  width, height
      makeWall(1000, 40, 1536, 15),//bottom line
      makeWall(185, 40, 1536, 15), //top line
      makeWall(200, 40, 15, 792), //left line
      makeWall(200, 1565, 15, 792), //right wall

      makeWall(206, 250, 5, 612), //left wall
      makeWall(206, 1350, 5, 612),//right wall
      makeWall(706, 530, 920, 5),
      makeWall(400, 1450, 5, 300),
      makeWall(500, 150, 808, 5),
      makeWall(300, 530, 808, 5),
      makeWall(900, 250, 1100, 5),
      makeWall(parseInt(action.h/3), parseInt(action.w/3), 5, 200),
      makeWall(parseInt(action.h/2), parseInt(action.w/2), 5, 100),
      makeWall(parseInt(action.h*4/6), parseInt(action.w*3/5), 5, 100),
      makeWall(parseInt(action.h*4/6), parseInt(action.w/4), 5, 200),

    ],
    prizes: [],
    food: [...Array(4)].map((_, i) => makeFood(parseInt(action.h/2) - 5, parseInt(action.w/2) + 64 + (i * 45))),
  }
}

export const tick = (state, action) => {
  let { hackman, maze, ghosts, food, prizes, boardWidth, boardHeight, key } = state
  console.log(key);
  // ghosts.map((ghost)=>{
  //   //generate random move for ghosts
  //   let randomMove =
  //   let newG = moveGhost(ghost, )
  // })
  // console.log(hackman.style.left);
  if(key){
    let newHacman = moveHacman(hackman, Number(key[2]), Number(key[1]), key[0], maze);
    // console.log(Number(hackman.style.left) + Number(key[2]));
    // console.log(newHacman);
    state.hackman = newHacman;
  }
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
