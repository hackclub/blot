/*
@title: Jack in the Box
@author: Dylan
@snapshot: Jack in the Box
*/

const { Turtle, rand, randInRange } = blotToolkit;
const t = new Turtle();
const finalLines = [];

setDocDimensions(125, 125);

function randomColor() {
    const r = Math.floor(rand() * 256);
    const g = Math.floor(rand() * 256);
    const b = Math.floor(rand() * 256);
    return `rgb(${r},${g},${b})`;
}

function bluecolor() {
    return "rgb(0, 0, 255";
}

function orangeColor() {
    return "rgb(255, 165, 0)";
}

const circleRadius = randInRange(4, 9);

const additionalCircleRadius = 37;

const centerX = 125 / 2;
const centerY = 125 / 2;
const width = 80;
const height = 30

const smileOffsetY = -9;

t.up()
  .goTo([centerX - 15, centerY])
  .down()
  .arc(360, circleRadius);

t.up()
  .goTo([centerX + 15, centerY])
  .down()
  .arc(360, circleRadius);

t.up()
  .goTo([centerX + 1, centerY + -45])
  .down()
  .arc(360, additionalCircleRadius);

function drawSquare(corner1, corner2, corner3, corner4) {
    const t = new Turtle();
    
    t.up().goTo(corner1).down();
    
    t.goTo(corner2)
     .goTo(corner3)
     .goTo(corner4)
     .goTo(corner1);
    
    let squareLines = t.lines();

    squareLines = bt.translate(squareLines, translation);

    const centerX = (corner1[0] + corner3[0]) / 2;
    const centerY = (corner1[1] + corner3[1]) / 2;
    squareLines = bt.rotate(squareLines, rotation, [centerX + translation[0], centerY + translation[1]]);
    
    drawLines([squareLines[0]], { stroke: "orangeColor", width: -2, fill: orangeColor() });
}

const corner1 = [37, 30];
const corner2 = [48, 30];
const corner3 = [55, 40];
const corner4 = [30, 40];
const translation = [-9, 50];
const rotation = 39;


drawSquare(corner1, corner2, corner3, corner4, translation, rotation);

let triangleVertices = [
  [centerX - 20, centerY - 40],
  [centerX + 20, centerY - 40],
  [centerX, centerY + 20]
];

const moveX = -36;
const moveY = 50;

triangleVertices = triangleVertices.map(vertex => 
  [vertex[0] + moveX, vertex[1] + moveY]
);

const triangleCenter = [
  (triangleVertices[0][0] + triangleVertices[1][0] + triangleVertices[2][0]) / 3,
  (triangleVertices[0][1] + triangleVertices[1][1] + triangleVertices[2][1]) / 3
];

const scaleFactor = bt.randInRange(0.4, 0.55);

triangleVertices = triangleVertices.map(vertex => 
  [(vertex[0] - triangleCenter[0]) * scaleFactor + triangleCenter[0], 
   (vertex[1] - triangleCenter[1]) * scaleFactor + triangleCenter[1]]
);

const rotationAngle = 39;

function rotatePoint(cx, cy, x, y, angle) {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
  return [nx, ny];
}

const scaledTriangleCenter = [
  (triangleVertices[0][0] + triangleVertices[1][0] + triangleVertices[2][0]) / 3,
  (triangleVertices[0][1] + triangleVertices[1][1] + triangleVertices[2][1]) / 3
];

const rotatedTriangleVertices = triangleVertices.map(vertex => 
  rotatePoint(scaledTriangleCenter[0], scaledTriangleCenter[1], vertex[0], vertex[1], rotationAngle)
);

t.up()
  .goTo(rotatedTriangleVertices[0])
  .down();

t.goTo(rotatedTriangleVertices[1])
  .goTo(rotatedTriangleVertices[2])
  .goTo(rotatedTriangleVertices[0]);

let polylines = t.lines();

t.up()
 .goTo([centerX - width/2, centerY + smileOffsetY])
 .down();

const curveControlPoints2 = [
  [centerX - width/3, centerY + smileOffsetY],
  [centerX - width/bt.randInRange(3, 5), centerY + smileOffsetY - height],
  [centerX + width/bt.randInRange(3, 5), centerY + smileOffsetY - height],
  [centerX + width/3, centerY + smileOffsetY]
];

const smile = bt.nurbs(curveControlPoints2, { steps: 332, degree: 3.0 });

drawLines([smile], { stroke: "red", width: bt.randInRange(2, 14) });

drawLines([polylines[0]], { fill: bluecolor() });
drawLines([polylines[1]], { fill: bluecolor() });
drawLines([polylines[2]]);
drawLines([polylines[3]], { fill: orangeColor() });
drawLines([polylines[4]], { stroke: "orangeColor", width: -2, fill: orangeColor() });
