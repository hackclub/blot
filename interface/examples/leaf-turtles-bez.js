const leafLength = 5
const leafW = 1.3

const edge = createTurtle()
  .forward(leafLength)
  .resample(0.01)
  .warp(bezierEasing(0, [0.4, 2.29], [0.52, 0.31], 0))

function veins() {
  const lines = createTurtle()

  let littleLinesMax = 61
  for (let i = 4; i < littleLinesMax - 5; i++) {
    const t = i / (littleLinesMax - 1)
    const x0 = t * leafLength
    const y0 = 0

    y = edge.interpolate(t + 0.1)[1]

    const line = createTurtle([x0, y0])

    line.right(-70 + t * 37 + randInRange(-4, 4))

    let r = y * 0.7

    const trimTo = i % 5 === 0 ? randInRange(0.7, 0.9) : randInRange(0.1, 0.7)

    if (r < 0.01) continue

    const warper = bezierEasing(0, [0.28, y / 4], [0.58, y / 8], 0)

    line.forward(r).resample(0.01).warp(warper).resample(0.05).trim(0, trimTo)

    line.iteratePath(pt => {
      return Math.random() < (i % 5 === 0 ? +0.17 : 0.56) ? 'BREAK' : pt
    })

    lines.join(line)
  }

  return lines
}

const t = createTurtle()

const bottom = edge.copy().scale([1, -1], [0, 0])

edge.warp(
  t => noise(t * 20.4, { octaves: 2 }) * 0.09 * (t === 0 || t === 1 ? 0 : 1)
)
bottom.warp(
  t => noise(t * 23.6, { octaves: 2 }) * -0.1 * (t === 0 || t === 1 ? 0 : 1)
)

t.join(edge)
t.join(bottom)
t.join(veins())
t.join(veins().scale([1, -1], [0, 0]))

const lineStem = createTurtle([-1, 0])
  .forward(leafLength + 1)
  .resample(0.1)

t.join(lineStem)

t.iteratePath(pt => {
  let [x, y] = pt
  y += x * x * 0.02
  y += noise([x * 0.2]) * 0.3
  return [x, y]
})

t.translate([58, -60])
t.scale(17.2)

const workarea = createTurtle()
  .forward(5 * 25.4)
  .right(90)
  .forward(4.8 * 25.4)

drawTurtles(t, workarea)
