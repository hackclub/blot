/*
@title: Echoes of Light
@author: Jackson Hickey
@snapshot: 0.png
*/


// Space Dimensions
const width = 125;
const height = 125;

// Circle in the middle of the madness
const darkRadius = 9;

// Min distance from the wall for the darkness and boxes 
const margin = 10;

// Number of lines coming out from the dark
const numLines = 214;

// How long lines last. Distance is subtracted from it and roughness subtracts from it as well
const darknessLife = 300;
const wallRoughness = 50;
const boxRoughness = 60;

// How many steps to take between max and min width (higher the better the gradient)
const darknessSteps = 97;
const widthRange = [1.5, 0.0001];

// # of boxes and their size range
const numBoxes = 7;
const boxDiagonalSize = [5, 20]

// stop at intersections or reflect
const reflections = true

const randSeed = null;


if (randSeed) bt.setRandSeed(randSeed);
setDocDimensions(width, height);


// define center, radians/line, stroke/level, walls
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

// Box production
const boxes = []

// I probably could've done this better but I just pick random spots and sizes until it works
for (let i = 0; i < numBoxes; i++) {
  for (let j = 0; j < 1000; j++) {
    if (j == 999) throw new Error("Your box size/number is too high");

    const boxSize = bt.rand() * (boxDiagonalSize[1] - boxDiagonalSize[0]) + boxDiagonalSize[0];
    const boxX = bt.rand() * (width - (boxSize + margin * 2)) + boxSize / 2 + margin;
    const boxY = bt.rand() * (height - (boxSize + margin * 2)) + boxSize / 2 + margin;
    const boxAngle = 2 * Math.PI * bt.rand();

    if (dist([boxX, boxY], center) <= boxSize + 10) continue;

    let skip = false

    for (let box of boxes) {
      if (dist([box.x, box.y], [boxX, boxY]) < boxSize / 2 + box.size / 2 + 10) skip = true;
    }
    if (skip) continue;


    boxes.push({ x: boxX, y: boxY, size: boxSize, angle: boxAngle });
    break;
  }
}

// Now with our boxes we turn them into vertices and then lines for drawing and intersection calculations
for (let box of boxes) {
  const x = box.x;
  const y = box.y;
  const size = box.size;
  const angle = box.angle;

  const halfWidth = size / 2;
  const halfHeight = size / 2;

  const vertices = [];

  const topLeft = [-halfWidth, -halfHeight];
  const topRight = [halfWidth, -halfHeight];
  const bottomRight = [halfWidth, halfHeight];
  const bottomLeft = [-halfWidth, halfHeight];

  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  vertices.push([
    x + topLeft[0] * cosAngle - topLeft[1] * sinAngle,
    y + topLeft[0] * sinAngle + topLeft[1] * cosAngle
  ]);

  vertices.push([
    x + topRight[0] * cosAngle - topRight[1] * sinAngle,
    y + topRight[0] * sinAngle + topRight[1] * cosAngle
  ]);

  vertices.push([
    x + bottomRight[0] * cosAngle - bottomRight[1] * sinAngle,
    y + bottomRight[0] * sinAngle + bottomRight[1] * cosAngle
  ]);

  vertices.push([
    x + bottomLeft[0] * cosAngle - bottomLeft[1] * sinAngle,
    y + bottomLeft[0] * sinAngle + bottomLeft[1] * cosAngle
  ]);

  const square = new bt.Turtle();
  square.jump(vertices[0])
  for (let i = 0; i < 4; i++) {
    if (i < 3) {
      square.goTo(vertices[i + 1])
      lines.push([vertices[i], vertices[i + 1]]);
    } else {
      square.goTo(vertices[0])
      lines.push([vertices[i], vertices[0]]);
    }
  }

  drawLines(square.lines(), { width: 1 });

}


// Turn each line into an equation (y=mx+b (: ) to find intersects easier
let eqLines = []

for (let line of lines) {
  eqLines.push(lineToEquation(line[0], line[1]))
}


// This was the first thing I did. Big circle
const negativeLight = new bt.Turtle();
negativeLight.jump([center[0], center[1] - darkRadius]);
negativeLight.arc(360, darkRadius);
drawLines(negativeLight.lines(), { fill: "Black" });


// Draw each line out one by one
for (let i = 0; i < numLines; i++) {
  const angle = i * radians;
  drawLine(angle, center[0], center[1], darknessLife);
}


// Draw line recursively. I probably could've used a loop as well but I felt this was easier
async function drawLine(angle, x, y, health, doNotIntersect) {
  let to;
  const strokeLevel = Math.ceil(health / (darknessLife / darknessSteps)) - 1;
  const lengthUntilNextStroke = health - (strokeLevel * (darknessLife / darknessSteps));
  let maxLength = Math.min(lengthUntilNextStroke + 0.01, health);
  const darkness = new bt.Turtle();
  darkness.jump([x, y]);

  // Project where the line will go under perfect conditions (no intersects)
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

  // Find intersections with other lines and pick the closest
  const equation = lineToEquation([x, y], to);
  const intersections = findIntersections(equation);

  let intersectionDetails;
  let reflect = true;
  if (intersections.length > 0) {
    let smallestDistance = Infinity;
    for (let intersection of intersections) {
      const distance = dist([x, y], intersection[0]);

      // doNotIntersect exists because somehow some lines were reflecting off the same
      // wall multiple times until they just went through 
      if (distance < smallestDistance && intersection[1] != doNotIntersect) {
        smallestDistance = distance;
        to = intersection[0];
        intersectionDetails = intersection[1];
      }
    }
    if (smallestDistance == Infinity) reflect = false;
  }

  //draw it
  darkness.goTo([to[0], to[1]]);
  drawLines(darkness.lines(), { fill: "Black", width: strokeLevel * strokePerLevel + widthRange[1] });

  // Calculate reflection
  if (intersections.length > 0 && reflect) {
    if (!reflections) return;
    let newHealth = health - maxLength;
    if (to[0] <= 0 || to[0] >= width || to[1] <= 0 || to[1] >= height) {
      newHealth -= wallRoughness;
    } else {
      newHealth -= boxRoughness;
    }

    if (newHealth <= 0) return;

    // Calculate reflection angle
    const newAngle = angleReflect(angle * (180 / Math.PI), intersectionDetails.undefined ? 90 : Math.atan(intersectionDetails.m) * (180 / Math.PI));
    drawLine(newAngle / 180 * Math.PI, to[0], to[1], newHealth, intersectionDetails);
    return;
  }

  if (health - maxLength > 0) drawLine(angle, to[0], to[1], health - maxLength);
}


// Find intersections with all the lines by using y=mx+b
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

// Adds slopes and intercept to the lines instead of just [[x, y], [x, y]]
function lineToEquation(from, to) {
  if (to[0] - from[0] == 0) {
    return { m: 0, b: 0, from: from, to: to, undefined: true };

  } else {
    const slope = (to[1] - from[1]) / (to[0] - from[0]);
    const intercept = from[1] - (from[0] * slope);

    return { m: slope, b: intercept, from: from, to: to, undefined: false };
  }
}

// Distance between 2 coordinates
function dist(from, to) {
  var a = from[0] - to[0];
  var b = from[1] - to[1];

  return Math.sqrt(a * a + b * b);
}


// Reflect angle
function angleReflect(incidenceAngle, surfaceAngle) {
  if (surfaceAngle < 0) surfaceAngle += 360;
  var a = surfaceAngle * 2 - incidenceAngle;
  return a >= 360 ? a - 360 : a < 0 ? a + 360 : a;
}