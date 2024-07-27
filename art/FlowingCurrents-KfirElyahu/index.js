/*
@title: Flowing Currents
@author: Kfir Elyahu
@snapshot: 1.png
*/

// Set the dimensions of the drawing document
setDocDimensions(800, 800);

const { Turtle, noise, randInRange, nurbs } = bt;

// Parameters
const GRID_SIZE = 100;
const CELL_SIZE = 1000 / GRID_SIZE;
const NUM_LINES = 500;
const LINE_SEGMENTS = 100;
const NOISE_SCALE = -0.05;
const CURVE_STRENGTH = 50;
const MARGIN = 3;

// Generate flow field using Perlin noise
const flowField = [];
for (let y = 0; y < GRID_SIZE; y++) {
  for (let x = 0; x < GRID_SIZE; x++) {
    const angle = noise([x * NOISE_SCALE, y * NOISE_SCALE]) * Math.PI * 2;
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

// Generate flowing lines
const allLines = [];

for (let i = 0; i < NUM_LINES; i++) {
  const turtle = new Turtle();
  turtle.jump([randInRange(MARGIN, 800 - MARGIN), randInRange(MARGIN, 800 - MARGIN)]);
  turtle.down();

  const points = [turtle.pos];

  for (let j = 0; j < LINE_SEGMENTS; j++) {
    const [x, y] = turtle.pos;
    const [dx, dy] = getFlowDirection(x, y);
    
    turtle.setAngle(Math.atan2(dy, dx) * 180 / Math.PI);
    turtle.forward(CELL_SIZE * 0.8);
    
    // Keep the turtle within bounds
    let [newX, newY] = turtle.pos;
    newX = Math.max(MARGIN, Math.min(800 - MARGIN, newX));
    newY = Math.max(MARGIN, Math.min(800 - MARGIN, newY));
    turtle.jump([newX, newY]);
    
    points.push(turtle.pos);
  }

  // Generate a smooth curve through the points
  const smoothLine = nurbs(points, { steps: 150, degree: 3 });
  allLines.push(smoothLine);
}

// Draw all lines
drawLines(allLines);