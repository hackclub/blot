// Cybertruck by Vivaan Shahani
/*
@title: CyberTruck
@author: Vivaan Shahani
@snapshot: SnapShot1.png,SnapShot2.png,SnapShot3.png,anon.svg,image.png
*/
const { Turtle, cut, cover, copy, rotate, scale, translate, originate, iteratePoints, resample, join, getAngle, getNormal, bounds, rand, setRandSeed, randInRange, noise, nurbs } = blotToolkit;

const width = 125;
const height = 125;
const tire1x = 10 // quick name to move the tire1 on x-axis
const tire1y = 3 //quick name to move the tire1 on y-axis
const tire2x = -60 // quick name to move the tire2 on x-axis
const tire2y = 4 //quick name to move the tire2 on y-axis
const scaleFactor = 1.4 //adjustable factor to change the size of outline
const v1x = 15
const v2x = -26

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create the outline
const outline = [
  //back
  [105, 75],
  [105, 63],
  //wheel2
  [95, 60],
  [95, 63],
  [90, 68],
  [85, 68],
  [80, 63],
  [80, 60],
  //base
  [65, 60],
  //wheel1
  [45, 60],
  [45, 63],
  [40, 68],
  [35, 68],
  [30, 63],
  [30, 60],
  //roof and front
  [20, 60],
  [20, 70],
  [61, 84],
  [105, 75]

];
const tire1 = [
  [45 - tire1x, 60 - tire1y],
  [45 - tire1x, 63 - tire1y],
  [40 - tire1x, 68 - tire1y],
  [35 - tire1x, 68 - tire1y],
  [30 - tire1x, 63 - tire1y],
  [30 - tire1x, 60 - tire1y],
  [30 - tire1x, 60 - tire1y],
  [30 - tire1x, 57 - tire1y],
  [35 - tire1x, 52 - tire1y],
  [40 - tire1x, 52 - tire1y],
  [45 - tire1x, 57 - tire1y],
  [45 - tire1x, 60 - tire1y]
];
const tire2 = [
  [45 - tire2x, 60 - tire2y],
  [45 - tire2x, 63 - tire2y],
  [40 - tire2x, 68 - tire2y],
  [35 - tire2x, 68 - tire2y],
  [30 - tire2x, 63 - tire2y],
  [30 - tire2x, 60 - tire2y],
  [30 - tire2x, 60 - tire2y],
  [30 - tire2x, 57 - tire2y],
  [35 - tire2x, 52 - tire2y],
  [40 - tire2x, 52 - tire2y],
  [45 - tire2x, 57 - tire2y],
  [45 - tire2x, 60 - tire2y]
];
const window = [
  [20, 73],
  [60, 86],
  [83, 82],
  [83, 76],
  [20, 73],
];
const windowDetail1 = [
  [35, 77.6],
  [34.5, 74]
];
const windowDetail2 = [
  [37, 78.2],
  [36.5, 74]
];
const windowDetail3 = [
  [65, 84.9],
  [63, 75]
];
const windowDetail4 = [
  [67, 84.6],
  [66.5, 75.35]
];
const randLineDetail = [
  [122, 76],
  [6, 70]
];
const door1 = [
  [38.6, 71.7],
  [38.6, 56.9],
  [38.6, 59],
  [58.3, 59],
  [58.3, 72.7],
  [58.3, 56.9],
];
const door2 = [
  [78.3, 73.65],
  [78.3, 73],
  [78.3, 57],
  [78.3, 59],
  [86.8, 59],
  [58.6, 59]

];
const randomDetail2 = [
  [38.6, 56.9],
  [86.8, 56.9]
];

const headlight = [
  [3, 68.3],
  [9, 68.7],
  [9, 70]
];
const doorHandle1 = [
  [54, 71],
  [57, 71], // horizontal line for the door handle of the first door
];

const doorHandle2 = [
  [72, 72],
  [76, 72], // horizontal line for the door handle of the second door
];
const V = [
  [20 + v1x, 38],
  [29 + v1x, 18],
  [37 + v1x, 37],
];
const I = [
  [125 / 2, 38],
  [125 / 2, 18]
];

const V2 = [
  [100 + v2x, 38],
  [109 + v2x, 18],
  [117 + v2x, 37],
];

// add the polyline to the final lines
const outlineScaled = scale([outline], scaleFactor);
const translatedOutline = translate(outlineScaled, [0, 0]);

// Add polylines to the final lines array
finalLines.push(...translatedOutline);
finalLines.push(outlineScaled);
finalLines.push(tire1);
finalLines.push(tire2);
finalLines.push(window);
finalLines.push(windowDetail1);
finalLines.push(windowDetail2);
finalLines.push(windowDetail3);
finalLines.push(windowDetail4);
finalLines.push(door1);
finalLines.push(door2);
finalLines.push(randLineDetail);
finalLines.push(randomDetail2);
finalLines.push(headlight);
finalLines.push(doorHandle1);
finalLines.push(doorHandle2);
finalLines.push(V);
finalLines.push(V2);
finalLines.push(I);



// draw it
drawLines(finalLines);