/*
@title: Optical Illusion
@author: Sajeg
@snapshot: image0.png
*/

// The Hering illusion
  // Tells if it should be drawn
  const heringEnabled = true
  // Sets if the Space between the Lines should be random
  const rSpace = true
    // If false sets the Space between the Lines
    const space = 8
  // Tells whether the straight lines should be a little crooked
  const crooked = true
    // If true, sets the amount
    const rightLine = bt.randIntInRange(0, 10);
    const leftLine = bt.randIntInRange(0, 10);

// The Kanizsa triangle
  // Tells if it should be drawn
  const kanizsaEnabled = true
  // Sets the scale
  const s = bt.randInRange(1, 1.4)
  // Sets the position
  const kanPosX = 70
  const kanPosY = 80

// The Penrose triangle
  // Tells if it should be drawn
  const penroseEnabled = true
  // Sets the scale
  const penS = bt.randInRange(0.5, 1.3)
  // Sets the position
  const penPosX = 70
  const penPosY = 15

function generateLines() {
  let currentY = 5

  while (currentY < 125) {
    drawLines([
      [
        [0, currentY],
        [50, 125 - currentY]
      ]
    ]);
    if (rSpace) {
      currentY += bt.randIntInRange(3, 6);
    } else {
      currentY += space
    }
  }

  straightLines();
}

function straightLines() {
  let r = 0
  let l = 0
  if (crooked) {
    r = rightLine
    l = leftLine
  }
  // Left straight Line
  drawLines([
    [
      [10, 0],
      [10 + l, 125]
    ]
  ], {
    stroke: 'red'
  });

  // Right straight Line
  drawLines([
    [
      [40, 0],
      [40 + r, 125]
    ]
  ], {
    stroke: 'red'
  });
}

function triangle() {
  drawTriangle(kanPosX, kanPosY, 120, 10, false)
  drawTriangle(kanPosX, (kanPosY + (17.35 * s)), 240, 5, true)
}

function drawTriangle(x, y, rotation, length, circle) {
  const t = new bt.Turtle()
    .jump([x, y])
  for (let i = 0; i < 3; i++) {
    if (circle) {
      t.left(180)
      t.up()
      t.forward(length * s)
      t.down()
      t.right(90)
      t.arc(-180, length * s)
      t.up()
      t.arc(-60, length * s)
      t.down()
      t.arc(-120, length * s)
      t.right(90)
      t.up()
      t.forward(length * s)
      t.down()
    }
    t.forward(length * s)
    t.up()
    t.forward((30 - (2 * length)) * s)
    t.down()
    t.forward(length * s)
    t.left(rotation)
  }
  drawLines(t.lines())

}

function penrose() {
  let angles = [
    [0, 0],
    [0, 0],
    [0, 0]
  ]
  const t = new bt.Turtle()
    .jump([penPosX, penPosY])
  t.left(30)
  for (let i = 0; i < 3; i++) {
    angles[i] = t.pos
    t.forward(30 * penS)
    t.left(120)
  }
  t.right(120)
  for (let i = 0; i < 3; i++) {
    t.jump(angles[i])
    t.forward(5 * penS)
    t.left(120)
    t.forward(45 * penS)
    t.left(120)
    t.forward(50 * penS)
    t.left(60)
    t.forward(5 * penS)
    t.left(180)
  }
  drawLines(t.lines())
}

const width = 125
const height = 125

setDocDimensions(width, height);

if (heringEnabled) {
  generateLines()
}

if (kanizsaEnabled) {
  triangle()
}
if (penroseEnabled) {
  penrose()
}