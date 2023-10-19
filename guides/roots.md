---
title: Roots
thumbnail: https://cloud-54f820d0z-hack-club-bot.vercel.app/00roots.webp
contributors: profsucrose
---

(Written by @profsucrose, if you have any issues or questions)

Let's walk through the process of how the following image was generated:

<img
  alt="roots"
  src="https://cloud-54f820d0z-hack-club-bot.vercel.app/00roots.webp"
  width="200"
/>

## The first branch

We can first start by drawing a simple random walk, where during each step we (randomly) turn the turtle by a few degrees and then inch it forward. We'll later make this recursive, so let's put the logic in its own function `makeBranch`. The first branch will start at the center, so we also define the width and height of the document (in millimeters, as visualized as the blue rectangle) at the top as constants. We want the branch to start facing the bottom of the page, so we also rotate the turtle 90 degrees when creating it:

```js
const WIDTH = 10
const HEIGHT = 20

const t = createTurtle([WIDTH / 2, 0])
t.right(90)

const turtles = [t]

function makeBranch(turtle) {
  const n = 185

  for (let i = 0; i < n; i++) {
    const curl = randInRange(-5, 5)
    turtle.left(curl)
    turtle.forward(length)
  }

  return turtle
}

makeBranch(t)

drawTurtles([ turtles ])
```

You should get something like the screenshot below:

<img
  src="https://cloud-53ljw5q8m-hack-club-bot.vercel.app/0random_walk.png"
  width="300"
/>

Let's then add width (or thickness) to the branch by, for each point, replacing it with two points separated by the path's normal vector at that point. As in, in `iteratePoints`, we get the angle (in radians) the turtle was facing at that point (`angleAtPoint`), and then get the corresponding left and right points by rotating left or right 90 degrees and stepping forward. By stepping we separate the center line into two as defined by the thickness value calculated in `thicknessAt`.

Let's put this logic in a new function, `thicken`, which takes in the branch's turtle and a thickness value, and the path accordingly. We then call this function at the end of `makeBranch`. The above edits are shown below (feel free to play around with the different constants!):

```js

function makeBranch(turtle) {
    ...

    thicken(turtle)

    return turtle;
}


function thicknessAt(t) {
  return 1-smoothstep(-1.3, 0.9, t)
}

function thicken(turtle) {
  const left = [];
  const right = [];

  turtle.iteratePath((pt, t) => {
    // getAngle() returns degrees, convert to radians
    const angleAtPoint = turtle.getAngle(t)/180 * Math.PI;

    const thickness = thicknessAt(t)

    const leftAngle = angleAtPoint - Math.PI/2
    const rightAngle = angleAtPoint + Math.PI/2

    const leftPoint = [
      pt[0] + thickness * Math.cos(leftAngle),
      pt[1] + thickness * Math.sin(leftAngle)
    ]

    const rightPoint = [
      pt[0] + thickness * Math.cos(rightAngle),
      pt[1] + thickness * Math.sin(rightAngle)
    ]

    left.push(leftPoint)
    right.push(rightPoint)
  })

  // Now, instead of drawing the center line, the turtle
  // consists of drawing just the left line and then the right.
  turtle.path = [left, right];
}


makeBranch(t, 0.1, 0)

drawTurtles([ t ])

// Smoothstep
function clamp(x, minVal, maxVal) {
  return Math.max(Math.min(x, maxVal), minVal)
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}
```

