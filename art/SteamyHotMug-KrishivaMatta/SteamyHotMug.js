/*
@title: Mysterious Mug
@author: Krishiva Matta
@snapshot: mug.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const mug = [
  [22, 77],
  [96, 77],
  [83, 10],
  [41, 10],
  [22, 77]
];
const steam1 = bt.catmullRom([[bt.randInRange(42, 70), 77], 
                             [bt.randInRange(75, 85), bt.randInRange(88, 98)], 
                             [bt.randInRange(50, 60), bt.randInRange(99, 109)], 
                             [bt.randInRange(69, 79), 120]])

const steam2 = bt.catmullRom([[bt.randInRange(22, 40), 77], 
                             [bt.randInRange(48, 58), bt.randInRange(83, 93)], 
                             [bt.randInRange(26, 36), bt.randInRange(104, 114)], 
                             [bt.randInRange(51, 61), 120]])

const steam3 = bt.catmullRom([[bt.randInRange(71, 95), 77], 
                             [bt.randInRange(85, 95), bt.randInRange(87, 97)], 
                             [bt.randInRange(72, 82), bt.randInRange(106, 116)], 
                             [bt.randInRange(85, 95), 120]])

const handle = bt.catmullRom([[94, 65],
                              [114,57],
                              [114,39],
                             [89, 24],
                             [84, 15]])
// add the polyline to the final lines


// transform lines using the toolkit

// draw it
drawLines([mug]);
drawLines([steam1]);
drawLines([steam2]);
drawLines([steam3]);
drawLines([handle]);