/*
@title: An Island with Waves, Trees, Ship, and Houses
@author: scooterthedev
@snapshot: snapshot2.png
*/

bt.setRandSeed(1814);

const width = 200;
const height = 200;
const roughness = 5;
const detail = 3;
const islandSize = 50;
const waveSize = 15;
const waveCount = bt.randIntInRange(3, 7);
const treeCount = bt.randIntInRange(2, 2);
const houseCount = bt.randIntInRange(1, 1);

setDocDimensions(width, height);

function drawIrregularIsland(x, y, size) {
  let points = [];
  let angle = 0;
  while (angle < 360) {
    angle += bt.randIntInRange(10, 20);
    let radius = size + bt.randInRange(-10, 10);
    let px = radius * Math.sin(angle * Math.PI / 180);
    let py = radius * Math.cos(angle * Math.PI / 180);
    points.push([px, py]);
  }
  points.push([points[0][0], points[0][1]]);
  bt.translate([points], [x, y]);
  return points;
}

function drawRealisticWave(x, y, length, height, angle) {
  let points = [];
  let waveCount = 3;
  let waveLength = length / waveCount;

  for (let i = 0; i <= waveCount; i++) {
    let px = i * waveLength;
    let py = Math.sin((i * Math.PI) / waveCount) * height;
    points.push([px, py]);
  }

  points = bt.rotate([points], angle, [0, 0])[0];
  bt.translate([points], [x, y]);
  return points;
}

function drawTree(x, y) {
  const trunkHeight = bt.randIntInRange(5, 10);
  const trunkWidth = bt.randIntInRange(2, 4);
  const foliageSize = bt.randInRange(4, 8);

  // Draw trunk
  let trunk = [
    [x, y],
    [x, y - trunkHeight],
    [x + trunkWidth, y - trunkHeight],
    [x + trunkWidth, y],
    [x, y]
  ];

  // Draw foliage
  let foliage = [];
  let angle = 0;
  while (angle < 360) {
    angle += bt.randIntInRange(10, 30);
    let radius = foliageSize + bt.randInRange(-2, 2);
    let px = radius * Math.sin(angle * Math.PI / 180);
    let py = radius * Math.cos(angle * Math.PI / 180);
    foliage.push([px, py]);
  }
  foliage.push([foliage[0][0], foliage[0][1]]);
  bt.translate([foliage], [x + trunkWidth / 2, y - trunkHeight - foliageSize / 2]);

  return [trunk, foliage];
}

function drawTexturedShip(x, y) {
  const shipWidth = 20;
  const shipHeight = 10;
  let shipBody = [
    [x, y],
    [x + shipWidth, y],
    [x + shipWidth - 5, y - shipHeight],
    [x + 5, y - shipHeight],
    [x, y]
  ];

  let shipTexture = [];
  for (let i = 0; i < shipWidth; i += 5) {
    shipTexture.push([
      [x + i, y],
      [x + i + 2, y - shipHeight]
    ]);
  }

  return [shipBody, ...shipTexture];
}

function drawHouse(x, y) {
  const houseWidth = 10;
  const houseHeight = 10;
  const roofHeight = 5;

  let houseBody = [
    [x, y],
    [x + houseWidth, y],
    [x + houseWidth, y - houseHeight],
    [x, y - houseHeight],
    [x, y]
  ];

  let roof = [
    [x, y - houseHeight],
    [x + houseWidth / 2, y - houseHeight - roofHeight],
    [x + houseWidth, y - houseHeight]
  ];

  return [houseBody, roof];
}

function isPointInIsland(island, x, y) {
  for (let point of island) {
    let px = point[0];
    let py = point[1];
    if (Math.sqrt((x - px) ** 2 + (y - py) ** 2) < islandSize / 2) {
      return true;
    }
  }
  return false;
}

function drawIslandWithWavesTreesHousesAndShip(x, y, islandSize, waveSize, waveCount, treeCount, houseCount) {
  let island = drawIrregularIsland(x, y, islandSize);
  let waves = [];
  let trees = [];
  let houses = [];
  let shipX, shipY;

  do {
    shipX = bt.randIntInRange(10, width - 30); // Ensure ship stays within canvas
    shipY = bt.randIntInRange(10, height - 30);
  } while (isPointInIsland(island, shipX, shipY));

  for (let i = 0; i < waveCount; i++) {
    let angle = bt.randInRange(0, 360);
    let distance = bt.randInRange(islandSize + 10, islandSize + 20);
    let waveX = x + distance * Math.cos(angle * Math.PI / 180);
    let waveY = y + distance * Math.sin(angle * Math.PI / 180);
    waves.push(drawRealisticWave(waveX, waveY, waveSize * 2, waveSize, angle));
  }

  for (let i = 0; i < treeCount; i++) {
    let treeX, treeY;
    do {
      treeX = x + bt.randInRange(-islandSize / 2, islandSize / 2);
      treeY = y + bt.randInRange(-islandSize / 2, islandSize / 2);
    } while (!isPointInIsland(island, treeX, treeY));
    trees = trees.concat(drawTree(treeX, treeY));
  }

  for (let i = 0; i < houseCount; i++) {
    let houseX, houseY;
    do {
      houseX = x + bt.randInRange(-islandSize / 2, islandSize / 2);
      houseY = y + bt.randInRange(-islandSize / 2, islandSize / 2);
    } while (!isPointInIsland(island, houseX, houseY));
    houses = houses.concat(drawHouse(houseX, houseY));
  }

  let ship = drawTexturedShip(shipX, shipY);

  return [island, ...waves, ...trees, ...houses, ...ship];
}

function flipSceneVertically(scene) {
  return scene.map(line =>
    line.map(([x, y]) => [x, height - y])
  );
}

const islandWithWavesTreesHousesAndShip = drawIslandWithWavesTreesHousesAndShip(width / 2, height / 2, islandSize, waveSize, waveCount, treeCount, houseCount);

const flippedScene = flipSceneVertically(islandWithWavesTreesHousesAndShip);

drawLines(flippedScene);