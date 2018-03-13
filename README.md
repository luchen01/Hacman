# HACKMAN

## App

![](https://raw.githubusercontent.com/horizons-school-of-technology/hacman/master/public/img/mission_impossible.jpg)

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
- Make the Score work (food = 10, ghosts = 200/400/800/1600, etc.) (rules)[http://pacman.wikia.com/wiki/Pac-Man_(game)] 

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
