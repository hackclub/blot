/*
@title: Random Flag Generator
@author: appleflyer
@snapshot: snapshot0
*/

// set alwaysRandom to true to always set random seeds
// this will ignore the variable fixedSeed

// set alwaysRandom to false to use the variable fixedSeed
const alwaysRandom = true;

const fixedSeed = 12345;

if (alwaysRandom) {
  const randomSeed = Math.floor(Math.random() * 1000000);
  bt.setRandSeed(randomSeed);
  // added for debugging just ignore
  console.log(`Using random seed: ${randomSeed}`);
} else {
  bt.setRandSeed(fixedSeed);
  console.log(`Using fixed seed: ${fixedSeed}`);
}

const flagWidth = 100;
const flagHeight = 60;

setDocDimensions(flagWidth, flagHeight);

function randomColor() {
  return `rgb(${bt.randIntInRange(0, 255)}, ${bt.randIntInRange(0, 255)}, ${bt.randIntInRange(0, 255)})`;
}

function clipShape(shape) {
  return shape.map(point => [
    Math.max(0, Math.min(point[0], flagWidth)),
    Math.max(0, Math.min(point[1], flagHeight))
  ]);
}

function createHorizontalStripes(numStripes) {
  const stripes = [];
  const stripeHeight = flagHeight / numStripes;
  for (let i = 0; i < numStripes; i++) {
    stripes.push(clipShape([[0, i * stripeHeight], [flagWidth, i * stripeHeight], [flagWidth, (i + 1) * stripeHeight], [0, (i + 1) * stripeHeight], [0, i * stripeHeight]]));
  }
  return stripes;
}

function createVerticalStripes(numStripes) {
  const stripes = [];
  const stripeWidth = flagWidth / numStripes;
  for (let i = 0; i < numStripes; i++) {
    stripes.push(clipShape([[i * stripeWidth, 0], [(i + 1) * stripeWidth, 0], [(i + 1) * stripeWidth, flagHeight], [i * stripeWidth, flagHeight], [i * stripeWidth, 0]]));
  }
  return stripes;
}

function createDiagonalStripes(numStripes, angle = 45) {
  const stripes = [];
  const stripeWidth = (flagWidth + flagHeight) / numStripes;
  const radians = angle * Math.PI / 180;
  const cosAngle = Math.cos(radians);
  const sinAngle = Math.sin(radians);

  for (let i = -numStripes; i < numStripes; i++) {
    const x1 = i * stripeWidth * cosAngle;
    const y1 = i * stripeWidth * sinAngle;
    const x2 = x1 + flagHeight * sinAngle;
    const y2 = y1 - flagHeight * cosAngle;
    const x3 = x2 + flagWidth * cosAngle;
    const y3 = y2 + flagWidth * sinAngle;
    const x4 = x3 - flagHeight * sinAngle;
    const y4 = y3 + flagHeight * cosAngle;

    stripes.push(clipShape([[x1, y1], [x2, y2], [x3, y3], [x4, y4]]));
  }

  return stripes;
}

function createStar(cx, cy, outerRadius, innerRadius, numPoints) {
  const star = [];
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + radius * Math.sin(angle);
    const y = cy + radius * Math.cos(angle);
    star.push([x, y]);
  }
  star.push(star[0]);
  return [clipShape(star)];
}

function createCircle(cx, cy, radius, numPoints = 100) {
  const circle = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    circle.push([x, y]);
  }
  return [clipShape(circle)];
}

function createCrescent(cx, cy, outerRadius, innerRadius) {
  const outerCircle = createCircle(cx, cy, outerRadius)[0];
  const innerCircle = createCircle(cx + (outerRadius - innerRadius) / 2, cy, innerRadius)[0];
  return [clipShape(outerCircle), clipShape(innerCircle)];
}

function createTriangle(x1, y1, x2, y2, x3, y3) {
  return [clipShape([[x1, y1], [x2, y2], [x3, y3], [x1, y1]])];
}

