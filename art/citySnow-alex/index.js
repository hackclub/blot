/*
@title: City at Night - Snowflakes Edition
@author: alexdevz
@snapshot: snowflake-city
*/

// editable so anyone can change the number of buildings, building width, building height, snowflake count, etc.
const buildingCount = 7;
const minBuildingWidth = 10;
const maxBuildingWidth = 20;
const minBuildingHeight = 20;
const maxBuildingHeight = 100;
const buildingColors = ['gray', 'darkgray', 'lightgray'];
const windowColor = 'yellow';
const windowSize = 2;
const windowMargin = 1;
const moonRadius = 10;
const moonColor = 'white';
const snowflakeCount = 100;
const snowflakeColor = 'white';
const snowflakeSize = 0.5;
const skyColor = 'black';

setDocDimensions(125, 125);

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomColor() {
  const index = Math.floor(Math.random() * buildingColors.length);
  return buildingColors[index];
}

function sky() {
  const bottomLeft = [0, 0];
  const topLeft = [0, 125];
  const topRight = [125, 125];
  const bottomRight = [125, 0];
  return [bottomLeft, topLeft, topRight, bottomRight, bottomLeft];
}

const skyPoints = sky();
drawLines([skyPoints], { fill: skyColor });

//buildings and windows
function building(x, width, height) {
  const bottomLeft = [x, 0];
  const bottomRight = [x + width, 0];
  const topLeft = [x, height];
  const topRight = [x + width, height];
  return [bottomLeft, topLeft, topRight, bottomRight, bottomLeft];
}

function generateWindows(x, width, height) {
  const buildingWindows = [];
  for (let i = x + windowSize + windowMargin; i + windowSize + windowMargin <= x + width; i += windowSize * 2 + windowMargin * 2) {
    for (let j = windowSize + windowMargin; j + windowSize + windowMargin <= height; j += windowSize * 2 + windowMargin * 2) {
      const singleWindow = [
        [i, j],
        [i + windowSize, j],
        [i + windowSize, j + windowSize],
        [i, j + windowSize],
        [i, j]
      ];
      buildingWindows.push(singleWindow);
    }
  }
  return buildingWindows;
}

//moon
function moon() {
  const moon = [];
  const centerX = moonRadius;
  const centerY = 125 - moonRadius;
  for (let i = 0; i <= 360; i += 5) {
    const angle = i * Math.PI / 180;
    const x = centerX + moonRadius * Math.cos(angle);
    const y = centerY + moonRadius * Math.sin(angle);
    moon.push([x, y]);
  }
  return moon;
}

drawLines([moon()], { fill: moonColor });

//building pt 2
let x = 0;
for (let i = 0; i < buildingCount; i++) {
  const width = randomInRange(minBuildingWidth, maxBuildingWidth);
  const height = randomInRange(minBuildingHeight, maxBuildingHeight);
  const buildingPoints = building(x, width, height);
  drawLines([buildingPoints], { fill: randomColor() });
  const windowPoints = generateWindows(x, width, height);
  drawLines(windowPoints, { fill: windowColor });
  x += width;
}

//snow
function snowflake(snowflakeX, y) {
  const topLeft = [snowflakeX, y];
  const topRight = [snowflakeX + snowflakeSize, y];
  const bottomRight = [snowflakeX + snowflakeSize, y + snowflakeSize];
  const bottomLeft = [snowflakeX, y + snowflakeSize];
  return [topLeft, topRight, bottomRight, bottomLeft, topLeft];
}

for (let i = 0; i < snowflakeCount; i++) {
  let snowflakeX = randomInRange(0, 125);
  let y = randomInRange(0, 125);

  // avoid moon
  while (Math.sqrt(Math.pow(snowflakeX - moonRadius, 2) + Math.pow(y - (125 - moonRadius), 2)) < moonRadius) {
    snowflakeX = randomInRange(0, 125);
    y = randomInRange(0, 125);
  }

  const snowflakePoints = snowflake(snowflakeX, y);
  drawLines([snowflakePoints], { fill: snowflakeColor });
}