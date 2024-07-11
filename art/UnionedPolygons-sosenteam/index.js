/*
@title: UnionedPolygons
@author: sosenteam
@snapshot: image1.png
*/
//Changeable Parameters:

//
let pointCount = 5; //Number of Points
let maxRingSize = 177; // Maxium size of circle (177 will always reach edge of screen)
let circleResolution = 100; // Amount of points per circle (looks best between 3-20 or 50+)
let ringDist = 1; // Starting Ring Distance
let rateOfRingChange = 1.05; // Ring Distance Change 
let mergeLines = true // Connect Lines

//Define Box
const width = 125;
const height = 125;
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
  let circleLines = []; // for containing all rings of one point
  let currentRingDist = ringDist; 
  for (let dist = 0; dist < maxRingSize; dist += currentRingDist) {
    currentRingDist = currentRingDist * rateOfRingChange;
    let circle = [];
    //circle points
    for (let angle = 0; angle < 6.28; angle += 6.28 / circleResolution) {
      let x = point[0] + (Math.cos(angle) * (dist));
      let y = point[1] + (Math.sin(angle) * (dist));
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
  for (let r = 0; r < almostLines[0].length; r++) {
    let mergedLines = [almostLines[0][r]];
    for (let p = 1; p < pointCount; p++) {
      mergedLines = (bt.union(mergedLines, [almostLines[p][r]]));
    }
    finalLines.push(mergedLines);
  }
} else {
  //Copy Lines from pre-merged lines
  finalLines = bt.copy(almostLines);
}
//Cut and Draw Lines
for (let o = 0; o < finalLines.length; o++) {
  //Keep Lines in Bounds
  finalLines[o] = bt.cut(finalLines[o], bounds);
  drawLines(finalLines[o]);
}

//Generate random point in graph
function randomPoint() {
  let x = (bt.randInRange(1, width));
  let y = (bt.randInRange(1, height));
  return [x, y];
}