// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 190;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a boatBase
const boatBase = [
  [30, 150],
  [95, 150],
  [80, 170],
  [45, 170],
  [30, 150]
];

// add the boatBase to the final lines
finalLines.push(boatBase);

// Create a mast
const mast = [
  [62, 150],
  [62, 70]
];

// add the mast to the final lines
finalLines.push(mast);

// Create a sail / triangle
const sail = [
  [62, 70],
  [100, 140],
  [62, 140],
  [62, 70]
];

// add sail to the final lines
finalLines.push(sail);

// Create waves under the boat
const wave1 = [
  [30, 170],
  [40, 175],
  [50, 170],
  [60, 175],
  [70, 170],
  [80, 175],
  [90, 170]
];

const wave2 = [
  [35, 180],
  [45, 185],
  [55, 180],
  [65, 185],
  [75, 180],
  [85, 185],
  [95, 180]
];

// Add the waves to the final lines
finalLines.push(wave1);
finalLines.push(wave2);

// transform lines using the toolkit
bt.rotate(finalLines, 180);

// draw it
drawLines(finalLines);