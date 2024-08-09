/*
@title: Penguins On Ice (not the musical)
@author: Saumil
@snapshot: snapshot.png
*/

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
  drawPolygon(bodyPoints, { stroke: 'black', width: 1 });
  fillPolygon(bodyPoints, 'black');
  drawPolygon(bellyPoints, { stroke: 'white', width: 1 });
  fillPolygon(bellyPoints, 'white');
  drawPolygon(leftFlipperPoints, { stroke: 'black', width: 1 });
  fillPolygon(leftFlipperPoints, 'black');
  drawPolygon(rightFlipperPoints, { stroke: 'black', width: 1 });
  fillPolygon(rightFlipperPoints, 'black');
  drawPolygon(beakPoints, { stroke: 'orange', width: 1 });
  fillPolygon(beakPoints, 'orange');
  drawCircle(leftEyeCenter, eyeRadius, { stroke: 'black', width: 1 });
  drawCircle(leftEyeCenter, eyeRadius / 2, { stroke: 'black', width: 1, fill: 'black' });
  drawCircle(rightEyeCenter, eyeRadius, { stroke: 'black', width: 1 });
  drawCircle(rightEyeCenter, eyeRadius / 2, { stroke: 'black', width: 1, fill: 'black' });
}

// Draw background and ice cracks
drawLines([
  [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
    [0, 0]
  ]
], { stroke: "#B0E0E6", width: 1 });

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
    drawLines([
      [
        crackPoints[j],
        crackPoints[j + 1]
      ]
    ], { stroke: "#ADD8E6", width: iceCrackWidth });
  }
}

function DrawRandomPenguins() {
  const randomNumPenguins = bt.randInRange(minNumPenguins, maxNumPenguins);

  for (let i = 0; i < randomNumPenguins; i++) {
    const randomPenguinXValue = bt.randInRange(minPenguinXValue, maxPenguinXValue);
    const randomPenguinYValue = bt.randInRange(minPenguinYValue, maxPenguinYValue);
    const randomPenguinScale = bt.randInRange(minPenguinScale, maxPenguinScale);

    DrawPenguin([randomPenguinXValue, randomPenguinYValue], randomPenguinScale);
  }
}

// Draw penguins
DrawRandomPenguins();
