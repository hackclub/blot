---
title: Cubic Disarray
description: >
  **_Georg Nees_** was a pioneer of digital art, responsible for interesting works like Cubic Disarray.
---


# Cubic Disarray

**_Georg Nees_** was a pioneer of digital art, responsible for interesting works like Cubic Disarray.

<img src="https://www.seekingoutside.com/wp-content/uploads/2018/12/Screen-Shot-2018-12-11-at-3.40.46-AM-480x670.png" width="512"/>

Let's try to recreate this in the Haxidraw editor. A good first step to reverse engineering any artwork is to break it down into the obvious components. There's a grid of squares, and the squares closer to the bottom seem to be rotated more and more.

We can get started by setting up a turtle, and define some constants:

```
const t = createTurtle();
drawTurtles(t);

const size = 10;
const squareSize = 1;
```

Obviously we'll need a way to draw these rotated squares, so let's define a function for that:

```
function draw(x, y, width, height, theta) {
  t.up()
  let startX = x - height/2
  let startY = y - height/2

  t.goto(rotatePoints(x, y, startX, startY, theta))
  t.down()
  t.goto(rotatePoints(x, y, startX + width, startY, theta))
  t.goto(rotatePoints(x, y, startX + width, startY + height, theta))
  t.goto(rotatePoints(x, y, startX, startY + height, theta))
  t.goto(rotatePoints(x, y, startX, startY, theta))
  t.up()
}
```

This function takes in a `x`, `y` position, along with a `width` and `height` for the square. Lastly, we'll want a `theta` to rotate the points by. The function works by creating a square path, and rotating it around the center by a given amount. We still need to define how to do this rotation, though.

This can be done using the sine and cosine functions. They decompose a given angle into an x and y component, which we can use to preform the rotation. The function takes in:

- An origin x and y to rotate around
- The x and y to rotate
- The angle to rotate by

It then returns the rotated points as an array.

```
function rotatePoints(ox, oy, x, y, theta) {
    let dx = x - ox
    let dy = y - oy
    let newX = dx * Math.cos(theta) - dy * Math.sin(theta)
    let newY = dx * Math.sin(theta) + dy * Math.cos(theta)
    return [newX + ox, newY + oy]
}
```

Great, we're almost done! Now it's down to simply drawing the grid. Loop over every x and y in some range, and draw a square there. We rotate them by a random amount, scaled proportional to how low the square is on the screen.

```
for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    draw(x, y, squareSize, squareSize, (Math.random()-0.5) * ((10-y)/10))
  }
}
```

And, you're done! The final result should look something like this in the editor:

<img src="https://cloud-ot8pxbd0h-hack-club-bot.vercel.app/0image.png" width="512"/>
