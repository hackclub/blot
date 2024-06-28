/*
@title: DottedGrid
@author: Rushil Chopra
@snapshot: snapshot1.png
*/


const sqNumWidth = 12; // Number of squares wide
const sqNumHeight = 12; // Number of squares tall


const squareWidth = 40; // Width of each square
const squareHeight = 40; // Height of each square


const canvasWidth = squareWidth * sqNumWidth;
const canvasHeight = squareHeight * sqNumHeight;


setDocDimensions(canvasWidth, canvasHeight);

const finalLines = [];
const finalDots = [];


function createDot(center, radius) {
  return polylineCircle(center, radius, 24);
}


function polylineCircle(center, radius, segments) {
  const circle = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    circle.push([x, y]);
  }
  return [circle];
}


for (let i = 0; i < sqNumWidth; i++) {
  for (let j = 0; j < sqNumHeight; j++) {
    const dotRadius = bt.randInRange(2, 5); // Random radius for the dot
    const dotCenter = [
      squareWidth * i + bt.randInRange(10, squareWidth - 10), // Random x position within the cell
      squareHeight * j + bt.randInRange(10, squareHeight - 10) // Random y position within the cell
    ];
    
    const dot = createDot(dotCenter, dotRadius);
    bt.join(finalDots, dot); // Add dot to the group
  }
}


const border = [
  [
    [0, 0],
    [canvasWidth, 0]
  ],
  [
    [canvasWidth, 0],
    [canvasWidth, canvasHeight]
  ],
  [
    [canvasWidth, canvasHeight],
    [0, canvasHeight]
  ],
  [
    [0, canvasHeight],
    [0, 0]
  ],
];
bt.join(finalLines, border);


drawLines(finalDots); // Draw dots
drawLines(finalLines); // Draw border
