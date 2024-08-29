/*
The stroy of to love ball 

Refresh continuously  to see the love between to balls.
This shows the love of our life.

@title: Story of to love ball
@author: Anubhav Shivam Nath
@snapshot: index.js
*/

// First love ball 

const width = 214;
const height = 214;


const darkRadius = -57;

const margin = 10;

const numLines = 214;

const darknessLife = 300;
const wallRoughness = 50;
const Toughness = 60;

const darknessSteps = 97;
const widthRange = [1.5, 0.0001];

const numBoxes = 7;
const boxDiagonalSize = [5, 20]

const reflections = true

const randSeed = null;


if (randSeed) bt.setRandSeed(randSeed);
setDocDimensions(width, height);

const center = [bt.rand() * (width - 2 * (darkRadius + margin)) + (darkRadius + margin), bt.rand() * (height - 2 * (darkRadius + margin)) + (darkRadius + margin)];
const radians = 2 * Math.PI / numLines;
const strokePerLevel = (widthRange[0] - widthRange[1]) / (darknessSteps - 1);
let lines = [
  [
    [0, 0],
    [0, height]
  ],
  [
    [0, 0],
    [width, 0]
  ],
  [
    [width, 0],
    [width, height]
  ],
  [
    [0, height],
    [width, height]
  ]
]






let eqLines = []

for (let line of lines) {
  eqLines.push(lineToEquation(line[0], line[1]))
}


const negativeLight = new bt.Turtle();
negativeLight.jump([center[0], center[1] - darkRadius]);
negativeLight.arc(360, darkRadius);
drawLines(negativeLight.lines(), { fill: "Black" });


for (let i = 0; i < numLines; i++) {
  const angle = i * radians;
  drawLine(angle, center[0], center[1], darknessLife);
}

async function drawLine(angle, x, y, health, doNotIntersect) {
  let to;
  const strokeLevel = Math.ceil(health / (darknessLife / darknessSteps)) - 1;
  const lengthUntilNextStroke = health - (strokeLevel * (darknessLife / darknessSteps));
  let maxLength = Math.min(lengthUntilNextStroke + 0.01, health);
  const darkness = new bt.Turtle();
  darkness.jump([x, y]);


  if (angle == Math.PI / 2 || angle == Math.PI * (3 / 2)) {
    to = [x, angle == Math.PI / 2 ? y + maxLength : y - maxLength];
  } else {
    const slope = Math.tan(angle);
    const lengthPerOne = Math.sqrt(1 + slope * slope);

    if (angle >= Math.PI / 2 && angle < Math.PI * 3 / 2) {
      to = [x - maxLength / lengthPerOne, y - slope * (maxLength / lengthPerOne)];
    } else {
      to = [x + maxLength / lengthPerOne, y + slope * (maxLength / lengthPerOne)];
    }
  }

  const equation = lineToEquation([x, y], to);
  const intersections = findIntersections(equation);

  let intersectionDetails;
  let reflect = true;
  if (intersections.length > 0) {
    let smallestDistance = Infinity;
    for (let intersection of intersections) {
      const distance = dist([x, y], intersection[0]);

      if (distance < smallestDistance && intersection[1] != doNotIntersect) {
        smallestDistance = distance;
        to = intersection[0];
        intersectionDetails = intersection[1];
      }
    }
    if (smallestDistance == Infinity) reflect = false;
  }


  darkness.goTo([to[0], to[1]]);
  drawLines(darkness.lines(), { fill: "Black", width: strokeLevel * strokePerLevel + widthRange[1] });

  if (intersections.length > 0 && reflect) {
    if (!reflections) return;
    let newHealth = health - maxLength;
    if (to[0] <= 0 || to[0] >= width || to[1] <= 0 || to[1] >= height) {
      newHealth -= wallRoughness;
    } else {
      newHealth -= Toughness;
    }

    if (newHealth <= 0) return;

  
    const newAngle = angleReflect(angle * (180 / Math.PI), intersectionDetails.undefined ? 90 : Math.atan(intersectionDetails.m) * (180 / Math.PI));
    drawLine(newAngle / 180 * Math.PI, to[0], to[1], newHealth, intersectionDetails);
    return;
  }

  if (health - maxLength > 0) drawLine(angle, to[0], to[1], health - maxLength);
}


