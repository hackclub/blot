/*
@title: Buildings
@author: Dominic
@snapshot: snapshot0.png
*/

bt.setRandSeed(500);

const width = 125;
const height = 125;

setDocDimensions(width, height);


const lines = [];

const centerLine = [
  [0, height / 2],
  [width, height / 2]
];


function building(w, h) {
  return [
    [
      [-w / 2, h],
      [w / 2, h],
      [w / 2, 0],
      [-w / 2, 0],
      [-w / 2, h]
    ]
  ]
}


function reflecLines(w, h, tx, ty) {
  for (let i = -1; i > -h; i -= bt.randIntInRange(2, 3)) {
    drawLines([
      [
        [width / 2 - w / 2 + tx, height / 2 + i + ty],
        [width / 2 + w / 2 + tx, height / 2 + i + ty]
      ]
    ], { stroke: "blue", width: 1 });
  }
  return null;
}

function veritcalLines(w, h) {
  let lines = []
  for (let i = -w / 2; i < w / 2; i++) {

    bt.join(lines, [
      [
        [i, 0],
        [i, h]
      ]
    ]);
  }
  return lines;
}

function horizontalLines(w, h) {
  let lines = []
  for (let i = 20; i < h - 10; i++) {
    bt.join(lines, [
      [
        [-w / 2, i],
        [w / 2, i]
      ]
    ]);
  }
  return lines;
}

// Make buildings with reflection
for (let i = 0; i < 20; i++) {
  let rand = bt.randIntInRange(1, 5);

  let randWidth = bt.randInRange(10, 15);
  let randHeight = bt.randInRange(25, 60);
  let randTranslate = bt.randIntInRange(-40, 40);


  let rectangles = building(randWidth, randHeight);
  bt.translate(rectangles, [randTranslate, 0]);
  bt.join(lines, rectangles);
  bt.cover(lines, rectangles);
  reflecLines(randWidth, randHeight, randTranslate, 0);
  if (rand == 1) {
    let vertical = veritcalLines(randWidth, randHeight);
    bt.translate(vertical, [randTranslate, 0]);
    bt.join(lines, vertical);
  }
  if (rand == 2) {
    let horizontal = horizontalLines(randWidth, randHeight);
    bt.translate(horizontal, [randTranslate, 0]);
    bt.join(lines, horizontal);
  }
}

//Sun
const circlePoints = [];

for (let i = 0; i < 50; i++) {
  const angle = (Math.PI * 2 * i) / 50;
  const x = 10 * Math.cos(angle);
  const y = 10 * Math.sin(angle);
  if (angle < Math.PI / 2) {
    bt.join(circlePoints, [
      [x, y]
    ]);
  }
}


const rays = [];
let numRays = 13;
let rayLength = bt.randIntInRange(10, 20);;
for (let i = 0; i < numRays; i++) {
  const angle = (Math.PI / 2 * i) / numRays;
  const x1 = circlePoints[i][0];
  const y1 = circlePoints[i][1];
  const x2 = x1 + rayLength * Math.cos(angle);
  const y2 = y1 + rayLength * Math.sin(angle);
  bt.join(rays, [
    [x1, -y1],
    [x2, -y2]
  ]);
}
// Translate and draw Sun
bt.translate([circlePoints], [0, 125]);
bt.rotate([circlePoints], 270, [0, 125]);
bt.translate([rays], [0, 125]);
drawLines([circlePoints]);
drawLines([rays]);

// center pieces
bt.translate(lines, [width / 2, height / 2]);

// Draw

drawLines([centerLine], { stroke: "black", width: 3 });
drawLines(lines);