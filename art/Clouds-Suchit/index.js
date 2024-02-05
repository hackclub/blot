// square disarray
// leo mcelroy

const width = 120
const height = 120

const nWidth = 10
const nHeight = 10

setDocDimensions(width, height)

const shapes = createTurtle()

function createLine(translate = [0, 0], rotate = 0) {
  const t = createTurtle()

  t.arc(100, Math.floor(Math.random() * 20));
  return t
}

const stepW = width / nWidth
const stepH = height / nHeight
for (let i = 0; i < nWidth; i++) {
  for (let j = 0; j < nHeight; j++) {
    const t = createLine()
    t.translate([0, 0], t.lb)
    t.translate([stepW * i, stepH * j])
    t.rotate(randInRange(-1, 1) * (i + j) * 2.2)
    t.translate([
      randInRange(-1, 1) * (i + j) * 0.14,
      randInRange(-1, 1) * (i + j) * 0.14
    ])
    shapes.join(t)
  }
}

shapes.scale([0.9, -0.9])

drawTurtles([shapes])
