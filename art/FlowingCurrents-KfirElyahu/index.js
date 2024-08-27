/*
@title: Flowing Currents
@author: Kfir Elyahu
@snapshot: 1.png
*/

// Set the dimensions of the drawing document
setDocDimensions(125, 125);

const { Turtle, noise, rand, randInRange, randIntInRange, setRandSeed, nurbs } = bt;

// Set a random seed
setRandSeed(randIntInRange(0, 1000000));

// Parameters
const GRID_SIZE = 30;
const CELL_SIZE = 125 / GRID_SIZE;
const NUM_LINES = 60;
const LINE_SEGMENTS = 20;
const NOISE_SCALE = 0.02;
const MARGIN = 2;
const MAX_OVERLAP = 2;

// Generate flow field using Perlin noise with random offset
const noiseOffset = randInRange(0, 1000);
const flowField = [];
for (let y = 0; y < GRID_SIZE; y++) {
  for (let x = 0; x < GRID_SIZE; x++) {
    const angle = noise([x * NOISE_SCALE + noiseOffset, y * NOISE_SCALE + noiseOffset]) * Math.PI * 2;
    flowField.push([Math.cos(angle), Math.sin(angle)]);
  }
}

// Function to get flow direction at a given point
function getFlowDirection(x, y) {
  const gridX = Math.floor(x / CELL_SIZE);
  const gridY = Math.floor(y / CELL_SIZE);
  const index = gridY * GRID_SIZE + gridX;
  return flowField[index] || [0, 0];
}

// Create a grid to track line density
const densityGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));

// Function to update and check density
function updateDensity(x, y) {
  const gridX = Math.floor(x / CELL_SIZE);
  const gridY = Math.floor(y / CELL_SIZE);
  if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE) {
    densityGrid[gridY][gridX]++;
    return densityGrid[gridY][gridX] <= MAX_OVERLAP;
  }
  return false;
}

// Generate flowing lines
const allLines = [];

for (let i = 0; i < NUM_LINES; i++) {
  const turtle = new Turtle();
  turtle.jump([randInRange(MARGIN, 125 - MARGIN), randInRange(MARGIN, 125 - MARGIN)]);
  turtle.down();

  const points = [turtle.pos];
  let canContinue = true;

  for (let j = 0; j < LINE_SEGMENTS && canContinue; j++) {
    const [x, y] = turtle.pos;
    const [dx, dy] = getFlowDirection(x, y);
    
    turtle.setAngle(Math.atan2(dy, dx) * 180 / Math.PI);
    turtle.forward(CELL_SIZE * 0.8); // Move 80% of a cell size to create some overlap between cells
    
    // Keep the turtle within bounds and check density
    let [newX, newY] = turtle.pos;
    newX = Math.max(MARGIN, Math.min(125 - MARGIN, newX));
    newY = Math.max(MARGIN, Math.min(125 - MARGIN, newY));
    
    canContinue = updateDensity(newX, newY);
    if (canContinue) {
      turtle.jump([newX, newY]);
      points.push(turtle.pos);
    }
  }

  if (points.length > 2) {
    // Generate a smooth curve through the points
    const smoothLine = nurbs(points, { steps: 100 });  // Reduced steps for smaller drawing
    allLines.push(smoothLine);
  }
}

// Draw all lines
drawLines(allLines);
