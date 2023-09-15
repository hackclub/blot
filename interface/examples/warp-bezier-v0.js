const t = createTurtle()

const h1 = [0.15, 0.54]
const h2 = [0.49, -0.05]

const warper = makeCubicShaper(0, h1, h2, 1)

const warper2 = bezierEasing(...h1, ...h2)

const warper3 = be1(0, h1, h2, 0)

const warper4 = be1(0, [0.55, 0.18], [0.72, 0.18], 0)

t
  // .left(40)
  .forward(1)
  .resample(0.01)
  .iteratePath((pt, tValue) => {
    const angle = t.getAngle(tValue)
    const r = warper3(tValue) // - warper4(tValue);
    const dx = -Math.sin((angle / 180) * Math.PI) * r
    const dy = Math.cos((angle / 180) * Math.PI) * r

    return [pt[0] + dx, pt[1] + dy]
  })

drawTurtles(
  t
  // createTurtle(t.start).goto(h1),
  // createTurtle(t.end).goto(h2),
)