function createCross(cx, cy, width, height, thickness) {
  const halfThickness = thickness / 2;
  return [
    clipShape([[cx - width/2, cy - halfThickness], [cx + width/2, cy - halfThickness], [cx + width/2, cy + halfThickness], [cx - width/2, cy + halfThickness], [cx - width/2, cy - halfThickness]]),
    clipShape([[cx - halfThickness, cy - height/2], [cx + halfThickness, cy - height/2], [cx + halfThickness, cy + height/2], [cx - halfThickness, cy + height/2], [cx - halfThickness, cy - height/2]])
  ];
}

function createSaltire(width, height, thickness) {
  const diagonalLength = Math.sqrt(width * width + height * height);
  const halfThickness = thickness / 2;
  const angle = Math.atan2(height, width);

  return [
    clipShape(bt.rotate([[[-diagonalLength/2, -halfThickness], [diagonalLength/2, -halfThickness], [diagonalLength/2, halfThickness], [-diagonalLength/2, halfThickness], [-diagonalLength/2, -halfThickness]]], angle * 180 / Math.PI, [width/2, height/2])),
    clipShape(bt.rotate([[[-diagonalLength/2, -halfThickness], [diagonalLength/2, -halfThickness], [diagonalLength/2, halfThickness], [-diagonalLength/2, halfThickness], [-diagonalLength/2, -halfThickness]]], -angle * 180 / Math.PI, [width/2, height/2]))
  ];
}

function createSun(cx, cy, outerRadius, innerRadius, numRays) {
  const sun = createCircle(cx, cy, innerRadius)[0];
  const rayAngle = (2 * Math.PI) / numRays;

  for (let i = 0; i < numRays; i++) {
    const angle = i * rayAngle;
    const x1 = cx + innerRadius * Math.cos(angle);
    const y1 = cy + innerRadius * Math.sin(angle);
    const x2 = cx + outerRadius * Math.cos(angle);
    const y2 = cy + outerRadius * Math.sin(angle);
    sun.push([x1, y1]);
    sun.push([x2, y2]);
  }

  sun.push(sun[0]);
  return [clipShape(sun)];
}

function generateRandomFlag() {
  const designType = bt.randIntInRange(1, 10);
  let flagElements = [];
  let emblemElements = [];

  // many designs :money_face:
  switch (designType) {
    case 1:
      flagElements = createHorizontalStripes(bt.randIntInRange(2, 5));
      emblemElements = createRandomEmblem();
      break;
    case 2:
      flagElements = createVerticalStripes(bt.randIntInRange(2, 5));
      emblemElements = createRandomEmblem();
      break;
    case 3:
      flagElements = createDiagonalStripes(bt.randIntInRange(3, 7), bt.randInRange(30, 60));
      break;
    case 4:
      flagElements = [
        clipShape([[0, 0], [flagWidth, 0], [flagWidth, flagHeight], [0, flagHeight], [0, 0]]),
        clipShape([[0, 0], [flagWidth, flagHeight], [0, flagHeight], [0, 0]]),
        clipShape([[0, 0], [flagWidth, 0], [flagWidth, flagHeight], [0, 0]])
      ];
      break;
    case 5:
      flagElements = [
        clipShape([[0, 0], [flagWidth / 2, 0], [flagWidth / 2, flagHeight / 2], [0, flagHeight / 2], [0, 0]]),
        clipShape([[flagWidth / 2, 0], [flagWidth, 0], [flagWidth, flagHeight / 2], [flagWidth / 2, flagHeight / 2], [flagWidth / 2, 0]]),
        clipShape([[0, flagHeight / 2], [flagWidth / 2, flagHeight / 2], [flagWidth / 2, flagHeight], [0, flagHeight], [0, flagHeight / 2]]),
        clipShape([[flagWidth / 2, flagHeight / 2], [flagWidth, flagHeight / 2], [flagWidth, flagHeight], [flagWidth / 2, flagHeight], [flagWidth / 2, flagHeight / 2]])
      ];
      emblemElements = createRandomEmblem();
      break;
    case 6:
      flagElements = [clipShape([[0, 0], [flagWidth, 0], [flagWidth, flagHeight], [0, flagHeight], [0, 0]])];
      flagElements.push(...createCross(flagWidth * 0.3, flagHeight / 2, flagWidth, flagHeight, flagHeight * 0.2));
      break;
    case 7:
      flagElements = [clipShape([[0, 0], [flagWidth, 0], [flagWidth, flagHeight], [0, flagHeight], [0, 0]])];
      flagElements.push(...createSaltire(flagWidth, flagHeight, flagHeight * 0.15));
      break;
    case 8:
      flagElements = [clipShape([[0, 0], [flagWidth, 0], [flagWidth, flagHeight], [0, flagHeight], [0, 0]])];
      emblemElements = createComplexEmblem();
      break;
    case 9:
      flagElements = createHorizontalStripes(3);
      emblemElements = createRandomEmblem();
      break;
    case 10:
      flagElements = [
        clipShape([[0, 0], [flagWidth / 2, flagHeight / 2], [0, flagHeight], [0, 0]]),
        clipShape([[flagWidth, 0], [flagWidth / 2, flagHeight / 2], [flagWidth, flagHeight], [flagWidth, 0]]),
        clipShape([[0, 0], [flagWidth, 0], [flagWidth / 2, flagHeight / 2], [0, 0]])
      ];
      break;
  }

  flagElements.forEach(element => {
    drawLines([element], { fill: randomColor(), stroke: 'black', width: 0.5 });
  });

  emblemElements.forEach(element => {
    drawLines([element], { fill: randomColor(), stroke: 'black', width: 0.5 });
  });
}

