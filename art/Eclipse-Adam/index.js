/*
@title: Eclipse
@author: Adam Mokdad
@snapshot: snapshot1.png
*/

/* My first ever javascript code, pretty unoptimized, but it looks nice :)
  PLANS:
  -adding special effects when close to 100% totality (solar corona, other stars)
  -make  annular eclipses work. Right now it gives an error
*/

// -------- Customizable Parameters --------
const width = 120; // milimeters, board size
const height = 120;
const sunSize = 30;
const moonSize = 32;
const moonOffset = [5, -5];
const pointsCount = 1000; // Larger value = Higher quality
const drawType = "invert" // options: "outline" "fill" "invert"
// -----------------------------------------
const sunCenter = [width/2, height/2];
const moonCenter = [width/2 + moonOffset[0], height/2 + moonOffset[1]];

setDocDimensions(width, height);

// Define functions that will be used
function circleIntersectionPoints(center1, radius1, center2, radius2) {
  // Find intersection between of circles
  const distance = getDistance(center1,center2)

  // Check if circles are separate or one is completely inside the other
  if (distance >= radius1 + radius2) {
      return "n"; // No Eclipse
  }
  if (distance <= Math.abs(radius1 - radius2)) {
      return "a"; // Anular Eclipse
  }

  // Those checks completed, so there are intersections. Actually calculate intersection points.
  const a = (radius1 * radius1 - radius2 * radius2 + distance * distance) / (2 * distance);
  const h = Math.sqrt(radius1 * radius1 - a * a);
  const x2 = center1[0] + a * (center2[0] - center1[0]) / distance;
  const y2 = center1[1] + a * (center2[1] - center1[1]) / distance;
  const intersection1 = [
      x2 + h * (center2[1] - center1[1]) / distance,
      y2 - h * (center2[0] - center1[0]) / distance
  ];
  const intersection2 = [
      x2 - h * (center2[1] - center1[1]) / distance,
      y2 + h * (center2[0] - center1[0]) / distance
  ];

  return [intersection1, intersection2];
}
function getDistance(point1, point2) {
  return Math.hypot(point1[0]-point2[0], point1[1]-point2[1])
}
function modulo(a, b) { // I'm doing this because JS's built in modulo is not the usual modulo
  return (a % b + b) % b;
}
// -----------------------

// Generate a list of points that forms the circle for the Sun and Moon
let sunPoints = [];
let moonPoints = [];

for (let i = 0; i < pointsCount; i++) { 
  sunPoints.push([width/2 + sunSize * Math.cos(2 * Math.PI * i / pointsCount), height/2 + sunSize * Math.sin(2 * Math.PI * i / pointsCount)]);
  moonPoints.push([width/2 + moonOffset[0] + moonSize * Math.cos(2 * Math.PI * i / pointsCount), width/2 + moonOffset[1] + moonSize * Math.sin(2 * Math.PI * i / pointsCount)]);
}

const sunPointsExtra = sunPoints.concat([sunPoints[0]]) //Used to draw a complete unfilled circle
const moonPointsExtra = moonPoints.concat([moonPoints[0]])
// -----------------------
// Find point and indices in sunPoints and moonPoints that are closest to the two intersection points.
const [intersection1, intersection2] = circleIntersectionPoints(sunCenter, sunSize, moonCenter, moonSize);
let sunIntersectionPoint1 = sunPoints[0];
let sunIntersectionPointIndex1 = 0;
let sunIntersectionPoint2 = sunPoints[0];
let sunIntersectionPointIndex2 = 0;
let moonIntersectionPoint1 = moonPoints[0]
let moonIntersectionPointIndex1 = 0;
let moonIntersectionPoint2 = moonPoints[0];
let moonIntersectionPointIndex2 = 0;

for (let i = 0; i < pointsCount; i++) {
  let sunPointDistance1 = getDistance(sunPoints[i], intersection1);
  let sunPointDistance2 = getDistance(sunPoints[i], intersection2);
  let moonPointDistance1 = getDistance(moonPoints[i], intersection1);
  let moonPointDistance2 = getDistance(moonPoints[i], intersection2);

  if (sunPointDistance1 < getDistance(sunIntersectionPoint1, intersection1)) {
    sunIntersectionPoint1 = sunPoints[i];
    sunIntersectionPointIndex1 = i;
  }
  if (sunPointDistance2 < getDistance(sunIntersectionPoint2, intersection2)) {
    sunIntersectionPoint2 = sunPoints[i];
    sunIntersectionPointIndex2 = i;
  }
  if (moonPointDistance1 < getDistance(moonIntersectionPoint1, intersection1)) {
    moonIntersectionPoint1 = moonPoints[i];
    moonIntersectionPointIndex1 = i;
  }
  if (moonPointDistance2 < getDistance(moonIntersectionPoint2, intersection2)) {
    moonIntersectionPoint2 = moonPoints[i];
    moonIntersectionPointIndex2 = i;
  }
}
// -----------------------
// Find index for sun and moon points to form the correct arcs.
let pointAwayFromMoon = [sunCenter[0] + -moonOffset[0]/(moonOffset[0]**2 + moonOffset[1]**2)**.5,sunCenter[1] + -moonOffset[1]/(moonOffset[0]**2 + moonOffset[1]**2)**.5]

const sunDistanceIndexPlusOne = getDistance(sunPoints[modulo(sunIntersectionPointIndex1+1,pointsCount)], pointAwayFromMoon);
const sunDistanceIndexMinusOne = getDistance(sunPoints[modulo(sunIntersectionPointIndex1-1,pointsCount)], pointAwayFromMoon);
let sunDeltaIndex;
if (sunDistanceIndexPlusOne < sunDistanceIndexMinusOne) {
  sunDeltaIndex = 1;
}
else {
  sunDeltaIndex = -1;
}

const moonDistanceIndexPlusOne = getDistance(moonPoints[modulo(moonIntersectionPointIndex2+1,pointsCount)], pointAwayFromMoon);
const moonDistanceIndexMinusOne = getDistance(moonPoints[modulo(moonIntersectionPointIndex2-1,pointsCount)], pointAwayFromMoon);
let moonDeltaIndex;
if (moonDistanceIndexPlusOne < moonDistanceIndexMinusOne) {
  moonDeltaIndex = 1;
}
else {
  moonDeltaIndex = -1;
}
// -----------------------

// All information known. Begin constructing the final eclipsed Sun list of points.
let eclipsedSunPoints = []

eclipsedSunPoints.push(sunIntersectionPoint1)
for (let i = sunIntersectionPointIndex1; i != sunIntersectionPointIndex2; i=modulo(i+sunDeltaIndex,pointsCount)) {
  eclipsedSunPoints.push(sunPoints[i]);
}
eclipsedSunPoints.push(moonIntersectionPoint2)
for (let i = moonIntersectionPointIndex2; i != moonIntersectionPointIndex1; i=modulo(i+moonDeltaIndex,pointsCount)) {
  eclipsedSunPoints.push(moonPoints[i]);
}
eclipsedSunPoints.push(sunIntersectionPoint1)
// -----------------------

// Points done. Draw based on drawType.
if (drawType == "outline") {
  drawLines([sunPointsExtra, moonPointsExtra])
} else if (drawType == "fill") {
  drawLines([eclipsedSunPoints], {stroke: "none", fill: "black"})
} else if (drawType == "invert") {
  drawLines([[[0,0],[width,0],[width,height],[0,height]]], {stroke: "none", fill: "black"})
  drawLines([eclipsedSunPoints], {stroke: "none", fill: "white"})
} else {
  console.log("Unaccepted draw type")
}
