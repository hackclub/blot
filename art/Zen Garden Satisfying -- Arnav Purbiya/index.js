/*
@title: Zen Garden Satisfying 
@author: Arnav Purbiya
@snapshot: 0.png
*/


// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines1 = [];
const finalLines2 = [];
const finalLines3 = [];
const finalLines4 = [];
const finalLines5 = [];
const finalLines6 = [];

// create a spiral
const numTurns = bt.randIntInRange(5, 25); // number of turns in the spiral
const pointsPerTurn = 100; // number of points per turn
const totalPoints = numTurns * pointsPerTurn;
const centerX = width / 2;
const centerY = height / 2;
const maxRadius = Math.min(width, height) / 2;
const angleStep = (Math.PI * 2) / pointsPerTurn;
const radiusStep = maxRadius / totalPoints;

const spiral = [];

for (let i = 0; i < totalPoints; i++) {
  const angle = i * angleStep;
  const radius = i * radiusStep;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  spiral.push([x, y]);
}

// add the spiral to the final lines
finalLines1.push(spiral);

// create a grid
const gridSize = 7; // size of the grid cells

for (let x = 0; x <= width; x += gridSize) {
  const verticalLine = [
    [x, 0],
    [x, height]
  ];
  finalLines2.push(verticalLine);
}

for (let y = 0; y <= height; y += gridSize) {
  const horizontalLine = [
    [0, y],
    [width, y]
  ];
  finalLines3.push(horizontalLine);
}

// draw it
drawLines(finalLines1);
drawLines(finalLines2);
drawLines(finalLines3);
drawLines([
    [[0, 0], [width, height]]
])
drawLines([
    [[0, height],[width, 0]]
])

// Clean the board up by making straight lines
const gridSize1 = 2;
for (let x = 0; x <= width; x += gridSize1) {
  const verticalLine = [
    [x, 0],
    [x, height]
  ];
  finalLines4.push(verticalLine);
}

for (let y = 0; y <= height; y += gridSize1) {
  const horizontalLine = [
    [0, y],
    [width, y]
  ];
  finalLines5.push(horizontalLine);
}
//clean the board
drawLines(finalLines4);
//drawLines(finalLines5);

// Generate 10 random quadrilaterals
for (let i = 0; i < 10; i++) {
  const quad = [];
  for (let j = 0; j < 4; j++) {
    const x = bt.randInRange(0, width);
    const y = bt.randInRange(0, height);
    quad.push([x, y]);
  }
  // Close the quadrilateral by repeating the first point
  quad.push(quad[0]);
  finalLines6.push(quad);
}

// Draw the random quadrilaterals
drawLines(finalLines6);

//clean the board
drawLines(finalLines4);
