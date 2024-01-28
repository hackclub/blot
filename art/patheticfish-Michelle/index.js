const fish = createTurtle()
  //fish body
  .forward(5)
  .resample(0.01)
  .warp(bezierEasing(0, [0.1, 2.44], [1.3, 1.46], -1.5))
  //fish tail
  .left(90)
  .forward(0.001)
  .left(90)
  //fish eye
  .jump([1, 0])
  .forward(0.05)

const t = createTurtle()

t.join(fish)
t.join(fish.copy().scale([1, -1], [0, 0]))

t.translate([125/2, 125/2])
t.scale(5)

drawTurtles([t])