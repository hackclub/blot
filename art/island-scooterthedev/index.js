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

function drawIsland(x, y, size) {
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

function drawWaves(x, y, length, height, angle) {
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

  let trunk = [
    [x, y],
    [x, y - trunkHeight],
    [x + trunkWidth, y - trunkHeight],
    [x + trunkWidth, y],
    [x, y]
  ];

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
  let inside = false;
  for (let i = 0, j = island.length - 1; i < island.length; j = i++) {
    let xi = island[i][0], yi = island[i][1];
    let xj = island[j][0], yj = island[j][1];
    let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function isOverlap(object, objects) {
  for (let obj of objects) {
    for (let point of object) {
      for (let objPoint of obj) {
        if (Math.sqrt((point[0] - objPoint[0]) ** 2 + (point[1] - objPoint[1]) ** 2) < 5) {
          return true;
        }
      }
    }
  }
  return false;
}

function isPointOnIslandOutline(island, x, y) {
  const tolerance = 3;
  for (let i = 0; i < island.length - 1; i++) {
    let p1 = island[i];
    let p2 = island[i + 1];
    let distance = Math.abs((p2[1] - p1[1]) * x - (p2[0] - p1[0]) * y + p2[0] * p1[1] - p2[1] * p1[0]) / Math.sqrt((p2[1] - p1[1]) ** 2 + (p2[0] - p1[0]) ** 2);
    if (distance < tolerance) {
      return true;
    }
  }
  return false;
}

function drawIslandWithWavesTreesHousesAndShip(x, y, islandSize, waveSize, waveCount, treeCount, houseCount) {
  let island = drawIsland(x, y, islandSize);
  let waves = [];
  let trees = [];
  let houses = [];
  let shipX, shipY;

  do {
    shipX = bt.randIntInRange(10, width - 30); // Ensure ship stays within canvas
    shipY = bt.randIntInRange(10, height - 30);
  } while (isPointInIsland(island, shipX, shipY) || isPointOnIslandOutline(island, shipX, shipY));

  for (let i = 0; i < waveCount; i++) {
    let angle = bt.randInRange(0, 360);
    let distance = bt.randInRange(islandSize + 10, islandSize + 20);
    let waveX = x + distance * Math.cos(angle * Math.PI / 180);
    let waveY = y + distance * Math.sin(angle * Math.PI / 180);
    waves.push(drawWaves(waveX, waveY, waveSize * 2, waveSize, angle));
  }

  for (let i = 0; i < treeCount; i++) {
    let tree;
    let treeX, treeY;
    do {
      treeX = x + bt.randInRange(-islandSize / 2, islandSize / 2);
      treeY = y + bt.randInRange(-islandSize / 2, islandSize / 2);
      tree = drawTree(treeX, treeY);
    } while (!isPointInIsland(island, treeX, treeY) || isOverlap(tree, trees.concat(houses)));
    trees = trees.concat(tree);
  }

  for (let i = 0; i < houseCount; i++) {
    let house;
    let houseX, houseY;
    do {
      houseX = x + bt.randInRange(-islandSize / 2, islandSize / 2);
      houseY = y + bt.randInRange(-islandSize / 2, islandSize / 2);
      house = drawHouse(houseX, houseY);
    } while (!isPointInIsland(island, houseX, houseY) || isOverlap(house, trees.concat(houses)));
    houses = houses.concat(house);
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