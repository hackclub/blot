/*
@title: Inverted Scifi Cityscape
@author: Robert
@snapshot: scifi.png
*/

// Canvas dimensions
const WIDTH = 125;
const HEIGHT = 125;

// Generative parameters
const BUILDING_COUNT = bt.randIntInRange(5, 8);
const DETAIL_LEVEL = bt.randInRange(0.5, 1);
const PERSPECTIVE_STRENGTH = bt.randInRange(0.2, 0.4);
const MIN_BUILDING_WIDTH = 10;

setDocDimensions(WIDTH, HEIGHT);

// Function to create a point in perspective
function perspectivePoint(x, y, z) {
  const vanishX = WIDTH / 2;
  const vanishY = HEIGHT * 2/3; // Moved vanishing point to lower third
  const scale = 1 + z * PERSPECTIVE_STRENGTH;
  return [
    Math.min(WIDTH, Math.max(0, (x - vanishX) * scale + vanishX)),
    Math.min(HEIGHT, Math.max(0, (y - vanishY) * scale + vanishY))
  ];
}

// Function to draw a line in perspective
function perspectiveLine(x1, y1, z1, x2, y2, z2) {
  const [px1, py1] = perspectivePoint(x1, y1, z1);
  const [px2, py2] = perspectivePoint(x2, y2, z2);
  return [[px1, py1], [px2, py2]];
}

// Function to generate an upside-down building
function generateBuilding(x, y, width, height, depth) {
  const lines = [];

  // Front face (now starting from top)
  lines.push(perspectiveLine(x, y, 0, x + width, y, 0));
  lines.push(perspectiveLine(x, y, 0, x, y + height, 0));
  lines.push(perspectiveLine(x + width, y, 0, x + width, y + height, 0));
  lines.push(perspectiveLine(x, y + height, 0, x + width, y + height, 0));

  // Back face
  lines.push(perspectiveLine(x, y, depth, x + width, y, depth));
  lines.push(perspectiveLine(x, y, depth, x, y + height, depth));
  lines.push(perspectiveLine(x + width, y, depth, x + width, y + height, depth));
  lines.push(perspectiveLine(x, y + height, depth, x + width, y + height, depth));

  // Connecting lines
  lines.push(perspectiveLine(x, y, 0, x, y, depth));
  lines.push(perspectiveLine(x + width, y, 0, x + width, y, depth));
  lines.push(perspectiveLine(x, y + height, 0, x, y + height, depth));
  lines.push(perspectiveLine(x + width, y + height, 0, x + width, y + height, depth));

  // Add windows - now going upward
  const windowRows = Math.floor(height / 15);
  const windowCols = Math.floor(width / 10);
  for (let row = 1; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      const wx = x + col * 10 + 3;
      const wy = y + row * 15 - 3;
      const wsize = 6;
      if (bt.rand() < DETAIL_LEVEL) {
        lines.push(perspectiveLine(wx, wy, 0, wx + wsize, wy, 0));
        lines.push(perspectiveLine(wx, wy, 0, wx, wy + wsize, 0));
        lines.push(perspectiveLine(wx + wsize, wy, 0, wx + wsize, wy + wsize, 0));
        lines.push(perspectiveLine(wx, wy + wsize, 0, wx + wsize, wy + wsize, 0));
      }
    }
  }

  return lines;
}

// Function to generate abstract geometric shapes
function generateAbstractShape(x, y, size) {
  x = Math.min(WIDTH - size, Math.max(size, x));
  y = Math.min(HEIGHT - size, Math.max(size, y));
  
  const lines = [];
  const points = [];
  const pointCount = bt.randIntInRange(3, 5);

  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2;
    const radius = size * (0.5 + bt.rand() * 0.5);
    points.push([
      x + Math.cos(angle) * radius,
      y + Math.sin(angle) * radius,
      bt.randInRange(0, 0.3)
    ]);
  }

  for (let i = 0; i < pointCount; i++) {
    const [x1, y1, z1] = points[i];
    const [x2, y2, z2] = points[(i + 1) % pointCount];
    lines.push(perspectiveLine(x1, y1, z1, x2, y2, z2));
  }

  if (bt.rand() < DETAIL_LEVEL && pointCount > 3) {
    for (let i = 0; i < pointCount - 2; i++) {
      const [x1, y1, z1] = points[i];
      const [x2, y2, z2] = points[i + 2];
      lines.push(perspectiveLine(x1, y1, z1, x2, y2, z2));
    }
  }

  return lines;
}

// Generate buildings with proper spacing
const cityscape = [];
const buildingSpacing = (WIDTH - (BUILDING_COUNT * MIN_BUILDING_WIDTH)) / (BUILDING_COUNT + 1);
let currentX = buildingSpacing;

for (let i = 0; i < BUILDING_COUNT; i++) {
  const width = MIN_BUILDING_WIDTH * bt.randInRange(1, 1.5);
  const height = bt.randInRange(30, HEIGHT * 0.6);
  const depth = bt.randInRange(0.1, 0.3);
  
  // Start buildings from the top instead of bottom
  cityscape.push(...generateBuilding(currentX, 0, width, height, depth));
  currentX += width + buildingSpacing;
}

// Generate abstract shapes in lower portion
const abstractShapes = [];
const SHAPE_COUNT = Math.floor(BUILDING_COUNT / 2);
for (let i = 0; i < SHAPE_COUNT; i++) {
  const x = bt.randInRange(WIDTH * 0.2, WIDTH * 0.8);
  const y = bt.randInRange(HEIGHT * 0.6, HEIGHT * 0.8); // Moved to bottom portion
  const size = bt.randInRange(5, 15);
  abstractShapes.push(...generateAbstractShape(x, y, size));
}

// Draw everything
drawLines([...cityscape, ...abstractShapes]);