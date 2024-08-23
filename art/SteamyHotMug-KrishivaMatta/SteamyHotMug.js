/*
@title: Steamy Hot Mug
@author: Krishiva Matta
@snapshot: mug.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
// Mug
const mug = [
  [96, 77],
  [83, 10],
  [41, 10],
  [22, 77]
];
const mug1 = bt.catmullRom([
  [22,77],
  [58,68],
  [96,77],
  [58,85],
  [22,77]
])
const s = bt.catmullRom([
  [40,65],
  [36,67],
  [33,63],
  [41,59],
  [39,54],
  [33,56]
])
const t = [
  [45,54],
  [45,66],
  [48,66],
  [42,66]
]
const e = [
  [54,66],
  [49,66],
  [49,61],
  [53,61],
  [49,61],
  [49,54],
  [54,54],
]
const a = [
  [55,54],
  [58,66],
  [61,54],
  [59.5,60],
  [56.5,60],
]
const m = [
  [63,54],
  [65,66],
  [67,54],
  [69,66],
  [71,54],
]
const y = [
  [77,54],
  [77,60],
  [80,66],
  [77,60],
  [73,66]
]
// Drink
const drink = bt.catmullRom([
  [24,75],
  [bt.randInRange(34,38),bt.randInRange(76,80)],
  [bt.randInRange(50,63),bt.randInRange(70,74)],
  [bt.randInRange(71,73),bt.randInRange(76,80)],
  [bt.randInRange(80,82),bt.randInRange(73,76)],
  [93,75]
])
// Steam
const steam1 = bt.catmullRom([[bt.randInRange(33, 70), 78], 
                             [bt.randInRange(75, 85), bt.randInRange(88, 98)], 
                             [bt.randInRange(50, 60), bt.randInRange(99, 109)], 
                             [bt.randInRange(69, 79), 120]])

const steam2 = bt.catmullRom([[bt.randInRange(22, 40), 78], 
                             [bt.randInRange(48, 58), bt.randInRange(83, 93)], 
                             [bt.randInRange(26, 36), bt.randInRange(104, 114)], 
                             [bt.randInRange(51, 61), 120]])

const steam3 = bt.catmullRom([[bt.randInRange(71, 95), 78], 
                             [bt.randInRange(85, 95), bt.randInRange(87, 97)], 
                             [bt.randInRange(72, 82), bt.randInRange(106, 116)], 
                             [bt.randInRange(85, 95), 120]])
// Handle
const handle = bt.catmullRom([[94, 65],
                              [114,57],
                              [114,39],
                             [89, 24],
                             [84, 15]])
const handle2 = bt.catmullRom([[94.5, 69],
                              [117,60],
                              [117,43],
                             [90, 28],
                             [84, 15]])
//Mug Designs


// add the polyline to the final lines


// transform lines using the toolkit

// draw it
drawLines([mug]);
drawLines([mug1]);
drawLines([s]);
drawLines([t]);
drawLines([e]);
drawLines([a]);
drawLines([m]);
drawLines([y]);
drawLines([drink]);
drawLines([steam1]);
drawLines([steam2]);
drawLines([steam3]);
drawLines([handle]);
drawLines([handle2]);