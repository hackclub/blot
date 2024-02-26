/*
@title: tree
@author: leomcelroy
@snapshot: tree.png
*/

setRandSeed(453)

let trunk = createTurtle()

const scaleCurve = randInRange(-1.01, 1.01)

let iMax = 30
for (let i = 0; i < iMax; i++) {
  const t = i / (iMax - 1)
  const x = t * 0.6
  const trunkLine = createTurtle([x, 0 + noise(i) * 0.3])
  trunkLine.left(90)

  trunkLine
    .forward(2.8)
    .resample(0.02)
    .iteratePath((pt, tValue) => {
      const [x, y] = pt
      pt[0] += noise(y * 1.8) * -0.3 + Math.sin(y * 0.05)
      if (t === 0 || t === 1) return pt
      if (rand() < lerp(0, 1, 0.54 * tValue ** 2)) return 'BREAK'
      if (rand() < t * 0.44) return 'BREAK'
    })

  trunk.join(trunkLine)
}

let startPt = trunk.ct
startPt[1] -= 0.3

const randomWalk = createTurtle(startPt)

function circleSDF([x, y], start, r) {
  let dx = 0.57 * x
  let dy = 0.48 * y

  dx -= start[0]
  dy -= start[1]

  let angle = 113
  angle = (angle / 180) * Math.PI

  return (
    Math.sqrt(dx * dx + dy * dy) -
    r +
    // + noise([x, y], { octaves: 4})*10
    noise([x, y], { octaves: 1 }) * 1.1 +
    noise([x * 0.01, y * 0.01], { octaves: 1 }) * 0.53
  )
  // + noise([x, y], { octaves: 4})*0.01
}

const r = randInRange(0.4, 2.1)
const sdf = (x, y) => Math.min(circleSDF([x, y], startPt, r))

const step = 0.03
let setAngle = false
for (let i = 0; i < 100000; i++) {
  let angle = randInRange(-1, 1) * 17
  randomWalk.right(angle)
  randomWalk.forward(step)

  const [endX, endY] = randomWalk.end
  const distance = sdf(endX, endY)
  if (distance > 0) {
    const up = sdf(endX, endY + step)
    const down = sdf(endX, endY - step)
    const right = sdf(endX + step, endY)
    const left = sdf(endX - step, endY)
    const gradX = (right - left) / (2 * step)
    const gradY = (up - down) / (2 * step)

    let a =
      (Math.atan2(gradY, gradX) / Math.PI) * 180 + randInRange(-1, 1) * 102
    a += 180
    randomWalk.setAngle(a)
    randomWalk.forward(step)
  }

  if (rand() < +0.6 + noise([endX * 18.7, endY * 1.34]) / 1.8) {
    randomWalk.up()
  } else randomWalk.down()
}

randomWalk.rotate(randInRange(-5, 5)).translate([-0.1, -0.6])

const final = [trunk, randomWalk].reduce((acc, cur) => acc.join(cur), createTurtle());
final.scale(110/final.height);
final.translate([125/2, 0], final.cb);

drawTurtles([final]);
