
/*
The story of two love balls 
Refresh continuously to see the love between the two balls.
This shows the love of our life.

@title: Story of Two Love Balls
@author: Anubhav Shivam Nath
@snapshot: index.js
*/
const width = 214, height = 214;
const darkRadius = -57, margin = 10;
const numLines = 214, darknessLife = 300;
const wallRoughness = 50, toughness = 60;
const darknessSteps = 97, widthRange = [1.5, 0.0001];
const reflections = true;

setDocDimensions(width, height);
const center = [bt.rand() * (width - 2 * (darkRadius + margin)) + (darkRadius + margin), 
                bt.rand() * (height - 2 * (darkRadius + margin)) + (darkRadius + margin)];
const radians = 2 * Math.PI / numLines;
const strokePerLevel = (widthRange[0] - widthRange[1]) / (darknessSteps - 1);
let lines = [[[0, 0], [0, height]], [[0, 0], [width, 0]], 
             [[width, 0], [width, height]], [[0, height], [width, height]]];
let eqLines = lines.map(line => lineToEquation(line[0], line[1]));

const negativeLight = new bt.Turtle();
negativeLight.jump([center[0], center[1] - darkRadius]);
negativeLight.arc(360, darkRadius);
drawLines(negativeLight.lines(), { fill: "Black" });

for (let i = 0; i < numLines; i++) {
  drawLine(i * radians, center[0], center[1], darknessLife);
}

async function drawLine(angle, x, y, health, doNotIntersect) {
  const strokeLevel = Math.ceil(health / (darknessLife / darknessSteps)) - 1;
  let maxLength = Math.min(health % (darknessLife / darknessSteps) + 0.01, health);
  const darkness = new bt.Turtle();
  darkness.jump([x, y]);

  let to = calculateEndpoint(angle, x, y, maxLength);
  let intersections = findIntersections(lineToEquation([x, y], to));
  let reflect = true;

  if (intersections.length > 0) {
    let [closestIntersection, intersectionDetails] = getClosestIntersection(intersections, x, y, doNotIntersect);
    if (closestIntersection) to = closestIntersection;
    else reflect = false;
  }

  darkness.goTo(to);
  drawLines(darkness.lines(), { fill: "Black", width: strokeLevel * strokePerLevel + widthRange[1] });

  if (intersections.length > 0 && reflect && reflections) {
    let newHealth = health - maxLength - (isWallHit(to) ? wallRoughness : toughness);
    if (newHealth > 0) {
      const newAngle = reflectAngle(angle, intersectionDetails);
      drawLine(newAngle, to[0], to[1], newHealth, intersectionDetails);
    }
  } else if (health - maxLength > 0) {
    drawLine(angle, to[0], to[1], health - maxLength);
  }
}

const canvasWidth = 125, canvasHeight = 125;
const coreRadius = -57, buffer = 10;
const lineCount = 214, coreDuration = 300;
const boundaryRoughness = 50, coreSteps = 97;
const enableReflections = true;

const centerPosition = [bt.rand() * (canvasWidth - 2 * (coreRadius + buffer)) + (coreRadius + buffer), 
                        bt.rand() * (canvasHeight - 2 * (coreRadius + buffer)) + (coreRadius + buffer)];
const angleStep = 2 * Math.PI / lineCount;
const strokeIncrement = (widthRange[0] - widthRange[1]) / (coreSteps - 1);
let boundaryLines = [[[0, 0], [0, canvasHeight]], [[0, 0], [canvasWidth, 0]], 
                     [[canvasWidth, 0], [canvasWidth, canvasHeight]], [[0, canvasHeight], [canvasWidth, canvasHeight]]];

const coreLight = new bt.Turtle();
coreLight.jump([centerPosition[0], centerPosition[1] - coreRadius]);
coreLight.arc(360, coreRadius);
drawLines(coreLight.lines(), { fill: "Black" });

for (let i = 0; i < lineCount; i++) {
  tt(i * angleStep, centerPosition[0], centerPosition[1], coreDuration);
}

