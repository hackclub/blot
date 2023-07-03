const t = new Turtle();

const warper = createCubicBez(
  [0, 0],
  [.5, 1],
  [.5, 1],
  [1, 0]
)

t
  .forward(5)
  .resample(.01)
  .warp(t => warper(t)[1])
  


drawTurtles(t);

