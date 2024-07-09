//The Hering illusion

const width = 125
const height = 125

setDocDimensions(width, height);

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
  // Slightly rotated
  const r = bt.randIntInRange(0, 10);
  const l = bt.randIntInRange(0, 10);
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

  drawLines([
    [
      [70, 80],
      [80, 80]
    ],
    [
      [70, 80],
      [75, 88]
    ],
  ])

  drawLines([
    [
      [90, 80],
      [100, 80]
    ],
    [
      [100, 80],
      [95, 88]
    ],
  ])

  drawLines([
    [
      [85, 100],
      [80, 80]
    ],
    [
      [85, 100],
      [90, 95]
    ],
  ])
}

// Illusion 1
generateLines();

// Illusion 2
triangle();