function createRandomEmblem() {
  const emblemType = bt.randIntInRange(1, 5);
  switch (emblemType) {
    case 1:
      return createStar(flagWidth / 2, flagHeight / 2, flagHeight * 0.3, flagHeight * 0.15, bt.randIntInRange(5, 8));
    case 2:
      return createCircle(flagWidth / 2, flagHeight / 2, flagHeight * 0.25);
    case 3:
      return createCrescent(flagWidth / 2, flagHeight / 2, flagHeight * 0.3, flagHeight * 0.2);
    case 4:
      return createSun(flagWidth / 2, flagHeight / 2, flagHeight * 0.3, flagHeight * 0.2, bt.randIntInRange(8, 16));
    case 5:
      return createTriangle(flagWidth / 2, flagHeight * 0.2, flagWidth * 0.3, flagHeight * 0.8, flagWidth * 0.7, flagHeight * 0.8);
  }
}

function createComplexEmblem() {
  const numElements = bt.randIntInRange(2, 4);
  let elements = [];

  for (let i = 0; i < numElements; i++) {
    const elementType = bt.randIntInRange(1, 5);
    const scale = 0.6 - i * 0.1; // for every nested element, decrease size
    
    switch (elementType) {
      case 1:
        elements.push(...createStar(flagWidth / 2, flagHeight / 2, flagHeight * 0.3 * scale, flagHeight * 0.15 * scale, bt.randIntInRange(5, 8)));
        break;
      case 2:
        elements.push(...createCircle(flagWidth / 2, flagHeight / 2, flagHeight * 0.25 * scale));
        break;
      case 3:
        elements.push(...createCrescent(flagWidth / 2, flagHeight / 2, flagHeight * 0.3 * scale, flagHeight * 0.2 * scale));
        break;
      case 4:
        elements.push(...createSun(flagWidth / 2, flagHeight / 2, flagHeight * 0.3 * scale, flagHeight * 0.2 * scale, bt.randIntInRange(8, 16)));
        break;
      case 5:
        elements.push(...createTriangle(flagWidth / 2, flagHeight * (0.5 - 0.3 * scale), 
                                        flagWidth * (0.5 - 0.2 * scale), flagHeight * (0.5 + 0.3 * scale), 
                                        flagWidth * (0.5 + 0.2 * scale), flagHeight * (0.5 + 0.3 * scale)));
        break;
    }
  }

  return elements;
}

generateRandomFlag();