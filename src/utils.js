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
  style: {top, left, width: 64, height: 64, ...override},
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
  style: {top, left, width: 64, height: 64, ...override},
  direction,
  color
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
  style: {top, left, width: 10, height: 10, ...override},
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
  const inputABoxes = Array.isArray(inputA) ? inputA.map(getBoundingBox) : [getBoundingBox(inputA)]
  const inputBBoxes = Array.isArray(inputB) ? inputB.map(getBoundingBox) : [getBoundingBox(inputB)]

  return boxIntersect(inputABoxes, inputBBoxes).map(([boxA, boxB]) => {
    const [ax, ay, aX, aY/*, aD*/] = inputABoxes[boxA]
    const [bx, by, bX, bY] = inputBBoxes[boxB]
    const aw = aX - ax
    const ah = aY - ay
    const dxy = [0,0]

    const leftPast = bX - ax
    const rightPast = aX - bx
    const xDelta = leftPast < rightPast ? leftPast : -rightPast

    const bottomPast = aY - by
    const topPast = bY - ay
    const yDelta = bottomPast < topPast ? -bottomPast : topPast

    /*if ((aD && (aD === 'u' || aD === 'd')) && Math.abs(xDelta) < aw/2) {
      dxy[0] = xDelta
    } else if ((aD && (aD === 'l' || aD === 'r')) && Math.abs(yDelta) < ah/2) {
      dxy[1] = yDelta
    } else */
    if (Math.abs(xDelta) < Math.abs(yDelta)) {
      dxy[0] = xDelta
    } else {
      dxy[1] = yDelta
    }

    return {index: boxB, dxy}
  })
}

export const moveHacman = (hackman, x, y, d, maze) => {
  const {style: {top, left}} = hackman

  let next = makeHacman(top + y, left + x, d)

  const intersects = collisionDetection(next, maze)
  if(intersects.length) {
    const offset = intersects.reduce((acc, {dxy}) => {
      acc[0] += dxy[0]
      acc[1] += dxy[1]
      return acc
    }, [0, 0])

    next = makeHacman(top + y + offset[1], left + x + offset[0], d)
  }

  return next
}

export const moveGhost = (ghost, x, y, color, d, maze) => {
  const {style: {top, left}} = ghost

  let next = makeGhost(top + y, left + x, color, d)

  const intersects = collisionDetection(next, maze)
  if(intersects.length) {
    const offset = intersects.reduce((acc, {dxy}) => {
      acc[0] += dxy[0]
      acc[1] += dxy[1]
      return acc
    }, [0, 0])

    next = makeGhost(top + y + offset[1], left + x + offset[0], color, d)
  }

  return next
}
