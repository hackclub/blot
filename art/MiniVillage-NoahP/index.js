/*
@title: Mini Village
@author: Noah P
@snapshot: main.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

function generateRandomSeed() {
  return Math.floor(Math.random() * 10000);
}

// Set the random seed
const seed = generateRandomSeed();
bt.setRandSeed(seed); //Set Random Seed


function drawTree(x, y, height) {
  const treeLines = [];


  const trunkWidth = height / 20;
  treeLines.push([
    [x, y],
    [x, y + height / 5],
    [x + trunkWidth, y + height / 5],
    [x + trunkWidth, y],
    [x, y]
  ]);


  const leavesWidth = height / 5;
  treeLines.push([
    [x - leavesWidth / 2, y + height / 5],
    [x + trunkWidth + leavesWidth / 2, y + height / 5],
    [x + trunkWidth / 2, y + height / 5 + height / 2],
    [x - leavesWidth / 2, y + height / 5]
  ]);

  return treeLines;
}


function drawHouse(x, y, width, height) {
  const houseLines = [];


  houseLines.push([
    [x, y],
    [x, y + height],
    [x + width, y + height],
    [x + width, y],
    [x, y]
  ]);


  houseLines.push([
    [x, y + height],
    [x + width / 2, y + height + width / 2],
    [x + width, y + height],
    [x, y + height]
  ]);

  return houseLines;
}


function drawAnimal(x, y, size) {
  const animalLines = [];
  const radius = size / 2;


  animalLines.push([
    [x - radius, y],
    [x, y + radius],
    [x + radius, y],
    [x, y - radius],
    [x - radius, y]
  ]);

  return animalLines;
}


function isOccupied(x, y, size, occupiedAreas) {
  for (let area of occupiedAreas) {
    const [ax, ay, asize] = area;
    if (Math.abs(ax - x) < (asize / 2 + size / 2) && Math.abs(ay - y) < (asize / 2 + size / 2)) {
      return true;
    }
  }
  return false;
}


const finalLines = [];
const occupiedAreas = [];


const numTrees = Math.floor(Math.random() * 11) + 10;
const numHouses = Math.floor(Math.random() * 3) + 1;
const numAnimals = Math.floor(Math.random() * 5) + 2;


for (let i = 0; i < numTrees; i++) {
  let x, y, treeHeight;
  do {
    x = Math.floor(Math.random() * (width - 10)) + 5;
    y = Math.floor(Math.random() * (height - 50)) + 5;
    treeHeight = Math.floor(Math.random() * 30) + 10;
  } while (isOccupied(x, y, treeHeight, occupiedAreas));

  occupiedAreas.push([x, y, treeHeight]);
  const treeLines = drawTree(x, y, treeHeight);
  treeLines.forEach(line => finalLines.push(line));
}


for (let i = 0; i < numHouses; i++) {
  let x, y, houseWidth, houseHeight;
  do {
    x = Math.floor(Math.random() * (width - 20)) + 10;
    y = Math.floor(Math.random() * (height - 60)) + 5;
    houseWidth = Math.floor(Math.random() * 15) + 10;
    houseHeight = Math.floor(Math.random() * 10) + 10;
  } while (isOccupied(x, y, houseWidth, occupiedAreas));

  occupiedAreas.push([x, y, houseWidth]);
  const houseLines = drawHouse(x, y, houseWidth, houseHeight);
  houseLines.forEach(line => finalLines.push(line));
}


for (let i = 0; i < numAnimals; i++) {
  let x, y, animalSize;
  do {
    x = Math.floor(Math.random() * (width - 5)) + 2;
    y = Math.floor(Math.random() * (height - 10)) + 2;
    animalSize = Math.floor(Math.random() * 5) + 3;
  } while (isOccupied(x, y, animalSize, occupiedAreas));

  occupiedAreas.push([x, y, animalSize]);
  const animalLines = drawAnimal(x, y, animalSize);
  animalLines.forEach(line => finalLines.push(line));
}


drawLines(finalLines);