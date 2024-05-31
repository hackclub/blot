/*
@title: PaperCrunch.io
@author: Shaunak Bajaj
@snapshot: snapshot1.png
*/


const width = 800;
const height = 600;
setDocDimensions(width, height);

//Variable Parameters:
//numColumns and numRows change the number of points, interpolationsteps
//changes the complexity
const numColumns = 20;
const numRows = 25;
const interpolationSteps = 9;

// Linear interpolation function
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Function to generate random column points
function generateColumnPoints() {
  const allColumnsPoints = [];
  for (let row = 0; row < numRows; row++) {
    const columnPoints = [];
    for (let col = 0; col < numColumns; col++) {
      const x = row * width / numRows + bt.randInRange(0, 1.5 * width / numRows);
      const y = col * height / numColumns + bt.randInRange(0, 1 * height / numColumns);
      columnPoints.push([x <= width ? x : width, y <= height ? y : height]);
    }
    allColumnsPoints.push(columnPoints);
  }
  return allColumnsPoints;
}

// Generate column points
const allColumnsPoints = generateColumnPoints();

// Function to interpolate between two sets of column points and draw polygons
function interpolateAndDraw(currentColumnPoints, nextColumnPoints) {
  for (let step = 0; step < interpolationSteps; step++) {
    const t = step / interpolationSteps;
    for (let i = 0; i < currentColumnPoints.length - 1; i++) {
      const x1 = lerp(currentColumnPoints[i][0], nextColumnPoints[i][0], t);
      const y1 = lerp(currentColumnPoints[i][1], nextColumnPoints[i][1], t);
      const x2 = lerp(currentColumnPoints[i + 1][0], nextColumnPoints[i + 1][0], t);
      const y2 = lerp(currentColumnPoints[i + 1][1], nextColumnPoints[i + 1][1], t);
      drawLines([
        [
          [x1, y1],
          [x2, y2]
        ]
      ]);
    }
  }
}

// Draw the interpolated polygons
for (let index = 0; index < allColumnsPoints.length - 1; index++) {
  const currentColumnPoints = allColumnsPoints[index];
  const nextColumnPoints = allColumnsPoints[index + 1];
  interpolateAndDraw(currentColumnPoints, nextColumnPoints);
}

console.log("Interpolated polygons drawn.");