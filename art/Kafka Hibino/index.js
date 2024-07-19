/*
@title: Kafka Hibino
@author: Owen
@snapshot: 1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

function approximateEllipticalSemiCircle(xCenter, yCenter, horizontalRadius,
  verticalRadius, numSegments, isUpper) {
  let points = []; // Array to store the points
  let deltaAngle = Math.PI / numSegments; // Calculate the angle increment

  for (let i = 0; i <= numSegments; i++) {
    let angle = isUpper ? Math.PI * i / numSegments // Upper semicircle
      :
      Math.PI * (1 + i / numSegments); // Lower semicircle
    let x = xCenter + horizontalRadius * Math.cos(angle); // X calculation
    let y = yCenter + verticalRadius * Math.sin(angle); // Y calculation
    points.push([x, y]); // Store point
  }

  return points; // Return points
}


let xCenter = 65; // x-coordinate of the semicircle's center
let yCenter = 70; // y-coordinate of the semicircle's center
let horizontalRadius = 35; // Horizontal radius of the elliptical semicircle
let verticalRadius = 10; // Vertical radius of the elliptical semicircle, smaller than horizontal
let isUpper = true; // Set to true for upper semicircle, false for lower
let triangles = getRandomNumber(5) + 7

let ellipticalSemiCirclePoints = approximateEllipticalSemiCircle(xCenter, yCenter, horizontalRadius, verticalRadius, triangles, isUpper);

console.log(ellipticalSemiCirclePoints);

function rotatePoint(point, center, angle) {
  const x = point[0] - center[0];
  const y = point[1] - center[1];

  const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
  const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);

  return [rotatedX + center[0], rotatedY + center[1]];
}

function calculateTriangleVertices(start, end, height) {
  // Extract coordinates from the input arrays
  const startX = start[0];
  const startY = start[1];
  const endX = end[0];
  const endY = end[1];

  // Calculate the midpoint of the line segment
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  // Calculate the direction vector of the line segment
  const dirX = endX - startX;
  const dirY = endY - startY;

  // Calculate the perpendicular vector to the line segment
  const perpX = dirY; // Changed to point upwards
  const perpY = -dirX; // Changed to point upwards

  // Calculate the length of the perpendicular vector (Euclidean distance)
  const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);

  // Normalize the perpendicular vector
  const normPerpX = perpX / perpLength;
  const normPerpY = perpY / perpLength;

  // Calculate the third vertex by moving along the normalized perpendicular vector from the midpoint
  const thirdVertexX = midX + normPerpX * height;
  const thirdVertexY = midY + normPerpY * height;

  finalLines.push([
    [startX, startY],
    [endX, endY],
    [thirdVertexX, thirdVertexY],
    [startX, startY]
  ])
}


function drawTriangle(start, height, width, degree) {
  const pt1 = start;
  const pt2 = [(start[0] + width / 2), (start[1] + height)];
  const pt3 = [(start[0] + width), start[1]];

  // Convert degrees to radians for rotation calculation
  const radians = (Math.PI / 180) * degree;

  // Function to rotate a point around the start point

  // Rotate each point around the start point by the given angle
  const rotatedPt1 = rotatePoint(pt1, pt1, radians);
  const rotatedPt2 = rotatePoint(pt2, pt1, radians);
  const rotatedPt3 = rotatePoint(pt3, pt1, radians);

  const triangle = [
    rotatedPt1,
    rotatedPt2,
    rotatedPt3,
    rotatedPt1 // Close the triangle
  ];

  finalLines.push(triangle);
}


drawTriangle([30, 50], 6, 10, 90)
drawTriangle([30, 60], 6, 10, 90)
drawTriangle([100, 60], 6, 10, 270)
drawTriangle([100, 70], 6, 10, 270)

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

let leng = 70 / triangles
let height1 = getRandomNumber(6) + 5
for (let i = 0; i < triangles; i++) {
  drawTriangle([(i * leng) + 30 + leng, 70], height1, leng, 180)
}

for (let i = 0; i < (ellipticalSemiCirclePoints.length - 1); i++) {
  calculateTriangleVertices(ellipticalSemiCirclePoints[i], ellipticalSemiCirclePoints[i + 1], height1)
}
// create a polyline

const polyline = [
  [100, 70],
  [100, 30],
  [80, 10],
  [50, 10],
  [30, 30],
  [30, 70]
];

const mouth = [
  [55, 30],
  [75, 30]
]

const eye1 = [
  [40, 50],
  [50, 50]
]

const eye2 = [
  [80, 50],
  [90, 50]
]

finalLines.push(mouth);
// add the polyline to the final lines
finalLines.push(polyline);
finalLines.push(eye1);
finalLines.push(eye2);


finalLines.push(ellipticalSemiCirclePoints);
// transform lines using the toolkit
// bt.rotate(finalLines, 45);



// draw it
drawLines(finalLines);