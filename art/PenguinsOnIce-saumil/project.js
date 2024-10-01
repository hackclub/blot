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
const numberOfIceCracks = 15;
const iceCrackWidth = 2;

const maxCrackOffset = 8; 
const minCrackOffset = -8;
const crackSegments = 19; 

// NUMBER OF PENGUINS
const maxNumPenguins = 8;
const minNumPenguins = 3;

// POSITION
const maxPenguinXValue = width;
const minPenguinXValue = 0;

const maxPenguinYValue = height;
const minPenguinYValue = 0;

// CONSTANTS FOR FROST AND TEXTURE
const numberOfFrostPatches = 30;
const frostPatchRadius = 2;

// POSITION & SCALE FOR ICEBERGS
const icebergMinScale = 5;
const icebergMaxScale = 15;
const icebergDistanceY = height - 30;


// SCALE
const maxPenguinScale = 15;
const minPenguinScale = 5;

const iceColor = "#B0E0E6"; // Base ice color
const iceHighlightColor = "#E0FFFF"; // Ice highlights for depth
const iceShadowColor = "#A9CCE3"; // Add shadows to give more depth
const scarfColor = "#FF6347";
setDocDimensions(width, height);

const MAX_ROTATION_ANGLE = Math.PI / 6; // 30 degrees


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

// DRAW TEXTURE (FROST PATCHES)
function drawFrostTexture() {
    for (let i = 0; i < numberOfFrostPatches; i++) {
        const x = randInt(0, width);
        const y = randInt(0, height);
        const radius = randInRange(0.5, frostPatchRadius);
        drawCircle([x, y], radius, { stroke: 'rgba(255, 255, 255, 0.1 + Math.random() * 0.3)', width: 1 }); // Variation in opacity
    }
}

// DRAW ICEBERGS IN THE BACKGROUND
function drawIcebergs() {
    const numberOfIcebergs = randInt(2, 5);
    for (let i = 0; i < numberOfIcebergs; i++) {
        const scale = randInRange(icebergMinScale, icebergMaxScale);
        const x = randInt(10, width - 10);
        const icebergPoints = [
            [x, icebergDistanceY],
            [x - scale / 2, icebergDistanceY + scale / 3],
            [x + scale / 2, icebergDistanceY + scale / 3],
            [x, icebergDistanceY]
        ];
        drawPolygon(icebergPoints, { stroke: 'rgba(255, 255, 255, 0.3)', width: 1 });
        fillPolygon(icebergPoints, 'rgba(255, 255, 255, 0.3)');
    }
}


// Function to rotate a list of points by a given angle around a center point
function rotatePoints(points, center, angle) {
    return points.map(point => rotatePoint(point, center, angle));
}

function DrawPenguin(center, scale, rotation, addScarf = false) {
    const centerX = center[0];
    const centerY = center[1];

    penguins.push({ center, scale, rotation }); // Store rotation

    // Penguin Body Shape
    const bodyWidth = scale * 0.8;
    const bodyHeight = scale * 1.5;
    let bodyPoints = [
        [centerX, centerY - bodyHeight / 2],  // top of the body
        [centerX - bodyWidth / 2, centerY + bodyHeight / 2], // bottom left
        [centerX + bodyWidth / 2, centerY + bodyHeight / 2], // bottom right
        [centerX, centerY - bodyHeight / 2]  // close the shape
    ];
    bodyPoints = rotatePoints(bodyPoints, center, rotation); // Rotate body points

    // Belly
    const bellyWidth = bodyWidth * 0.7;
    const bellyHeight = bodyHeight * 0.7;
    let bellyPoints = [
        [centerX, centerY - bellyHeight / 2],
        [centerX - bellyWidth / 2, centerY + bellyHeight / 2],
        [centerX + bellyWidth / 2, centerY + bellyHeight / 2],
        [centerX, centerY - bellyHeight / 2]
    ];
    bellyPoints = rotatePoints(bellyPoints, center, rotation); // Rotate belly points

    // Flippers
    const flipperLength = scale * 0.6;
    const flipperWidth = scale * 0.15;
    let leftFlipperPoints = [
        [centerX - bodyWidth / 2, centerY - bodyHeight / 4],
        [centerX - bodyWidth / 2 - flipperWidth, centerY - bodyHeight / 4 + flipperLength],
        [centerX - bodyWidth / 2, centerY - bodyHeight / 4 + flipperLength]
    ];
    let rightFlipperPoints = [
        [centerX + bodyWidth / 2, centerY - bodyHeight / 4],
        [centerX + bodyWidth / 2 + flipperWidth, centerY - bodyHeight / 4 + flipperLength],
        [centerX + bodyWidth / 2, centerY - bodyHeight / 4 + flipperLength]
    ];
    leftFlipperPoints = rotatePoints(leftFlipperPoints, center, rotation); // Rotate left flipper points
    rightFlipperPoints = rotatePoints(rightFlipperPoints, center, rotation); // Rotate right flipper points

    // Head
    const headRadius = scale * 0.4;
    let headCenter = [centerX, centerY - bodyHeight / 2 - headRadius * 0.6];
    headCenter = rotatePoint(headCenter, center, rotation); // Rotate head center

    // Beak
    const beakLength = headRadius * 0.6;
    let beakPoints = [
        [centerX, headCenter[1] - headRadius / 2],
        [centerX - beakLength / 2, headCenter[1] - headRadius / 2 + beakLength],
        [centerX + beakLength / 2, headCenter[1] - headRadius / 2 + beakLength]
    ];
    beakPoints = rotatePoints(beakPoints, headCenter, rotation); // Rotate beak points

    // Eyes
    const eyeRadius = scale * 0.1;
    let leftEyeCenter = [centerX - headRadius / 3, headCenter[1] - headRadius / 3];
    let rightEyeCenter = [centerX + headRadius / 3, headCenter[1] - headRadius / 3];
    leftEyeCenter = rotatePoint(leftEyeCenter, headCenter, rotation); // Rotate left eye center
    rightEyeCenter = rotatePoint(rightEyeCenter, headCenter, rotation); // Rotate right eye center

    // Draw Penguin parts with rotation applied
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
    drawCircle(headCenter, headRadius, { stroke: 'black', width: 1 });
    fillPolygon([[centerX, headCenter[1]], [centerX - headRadius / 2, headCenter[1]], [centerX + headRadius / 2, headCenter[1]]], 'black');  // Filling head

    // Eyes
    drawCircle(leftEyeCenter, eyeRadius, { stroke: 'black', width: 1 });
    drawCircle(leftEyeCenter, eyeRadius / 2, { stroke: 'black', width: 1, fill: 'black' });
    drawCircle(rightEyeCenter, eyeRadius, { stroke: 'black', width: 1 });
    drawCircle(rightEyeCenter, eyeRadius / 2, { stroke: 'black', width: 1, fill: 'black' });

    // Draw a white dot on the circle the penguin is on
    const dotRadius = scale * 0.1; // Adjust the dot size as needed
    drawCircle(center, dotRadius, { stroke: 'white', fill: 'white' }); // Draw white dot at center

    // Add snow dots to the body
    const numSnowDots = randInt(5, 15); // Random number of snow dots
    for (let i = 0; i < numSnowDots; i++) {
        const dotX = randInt(centerX - bodyWidth / 2, centerX + bodyWidth / 2);
        const dotY = randInt(centerY - bodyHeight / 2, centerY + bodyHeight / 2);
        drawCircle([dotX, dotY], 1, { stroke: 'white', fill: 'white' }); // Small white circle for snow
    }

    // Add scarf if true
    if (addScarf) {
        let scarfPoints = [
            [centerX - bodyWidth / 2, centerY - bodyHeight / 4],
            [centerX + bodyWidth / 2, centerY - bodyHeight / 4],
            [centerX + bodyWidth / 2, centerY - bodyHeight / 5],
            [centerX - bodyWidth / 2, centerY - bodyHeight / 5]
        ];
        scarfPoints = rotatePoints(scarfPoints, center, rotation); // Rotate scarf
        drawPolygon(scarfPoints, { stroke: scarfColor, width: 1 });
        fillPolygon(scarfPoints, scarfColor);
    }
}


