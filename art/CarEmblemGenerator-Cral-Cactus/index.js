/*
@title: Car Emblem Generator
@author: Cral_Cactus
@snapshot: 1.png
*/

const width = 450;
const height = 250;
setDocDimensions(width, height);
const radius = 10;
const gap = radius * 1.5;
const margin = 30;

function drawCircle(centerX, centerY, radiusX, radiusY) {
  const points = [];
  const numSegments = 100;
  for (let i = 0; i <= numSegments; i++) {
    const angle = (2 * Math.PI / numSegments) * i;
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);
    points.push([x, y]);
  }
  drawLines([points]);
}

function drawAudiEmblem(centerX, centerY) {
  for (let i = 0; i < 4; i++) {
    drawCircle(centerX + i * gap - (1.5 * gap), centerY, radius, radius);
  }
}

function drawToyotaEmblem(centerX, centerY) {
  drawCircle(centerX, centerY, radius * 2.2, radius * 1.5);
  drawCircle(centerX, centerY - 1, radius * 0.6, radius * 1.4);
  drawCircle(centerX, centerY + radius / 1.143, radius * 1.4, radius / 1.6);
}

function drawRenaultEmblem(centerX, centerY) {
  drawLines([
    [
      [centerX, centerY + 12],
      [centerX + 8, centerY],
      [centerX, centerY - 12],
      [centerX - 8, centerY],
      [centerX, centerY + 12]
    ]
  ]);
  drawLines([
    [
      [centerX, centerY + 20],
      [centerX + 12, centerY],
      [centerX, centerY - 20],
      [centerX - 12, centerY],
      [centerX, centerY + 20]
    ]
  ]);
  drawLines([
    [
      [centerX, centerY - 12],
      [centerX - 2.5, centerY - 16]
    ]
  ]);
  drawLines([
    [
      [centerX, centerY + 12],
      [centerX + 2.5, centerY + 16]
    ]
  ]);
}

const carWidth = bt.randInRange(120, 180);
const carHeight = bt.randInRange(55, 70);
const maxRoofHeight = 30;

