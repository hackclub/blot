//The Hering illusion
// Tells whether the straight lines should be a little crooked
const crooked = true
  // If true, sets the amount
  const rightLine = bt.randIntInRange(0, 10);
  const leftLine = bt.randIntInRange(0, 10);

// The Kanizsa Triangle
// Sets the scale
const s = 1
// Sets the position
const posX = 70
const posY = 80


// First generate the Lines in the background
function generateLines() {
  let currentY = 5

  while (currentY < 125) {
    drawLines([
      [
        [0, currentY],
        [50, 125 - currentY]
      ]
    ]);
    currentY += bt.randIntInRange(3, 6);
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
  drawTriangle(70, 80, 120, 10, false)
  drawTriangle(70, 97.35, 240, 5, true)
}

function drawTriangle(x, y, rotation, length, circle) {
  const t = new bt.Turtle()
    .jump([x, y])
  for (let i = 0; i < 3; i++) {
    if (circle) {
      t.left(180)
      t.up()
      t.forward(length)
      t.down()
      t.right(90)
      t.arc(-180, length)
      t.up()
      t.arc(-60, length)
      t.down()
      t.arc(-120, length)
      t.right(90)
      t.up()
      t.forward(length)
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

const width = 125
const height = 125

setDocDimensions(width, height);

// Illusion 1
generateLines();

// Illusion 2
triangle();