function findIntersections(line) {
  let intersections = [];
  for (let compare of eqLines) {
    if ((compare.m == line.m && !compare.undefined && !line.undefined) || (compare.undefined && line.undefined)) continue;
    if (line.undefined) {
      const location = compare.m * line.from[0] + compare.b;
      if (location < Math.max(line.from[1], line.to[1]) &&
        location > Math.min(line.from[1], line.to[1]) &&
        line.from[0] < Math.max(compare.from[0], compare.to[0]) &&
        line.from[0] > Math.min(compare.from[0], compare.to[0])) {
        intersections.push([
          [line
            .from[0], location
          ], compare
        ]);

      }

    } else if (compare.undefined) {

      const location = line.m * compare.from[0] + line.b;
      if (location < Math.max(compare.from[1], compare.to[1]) &&
        location > Math.min(compare.from[1], compare.to[1]) &&
        compare.from[0] < Math.max(line.from[0], line.to[0]) &&
        compare.from[0] > Math.min(line.from[0], line.to[0])) {
        intersections.push([
          [compare.from[0], location], compare
        ]);
      }
    } else {
      const xSolution = (line.b - compare.b) / (compare.m - line.m)
      if (xSolution < Math.max(compare.from[0], compare.to[0]) &&
        xSolution > Math.min(compare.from[0], compare.to[0]) &&
        xSolution < Math.max(line.from[0], line.to[0]) &&
        xSolution > Math.min(line.from[0], line.to[0])) {
        intersections.push([
          [xSolution, xSolution * line.m + line.b], compare
        ]);

      }
    }

  }
  return intersections;
}

function lineToEquation(from, to) {
  if (to[0] - from[0] == 0) {
    return { m: 0, b: 0, from: from, to: to, undefined: true };

  } else {
    const slope = (to[1] - from[1]) / (to[0] - from[0]);
    const intercept = from[1] - (from[0] * slope);

    return { m: slope, b: intercept, from: from, to: to, undefined: false };
  }
}

function dist(from, to) {
  var a = from[0] - to[0];
  var b = from[1] - to[1];

  return Math.sqrt(a * a + b * b);
}



function angleReflect(incidenceAngle, surfaceAngle) {
  if (surfaceAngle < 0) surfaceAngle += 360;
  var a = surfaceAngle * 2 - incidenceAngle;
  return a >= 360 ? a - 360 : a < 0 ? a + 360 : a;
}

// Scond love ball just copy the same code a rename the variables using chat gpt 

const canvasWidth = 125;
const canvasHeight = 125;


const coreRadius = -57;


const buffer = 10;


const lineCount = 214;


const coreDuration = 300;
const boundaryRoughness = 50;


const coreSteps = 97;

const boxCount = 7;
const boxSizeRange = [5, 20]

const enableReflections = true

const randomSeed = null;

if (randomSeed) bt.setRandSeed(randomSeed);


const centerPosition = [bt.rand() * (canvasWidth - 2 * (coreRadius + buffer)) + (coreRadius + buffer), bt.rand() * (canvasHeight - 2 * (coreRadius + buffer)) + (coreRadius + buffer)];
const angleStep = 2 * Math.PI / lineCount;
const strokeIncrement = (widthRange[0] - widthRange[1]) / (coreSteps - 1);
let boundaryLines = [
  [
    [0, 0],
    [0, canvasHeight]
  ],
  [
    [0, 0],
    [canvasWidth, 0]
  ],
  [
    [canvasWidth, 0],
    [canvasWidth, canvasHeight]
  ],
  [
    [0, canvasHeight],
    [canvasWidth, canvasHeight]
  ]
]

let lineEquations = []

for (let line of boundaryLines) {
  lineEquations.push(convertLineToEquation(line[0], line[1]))
}


const coreLight = new bt.Turtle();
coreLight.jump([centerPosition[0], centerPosition[1] - coreRadius]);
coreLight.arc(360, coreRadius);
drawLines(coreLight.lines(), { fill: "Black" });

for (let i = 0; i < lineCount; i++) {
  const angle = i * angleStep;
  drawLine(angle, centerPosition[0], centerPosition[1], coreDuration);
}