function drawAdvancedCar(centerX, centerY) {
  const roofHeight = bt.randInRange(15, 30);
  const roofWidth = bt.randInRange(50, carWidth / 1.5);
  const wheelSize = bt.randInRange(8, 15);

  const drawSpoiler = Math.random() < 0.5;

  const spoilerSize = bt.randInRange(10, 40);
  const spoilerAngle = bt.randInRange(10, 45);

  let carBody = [
    [centerX - carWidth / 2, centerY],
    [centerX - carWidth / 2 + wheelSize, centerY],
    [centerX - carWidth / 2 + wheelSize, centerY - wheelSize],
    [centerX - carWidth / 2 + 3 * wheelSize, centerY - wheelSize],
    [centerX - carWidth / 2 + 3 * wheelSize, centerY],
    [centerX + carWidth / 2 - 3 * wheelSize, centerY],
    [centerX + carWidth / 2 - 3 * wheelSize, centerY - wheelSize],
    [centerX + carWidth / 2 - wheelSize, centerY - wheelSize],
    [centerX + carWidth / 2 - wheelSize, centerY],
    [centerX + carWidth / 2, centerY],
    [centerX + carWidth / 2, centerY - carHeight],
    [centerX - carWidth / 2, centerY - carHeight],
    [centerX - carWidth / 2, centerY]
  ];

  let carRoof = [
    [centerX - roofWidth / 2, centerY - carHeight],
    [centerX + roofWidth / 2, centerY - carHeight],
    [centerX + roofWidth / 2 - 5, centerY - carHeight - roofHeight],
    [centerX - roofWidth / 2 + 5, centerY - carHeight - roofHeight],
    [centerX - roofWidth / 2, centerY - carHeight]
  ];

  let carWindows = [
    [centerX - roofWidth / 2 + 5, centerY - carHeight],
    [centerX + roofWidth / 2 - 5, centerY - carHeight],
    [centerX + roofWidth / 2 - 8, centerY - carHeight - roofHeight + 3],
    [centerX - roofWidth / 2 + 8, centerY - carHeight - roofHeight + 3],
    [centerX - roofWidth / 2 + 5, centerY - carHeight]
  ];

  let spoiler = [
    [centerX + carWidth / 2, centerY - carHeight],
    [centerX + carWidth / 2 + spoilerSize * Math.cos(spoilerAngle * Math.PI / 180), centerY - carHeight - spoilerSize * Math.sin(spoilerAngle * Math.PI / 180)],
    [centerX + carWidth / 2 + spoilerSize * Math.cos(spoilerAngle * Math.PI / 180), centerY - carHeight],
    [centerX + carWidth / 2, centerY - carHeight]
  ];

  carBody = bt.rotate([carBody], 180, [centerX, centerY]);
  carRoof = bt.rotate([carRoof], 180, [centerX, centerY]);
  carWindows = bt.rotate([carWindows], 180, [centerX, centerY]);
  spoiler = bt.rotate([spoiler], 180, [centerX, centerY]);

  drawLines(carBody);
  drawLines(carRoof);
  drawLines(carWindows);

  if (drawSpoiler) {
    drawLines(spoiler);
  }

  const wheelYOffset = wheelSize / 2;
  const frontWheelX = centerX - carWidth / 2 + 2 * wheelSize;
  const rearWheelX = centerX + carWidth / 2 - 2 * wheelSize;
  const wheelY = centerY - wheelYOffset;

  drawCircle(frontWheelX, wheelY, wheelSize, wheelSize);
  drawCircle(rearWheelX, wheelY, wheelSize, wheelSize);

  const suspensionCoils = 5;

  function drawSpring(centerX, centerY, height, coils, spacing, reverse) {
    const points = [];
    for (let i = 0; i <= coils; i++) {
      const y = centerY - i * spacing;
      const xOffset = (i % 2 === 0) ? (reverse ? 3 : -3) : (reverse ? -3 : 3);
      points.push([centerX + xOffset, y]);
    }
    drawLines([points]);
  }

  const cutoutHeight = wheelSize;
  const springHeight = cutoutHeight * 0.5;
  const springSpacing = springHeight / suspensionCoils;

  const springOffsetX = wheelSize / 2;
  const springOffsetY = wheelSize * 0.5;

  drawSpring(frontWheelX - springOffsetX, wheelY + wheelSize + springOffsetY, springHeight, suspensionCoils, springSpacing, false);
  drawSpring(frontWheelX + springOffsetX, wheelY + wheelSize + springOffsetY, springHeight, suspensionCoils, springSpacing, true);
  drawSpring(rearWheelX - springOffsetX, wheelY + wheelSize + springOffsetY, springHeight, suspensionCoils, springSpacing, false);
  drawSpring(rearWheelX + springOffsetX, wheelY + wheelSize + springOffsetY, springHeight, suspensionCoils, springSpacing, true);
}


const emblems = [
  { draw: drawAudiEmblem, width: gap * 3, height: radius * 2 },
  { draw: drawToyotaEmblem, width: radius * 4.4, height: radius * 3 },
  { draw: drawRenaultEmblem, width: 24, height: 40 }
];

const minGap = 40;

function getRandomPosition(objectWidth, objectHeight) {
  const x = bt.randInRange(margin + objectWidth / 2, width - margin - objectWidth / 2);
  const y = bt.randInRange(margin + objectHeight / 2, height - margin - objectHeight / 2 - maxRoofHeight);
  return { x, y };
}

function isOverlap(pos1, size1, pos2, size2, gap) {
  return Math.abs(pos1.x - pos2.x) < (size1.width + size2.width) / 2 + gap &&
    Math.abs(pos1.y - pos2.y) < (size1.height + size2.height) / 2 + gap;
}

const randomIndex = Math.floor(Math.random() * emblems.length);
const selectedEmblem = emblems[randomIndex];

let emblemPosition, carPosition;
let attempts = 0;
const maxAttempts = 1000;

do {
  emblemPosition = getRandomPosition(selectedEmblem.width, selectedEmblem.height);
  carPosition = getRandomPosition(carWidth, carHeight);
  attempts++;
} while (isOverlap(emblemPosition, { width: selectedEmblem.width, height: selectedEmblem.height }, carPosition, { width: carWidth, height: carHeight }, minGap) && attempts < maxAttempts);

if (attempts < maxAttempts) {
  drawAdvancedCar(carPosition.x, carPosition.y);
  selectedEmblem.draw(carPosition.x, carPosition.y + 30);
}