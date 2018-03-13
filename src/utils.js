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
  const inputABoxes = [getBoundingBox(inputA)]
  const inputBBoxes = Array.isArray(inputB) ? inputB.map(getBoundingBox) : [getBoundingBox(inputB)]

  return boxIntersect(inputABoxes, inputBBoxes).map(([boxA, boxB]) => {
    const [ax, ay, aX, aY, aD] = inputABoxes[boxA]
    const [bx, by, bX, bY] = inputBBoxes[boxB]
    const dxy = [0,0]

    const top = (aY > by && aY < bY)
    const bottom = (ay > by && ay < bY)
    const left = (aX > bx && aX < bX)
    const right = (ax > bx && ax < bX)

    if(aD) {
      if (top && aD === 'd') dxy[1] = by - aY
      if (bottom && aD === 'u') dxy[1] = bY - ay
      if (left && aD === 'r') dxy[0] = bx - aX
      if (right && aD === 'l') dxy[0] = bX - ax

      if (dxy[0] > 0) dxy[0] += 1
      if (dxy[0] < 0) dxy[0] -= 1
      if (dxy[1] > 0) dxy[1] += 1
      if (dxy[1] < 0) dxy[1] -= 1
    }

    return {index: boxB, dxy}
  })
}
