/*
@title: square disarray
@author: leomcelroy
@snapshot: 0.png
*/

const width = 120
const height = 120

const nWidth = 10
const nHeight = 10

setDocDimensions(width, height)

const shapes = createTurtle()

function createSquare(translate = [0, 0], rotate = 0) {
  const t = createTurtle()

  for (let i = 0; i < 2; i++) {
    t.forward(width / nWidth)
    t.right(90)
    t.forward(height / nHeight)
    t.right(90)
  }

  t.translate(translate)
  t.rotate(rotate)

  return t
}

const stepW = width / nWidth
const stepH = height / nHeight
for (let i = 0; i < nWidth; i++) {
  for (let j = 0; j < nHeight; j++) {
    const t = createSquare()
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
