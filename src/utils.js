import boxIntersect from 'box-intersect'

/**
 * Creates a new game wall cell
 *
 * @param top
 * @param left
 * @param width
 * @param height
 * @param override - style you want to override
 * @return {{style: {top: *, left: *, width: *, height: *}, className: string}}
 */
export const makeWall = (top, left, width, height, override = {}) => ({
  style: {...override, top, left, width, height},
  className: 'wall',
})

/**
 * Makes a hacman
 *
 * @param top
 * @param left
 * @param direction - l,r,u,d (null/false/undefined => die)
 * @param override - style you want to override
 * @return {{className: string, style: {top: *, left: *}}}
 */
export const makeHacman = (top, left, direction, override = {}) => ({
  className: direction ? `hacman hacman-move hacman-${direction}` : 'hacman hacman-move hacman-die',
  style: {...override, top, left, width: override.width || 64, height: override.height || 64},
  direction,
})

/**
 *
 * @param top
 * @param left
 * @param direction - l,r,u,d
 * @param color - red, babyblue, pink, orange, blue, white, transparent
 * @param override - style you want to override
 * @return {{className: string, style: {top: *, left: *, width: number, height: number}}}
 */
export const makeGhost = (top, left, color, direction, override = {}) => ({
  className: `ghost ghost-${color} ghost-${direction}`,
  style: {...override, top, left, width: override.width || 64, height: override.height || 64},
  direction,
})

/**
 * Make a hacman food
 *
 * @param top
 * @param left
 * @param override
 * @return {{className: string, style: {top: *, left: *, width: number, height: number}}}
 */
export const makeFood = (top, left, override = {}) => ({
  className: 'food',
  style: {...override, top, left, width: override.width || 10, height: override.height || 10},
})


function getBoundingBox(el) {
  const { style: {top, left, width, height}, direction } = el
  return [left, top, left+width, top+height, direction]
}

/**
 * get collision between objects
 *
 * @param inputA
 * @param inputB
 * @return {*}
 */
export const collisionDetection = (inputA, inputB) => {
  const inputABoxes = inputA.map(getBoundingBox)
  const inputBBoxes = inputB.map(getBoundingBox)

  return boxIntersect(inputABoxes, inputBBoxes).map(([boxA, boxB]) => {
    const [ax, ay, aX, aY, aD] = inputABoxes[boxA]
    const [bx, by, bX, bY, bD] = inputBBoxes[boxB]
    const safe = [0,0]

    const top = (aY > by && aY < bY)
    const bottom = (ay > by && ay < bY)
    const left = (aX > bx && aX < bX)
    const right = (ax > bx && ax < bX)

    if(aD) {
      if (top && aD === 'd') safe[1] = by - aY
      if (bottom && aD === 'u') safe[1] = bY - ay
      if (left && aD === 'r') safe[0] = bx - aX
      if (right && aD === 'l') safe[0] = bX - ax

      if (safe[0] > 0) safe[0] += 1
      if (safe[0] < 0) safe[0] -= 1
      if (safe[1] > 0) safe[1] += 1
      if (safe[1] < 0) safe[1] -= 1
    }

/*
    if(left && right && top) safe[1] = by - aY
    else if(left && right && bottom) safe[1] = bY - ay
    else if(top && bottom && left) safe[0] = bX - ax
    else if(top && bottom && right) safe[0] = bx - aX
    else if(top && right) safe[1] = by - aY
    else if(bottom && right) safe[1] = bY - ay
    else if(top && left) safe[1] = by - aY
    else if(bottom && left) safe[1] = bY - ay
    */
    return [boxA, boxB, safe]
  })
}
