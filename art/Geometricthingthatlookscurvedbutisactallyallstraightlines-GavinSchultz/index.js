// Geometric thing that looks curved but is actally all straight lines
// By Gavin Schultz

//set the screen size
const width = 125;
const height = 125;

//make the variables for the line generation
var y1 = 0
var x1 = 0
var y2 = 0
var x2 = 0

// this variable is for keeping track of how many lines its drawn
var num = 0

//change this for the width between lines
const ws = 5

//initialize screen
setDocDimensions(width, height);

// store final lines to draw
const finalLines = [];

// create the cross
const polyline = [
  [0, 62.5],
  [125, 62.5]
];
const polyline2 = [
  [62.5, 0],
  [62.5, 125]
];
//set starting points for the first line
y1 = 125
x1 = 62.5
y2 = 62.5
x2 = 67.5
//draw the first quarter of the cross
while (num < 13) {
  drawLines([
    [
      [x1, y1],
      [x2, y2]
    ]
  ])
  y1 = y1 - ws
  x2 = x2 + ws
  num += 1
}
//set starting points for the first line
y1 = 125
x1 = 62.5
y2 = 62.5
x2 = 57.5
num = 0
//draw the second quarter of the cross
while (num < 13) {
  drawLines([
    [
      [x1, y1],
      [x2, y2]
    ]
  ])
  y1 = y1 - ws
  x2 = x2 - ws
  num += 1
}
//set starting points for the first line
y1 = 0
x1 = 62.5
y2 = 62.5
x2 = 57.5
num = 0
//draw the third quarter of the cross
while (num < 13) {
  drawLines([
    [
      [x1, y1],
      [x2, y2]
    ]
  ])
  y1 = y1 + ws
  x2 = x2 - ws
  num += 1
}
//set starting points for the first line
y1 = 0
x1 = 62.5
y2 = 62.5
x2 = 67.5
num = 0
//draw the fourth quarter of the cross
while (num < 13) {
  drawLines([
    [
      [x1, y1],
      [x2, y2]
    ]
  ])
  y1 = y1 + ws
  x2 = x2 + ws
  num += 1
}
// add the cross to the final lines
finalLines.push(polyline);
finalLines.push(polyline2);

// draw the cross
drawLines(finalLines);