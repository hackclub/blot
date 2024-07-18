/*
@title: Artistic, Unique Tree
@author: Hayden Kong
@snapshot: snapshot2.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Parameters for randomization
const SEED = Math.floor(Math.random() * 1000000);
bt.setRandSeed(SEED);

const rr = bt.randInRange;

// Tree parameters
const trunkHeight = rr(30, 40);
const trunkWidth = rr(5, 8);
const branchDensity = rr(0.6, 0.8);
const leafDensity = rr(0.7, 0.9);
const trunkRoughness = rr(0.2, 0.4);

function drawTrunk() {
  const trunk = [];
  let x = width / 2;
  let y = height;

  for (let i = 0; i < trunkHeight; i++) {
    x += rr(-trunkRoughness, trunkRoughness);
    y -= 1;
    trunk.push([x, height - y]);
  }

  // Add trunk thickness
  const leftSide = trunk.map(([x, y]) => [x - trunkWidth / 2 + rr(-0.5, 0.5), y]);
  const rightSide = trunk.map(([x, y]) => [x + trunkWidth / 2 + rr(-0.5, 0.5), y]).reverse();
  
  drawLines([leftSide.concat(rightSide, [leftSide[0]])]);
  
  return trunk[trunk.length - 1]; // Return the top of the trunk
}

function drawBranch(startX, startY, length, angle, depth) {
  if (depth > 5) return;

  const endX = startX + length * Math.cos(angle);
  const endY = startY + length * Math.sin(angle);  // Changed subtraction to addition
  
  const branch = bt.catmullRom([
    [startX, startY],
    [startX + length/3 * Math.cos(angle + rr(-0.2, 0.2)), startY + length/3 * Math.sin(angle + rr(-0.2, 0.2))],
    [startX + length*2/3 * Math.cos(angle + rr(-0.3, 0.3)), startY + length*2/3 * Math.sin(angle + rr(-0.3, 0.3))],
    [endX, endY]
  ], 10);
  
  drawLines([branch]);

  if (bt.rand() < leafDensity) {
    drawLeaf(endX, endY);
  }

  const branchCount = Math.floor(rr(2, 4));
  for (let i = 0; i < branchCount; i++) {
    if (bt.rand() < branchDensity) {
      const newAngle = angle + rr(-Math.PI/4, Math.PI/4);
      const newLength = length * rr(0.6, 0.8);
      drawBranch(endX, endY, newLength, newAngle, depth + 1);
    }
  }
}

function drawLeaf(x, y) {
  const leafSize = rr(1, 3);
  const leafShape = bt.catmullRom([
    [x, y],
    [x + leafSize, y + leafSize],  // Changed subtraction to addition
    [x + leafSize * 2, y],
    [x + leafSize, y - leafSize],  // Changed addition to subtraction
    [x, y]
  ], 10);
  drawLines([leafShape]);
}

// Draw the tree
const [trunkTopX, trunkTopY] = drawTrunk();

// Draw main branches
const mainBranchCount = Math.floor(rr(3, 5));
for (let i = 0; i < mainBranchCount; i++) {
  const angle = rr(Math.PI/4, Math.PI*3/4);
  const length = rr(20, 30);
  drawBranch(trunkTopX, trunkTopY, length, angle, 0);
}

console.log("Seed:", SEED);
