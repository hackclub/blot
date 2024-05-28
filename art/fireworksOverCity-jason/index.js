/*
@title: fireworksOverCity
@author: jason
@snapshot: snapshot0
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// adjustable parameters and ranges
// randInt is called with these ranges to get random numbers used in my piece
const buildingWidthRange = [15, 20];
const betweenBuildingsWidthRange = [5, 15];
const buildingHeightRange = [35, 60];
const betweenBuildingsHeightRange = [10, 30];
const numFireworks = bt.randIntInRange(3, 5);  // number of fireworks
const fireworksCenterXRange = [20, 105];
const fireworksCenterYRange = [85, 105];
const numSparksRange = [10, 15];

// BUILDINGS SKYLINE
const windowsTurtle = new bt.Turtle();
let skyX = 0;
let skyY = randInt(betweenBuildingsHeightRange);
var buildingWidth;
const skyline = [[0, skyY]];
// loop is broken out of
while (true) {
  skyY = randInt(buildingHeightRange);
  skyline.push([skyX, skyY]);

  // these conditionals are to make sure the drawing doesn't pass
  // the dimensions of the picture
  if (width - skyX >= 20) {
    buildingWidth = randInt(buildingWidthRange);
    makeWindows(skyX, skyX + buildingWidth, skyY);
    skyX += buildingWidth;
    skyline.push([skyX, skyY]);
    skyY = randInt(betweenBuildingsHeightRange);
    skyline.push([skyX, skyY]);
    
    if (width - skyX >= 15) {
      skyX += randInt(betweenBuildingsWidthRange);
      skyline.push([skyX, skyY]);
    } else {
      skyline.push([width, skyY]);
      break;
    }
  } else {
    skyline.push([width, skyY]);
    makeWindows(skyX, width, skyY);
    break;
  }
}

// FIREWORKS
const fireworks = [];
var numSparks;
// these points are for bt.nurbs to generate the curve of the sparks
var centerpoint;
var endpoint;
var midpoint;
for (let i = 0; i < numFireworks; i++) {
  centerpoint = [randInt(fireworksCenterXRange), 
                 randInt(fireworksCenterYRange)];
  numSparks = randInt(numSparksRange)
  for (let j = 0; j < numSparks; j++) {
    endpoint = [randInt([centerpoint[0] - 20, centerpoint[0] + 20]), 
                randInt([centerpoint[1] - 15, centerpoint[1] + 10])];
    // to get midpoint, find the actual midpoint between centerpoint
    // and endpoint, then make the y value of my midpoint higher
    midpoint = [(centerpoint[0] + endpoint[0]) / 2, 
                (centerpoint[1] + endpoint[1]) / 2];
    midpoint[1] += randInt([1, 5]);
    fireworks.push(bt.nurbs([centerpoint, midpoint, endpoint]))
  }
}

// actually combine and draw everything here
const everything = [skyline];
bt.join(everything, windowsTurtle.lines(), fireworks);
drawLines(everything);


// FUNCTIONS

// easier for my purposes
function randInt(range) {
  return bt.randIntInRange(range[0], range[1]);
}

// function to draw windows on a building with
// edges x1 and x2 and height y
function makeWindows(x1, x2, y) {
  let numWindows = Math.floor((x2 - x1) / 7);
  let numRows = Math.floor(y / 7);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numWindows; j++) {
      windowsTurtle.up()
        .goTo([x1 + 3 + 6 * j, y - 4 - 6 * i])
        .down();
      if (bt.randIntInRange(0, 1)) {
        for (let k = 0; k < 10; k++) {
          windowsTurtle.forward(3).right(90)
            .forward(3/20).right(90)
            .forward(3).left(90)
            .forward(3/20).left(90);
        }
      } else {
        for (let k = 0; k < 4; k++) {
          windowsTurtle.forward(3).right(90);
        }
      }
    }
  }
}