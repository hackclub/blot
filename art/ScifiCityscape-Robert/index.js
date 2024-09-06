/*
@title: Scifi Cityscape
@author: Robert
@snapshot: scifi.png
*/

// Canvas dimensions
const WIDTH = 800;
const HEIGHT = 600;

// Generative parameters
const BUILDING_COUNT = bt.randIntInRange(10, 20);
const DETAIL_LEVEL = bt.randInRange(0.5, 1); // Controls the amount of details
const PERSPECTIVE_STRENGTH = bt.randInRange(0.2, 0.4);

setDocDimensions(WIDTH, HEIGHT);

// Function to create a point in perspective
function perspectivePoint(x, y, z) {
  const vanishX = WIDTH / 2;
  const vanishY = HEIGHT / 3;
  const scale = 1 + z * PERSPECTIVE_STRENGTH;
  return [
    (x - vanishX) * scale + vanishX,
    (y - vanishY) * scale + vanishY
  ];
}

// Function to draw a line in perspective
function perspectiveLine(x1, y1, z1, x2, y2, z2) {
  const [px1, py1] = perspectivePoint(x1, y1, z1);
  const [px2, py2] = perspectivePoint(x2, y2, z2);
  return [[px1, py1], [px2, py2]];
}

// Function to generate a building
function generateBuilding(x, y, width, height, depth) {
  const lines = [];
  
  // Front face
  lines.push(perspectiveLine(x, y, 0, x + width, y, 0));
  lines.push(perspectiveLine(x, y, 0, x, y - height, 0));
  lines.push(perspectiveLine(x + width, y, 0, x + width, y - height, 0));
  lines.push(perspectiveLine(x, y - height, 0, x + width, y - height, 0));
  
  // Back face
  lines.push(perspectiveLine(x, y, depth, x + width, y, depth));
  lines.push(perspectiveLine(x, y, depth, x, y - height, depth));
  lines.push(perspectiveLine(x + width, y, depth, x + width, y - height, depth));
  lines.push(perspectiveLine(x, y - height, depth, x + width, y - height, depth));
  
  // Connecting lines
  lines.push(perspectiveLine(x, y, 0, x, y, depth));
  lines.push(perspectiveLine(x + width, y, 0, x + width, y, depth));
  lines.push(perspectiveLine(x, y - height, 0, x, y - height, depth));
  lines.push(perspectiveLine(x + width, y - height, 0, x + width, y - height, depth));
  
  // Add windows
  const windowRows = Math.floor(height / 40);
  const windowCols = Math.floor(width / 30);
  for (let row = 1; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      const wx = x + col * 30 + 10;
      const wy = y - row * 40 + 10;
      const wsize = 20;
      if (bt.rand() < DETAIL_LEVEL) {
        lines.push(perspectiveLine(wx, wy, 0, wx + wsize, wy, 0));
        lines.push(perspectiveLine(wx, wy, 0, wx, wy - wsize, 0));
        lines.push(perspectiveLine(wx + wsize, wy, 0, wx + wsize, wy - wsize, 0));
        lines.push(perspectiveLine(wx, wy - wsize, 0, wx + wsize, wy - wsize, 0));
      }
    }
  }
  
  return lines;
}

// Function to generate abstract geometric shapes
function generateAbstractShape(x, y, size) {
  const lines = [];
  const points = [];
  const pointCount = bt.randIntInRange(3, 6);
  
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
  
  // Add some internal lines for complexity
  if (bt.rand() < DETAIL_LEVEL) {
    for (let i = 0; i < pointCount - 2; i++) {
      const [x1, y1, z1] = points[i];
      const [x2, y2, z2] = points[i + 2];
      lines.push(perspectiveLine(x1, y1, z1, x2, y2, z2));
    }
  }
  
  return lines;
}

// Generate buildings
const cityscape = [];
const buildingWidth = WIDTH / BUILDING_COUNT;
for (let i = 0; i < BUILDING_COUNT; i++) {
  const x = i * buildingWidth;
  const y = HEIGHT;
  const width = buildingWidth * bt.randInRange(0.6, 0.9);
  const height = bt.randInRange(100, HEIGHT * 0.8);
  const depth = bt.randInRange(0.1, 0.3);
  cityscape.push(...generateBuilding(x, y, width, height, depth));
}

// Generate abstract shapes
const abstractShapes = [];
for (let i = 0; i < BUILDING_COUNT / 2; i++) {
  const x = bt.randInRange(WIDTH * 0.1, WIDTH * 0.9);
  const y = bt.randInRange(HEIGHT * 0.1, HEIGHT * 0.4);
  const size = bt.randInRange(20, 60);
  abstractShapes.push(...generateAbstractShape(x, y, size));
}

// Draw everything
drawLines([...cityscape, ...abstractShapes]);