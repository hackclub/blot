const t = createTurtle()

const h1 = [0.14, 0.55]
const h2 = [0.39, 0.08]

const warper3 = be1(0, h1, h2, 0)

const warper4 = be1(0, [0.9, -0.3], [0.72, 0.41], 0)

t.forward(1)
  .resample(0.01)
  .warp(t => warper3(t) + warper4(t))

drawTurtles(t, createTurtle(t.start).goto(h1), createTurtle(t.end).goto(h2))
