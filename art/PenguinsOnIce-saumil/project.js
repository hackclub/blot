/*
@title: Penguins On Ice (not the musical)
@author: Saumil
@snapshot: snapshot.png
*/

// VARIABLE TO DISABLE COLORS AND VARYING LINE THICKNESS
const disableColorsAndThickness = true;

// DOC DIMENSIONS
const width = 125;
const height = 125;

// BACKGROUND
const numberOfIceCracks = 15;
const iceCrackWidth = 2;

const maxCrackOffset = 7; 
const minCrackOffset = -7;
const crackSegments = 25; 

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

const iceColor = "#B0E0E6"; // Base ice color
const iceHighlightColor = "#E0FFFF"; // Ice highlights for depth
const iceShadowColor = "#A9CCE3"; // Add shadows to give more depth

setDocDimensions(width, height);

// Store penguins' positions and sizes
let penguins = [];
const numPenguins = randInt(3, 6); // Adjust number for balance on the paper

// Helper function to generate a random integer between min (inclusive) and max (inclusive)
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate a random float between min (inclusive) and max (inclusive)
function randInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function lerpColor(color1, color2, ratio) {
  const hex = (x) => parseInt(x, 16);
  const r = Math.round(lerp(hex(color1.slice(1, 3)), hex(color2.slice(1, 3)), ratio));
  const g = Math.round(lerp(hex(color1.slice(3, 5)), hex(color2.slice(3, 5)), ratio));
  const b = Math.round(lerp(hex(color1.slice(5, 7)), hex(color2.slice(5, 7)), ratio));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function drawPolygon(points, options) {
  for (let i = 0; i < points.length - 1; i++) {
    drawLines([[points[i], points[i + 1]]], options);
  }
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

  if (centerX - scale < 0 || centerX + scale > width || centerY - scale < 0 || centerY + scale > height) {
    return;
  }

  penguins.push({ center, scale });

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

  const leftFlipperAngle = randInRange(-Math.PI / 4, Math.PI / 4);
  const rightFlipperAngle = randInRange(-Math.PI / 4, Math.PI / 4);

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

  const beakPoints = [
    [centerX, centerY - scale],
    [centerX - scale / 8, centerY - scale / 1.2],
    [centerX + scale / 8, centerY - scale / 1.2]
  ];

  const eyeRadius = scale / 10;
  const leftEyeCenter = [centerX - scale / 4, centerY - scale / 2];
  const rightEyeCenter = [centerX + scale / 4, centerY - scale / 2];

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

function addPenguinShading(penguin) {
  const { center, scale } = penguin;
  const bodyShadowPoints = [
    [center[0] - scale / 2, center[1] + scale / 2],
    [center[0] - scale / 3, center[1] + scale / 2],
    [center[0] - scale / 6, center[1] + scale / 4],
    [center[0] - scale / 2, center[1] + scale / 2]
  ];
  drawPolygon(bodyShadowPoints, { stroke: 'rgba(0, 0, 0, 0.5)', width: 1 });
  fillPolygon(bodyShadowPoints, 'rgba(0, 0, 0, 0.5)');
}

// Helper function to check for penguin overlap
function isPenguinOverlapping(newPenguin) {
  for (const penguin of penguins) {
    const dx = penguin.center[0] - newPenguin.center[0];
    const dy = penguin.center[1] - newPenguin.center[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < penguin.scale + newPenguin.scale) {
      return true;
    }
  }
  return false;
}

// Initialize penguins before drawing cracks
for (let i = 0; i < numPenguins; i++) {
  let newPenguin;
  let attempts = 0;
  do {
    const x = randInRange(minPenguinXValue + 20, maxPenguinXValue - 20); // Bound penguins within the visible space
    const y = randInRange(minPenguinYValue + 20, maxPenguinYValue - 20);
    const scale = randInRange(10, 18); // Larger size to fit paper dimensions
    newPenguin = { center: [x, y], scale: scale };
    attempts++;
  } while (isPenguinOverlapping(newPenguin) && attempts < 100);

  if (attempts < 100) {
    DrawPenguin(newPenguin.center, newPenguin.scale);
    addPenguinShading(newPenguin);
  }
}

// Now that penguins are initialized, draw the ice cracks

function drawIceCracks() {
  for (let i = 0; i < numberOfIceCracks; i++) {
    const startX = randInt(0, width);
    const startY = randInt(0, height);
    let points = [[startX, startY]];

    for (let j = 0; j < crackSegments; j++) {
      const lastPoint = points[points.length - 1];
      const nextX = lastPoint[0] + randInRange(minCrackOffset, maxCrackOffset);
      const nextY = lastPoint[1] + randInRange(minCrackOffset, maxCrackOffset);

      if (nextX < 0 || nextX > width || nextY < 0 || nextY > height) {
        break;
      }

      if (!isPointNearPenguin([nextX, nextY])) {
        points.push([nextX, nextY]);
      }
    }

    drawLines([points], { stroke: iceHighlightColor, width: iceCrackWidth });
  }
}

function drawIceShadowCracks() {
  for (let i = 0; i < numberOfIceCracks; i++) {
    const startX = randInt(0, width);
    const startY = randInt(0, height);
    let points = [[startX, startY]];

    for (let j = 0; j < crackSegments; j++) {
      const lastPoint = points[points.length - 1];
      const nextX = lastPoint[0] + randInRange(minCrackOffset, maxCrackOffset);
      const nextY = lastPoint[1] + randInRange(minCrackOffset, maxCrackOffset);

      if (nextX < 0 || nextX > width || nextY < 0 || nextY > height) {
        break;
      }

      if (!isPointNearPenguin([nextX, nextY])) {
        points.push([nextX, nextY]);
      }
    }

    drawLines([points], { stroke: iceShadowColor, width: iceCrackWidth });
  }
}

// Drawing the background gradient, controlled by the disableColorsAndThickness flag
function drawIceGradient() {
  // Check if colors and thickness are disabled
  if (disableColorsAndThickness) {
    // Simulate a solid background fill by drawing horizontal lines across the entire area
    for (let y = 0; y < height; y++) {
      drawLines([[[0, y], [width, y]]], { stroke: iceColor, width: 1 });
    }
  } else {
    // Draw the gradient background
    const gradientSteps = 150;
    for (let i = 0; i < gradientSteps; i++) {
      const colorRatio = i / gradientSteps;
      drawLines([[[0, i * (height / gradientSteps)], [width, i * (height / gradientSteps)]]], {
        stroke: lerpColor(iceColor, iceHighlightColor, colorRatio),
        width: 1
      });
    }
  }
}
drawIceCracks();
drawIceShadowCracks();
// drawIceGradient();


// Check if the crack point is near any penguin
function isPointNearPenguin(point) {
  for (const penguin of penguins) {
    const dx = penguin.center[0] - point[0];
    const dy = penguin.center[1] - point[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < penguin.scale * 1.5) {
      return true;
    }
  }
  return false;
}
