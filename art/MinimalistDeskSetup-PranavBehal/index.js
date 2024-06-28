/*
@title: MinimalistDeskSetup
@author: Pranav Behal
@snapshot: snapshot_1.png
*/

// Creates variations of a minimalist desk setup
const width = 125;
const height = 125;

setDocDimensions(width, height);
const finalLines = [];
const t = new bt.Turtle();
const {
  Turtle,
  trim,
  merge,
  cut,
  cover,
  rotate,
  scale,
  translate,
  originate,
  iteratePoints,
  pointInside,
  resample,
  join,
  copy,
  union,
  difference,
  intersection,
  xor,
  getAngle,
  getPoint,
  getNormal,
  bounds,
  nurbs,
  catmullRom,
  rand,
  setRandSeed,
  randInRange,
  randIntInRange,
  noise,
} = blotToolkit;

// Drawing a table
function drawTable() {
  let tableWidth = randIntInRange(70, 125);
  for (let i = 0; i < 4; i++) t.forward(1).right(90);
  const rect = bt.scale(t.lines(), [tableWidth, 6]);
  bt.translate(rect, [width / 2, height / 3.3], bt.bounds(rect).cc);
  drawLines(rect);
}

// Different monitor configurations
function drawMonitor() {
  let ranNum = randIntInRange(1, 6);
  if (ranNum === 1) {
    drawLines([
      [
        [47.5, 50],
        [77.5, 50],
        [77.5, 67],
        [47.5, 67],
        [47.5, 50],
      ],
    ]);
  } else if (ranNum === 2) {
    drawLines([
      [
        [47.5, 50],
        [77.5, 50],
        [77.5, 67],
        [47.5, 67],
        [47.5, 50],
      ],
    ]);

    drawLines([
      [
        [20.5, 49.5],
        [47.5, 50],
        [47.5, 67],
        [20.5, 67.5],
        [20.5, 49.5],
      ],
    ]);

    drawLines([
      [
        [77.5, 50],
        [104.5, 49.5],
        [104.5, 67.5],
        [77.5, 67],
        [77.5, 50],
      ],
    ]);
  } else if (ranNum === 3) {
    drawLines([
      [
        [47.5, 50],
        [77.5, 50],
        [77.5, 67],
        [47.5, 67],
        [47.5, 50],
      ],
    ]);

    drawLines([
      [
        [30.5, 43.5],
        [47.5, 44],
        [47.5, 73.5],
        [30.5, 74],
        [30.5, 43.5],
      ],
    ]);
  } else if (ranNum === 4) {
    drawLines([
      [
        [47.5, 50],
        [77.5, 50],
        [77.5, 67],
        [47.5, 67],
        [47.5, 50],
      ],
    ]);

    drawLines([
      [
        [30.5, 43.5],
        [47.5, 44],
        [47.5, 73.5],
        [30.5, 74],
        [30.5, 43.5],
      ],
    ]);

    drawLines([
      [
        [77.5, 44],
        [94.5, 43.5],
        [94.5, 74],
        [77.5, 73.5],
        [77.5, 44],
      ],
    ]);
  } else if (ranNum === 5) {
    drawLines([
      [
        [47.5, 50],
        [77.5, 50],
        [77.5, 67],
        [47.5, 67],
        [47.5, 50],
      ],
    ]);

    drawLines([
      [
        [30.5, 43.5],
        [47.5, 44],
        [47.5, 73.5],
        [30.5, 74],
        [30.5, 43.5],
      ],
    ]);

    drawLines([
      [
        [77.5, 50],
        [104.5, 49.5],
        [104.5, 67.5],
        [77.5, 67],
        [77.5, 50],
      ],
    ]);
  } else {
    drawLines([
      [
        [47.5, 50],
        [77.5, 50],
        [77.5, 67],
        [47.5, 67],
        [47.5, 50],
      ],
    ]);

    drawLines([
      [
        [20.5, 49.5],
        [47.5, 50],
        [47.5, 67],
        [20.5, 67.5],
        [20.5, 49.5],
      ],
    ]);

    drawLines([
      [
        [77.5, 44],
        [94.5, 43.5],
        [94.5, 74],
        [77.5, 73.5],
        [77.5, 44],
      ],
    ]);
  }
}

// Drawing ledges on top of the monitors (on the wall)
function drawDecor() {
  let ranWidth = randInRange(0.5, 1.5);
  let ranNum = randIntInRange(1, 3);

  let ledge1 = [
    [
      [50, 80],
      [75, 80],
      [75, 84],
      [50, 84],
      [50, 80],
    ],
  ];

  let ledge2 = [
    [
      [15, 95],
      [40, 95],
      [40, 99],
      [15, 99],
      [15, 95],
    ],
  ];

  let ledge3 = [
    [
      [85, 95],
      [110, 95],
      [110, 99],
      [85, 99],
      [85, 95],
    ],
  ];

  if (ranNum === 1) {
    drawLines(scale(ledge1, [ranWidth, 1]));
  } else if (ranNum === 2) {
    drawLines(scale(ledge1, [ranWidth, 1]));
    drawLines(scale(ledge2, [ranWidth, 1]));
    drawLines(scale(ledge3, [ranWidth, 1]));
  } else return;
}

drawTable();
drawMonitor();
drawDecor();