For the easing function, we use a function called `smoothstep` (documented [here](https://registry.khronos.org/OpenGL-Refpages/gl4/html/smoothstep.xhtml)). If you're familiar with Bezier curves or easing functions, `smoothstep` is pretty similar: it takes in an `x` value (in this case time), left and right edges as x-values (`edge0`, `edge1`) and interpolates between the two through a smooth curve. This allows us to, in `thicknessAt`, have the returned thickness vary from `1` to `0` smoothly as `t` increases. `smoothstep` does not give you quite as much control as something like a Bezier curve, but for most easing tasks it works well enough and is easy to intuitively tweak via `edge0` and `edge1`.

If you're interested, here's a [visualization of smoothstep in Desmos](https://www.desmos.com/calculator/fyxbylpswj).

The above edits should produce something like:

<img
  src="https://cloud-kaucor8o9-hack-club-bot.vercel.app/0thickness.png"
  width="400"
/>

## Reshaping the branch

Before we make more branches, let's change the random walk to make the "growth" behavior face down more (in a way crudely accounting for "gravity"). We can do this by, in each step, randomly sampling a target angle that the branch will try to curl towards to face. We'll then also need some logic for determining if the branch should turn clockwise or counterclockwise to get closer to the angle (a slightly harder problem than you may initially think).

Let's add this logic to `makeBranch`:

```js
// Mods angle to be from -180 - 180 degrees
function modAngleDeg(angle) {
  angle = Math.sign(angle) * (Math.abs(angle) % 360)
  if (angle > 180) return 180 - angle
  else return angle
}

function makeBranch(turtle, length, startingT) {
  const n = 185

  for (let i = 0; i < n; i++) {
    const time = i / (n - 1) // Scale i to be from 0-1. The "time" of the step
    const stdev = 200 // High standard deviation, we don't want the branch to be straight
    const average = -90 // Downwards
    const targetAngle = gaussianRandom(average, stdev) // Like Math.random(), but biased towards `average`

    const angle = turtle.angle // Current angle

    const moddedAngle = modAngleDeg(targetAngle) // Mod target angle to be from -180 - 180

    // moddedAngle and moddedAngle + 360 are equivalent; which
    // one is numerically closer determines which way to turn.
    const closerDiff = Math.min(moddedAngle - angle, moddedAngle + 360 - angle)
    const curl = closerDiff / 20 // Scale down

    turtle.left(curl)
    turtle.forward(length)
  }

  thicken(turtle, startingT)

  return turtle
}
```

To randomly sample an angle that is on average close to some "target" but can sometimes be far away, we can use the [normal/Gaussian distribution](https://en.wikipedia.org/wiki/Normal_distribution). We can then control how far each random angle can be from the target by changing the standard deviation (`stdev`) of the distribution. Math.random() in Javascript generates a number between 0 and 1 from a uniform distribution (any number is as likely as any other) so we can turn it into a normal distribution by doing a "Box-Muller transform." I.e., we can copy code from StackOverflow (I don't actually know statistics):

```js
// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random() // Converting [0,1) to (0,1]
  const v = Math.random()
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean
}
```

The shape of the branch should now be (subtly) different:

<img
  src="https://cloud-hvaqgannn-hack-club-bot.vercel.app/0normal_dist.png"
  width="300"
/>

## Branches

We can add branches in `makeBranch` by, if the length of the current branch is long enough (twigs don't branch), creating some additional turtles which break off from the current branch:

```js
function makeBranch() {
    ...

    if (length > +0.05) {
        const nBranches = Math.floor(randInRange(1, 4)) // 1-3

        for (let i = 0; i < nBranches; i++) {
            const time = randInRange(0.02, 1);
            const pt = turtle.interpolate(time);
            const curAngleDeg = turtle.getAngle(time),
                curAngleRad = curAngleDeg/180 * Math.PI
            const parentThickness = thicknessAt(time + startingT)

            // Turn either left or right 90 degrees
            const a = (Math.random() > 0.5 ? 1 : -1) * 90

            // Move side branch out of parent
            pt[0] += parentThickness * Math.cos(curAngleRad - a)
            pt[1] += parentThickness * Math.sin(curAngleRad - a)

            const newBranch = new Turtle(pt);
            newBranch.setAngle(curAngleDeg);

            newBranch.right(a);
            makeBranch(newBranch, length*(1-time)*.90, time + startingT); // Recur

            turtles.push(newBranch) // Add to turtles array for drawing
        }
    }

    thicken(turtle, 0.8, startingT)

    return turtle;
}
```

This should produce something like:

<img
  src="https://cloud-q2juhr9qv-hack-club-bot.vercel.app/0branches.png"
  width="300"
/>

# Texturing

Finally, let's add some texture by drawing rungs/"rings" throughout the path of each branch. Each ring consists of an initially straight line from `leftPoint` to `rightPoint`, where we then add noise to the line by adjusting individual points. We want the line to be more noisy towards the center and less so towards the ends, so we can again use `smoothstep`! This requires rewriting how `thicken` works, so the whole function with these edits made is shown below:

```js
function thicken(turtle, startingTime) {
  const nRings = 200
  const ringStepT = 1 / (nRings - 1)
  let nextRingT = ringStepT

  const left = []
  const right = []

  turtle.iteratePath((pt, t) => {
    /* Thicken line at point, as before */

    // getAngle() returns degrees, convert to radians
    const angleAtPoint = (turtle.getAngle(t) / 180) * Math.PI

    const thickness = thicknessAt(t, startingTime)

    const leftAngle = angleAtPoint - Math.PI / 2
    const rightAngle = angleAtPoint + Math.PI / 2

    const leftPoint = [
      pt[0] + thickness * Math.cos(leftAngle),
      pt[1] + thickness * Math.sin(leftAngle)
    ]

    const rightPoint = [
      pt[0] + thickness * Math.cos(rightAngle),
      pt[1] + thickness * Math.sin(rightAngle)
    ]

    left.push(leftPoint)
    right.push(rightPoint)

    /* But, every ringStepT, draw a ring from left to right */
    if (t >= nextRingT) {
      nextRingT += ringStepT

      /* Draw ring */
      // Start ring at leftPoint, draw straight line to rightPoint, then add noise

      const deltaX = rightPoint[0] - leftPoint[0]
      const deltaY = rightPoint[1] - leftPoint[1]

      const ring = new Turtle(leftPoint)
        .setAngle((Math.atan2(deltaY, deltaX) / Math.PI) * 180)
        .forward(Math.sqrt(deltaX * deltaX + deltaY * deltaY)) // Straight line from left to right
        .resample(0.01) // Resample so we can modulate individual points

      // Seed for noise
      const ringSeed = 1

      // Take normal vector of straight line by perpendicularizing the line (<x, y> -> <-y, x>)
      const normalMag = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const normalX = -deltaY / normalMag
      const normalY = deltaX / normalMag

      // Add noise
      ring.iteratePath((ringPoint, ringT) => {
        const normal = ring.getNormal(ringT)

        // Smoothstep so more noisy in middle, less at edges
        const s =
          0.9 * smoothstep(-0.1, 0.4, 0.5 - Math.abs(ringT - 0.5)) * thickness
        const noiseMag = 2 * (noise([2 * ringT, ringSeed]) - 0.5) * s

        ringPoint[0] += normalX * noiseMag
        ringPoint[1] += normalY * noiseMag
      })

      turtles.push(ring)
    }
  })

  turtle.path = [left, right]
}
```

You should now be able to produce something like the screenshot below:

<img
  src="https://cloud-2sueak8hm-hack-club-bot.vercel.app/0final_roots.png"
  width="400"
/>

That's it! But you can still add a lot of features from here, if you're up to it:

- For instance, one thing to add would be occlusion, so each branch can be assigned a z-index and cover other ones, so many more branches can be rendered without being too busy
- Or, you could make the texturing more interesting by varying `ringSeed` for different branches or different regions
- You could render multiple initial branches/roots at the start, and generate random parameters for each one in an interesting pattern
- Add some logic so the branches stay within the Haxidraw bed/document always, and curl away from the edges if they get too close
- Generate a texture for the background
