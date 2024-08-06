/*
@title: An Island with Waves, Trees, Ship, and Houses
@author: scooterthedev
@snapshot: snapshot2.png
*/

bt.setRandSeed(1812);

// Global settings
const width = 200;
const height = 200;
const islandSize = 50;
const waveSize = 15;
const waveCount = bt.randIntInRange(3, 7);
const treeCount = bt.randIntInRange(2, 2);
const houseCount = bt.randIntInRange(1, 1);

setDocDimensions(width, height);

class Noise {
  constructor(octaves = 1) {
    this.p = new Uint8Array(512);
    this.octaves = octaves;
    for (let i = 0; i < 512; ++i) {
      this.p[i] = Math.floor(bt.setRandSeed(Date.now()) * 256);
    }
  }
  
  lerp(t, a, b) {
    return a + t * (b - a);
  }
  
  grad2d(i, x, y) {
    const v = (i & 1) === 0 ? x : y;
    return (i & 2) === 0 ? -v : v;
  }
  
  noise2d(x2d, y2d) {
    const X = Math.floor(x2d) & 255;
    const Y = Math.floor(y2d) & 255;
    const x = x2d - Math.floor(x2d);
    const y = y2d - Math.floor(y2d);
    const fx = (3 - 2 * x) * x * x;
    const fy = (3 - 2 * y) * y * y;
    const p0 = this.p[X] + Y;
    const p1 = this.p[X + 1] + Y;
    return this.lerp(
      fy,
      this.lerp(fx, this.grad2d(this.p[p0], x, y), this.grad2d(this.p[p1], x - 1, y)),
      this.lerp(fx, this.grad2d(this.p[p0 + 1], x, y - 1), this.grad2d(this.p[p1 + 1], x - 1, y - 1))
    );
  }
  
  noise(x, y, scale = 0.5) {
    let e = 1;
    let k = 1;
    let s = 0;
    for (let i = 0; i < this.octaves; ++i) {
      e *= scale;
      s += e * (1 + this.noise2d(k * x, k * y)) / 2;
      k *= 2;
    }
    return s;
  }
}

const perlin = new Noise(3);

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
    let py = perlin.noise(x + px * 0.05, y * 0.05) * height;
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

function boundingBox(points) {
  let minX = points[0][0],
    minY = points[0][1],
    maxX = points[0][0],
    maxY = points[0][1];
  for (let [x, y] of points) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

function anyBoxesOverlap(box, boxes) {
  for (let otherBox of boxes) {
    if (
      box.minX < otherBox.maxX &&
      box.maxX > otherBox.minX &&
      box.minY < otherBox.maxY &&
      box.maxY > otherBox.minY
    ) {
      return true;
    }
  }
  return false;
}

function drawIslandWithWavesTreesHousesAndShip(x, y, islandSize, waveSize, waveCount, treeCount, houseCount) {
  let island = drawIsland(x, y, islandSize);
  let waves = [];
  let trees = [];
  let treeBoxes = [];
  let houses = [];
  let houseBoxes = [];
  let shipX, shipY;

  do {
    shipX = bt.randIntInRange(10, width - 30); 
    shipY = bt.randIntInRange(10, height - 30);
  } while (isPointInIsland(island, shipX, shipY));

  for (let i = 0; i < waveCount; i++) {
    let angle = bt.randInRange(0, 360);
    let distance = bt.randInRange(islandSize + 10, islandSize + 20);
    let waveX = x + distance * Math.cos(angle * Math.PI / 180);
    let waveY = y + distance * Math.sin(angle * Math.PI / 180);
    waves.push(drawWaves(waveX, waveY, waveSize * 2, waveSize, angle));
  }

  for (let i = 0; i < treeCount; i++) {
    let tree, treeBox;
    let treeX, treeY;
    do {
      treeX = x + bt.randInRange(-islandSize / 2, islandSize / 2);
      treeY = y + bt.randInRange(-islandSize / 2, islandSize / 2);
      tree = drawTree(treeX, treeY);
      treeBox = boundingBox(tree[1]); 
    } while (!isPointInIsland(island, treeX, treeY) || anyBoxesOverlap(treeBox, treeBoxes.concat(houseBoxes)));
    trees = trees.concat(tree);
    treeBoxes.push(treeBox);
  }

  for (let i = 0; i < houseCount; i++) {
    let house, houseBox;
    let houseX, houseY;
    do {
      houseX = x + bt.randInRange(-islandSize / 2, islandSize / 2);
      houseY = y + bt.randInRange(-islandSize / 2, islandSize / 2);
      house = drawHouse(houseX, houseY);
      houseBox = boundingBox(house[0]);  
    } while (!isPointInIsland(island, houseX, houseY) || anyBoxesOverlap(houseBox, treeBoxes.concat(houseBoxes)));
    houses = houses.concat(house);
    houseBoxes.push(houseBox);
  }

  let ship = drawTexturedShip(shipX, shipY);

  return [island, ...waves, ...trees, ...houses, ...ship];
}

function flipSceneVertically(scene) {
  for (let shape of scene) {
    for (let point of shape) {
      point[1] = height - point[1];
    }
  }
}

let scene = drawIslandWithWavesTreesHousesAndShip(
  width / 2,
  height / 2,
  islandSize,
  waveSize,
  waveCount,
  treeCount,
  houseCount
);

flipSceneVertically(scene);
drawLines(scene);