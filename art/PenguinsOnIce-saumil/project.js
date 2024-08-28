/*
@title: Penguins On Ice (not the musical)
@author: Saumil
@snapshot: snapshot.png
*/

// VARIABLE TO DISABLE COLORS AND VARYING LINE THICKNESS
const disableColorsAndThickness = false;

// DOC DIMENSIONS
const width = 125;
const height = 125;

// BACKGROUND
const numberOfIceCracks = 10;
const iceCrackWidth = 15;

const maxCrackOffset = 5;
const minCrackOffset = -5;
const crackSegments = 20; // Increase the number of segments for more jagged cracks

// NUMBER OF PENGUINS
const maxNumPenguins = 8;
const minNumPenguins = 3;

// POSITION
const maxPenguinXValue = width;
const minPenguinXValue = 0;

const maxPenguinYValue = height;
const minPenguinYValue = 0;

// SCALE
const maxPenguinScale = 15;
const minPenguinScale = 5;

setDocDimensions(width, height);

// Store penguins' positions and sizes
let penguins = [];

function drawPolygon(points, options) {
  for (let i = 0; i < points.length - 1; i++) {
    drawLines([[points[i], points[i + 1]]], options);
  }
  // Connect the last point to the first to close the polygon
  drawLines([[points[points.length - 1], points[0]]], options);
}

function drawCircle(center, radius, options) {
  const points = [];
  const numSegments = 100;
  for (let i = 0; i < numSegments; i++) {
    const angle = (2 * Math.PI * i) / numSegments;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    points.push([x, y]);
  }
  drawPolygon(points, options);
}

function fillPolygon(points, color) {
  const minX = Math.min(...points.map(p => p[0]));
  const maxX = Math.max(...points.map(p => p[0]));
  const numLines = Math.ceil((maxX - minX) / 2);
  
  for (let i = 0; i <= numLines; i++) {
    const x = minX + (i / numLines) * (maxX - minX);
    const intersections = [];
    
    for (let j = 0; j < points.length - 1; j++) {
      const [x1, y1] = points[j];
      const [x2, y2] = points[j + 1];

      if ((x1 <= x && x2 >= x) || (x2 <= x && x1 >= x)) {
        const y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
        intersections.push([x, y]);
      }
    }
    
    intersections.sort((a, b) => a[1] - b[1]);
    
    for (let k = 0; k < intersections.length; k += 2) {
      if (k + 1 < intersections.length) {
        const [x1, y1] = intersections[k];
        let [x2, y2] = intersections[k + 1];
        if (isNaN(y2)) {
          y2 = y1;
        }
        drawLines([[[x1, y1], [x2, y2]]], { stroke: color });
      }
    }
  }
}

function rotatePoint(point, center, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const [x, y] = point;
  const [cx, cy] = center;
  const nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
  const ny = (sin * (x - cx)) + (cos * (y - cy)) + cy;
  return [nx, ny];
}

function DrawPenguin(center, scale) {
  const centerX = center[0];
  const centerY = center[1];

  // Ensure penguins are drawn within the boundaries
  if (centerX - scale < 0 || centerX + scale > width || centerY - scale < 0 || centerY + scale > height) {
    return;
  }

  // Store penguin details for collision detection
  penguins.push({ center, scale });

  // Body
  const bodyPoints = [
    [centerX, centerY - scale],
    [centerX - scale / 2, centerY + scale / 2],
    [centerX + scale / 2, centerY + scale / 2],
    [centerX, centerY - scale]
  ];

  const bellyPoints = [
    [centerX, centerY - scale / 1.5],
    [centerX - scale / 4, centerY + scale / 3],
    [centerX + scale / 4, centerY + scale / 3],
    [centerX, centerY - scale / 1.5]
  ];

  // Flippers with random orientations
  const leftFlipperAngle = bt.randInRange(-Math.PI / 4, Math.PI / 4);
  const rightFlipperAngle = bt.randInRange(-Math.PI / 4, Math.PI / 4);

  const leftFlipperPoints = [
    [centerX - scale / 2, centerY - scale / 3],
    [centerX - scale, centerY],
    [centerX - scale / 2, centerY + scale / 3]
  ].map(point => rotatePoint(point, [centerX - scale / 2, centerY], leftFlipperAngle));

  const rightFlipperPoints = [
    [centerX + scale / 2, centerY - scale / 3],
    [centerX + scale, centerY],
    [centerX + scale / 2, centerY + scale / 3]
  ].map(point => rotatePoint(point, [centerX + scale / 2, centerY], rightFlipperAngle));

  // Beak
  const beakPoints = [
    [centerX, centerY - scale],
    [centerX - scale / 8, centerY - scale / 1.2],
    [centerX + scale / 8, centerY - scale / 1.2]
  ];

  // Eyes
  const eyeRadius = scale / 10;
  const leftEyeCenter = [centerX - scale / 4, centerY - scale / 2];
  const rightEyeCenter = [centerX + scale / 4, centerY - scale / 2];

  // Drawing
  drawPolygon(bodyPoints, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1 });
  fillPolygon(bodyPoints, disableColorsAndThickness ? 'black' : 'black');
  drawPolygon(bellyPoints, { stroke: disableColorsAndThickness ? 'white' : 'white', width: 1 });
  fillPolygon(bellyPoints, disableColorsAndThickness ? 'white' : 'white');
  drawPolygon(leftFlipperPoints, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1 });
  fillPolygon(leftFlipperPoints, disableColorsAndThickness ? 'black' : 'black');
  drawPolygon(rightFlipperPoints, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1 });
  fillPolygon(rightFlipperPoints, disableColorsAndThickness ? 'black' : 'black');
  drawPolygon(beakPoints, { stroke: disableColorsAndThickness ? 'black' : 'orange', width: 1 });
  fillPolygon(beakPoints, disableColorsAndThickness ? 'black' : 'orange');
  drawCircle(leftEyeCenter, eyeRadius, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1 });
  drawCircle(leftEyeCenter, eyeRadius / 2, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1, fill: 'black' });
  drawCircle(rightEyeCenter, eyeRadius, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1 });
  drawCircle(rightEyeCenter, eyeRadius / 2, { stroke: disableColorsAndThickness ? 'black' : 'black', width: 1, fill: 'black' });
}

