/*
@title: UnionedPolygons
@author: sosenteam
@snapshot: cover.png
*/
//Changeable Parameters:
let pointCount = 50; //Number of Points
let circleResolution =200; // Amount of points per ring (looks best between 3-20 or 150+)
let maxRingSize = 510; // Maxium size of ring
let ringDist = 0.8; // Starting Ring Distance
let rateOfRingChange = 1.02; // Ring Distance Change
let thickness = 2;
let mergeLines = true // Connect Lines
let colorEnabled = true; // Chooses Random Colors
//Noise
let wavyAmount = 2; // Adds Distortion (0 for off)
//Squash
let squashMode = 1; // 1 Controlled by xSquash/ySquash, 2 is random, controlled by squashRandomMax
let xSquash = 1; //Only Mode 1
let ySquash = -1; //Only Mode 1
let squashRandomMax = 0.1; //Only Mode 2 (Takes a While)
//SHIFT
let randomizeShift = false; // Overrides horizontalShift and verticleShift
let horizontalShift = -0.3; // Recommended -1-1
let verticleShift = .7; // Recommended -1-1
//OFFSET
let offsetEnabled = true;
let offsetDistance = 1;

//Define Box
const width = 125;
const height = 125;

//Code Start ----------------------------------------------------------------------------
const ringCount = Math.floor(Math.log(maxRingSize / ringDist) / Math.log(rateOfRingChange)) + 1;
const CSS_COLORS = [
  'dodgerblue', 'crimson', 'springgreen', 'goldenrod', 'indigo',
  'coral', 'deeppink', 'sienna', 'turquoise', 'slategray'
];
xSquash+=0.001; //Keeps from freezing
ySquash+=0.001; //Keeps from freezing
setDocDimensions(width, height);

//Define Edges for cut opperation
let bounds = [
  [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height]
  ]
];


// final lines
let almostLines = [];
let finalLines = [];

// create a list of points
let pointList = [];
for (let i = 0; i < pointCount; i++) {
  pointList.push([randomPoint()]);
}

//for each point, draw multiple circles around the point using the unit circle (woo trig!)
// all points
for (let pc = 0; pc < pointList.length; pc++) {
  let point = pointList[pc][0]
  if (randomizeShift) {
    horizontalShift = bt.randInRange(-0.7, 0.7);
    verticleShift = bt.randInRange(-0.7, 0.7);
  }
  let circleLines = []; // for containing all rings of one point
  let currentRingDist = ringDist;
  for (let dist = 0; dist < maxRingSize; dist += currentRingDist) {
    currentRingDist = currentRingDist * rateOfRingChange;
    let circle = [];
    //circle points
    for (let angle = 0; angle < 6.28; angle += 6.28 / circleResolution) {
      //Add Waves
      let newDist = dist;
      newDist+=(bt.noise(bt.rand()*2,bt.rand()*2,bt.rand()*2)*wavyAmount);
      //Add Points
      let oldX = point[0];
      let oldY = point[1];
      if(squashMode == 1){
        oldX = oldX+Math.cos(angle)*xSquash;
        oldY = oldY+Math.cos(angle)*ySquash;
      }
      else if(squashMode == 2 && dist > 10){
      oldX = oldX+Math.cos(angle)*bt.randInRange(-squashRandomMax,squashRandomMax);
      oldY = oldY+Math.cos(angle)*bt.randInRange(-squashRandomMax,squashRandomMax);
      }
      let x = oldX + (Math.cos(angle)*dist);
      let y = oldY + (Math.sin(angle)*dist);
      x += (newDist * horizontalShift);
      y += (newDist * verticleShift);
      circle.push([x, y]);

    }
    // //Add each circle to the final draw list
    circleLines.push(circle);
  }
  almostLines.push(circleLines);
}



//Merge Lines
if (mergeLines) {
  //union all lines, going by ring 
  for (let r = 0; r < almostLines[0].length; r += 1) {
    let mergedLines = [almostLines[0][r]];
    for (let p = 1; p < pointCount; p++) {
      mergedLines = bt.union(mergedLines, [almostLines[p][r]]);
    }
    finalLines.push(mergedLines);
    if (offsetEnabled) {
      // Apply offset to each individual polyline in mergedLines
      for (let i = 0; i < mergedLines.length; i++) {
        const offsetPolyline = bt.offset([mergedLines[i]], offsetDistance);
        if (offsetPolyline && offsetPolyline.length > 0) {
          finalLines.push(offsetPolyline);
        }
      }
    }
  }
} else {
  //Copy Lines from pre-merged lines
  finalLines = bt.copy(almostLines);
  if (offsetEnabled) {
      // Apply offset to each individual polyline in mergedLines
      for (let i = 0; i < mergedLines.length; i++) {
        const offsetPolyline = bt.offset([mergedLines[i]], offsetDistance);
        if (offsetPolyline && offsetPolyline.length > 0) {
          finalLines.push(offsetPolyline);
        }
      }
    }
}
let colorNum = bt.randIntInRange(0, 50);
//Cut and Draw Lines
for (let o = 0; o < finalLines.length; o++) {
  //Keep Lines in Bounds
  let colorNum = bt.randIntInRange(0, 10);
  finalLines[o] = bt.cut(finalLines[o], bounds);
  if (colorEnabled) {
    drawLines(finalLines[o], { stroke: CSS_COLORS[colorNum], width: thickness });
  } else {
    drawLines(finalLines[o], { width: thickness });
  }
}

//Generate random point in graph
function randomPoint() {
  let x = (bt.randInRange(1, width));
  let y = (bt.randInRange(1, height));
  return [x, y];
}