async function tt(angle, x, y, health, previousIntersection) {
  const strokeLevel = Math.ceil(health / (coreDuration / coreSteps)) - 1;
  let maxLength = Math.min(health % (coreDuration / coreSteps) + 0.01, health);
  const coreDraw = new bt.Turtle();
  coreDraw.jump([x, y]);

  let end = calculateEndpoint(angle, x, y, maxLength);
  let intersections = findIntersections(convertLineToEquation([x, y], end));
  let reflect = true;

  if (intersections.length > 0) {
    let [closestIntersection, intersectionInfo] = getClosestIntersection(intersections, x, y, previousIntersection);
    if (closestIntersection) end = closestIntersection;
    else reflect = false;
  }

  coreDraw.goTo(end);
  tt(coreDraw.lines(), { fill: "Black", width: strokeLevel * strokeIncrement + widthRange[1] });

  if (intersections.length > 0 && reflect && enableReflections) {
    let newHealth = health - maxLength - (isWallHit(end) ? boundaryRoughness : toughness);
    if (newHealth > 0) {
      const newAngle = reflectAngle(angle, intersectionInfo);
      tt(newAngle, end[0], end[1], newHealth, intersectionInfo);
    }
  } else if (health - maxLength > 0) {
    tt(angle, end[0], end[1], health - maxLength);
  }
}

function calculateEndpoint(angle, x, y, maxLength) {
  if (angle == Math.PI / 2 || angle == Math.PI * (3 / 2)) {
    return [x, angle == Math.PI / 2 ? y + maxLength : y - maxLength];
  }
  const slope = Math.tan(angle);
  const lengthPerUnit = Math.sqrt(1 + slope * slope);
  return angle >= Math.PI / 2 && angle < Math.PI * 3 / 2 
    ? [x - maxLength / lengthPerUnit, y - slope * (maxLength / lengthPerUnit)] 
    : [x + maxLength / lengthPerUnit, y + slope * (maxLength / lengthPerUnit)];
}

function getClosestIntersection(intersections, x, y, doNotIntersect) {
  let closestIntersection = null, smallestDistance = Infinity, intersectionDetails = null;
  for (let intersection of intersections) {
    const distance = dist([x, y], intersection[0]);
    if (distance < smallestDistance && intersection[1] != doNotIntersect) {
      smallestDistance = distance;
      closestIntersection = intersection[0];
      intersectionDetails = intersection[1];
    }
  }
  return [closestIntersection, intersectionDetails];
}

function isWallHit(point) {
  return point[0] <= 0 || point[0] >= width || point[1] <= 0 || point[1] >= height;
}

function findIntersections(line) {
  return eqLines.map(compare => {
    if ((compare.m == line.m && !compare.undefined && !line.undefined) || (compare.undefined && line.undefined)) return null;
    return calculateIntersection(line, compare);
  }).filter(intersection => intersection !== null);
}

function calculateIntersection(line, compare) {
  let xSolution, ySolution;
  if (line.undefined) {
    ySolution = compare.m * line.from[0] + compare.b;
    if (isValidIntersection(line.from[0], ySolution, line, compare)) return [[line.from[0], ySolution], compare];
  } else if (compare.undefined) {
    ySolution = line.m * compare.from[0] + line.b;
    if (isValidIntersection(compare.from[0], ySolution, compare, line)) return [[compare.from[0], ySolution], compare];
  } else {
    xSolution = (line.b - compare.b) / (compare.m - line.m);
    ySolution = xSolution * line.m + line.b;
    if (isValidIntersection(xSolution, ySolution, line, compare)) return [[xSolution, ySolution], compare];
  }
  return null;
}

function isValidIntersection(x, y, line, compare) {
  return x < Math.max(line.from[0], line.to[0]) && x > Math.min(line.from[0], line.to[0]) &&
         y < Math.max(line.from[1], line.to[1]) && y > Math.min(line.from[1], line.to[1]) &&
         x < Math.max(compare.from[0], compare.to[0]) && x > Math.min(compare.from[0], compare.to[0]);
}

function lineToEquation(from, to) {
 if (to[0] - from[0] === 0) {
    return { m: 0, b: 0, from, to, undefined: true };
  } else {
    const slope = (to[1] - from[1]) / (to[0] - from[0]);
    const intercept = from[1] - from[0] * slope;
    return { m: slope, b: intercept, from, to, undefined: false };
  }
}

function dist([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function reflectAngle(incidentAngle, surfaceDetails) {
  const surfaceAngle = surfaceDetails.undefined ? 90 : Math.atan(surfaceDetails.m) * (180 / Math.PI);
  const reflectedAngle = 2 * surfaceAngle - (incidentAngle * (180 / Math.PI));
  return (reflectedAngle >= 360) ? reflectedAngle - 360 : (reflectedAngle < 0) ? reflectedAngle + 360 : reflectedAngle;
}
