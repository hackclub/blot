// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

/*
@title: Square Circle
@author: Adam Miller
@snapshot: Snapshot_1.png
*/

bt.setRandSeed(bt.randIntInRange(0, 100));

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const polyline = [
  [30, 90],
  [100, 90],
  [100, 30],
  [30, 30],
  [30, 90]
];

// add the polyline to the final lines
finalLines.push(polyline);

for (let i = 0; i < 180; i++) {
  // transform lines using the toolkit
  bt.rotate(finalLines, 0.5);

  // draw it
  drawLines(finalLines);
}

finalLines.pop();

const downLeftTriangle = [
  [20, 20],
  [15, 10],
  [10, 20],
  [20, 20]
];

// add the polyline to the final lines
finalLines.push(downLeftTriangle);

for (let i = 0; i < 90; i++) {
  // transform lines using the toolkit
  bt.rotate(finalLines, 1);

  // draw it
  drawLines(finalLines);
}

finalLines.pop();

const downRightTriangle = [
  [105, 20],
  [110, 10],
  [115, 20],
  [105, 20]
];

// add the polyline to the final lines
finalLines.push(downRightTriangle);

for (let i = 0; i < 90; i++) {
  // transform lines using the toolkit
  bt.rotate(finalLines, 1);

  // draw it
  drawLines(finalLines);
}

finalLines.pop();

const upLeftTriangle = [
  [20, 105],
  [15, 115],
  [10, 105],
  [20, 105]
];

// add the polyline to the final lines
finalLines.push(upLeftTriangle);

for (let i = 0; i < 90; i++) {
  // transform lines using the toolkit
  bt.rotate(finalLines, 1);

  // draw it
  drawLines(finalLines);
}

finalLines.pop();

const upRightTriangle = [
  [105, 105],
  [110, 115],
  [115, 105],
  [105, 105]
];

// add the polyline to the final lines
finalLines.push(upRightTriangle);

for (let i = 0; i < 90; i++) {
  // transform lines using the toolkit
  bt.rotate(finalLines, 1);

  // draw it
  drawLines(finalLines);
}

finalLines.pop();

const CenterTriangle = [
  [(width/2) + 5, (height/2)-5],
  [(width/2), (height/2)+5],
  [(width/2) - 5, (height/2)-5],
  [(width/2) + 5, (height/2)-5]
];

// add the polyline to the final lines
finalLines.push(CenterTriangle);

for (let i = 0; i < 90; i++) {
  // transform lines using the toolkit
  bt.rotate(finalLines, 1);

  // draw it
  drawLines(finalLines);
}

finalLines.pop();

const curve = bt.catmullRom([[0, bt.randIntInRange(20, 100)], [20, bt.randIntInRange(20, 100)], [40, bt.randIntInRange(20, 100)], [60, bt.randIntInRange(20, 100)], [80, bt.randIntInRange(20, 100)], [100, bt.randIntInRange(20, 100)], [125, bt.randIntInRange(20, 100)]])

drawLines([curve])
