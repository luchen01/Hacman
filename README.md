# HACKMAN

![](https://raw.githubusercontent.com/horizons-school-of-technology/hacman/master/public/img/mission_impossible.jpg?token=AAdQQt5g3W2l21dlHXWV_dxEtsru8rliks5asJUhwA%3D%3D)

Your mission if you choose to except it... is to create a retro game.

We have provided a basic game engine that is powered by Redux & React.
Please implement your game logic inside the redux reducers.

You'll find a basic collision detection algorithm, that you can use
to determine if a sprite crosses other sprites or walls etc.

The game engine also includes actions (RESET, TICK, ARROW_KEY) 
so you should not have to implement very much else.
Feel free to modify, add, remove any actions and connect the
Redux store to any other react components.

## Getting Started

Node 6.3.1+ is the only prerequisite. Consider using [nvm](http://nvm.sh/) for
installation.

Fetch dependencies with `npm install`.  

```
$> npm start
```

## TODO

- Allow Hacman to move around the screen (using arrow keys)
- Do not let Hacman cross game walls
- Build a gameboard with walls, food, power pills, ghosts, etc.
- Make the Score work (food = 10, ghosts = 200/400/800/1600, etc.) [rules](http://pacman.wikia.com/wiki/Pac-Man_(game))

Extra
- Animate ghosts & fruit
- Levels

We love creativity, so if you want to implement your own version of Pac-Man
with unique rules, new sprites, sounds, etc.
Feel free to show off your creativity!

## What We're Looking For

There are likely more tasks than you will be able to complete in the suggested
day timeframe. We encourage you to focus on tasks and implementation details that
highlight your skillset and interests; fewer tasks done well is better than more
tasks done at a lower degree of fidelity. Additionally, feel free to "fill in
the gaps" by explaining in TODO.md what you would do and how you might do it
given more time.

In addition to functionality, we also look at architecture, organization,
linting and style, and overall polish. We're looking for idiomatic modern
JavaScript that matches the established style of the existing codebase. 

Lastly, this exercise does not have to be done in isolation. We encourage you to
ask questions as you familiarize yourself with the codebase, architecture, and
application.

And remember, the purpose of this exercise is to help you demonstrate your
abilities on your own time in a low-pressure environment. Have fun with it!

## TIPS

Collision Detection - given an array of items and a single item like (hacman, ghost)
the function x will return a list of intersecting boxes. This includes an index an a
x,y delta to help move the item to touch the intersecting item.
```javascript
    const intersects = collisionDetection(hackman, maze)
    if(intersects.length) {
      // "index" is the index to the intersecting item that was found in maze
      // "dxy" is the offset to hackman needed to make hackman touch the maze boundaries
      const {index, dxy} = intersects[0]
      const touchingHacman = makeHacman(old.top + dxy[1], old.left + dxy[0], 'r')
    }

		// NOTE: Make sure the walls are 15 > px else the collision could stop working!
```

The keys (Array Up, Down, Right, Left) are saved in the redux store.

If you want to change the speed of hacman you can update the game clock
from 100ms to 50ms i.e. `<Game gameClock={100}/>`

In `Game.js` you can turn on additional debug by updating the `const debug = false;`