// Helper function to detect if a line segment intersects with a penguin's bounding box
function isSegmentInsidePenguin(segment) {
  for (let i = 0; i < penguins.length; i++) {
    const penguin = penguins[i];
    const [px, py] = penguin.center;
    const scale = penguin.scale;

    // Define penguin bounding box
    const left = px - scale;
    const right = px + scale;
    const top = py - scale;
    const bottom = py + scale;

    const [p1, p2] = segment;

    // Check if either end of the segment is inside the bounding box
    const isPointInsideBox = (p) =>
      p[0] >= left && p[0] <= right && p[1] >= top && p[1] <= bottom;

    if (isPointInsideBox(p1) || isPointInsideBox(p2)) {
      return true; // If any point is inside, they intersect
    }

    // Additional check for line-segment overlap with rectangle edges
    const lineIntersect = (l1, l2, r1, r2) => {
      const det = (l1[0] - l2[0]) * (r1[1] - r2[1]) - (l1[1] - l2[1]) * (r1[0] - r2[0]);
      if (det === 0) return false; // Parallel lines

      const lambda = ((r1[1] - r2[1]) * (r1[0] - l1[0]) + (r2[0] - r1[0]) * (r1[1] - l1[1])) / det;
      const gamma = ((l1[1] - l2[1]) * (r1[0] - l1[0]) + (l2[0] - l1[0]) * (r1[1] - l1[1])) / det;

      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    };

    // Check for intersection with each edge of the penguin's bounding box
    const edges = [
      [[left, top], [right, top]],
      [[right, top], [right, bottom]],
      [[right, bottom], [left, bottom]],
      [[left, bottom], [left, top]]
    ];

    for (const edge of edges) {
      if (lineIntersect(p1, p2, edge[0], edge[1])) {
        return true; // Line intersects with the bounding box
      }
    }
  }
  return false; // No intersections
}

// Draw ice cracks with checks for penguins
for (let i = 0; i < numberOfIceCracks; i++) {
  const startY = Math.max(0, Math.min(height, ((height / numberOfIceCracks) * i) + bt.randInRange(minCrackOffset, maxCrackOffset)));
  const endY = Math.max(0, Math.min(height, ((height / numberOfIceCracks) * (i + 1)) + bt.randInRange(minCrackOffset, maxCrackOffset)));
  const crackPoints = [[0, startY]];

  for (let j = 0; j < crackSegments; j++) {
    const x = ((j + 1) / crackSegments) * width;
    const y = Math.max(0, Math.min(height, startY + ((endY - startY) * (j + 1)) / crackSegments + bt.randInRange(minCrackOffset, maxCrackOffset)));
    crackPoints.push([x, y]);
  }

  crackPoints.push([width, endY]);

  for (let j = 0; j < crackPoints.length - 1; j++) {
    const segment = [crackPoints[j], crackPoints[j + 1]];

    // Check for intersection with penguins when color is disabled
    if (disableColorsAndThickness && isSegmentInsidePenguin(segment)) {
      continue; // Skip this crack segment if it intersects with any penguin
    }

    drawLines([segment], { stroke: disableColorsAndThickness ? 'black' : "#ADD8E6", width: disableColorsAndThickness ? 1 : iceCrackWidth });
  }
}

// Generate random penguins
const numPenguins = bt.randInRange(minNumPenguins, maxNumPenguins);
for (let i = 0; i < numPenguins; i++) {
  const x = bt.randInRange(minPenguinXValue, maxPenguinXValue);
  const y = bt.randInRange(minPenguinYValue, maxPenguinYValue);
  const scale = bt.randInRange(minPenguinScale, maxPenguinScale);
  DrawPenguin([x, y], scale);
}
