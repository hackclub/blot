/*
@title: sheet music
@author: nicholasz2510
@snapshot: sheet_music.png
*/

bt.setRandSeed(113);

const width = 125;
const height = 125;
const MAX_CURVE_HEIGHT = height / 20

setDocDimensions(width, height);

const finalLines = [];

function connectShapes(start, end, startCurvingUp, endCurvingDown) {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const curveWidth = endX - startX;
  const xDelta = curveWidth * (1 / 3);
  const interiorX1 = startX + xDelta;
  const interiorX2 = endX - xDelta;
  const interiorY1 = startY + ((startCurvingUp ? 1 : -1) * bt.randInRange(0, MAX_CURVE_HEIGHT));
  const interiorY2 = endY + ((endCurvingDown ? 1 : -1) * bt.randInRange(0, MAX_CURVE_HEIGHT));

  finalLines.push(bt.catmullRom([start, [interiorX1, interiorY1], [interiorX2, interiorY2], end]));
}
// connectShapes([0, 64], [width, 87], true, true);

function generateTrebleClef() {
  const points = [];

  for (let i = 60; i <= 140; i += 1) {
      let angle = -0.1 * i;
      let x = angle * Math.cos(angle);
      let y = angle * Math.sin(angle);
      points.push([x, y]);
  }

  points.push([-1,14]);
  points.push([0,16]);
  points.push([2,20]);
  points.push([2.6,26]);
  points.push([0.6,34]);
  points.push([-1.2,34]);
  points.push([-1.9,33]);
  points.push([-2.3,30]);
  points.push([-1.7,16]);
  points.push([0.4,-16]);
  points.push([-2.5,-20]);
  points.push([-3.9,-17]);
  points.push([-2.0,-15]);
  points.push([-1.3,-15]);

  return bt.catmullRom(points);
}
// finalLines.push(generateTrebleClef());

function generateEighthNote() {
  const points = [];

  const noteHeadRadius = 8;
  const stemHeight = 36;

  for (let i = 47; i < 360; i += 10) {
      let angle = i * (Math.PI / 180);
      let x = noteHeadRadius * Math.cos(angle);
      let y = noteHeadRadius * Math.sin(angle);
      points.push([x, y]);
  }

  // Generate points for the stem (vertical line)
  for (let j = 0; j <= stemHeight; j++) {
      let x = noteHeadRadius;
      let y = j;
      points.push([x, y]);
      points.push([x, y]);
  }
  points.push([15,33]);
  points.push([18,27]);
  points.push([16,29]);
  points.push([12,32]);
  points.push([9,32]);
  points.push([9,32]);
  points.push([9,21]);
  points.push([9,-1]);

  return bt.catmullRom(points);
}
// finalLines.push(generateEighthNote());

function startingFrom(start, shape) {
  const [startX, startY] = start;
  const [shapeX, shapeY] = shape[10];
  // return bt.translate(shape, [startX - shapeX, startY - shapeY]);
  return bt.translate(shape, [4, 17]);
}

connectShapes([0, bt.randInRange(36, 55)], [14.2, 53.3], false, false);
finalLines.push(bt.translate([generateTrebleClef()], [20, 55])[0]);
const startPoint = [20, 55];
const [startX, startY] = startPoint;
let currPoint = startPoint;

const numEighthNotes = bt.randIntInRange(1, 3);

for (let i = 0; i < numEighthNotes; i++) {
  const [x, y] = currPoint;
  currPoint = [x + ((width - startX) / (numEighthNotes + 1)), y + bt.randInRange(-30,30)];
  const [newX, newY] = currPoint;
  connectShapes([x + 9, y - 1], [newX + 6, newY + 6], false, true)
  finalLines.push(bt.translate([generateEighthNote()], currPoint)[0]);
}

const [x, y] = currPoint;
connectShapes([x + 9, y - 1], [width, 60], false, true)

drawLines(finalLines);