function drawPenguinShadow(penguin) {
    const { center, scale } = penguin;
    const shadowScale = scale * 1.2;
    const shadowCenter = [center[0], center[1] + scale / 2];
    drawCircle(shadowCenter, shadowScale, { stroke: 'rgba(0, 0, 0, 0.2)', width: 1, fill: 'rgba(0, 0, 0, 0.2)' });
}

// DRAW A FISH UNDER THE ICE
function drawFishUnderIce() {
    const fishX = randInt(10, width - 10);
    const fishY = randInt(height / 2, height - 10);
    const fishBody = [
        [fishX, fishY],
        [fishX - 5, fishY + 2],
        [fishX - 5, fishY - 2],
        [fishX, fishY]
    ];
    drawPolygon(fishBody, { stroke: 'blue', width: 1 });
    fillPolygon(fishBody, 'blue');
    drawLines([[[fishX, fishY], [fishX + 5, fishY]]], { stroke: 'blue', width: 1 });
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
    let rotation = randInRange(-MAX_ROTATION_ANGLE, MAX_ROTATION_ANGLE); // Random rotation within the constraint
    do {
        const x = randInRange(minPenguinXValue + 20, maxPenguinXValue - 20);
        const y = randInRange(minPenguinYValue + 20, maxPenguinYValue - 20);
        const scale = randInRange(10, 18);
        newPenguin = { center: [x, y], scale: scale, rotation: rotation }; // Add constrained rotation to penguin
        attempts++;
    } while (isPenguinOverlapping(newPenguin) && attempts < 100);

    if (attempts < 100) {
        const addScarf = (i === 0); // Add scarf to the first penguin
        DrawPenguin(newPenguin.center, newPenguin.scale, newPenguin.rotation, addScarf); // Pass the rotation
        drawPenguinShadow(newPenguin);
    }
}


drawFishUnderIce(); // Add playful fish under the ice

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

        // Varying crack color and width for depth
        drawLines([points], { stroke: lerpColor(iceHighlightColor, iceShadowColor, Math.random()), width: randInRange(1, 2) });
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
    if (disableColorsAndThickness) {
        for (let y = 0; y < height; y++) {
            drawLines([[[0, y], [width, y]]], { stroke: iceColor, width: 1 });
        }
    } else {
        const gradientSteps = 150;
        for (let i = 0; i < gradientSteps; i++) {
            const colorRatio = i / gradientSteps;
            drawLines([[[0, i * (height / gradientSteps)], [width, i * (height / gradientSteps)]]], {
                stroke: lerpColor(iceColor, iceHighlightColor, colorRatio + Math.random() * 0.1), // Adding noise to the gradient
                width: 1
            });
        }
    }
}

function drawIceShadows() {
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

        // Draw shadow cracks with a darker shade
        drawLines([points], { stroke: iceShadowColor, width: iceCrackWidth });
    }
}


drawFrostTexture(); // Frosty texture for the ice
drawIcebergs(); // Distant icebergs
drawIceCracks(); // Draw ice cracks
drawIceShadowCracks(); // Shadow cracks
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
