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
    score: 0,
    boardWidth: action.w,
    boardHeight: action.h,
    hackman: makeHacman(200, 1500, 'l'),
    ghosts: [
      //y, x, color, d
      makeGhost(574, 680, 'red', 'r'),
      // makeGhost(210, 680, 'babyblue', 'l'),
      // makeGhost(574, 180, 'pink', 'u'),
    ],
    maze: [
      //y, x,  width, height
      makeWall(1000, 40, 1536, 15),//bottom line
      makeWall(185, 40, 1536, 15), //top line
      makeWall(200, 40, 15, 792), //left line
      makeWall(200, 1565, 15, 792), //right wall

      makeWall(206, 250, 15, 612), //left wall
      makeWall(206, 1350, 15, 612),//right wall
      makeWall(706, 530, 920, 15),
      makeWall(400, 1450, 15, 300),
      makeWall(500, 150, 808, 15),
      makeWall(300, 530, 808, 15),
      makeWall(900, 250, 1100, 15),
      makeWall(parseInt(action.h/3), parseInt(action.w/3), 15, 200),
      makeWall(parseInt(action.h/2), parseInt(action.w/2), 15, 100),
      makeWall(parseInt(action.h*4/6), parseInt(action.w*3/5), 15, 100),
      makeWall(parseInt(action.h*4/6), parseInt(action.w/4), 15, 200),

    ],
    prizes: [],
    food: [...[...Array(10)].map((_, i) => makeFood(parseInt(action.h/2) + 55, parseInt(action.w/2) + 64 + (i * 45))),
          ...[...Array(30)].map((_, i) => makeFood(950, 250 + (i * 45))),
          ...[...Array(10)].map((_,i)=>makeFood(500 + (i * 45), 1500)),


    ]

  }
}

export const tick = (state, action) => {
  let { score, hackman, maze, ghosts, food, prizes, boardWidth, boardHeight, key } = state;
  //
  // console.log(ghosts)
  ghosts.map((ghost, index)=>{
    //generate random move for ghosts
    let ghostDirection = ghost.direction;
    if(collisionDetection(ghost, maze)){
      let move;
      let direction = Math.random() * 4;
      if(direction < 1){
        move = GHOST_MAP['u']
      } else if(direction < 2){
        move = GHOST_MAP['d']
      } else if(direction < 3){
        move = GHOST_MAP['l']
      } else {
        move = GHOST_MAP['r']
      }
      let newG = moveGhost(ghost, move[2], move[1], 'red', move[0], maze);
      state.ghosts[index] = newG;

    }else{
      let move = GHOST_MAP[ghostDirection];
      let newG = moveGhost(ghost, move[2], move[1], 'red', move[0], maze);
      state.ghosts[index] = newG;
    }
  })
  console.log(collisionDetection(hackman, food));

  if(key){
    if(collisionDetection(hackman, ghosts).length > 0){
      let deadHacman = moveHacman(hackman,0,0,null,maze);
      state.hackman = deadHacman;
      // alert ('you are dead');
    }  else if ( collisionDetection(hackman, food).length > 0) {

      state.score = state.score + 10;
    } else {
      let newHacman = moveHacman(hackman, Number(key[2]), Number(key[1]), key[0], maze);
      // console.log(Number(hackman.style.left) + Number(key[2]));
      // console.log(newHacman);
      state.hackman = newHacman;

    }

  }
  return { ...state }
}

const GHOST_MAP = {
  'u': ['u', -10, 0],
  'd': ['d', 10, 0],
  'l': ['l', 0, -10],
  'r': ['r', 0, 10],
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
