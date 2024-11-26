/*
@title: Dunamic Flower Plant
@author: Anuradha Lakruwan
@snapshot: 1.png
*/

const canvasWidth = 150;
const canvasHeight = 150;

setDocDimensions(canvasWidth, canvasHeight);

const RANDOM_SEED = Math.floor(Math.random() * 1000000);
bt.setRandSeed(RANDOM_SEED);

const randomInRange = bt.randInRange;

const totalRoots = Math.floor(randomInRange(76, 103));
const maxLength = randomInRange(1, 4);
const densityOfBranches = randomInRange(0.5, 0.8);
const densityOfFlowers = randomInRange(0.1, 0.3);
const roughness = randomInRange(2.2, 2.3);
const minFlowerDistance = 5;

const flowerCoords = [];

function createRoots(startX, startY) {
  const rootPaths = [];
  
  for (let rootIndex = 0; rootIndex < totalRoots; rootIndex++) {
    let x = startX;
    let y = startY;
    const angle = randomInRange(-Math.PI / 7, Math.PI / 4) + Math.PI / -2;

    const rootPath = [];
    for (let lengthIndex = 0; lengthIndex < maxLength; lengthIndex++) {
      x += Math.cos(angle) + randomInRange(-roughness, roughness);
      y += Math.sin(angle) + randomInRange(-roughness, roughness);
      rootPath.push([x, y]);
    }

    rootPaths.push(bt.catmullRom(rootPath, 4));
  }

  drawLines(rootPaths);
}

function createBranch(startX, startY, branchLength, branchAngle, branchDepth) {
  if (branchDepth > 4) return;

  const endX = startX + branchLength * Math.cos(branchAngle);
  const endY = startY + branchLength * Math.sin(branchAngle);
  
  const branchPath = [
    [startX, startY],
    [startX + branchLength / 3 * Math.cos(branchAngle + randomInRange(-0.2, 0.2)), startY + branchLength / 3 * Math.sin(branchAngle + randomInRange(-0.2, 0.2))],
    [startX + branchLength * 2 / 3 * Math.cos(branchAngle + randomInRange(-0.3, 0.3)), startY + branchLength * 2 / 3 * Math.sin(branchAngle + randomInRange(-0.3, 0.3))],
    [endX, endY]
  ];
  
  drawLines([bt.catmullRom(branchPath, 10)]);

  if (bt.rand() < densityOfFlowers) {
    if (isDistanceSufficient(endX, endY)) {
      createFlower(endX, endY);
      flowerCoords.push([endX, endY]);
    }
  }

  const subBranchCount = Math.floor(randomInRange(2, 4));
  for (let i = 0; i < subBranchCount; i++) {
    if (bt.rand() < densityOfBranches) {
      const newAngle = branchAngle + randomInRange(-Math.PI / 4, Math.PI / 4);
      const newLength = branchLength * randomInRange(0.6, 0.8);
      createBranch(endX, endY, newLength, newAngle, branchDepth + 1);
    }
  }
}

function isDistanceSufficient(x, y) {
  for (const [flowerX, flowerY] of flowerCoords) {
    const dist = Math.sqrt((x - flowerX) ** 2 + (y - flowerY) ** 2);
    if (dist < minFlowerDistance) {
      return false;
    }
  }
  return true;
}

function createFlower(x, y) {
  const petals = Math.floor(randomInRange(3, 11));
  const petalSize = randomInRange(1, 2);
  const flowerPath = [];

  for (let i = 0; i < petals; i++) {
    const angle = (2 * Math.PI / petals) * i;
    const petal = [
      [x, y],
      [x + petalSize * Math.cos(angle), y + petalSize * Math.sin(angle)],
      [x + petalSize * 1.5 * Math.cos(angle + Math.PI / petals), y + petalSize * 1.5 * Math.sin(angle + Math.PI / petals)],
      [x, y]
    ];
    flowerPath.push(petal);
  }

  drawLines(flowerPath, { fill: "white" });
}

function createGroundLine(startX, startY) {
  const groundPath = [];
  let x = 0;
  let y = startY;

  while (x < canvasWidth) {
    y += randomInRange(-1, 3);
    groundPath.push([x, y]);
    x += 148;
  }

  drawLines([groundPath]);
}

const initialX = canvasWidth / 2;
const initialY = canvasHeight / 2;

createGroundLine(initialX, initialY);

createRoots(initialX, initialY);

const mainBranches = Math.floor(randomInRange(3, 6));
for (let i = 0; i < mainBranches; i++) {
  const angle = randomInRange(-Math.PI / 4, Math.PI / 4) - Math.PI / -2;
  const length = randomInRange(10, 20);
  createBranch(initialX, initialY, length, angle, 0);
}

console.log("Seed:", RANDOM_SEED);
