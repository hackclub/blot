/*
@title: tree
@author: leomcelroy
@snapshot: tree.png
*/

setDocDimensions(125, 125);

bt.setRandSeed(453)

let trunk = [];

const scaleCurve = bt.randInRange(-1.01, 1.01)

let iMax = 30
for (let i = 0; i < iMax; i++) {
  const t = i / (iMax - 1)
  const x = t * 0.6
  const trunkLine = new bt.Turtle();
  trunkLine.jump([x, 0 + bt.noise(i) * 0.3]);
  trunkLine.left(90)

  trunkLine.forward(2.8)
  
  const path = trunkLine.path;
  bt.resample(path, 0.02)
  bt.iteratePoints(path, (pt, tValue) => {
    const [x, y] = pt
    pt[0] += bt.noise(y * 1.8) * -0.3 + Math.sin(y * 0.05)
    if (t === 0 || t === 1) return pt
    if (bt.rand() < lerp(0, 1, 0.54 * tValue ** 2)) return 'BREAK'
    if (bt.rand() < t * 0.44) return 'BREAK'
  })

  bt.join(trunk, path);
}

let startPt = bt.bounds(trunk).ct
startPt[1] -= 0.3

const randomWalk = new bt.Turtle().jump(startPt);

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
    bt.noise([x, y], { octaves: 1 }) * 1.1 +
    bt.noise([x * 0.01, y * 0.01], { octaves: 1 }) * 0.53
  )
  // + noise([x, y], { octaves: 4})*0.01
}

const r = bt.randInRange(0.4, 2.1)
const sdf = (x, y) => Math.min(circleSDF([x, y], startPt, r))

const step = 0.03
let setAngle = false
for (let i = 0; i < 100000; i++) {
  let angle = bt.randInRange(-1, 1) * 17
  randomWalk.right(angle)
  randomWalk.forward(step)

  const [endX, endY] = randomWalk.path.at(-1).at(-1);
  const distance = sdf(endX, endY)
  if (distance > 0) {
    const up = sdf(endX, endY + step)
    const down = sdf(endX, endY - step)
    const right = sdf(endX + step, endY)
    const left = sdf(endX - step, endY)
    const gradX = (right - left) / (2 * step)
    const gradY = (up - down) / (2 * step)

    let a =
      (Math.atan2(gradY, gradX) / Math.PI) * 180 + bt.randInRange(-1, 1) * 102
    a += 180
    randomWalk.setAngle(a)
    randomWalk.forward(step)
  }

  if (bt.rand() < +0.6 + bt.noise([endX * 18.7, endY * 1.34]) / 1.8) {
    randomWalk.up()
  } else randomWalk.down()
}

const randomWalkLines = randomWalk.lines();
bt.rotate(randomWalkLines, bt.randInRange(-5, 5))
bt.translate(randomWalkLines, [-0.1, -0.6])

const final = [trunk, randomWalkLines].reduce((acc, cur) => bt.join(acc, cur), []);
const bb = () => bt.bounds(final);
bt.scale(final, 110/bb().height);
bt.translate(final, [125/2, 0], bb().cb);

drawLines(final);

function lerp( a, b, alpha ) {
 return a + alpha * ( b - a );
}