async function tt(angle, x, y, health, previousIntersection) {
  let end;
  const strokeLevel = Math.ceil(health / (coreDuration / coreSteps)) - 1;
  const remainingLength = health - (strokeLevel * (coreDuration / coreSteps));
  let maxLength = Math.min(remainingLength + 0.01, health);
  const coreDraw = new bt.Turtle();
  coreDraw.jump([x, y]);

  if (angle == Math.PI / 2 || angle == Math.PI * (3 / 2)) {
    end = [x, angle == Math.PI / 2 ? y + maxLength : y - maxLength];
  } else {
    const slope = Math.tan(angle);
    const lengthPerUnit = Math.sqrt(1 + slope * slope);

    if (angle >= Math.PI / 2 && angle < Math.PI * 3 / 2) {
      end = [x - maxLength / lengthPerUnit, y - slope * (maxLength / lengthPerUnit)];
    } else {
      end = [x + maxLength / lengthPerUnit, y + slope * (maxLength / lengthPerUnit)];
    }
  }

  // Find intersections with other lines and pick the closest
  const lineEquation = convertLineToEquation([x, y], end);
  const intersections = findIntersections(lineEquation);

  let intersectionInfo;
  let reflect = true;
  if (intersections.length > 0) {
    let closestDistance = Infinity;
    for (let intersection of intersections) {
      const distance = calculateDistance([x, y], intersection[0]);

      if (distance < closestDistance && intersection[1] != previousIntersection) {
        closestDistance = distance;
        end = intersection[0];
        intersectionInfo = intersection[1];
      }
    }
    if (closestDistance == Infinity) reflect = false;
  }

  coreDraw.goTo([end[0], end[1]]);
  tt(coreDraw.lines(), { fill: "Black", width: strokeLevel * strokeIncrement + widthRange[1] });

  if (intersections.length > 0 && reflect) {
    if (!enableReflections) return;
    let newHealth = health - maxLength;
    if (end[0] <= 0 || end[0] >= canvasWidth || end[1] <= 0 || end[1] >= canvasHeight) {
      newHealth -= boundaryRoughness;
    } else {
      newHealth -= Toughness;
    }

    if (newHealth <= 0) return;

    const newAngle = reflectAngle(angle * (180 / Math.PI), intersectionInfo.undefined ? 90 : Math.atan(intersectionInfo.m) * (180 / Math.PI));
    drawLine(newAngle / 180 * Math.PI, end[0], end[1], newHealth, intersectionInfo);
    return;
  }

  if (health - maxLength > 0) drawLine(angle, end[0], end[1], health - maxLength);
}


function ff(line) {
  let intersections = [];
  for (let compare of lineEquations) {
    if ((compare.m == line.m && !compare.undefined && !line.undefined) || (compare.undefined && line.undefined)) continue;
    if (line.undefined) {
      const location = compare.m * line.from[0] + compare.b;
      if (location < Math.max(line.from[1], line.to[1]) &&
        location > Math.min(line.from[1], line.to[1]) &&
        line.from[0] < Math.max(compare.from[0], compare.to[0]) &&
        line.from[0] > Math.min(compare.from[0], compare.to[0])) {
        intersections.push([
          [line.from[0], location], compare
        ]);

      }

    } else if (compare.undefined) {

      const location = line.m * compare.from[0] + line.b;
      if (location < Math.max(compare.from[1], compare.to[1]) &&
        location > Math.min(compare.from[1], compare.to[1]) &&
        compare.from[0] < Math.max(line.from[0], line.to[0]) &&
        compare.from[0] > Math.min(line.from[0], line.to[0])) {
        intersections.push([
          [compare.from[0], location], compare
        ]);
      }
    } else {
      const xSolution = (line.b - compare.b) / (compare.m - line.m)
      if (xSolution < Math.max(compare.from[0], compare.to[0]) &&
        xSolution > Math.min(compare.from[0], compare.to[0]) &&
        xSolution < Math.max(line.from[0], line.to[0]) &&
        xSolution > Math.min(line.from[0], line.to[0])) {
        intersections.push([
          [xSolution, xSolution * line.m + line.b], compare
        ]);

      }
    }
  }
  return intersections;
}

function convertLineToEquation(from, to) {
  if (to[0] - from[0] == 0) {
    return { m: 0, b: 0, from: from, to: to, undefined: true };

  } else {
    const slope = (to[1] - from[1]) / (to[0] - from[0]);
    const intercept = from[1] - (from[0] * slope);

    return { m: slope, b: intercept, from: from, to: to, undefined: false };
  }
}

function calculateDistance(from, to) {
  var dx = from[0] - to[0];
  var dy = from[1] - to[1];

  return Math.sqrt(dx * dx + dy * dy);
}

function reflectAngle(incidentAngle, surfaceAngle) {
  if (surfaceAngle < 0) surfaceAngle += 360;
  var reflectedAngle = surfaceAngle * 2 - incidentAngle;
  return reflectedAngle >= 360 ? reflectedAngle - 360 : reflectedAngle < 0 ? reflectedAngle + 360 : reflectedAngle;
}
