// Width and height of the document (10mm x 20mm).
// Small, but can easily call turtles.map(turtle => turtle.scale(<scale>)) right before drawTurtles() if needed.
const WIDTH = 10
const HEIGHT = 20

const t = createTurtle([WIDTH / 2, 0])
t.right(90)

// Manage array of turtles that need to be drawn
// so they can all be passed to drawTurtles() at the end.
// Normally, you should be able to use one turtle (t) and call t.join(<child turtle>),
// but for whatever reason I couldn't get that to work with this script.
const turtles = [t]

// Smoothstep
function clamp(x, minVal, maxVal) {
  return Math.max(Math.min(x, maxVal), minVal)
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0)
  return t * t * (3.0 - 2.0 * t)
}

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random() // Converting [0,1) to (0,1]
  const v = Math.random()
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean
}

// Mods angle to be from -180 - 180 degrees
function modAngleDeg(angle) {
  angle = Math.sign(angle) * (Math.abs(angle) % 360)
  if (angle > 180) return 180 - angle
  else return angle
}

// Thickness
function thicknessAt(t) {
  // Starts out at a bit below 1, smoothly goes to 0 at t=0.9
  return 1 - smoothstep(-1.3, 0.9, t)
}

/* Takes the turtle used to make a path, and turns it
  into two paths spaced apart by `thickness`. 
  Also, every 1/(200-1) `t`, makes a "ring" that connects both paths. */
function thicken(turtle, startingTime) {
  const nRings = 200
  const ringStepT = 1 / (nRings - 1)
  let nextRingT = ringStepT

  const left = []
  const right = []

  turtle.iteratePath((pt, t) => {
    // getAngle() returns degrees, convert to radians
    const angleAtPoint = (turtle.getAngle(t) / 180) * Math.PI

    const thickness = thicknessAt(t + startingTime)

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

      const ring = createTurtle(leftPoint)
        .setAngle((Math.atan2(deltaY, deltaX) / Math.PI) * 180)
        .forward(Math.sqrt(deltaX * deltaX + deltaY * deltaY)) // Straight line from left to right
        .resample(0.01) // Resample so we can modulate individual points

      // Seed for noise
      const ringSeed = 1

      // Take normal vector of straight line by perpendicularizing the line ([x, y] -> [-y, x])
      const normalMag = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const normalX = -deltaY / normalMag
      const normalY = deltaX / normalMag

      // Add noise
      ring.iteratePath((ringPoint, ringT) => {
        // Smoothstep so more noisy in middle, less at edges
        const s =
          0.9 * smoothstep(-0.1, 0.4, 0.5 - Math.abs(ringT - 0.5)) * thickness // Scale with thickness, as there's more/less room
        const noiseMag = 2 * (noise([2 * ringT, ringSeed]) - 0.5) * s

        ringPoint[0] += normalX * noiseMag
        ringPoint[1] += normalY * noiseMag
      })

      turtles.push(ring)
    }
  })

  turtle.path = [left, right]
}

/* Given a turtle, makes a branch using it via a (Gaussian) random walk.
  Then thickens the branch and, if it's long enough, randomly makes 1-3 "child" branches. */
function makeBranch(turtle, length, startingT) {
  const n = 185

  for (let i = 0; i < n; i++) {
    const time = i / (n - 1) // Scale i to be from 0-1. The "time" of the step
    const average = -90 // Downwards
    const stdev = 200 // High standard deviation, we don't want the branch to be straight
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

  if (length > +0.05) {
    const nBranches = Math.floor(randInRange(1, 4)) // 1-3

    for (let i = 0; i < nBranches; i++) {
      const time = randInRange(0.02, 1)
      const pt = turtle.interpolate(time)
      const curAngleDeg = turtle.getAngle(time),
        curAngleRad = (curAngleDeg / 180) * Math.PI
      const parentThickness = thicknessAt(time + startingT)

      // Turn either left or right 90 degrees
      const a = (Math.random() > 0.5 ? 1 : -1) * 90

      // Move side branch out of parent
      pt[0] += parentThickness * Math.cos(curAngleRad - a)
      pt[1] += parentThickness * Math.sin(curAngleRad - a)

      const newBranch = createTurtle(pt)
      newBranch.setAngle(curAngleDeg)

      newBranch.right(a)
      makeBranch(newBranch, length * (1 - time) * 0.9, time + startingT) // Recur

      turtles.push(newBranch) // Add to turtles array for drawing
    }
  }

  thicken(turtle, startingT)

  return turtle
}

// Make initial branch
makeBranch(t, 0.1, 0)

// Center piece
const final = createTurtle();
turtles.forEach(t => final.join(t));
final.scale(115/final.height)
final.translate([125/2, 125/2], final.cc)

// Draw turtles array
drawTurtles([ final ])
