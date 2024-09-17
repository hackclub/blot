/*
@title: Astral Pathways
@author: aidanq06
@snapshot: astralpathways.png
*/

const { randInRange, randIntInRange, catmullRom } = blotToolkit;

const width = 125;
const height = 125;
setDocDimensions(width, height);

// adjustable stuff
const numSpiralArms = randIntInRange(2, 6);
const spiralTightness = randInRange(0.1, 0.2);
const bulgeSize = randInRange(12, 15);
const numStars = randIntInRange(150, 250);
const numDustClouds = randIntInRange(5, 10);
const numClusters = randInRange(4, 10);
const centraldodecagonSize = randInRange(8, 10);
const exclusionRadius = centraldodecagonSize + 5;

const finalLines = [];

function drawGalaxyArm(centerX, centerY, startAngle, length, rotationOffset) {
  const arm = [];
  let angle = startAngle;
  let radius = bulgeSize;
  let prevX, prevY;

  for (let i = 0; i < length; i++) {
    const x = centerX + radius * Math.cos(angle + rotationOffset);
    const y = centerY + radius * Math.sin(angle + rotationOffset);
    
    if (i > 0) {
      arm.push([[prevX, prevY], [x, y]]);
    }
    
    prevX = x;
    prevY = y;
    radius += 0.5;
    angle += spiralTightness;
  }

  return arm;
}

function drawPolygon(x, y, sides, size) {
  const polygon = [];
  for (let i = 0; i < sides; i++) {
    const angle1 = (i * (360 / sides)) * (Math.PI / 180);
    const angle2 = ((i + 1) * (360 / sides)) * (Math.PI / 180);
    
    const x1 = x + size * Math.cos(angle1);
    const y1 = y + size * Math.sin(angle1);
    const x2 = x + size * Math.cos(angle2);
    const y2 = y + size * Math.sin(angle2);
    
    polygon.push([[x1, y1], [x2, y2]]);
  }

  return polygon;
}

function drawCircle(x, y, size) {
  const circle = [];
  const steps = 20;
  for (let i = 0; i < steps; i++) {
    const angle1 = (i / steps) * Math.PI * 2;
    const angle2 = ((i + 1) / steps) * Math.PI * 2;
    
    const x1 = x + size * Math.cos(angle1);
    const y1 = y + size * Math.sin(angle1);
    const x2 = x + size * Math.cos(angle2);
    const y2 = y + size * Math.sin(angle2);
    
    circle.push([[x1, y1], [x2, y2]]);
  }

  return circle;
}

function drawRotatedStar(x, y, size) {
  const star = [];
  const angles = [0, 72, 144, 216, 288];
  const randomRotation = randInRange(0, Math.PI * 2);

  for (let i = 0; i < 5; i++) {
    const angle1 = angles[i] * (Math.PI / 180) + randomRotation;
    const angle2 = angles[(i + 1) % 5] * (Math.PI / 180) + randomRotation;
    
    const x1 = x + size * Math.cos(angle1);
    const y1 = y + size * Math.sin(angle1);
    const x2 = x + size * Math.cos(angle2);
    const y2 = y + size * Math.sin(angle2);
    
    star.push([[x1, y1], [x2, y2]]);
  }

  return star;
}

function drawRandomShape(x, y, size) {
  const shapeType = randIntInRange(1, 5);
  switch (shapeType) {
    case 1: 
      return drawPolygon(x, y, 3, size); // Triangle
    case 2: 
      return drawPolygon(x, y, 6, size); // Hexagon
    case 3: 
      return drawCircle(x, y, size); // Circle
    case 4: 
      return drawPolygon(x, y, 5, size); // Pentagon
    case 5: 
      return drawRotatedStar(x, y, size); // Star
  }
}

const centerX = width / 2;
const centerY = height / 2;
finalLines.push(...drawPolygon(centerX, centerY, 12, centraldodecagonSize));

for (let i = 0; i < numStars; i++) {
  let x, y, distanceFromCenter;

  do {
    x = randInRange(0, width);
    y = randInRange(0, height);
    distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  } while (distanceFromCenter <= exclusionRadius);

  const size = randInRange(0.6, 1.7);
  finalLines.push(...drawRandomShape(x, y, size));
}

for (let i = 0; i < numSpiralArms; i++) {
  const startAngle = (i / numSpiralArms) * Math.PI * 2;
  const rotationOffset = randInRange(-0.1, 0.1);
  finalLines.push(...drawGalaxyArm(centerX, centerY, startAngle, 100, rotationOffset));
}

drawLines(finalLines);
