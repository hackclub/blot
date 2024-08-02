/*
@title: Car Emblem Generator
@author: Cral_Cactus
@snapshot: 11.png
*/

const width = 450;
const height = 250;
setDocDimensions(width, height);
const radius = 4;
const gap = radius * 1.5;
const margin = 30;
const leftMargin = 30;

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
      [centerX, centerY + 6],
      [centerX + 4, centerY],
      [centerX, centerY - 6],
      [centerX - 4, centerY],
      [centerX, centerY + 6]
    ]
  ]);
  drawLines([
    [
      [centerX, centerY + 10],
      [centerX + 6, centerY],
      [centerX, centerY - 10],
      [centerX - 6, centerY],
      [centerX, centerY + 10]
    ]
  ]);
  drawLines([
    [
      [centerX, centerY - 6],
      [centerX - 1.25, centerY - 8]
    ]
  ]);
  drawLines([
    [
      [centerX, centerY + 6],
      [centerX + 1.25, centerY + 8]
    ]
  ]);
}

function drawRims(centerX, centerY, radius) {
  const numRims = bt.randInRange(5, 20);
  const innerRadius = radius * 0.3;
  const rimLength = radius * 0.7;

  drawCircle(centerX, centerY, innerRadius, innerRadius);

  for (let i = 0; i < numRims; i++) {
    const angle = (2 * Math.PI / numRims) * i;
    const x1 = centerX + innerRadius * Math.cos(angle);
    const y1 = centerY + innerRadius * Math.sin(angle);
    const x2 = centerX + (innerRadius + rimLength) * Math.cos(angle);
    const y2 = centerY + (innerRadius + rimLength) * Math.sin(angle);
    
    drawLines([[[x1, y1], [x2, y2]]]);
  }
}

const carWidth = bt.randInRange(110, 130);
const carHeight = bt.randInRange(35, 45);
const maxRoofHeight = 30;

function drawAdvancedCar(centerX, centerY) {
  const roofHeight = bt.randInRange(20, 30);
  const roofWidth = bt.randInRange(70, carWidth / 1.5);
  const wheelSize = bt.randInRange(8, 11);

  const drawSpoiler = Math.random() < 0.5;

  const spoilerSize = bt.randInRange(5, 20);
  const spoilerAngle = bt.randInRange(10, 45);

  const frontWheelX = centerX - carWidth / 2 + 2 * wheelSize;
  const rearWheelX = centerX + carWidth / 2 - 2 * wheelSize;
  const wheelY = centerY - wheelSize / 6;

  let carBodyFront = [
    [centerX - carWidth / 2, centerY],
    [frontWheelX - wheelSize, centerY]
  ];

  let carBodyMiddle = [
    [frontWheelX + wheelSize, centerY],
    [rearWheelX - wheelSize, centerY]
  ];

  let carBodyRear = [
    [rearWheelX + wheelSize, centerY],
    [centerX + carWidth / 2 - 1, centerY],
    [centerX + carWidth / 2, centerY - 8],
    [centerX + carWidth / 2 - 10, centerY - 8],
    [centerX + carWidth / 2 - 3, centerY - 8],
    [centerX + carWidth / 2 - 3, centerY - carHeight],
    [centerX - carWidth / 2 + 3, centerY - carHeight],
    [centerX - carWidth / 2 + 3, centerY - 8],
    [centerX - carWidth / 2 + 8, centerY - 8],
    [centerX - carWidth / 2 - 1, centerY - 8],
    [centerX - carWidth / 2, centerY]
  ];

  let carRoof = [
    [centerX - roofWidth / 2, centerY - carHeight],
    [centerX + roofWidth / 2, centerY - carHeight],
    [centerX + roofWidth / 2 - 20, centerY - carHeight - roofHeight],
    [centerX - roofWidth / 2 + 10, centerY - carHeight - roofHeight],
    [centerX - roofWidth / 2, centerY - carHeight]
  ];

  let doorLine = [
    [centerX - roofWidth / 2 + 50, centerY - carHeight - roofHeight],
    [centerX - roofWidth / 2 + 50, centerY]
  ];

  let frontLine = [
    [centerX - roofWidth / 2 + 10, centerY - carHeight],
    [centerX - roofWidth / 2 + 10, centerY]
  ];

  let spoiler = [
    [centerX + carWidth / 2 - 3, centerY - carHeight],
    [centerX + carWidth / 2 + spoilerSize * Math.cos(spoilerAngle * Math.PI / 180), centerY - carHeight - spoilerSize * Math.sin(spoilerAngle * Math.PI / 180)],
    [centerX + carWidth / 2 + spoilerSize * Math.cos(spoilerAngle * Math.PI / 180), centerY - carHeight],
    [centerX + carWidth / 2 - 3, centerY - carHeight]
  ];

  carBodyFront = bt.rotate([carBodyFront], 180, [centerX, centerY]);
  carBodyMiddle = bt.rotate([carBodyMiddle], 180, [centerX, centerY]);
  carBodyRear = bt.rotate([carBodyRear], 180, [centerX, centerY]);
  carRoof = bt.rotate([carRoof], 180, [centerX, centerY]);
  doorLine = bt.rotate([doorLine], 180, [centerX, centerY]);
  frontLine = bt.rotate([frontLine], 180, [centerX, centerY]);
  spoiler = bt.rotate([spoiler], 180, [centerX, centerY]);

  drawLines(carBodyFront);
  drawLines(carBodyMiddle);
  drawLines(carBodyRear);
  drawLines(carRoof);
  drawLines(doorLine);
  drawLines(frontLine);

  if (drawSpoiler) {
    drawLines(spoiler);
  }

  drawCircle(frontWheelX, wheelY, wheelSize, wheelSize);
  drawCircle(rearWheelX, wheelY, wheelSize, wheelSize);

  drawRims(frontWheelX, wheelY, wheelSize);
  drawRims(rearWheelX, wheelY, wheelSize);
}

const emblems = [
  { draw: drawAudiEmblem, width: gap * 3, height: radius * 2 },
  { draw: drawToyotaEmblem, width: radius * 4.4, height: radius * 3 },
  { draw: drawRenaultEmblem, width: 24, height: 40 }
];

const minGap = 40;

function getRandomPosition(objectWidth, objectHeight) {
  const x = bt.randInRange(margin + objectWidth / 2, (width / 2) - leftMargin - objectWidth / 2);
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
  selectedEmblem.draw(carPosition.x + (carWidth / 2.75), carPosition.y + 25);
}
