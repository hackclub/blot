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
// Function to generate clouds
function generateClouds() {
  const cloudLines = [];
  const cloudCount = bt.randIntInRange(3, 6);
  
  for (let i = 0; i < cloudCount; i++) {
    const cloudX = bt.randInRange(0, WIDTH);
    const cloudY = bt.randInRange(HEIGHT * 0.7, HEIGHT * 0.9);
    const cloudWidth = bt.randInRange(10, 25);
    const cloudHeight = bt.randInRange(5, 10);
    
    // Cloud shape with multiple elliptical segments
    const segments = bt.randIntInRange(3, 5);
    for (let j = 0; j < segments; j++) {
      const segmentWidth = cloudWidth / segments;
      const segmentX = cloudX + j * segmentWidth;
      const segmentY = cloudY + bt.randInRange(-2, 2);
      
      cloudLines.push(
        perspectiveLine(segmentX, segmentY, 0, segmentX + segmentWidth, segmentY, 0)
      );
      
      // Add some vertical variation to create cloud-like shape
      if (j > 0 && j < segments - 1) {
        cloudLines.push(
          perspectiveLine(segmentX, segmentY, 0, segmentX, segmentY + bt.randInRange(1, 3), 0)
        );
      }
    }
  }
  
  return cloudLines;
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
  
  // Add varied windows
  const windowRows = Math.floor(height / 15);
  const windowCols = Math.floor(width / 10);
  for (let row = 1; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      // Add more randomness to window generation
      if (bt.rand() < DETAIL_LEVEL) {
        // Vary window sizes
        const wsize = bt.randInRange(4, 8);
        const wx = x + col * 10 + bt.randInRange(1, 4);
        const wy = y + height - row * 15 + bt.randInRange(1, 4);
        
        // Randomly decide window style (square, rectangular, or skipped)
        const windowStyle = bt.rand();
        
        if (windowStyle < 0.7) {
          // Standard square window
          lines.push(perspectiveLine(wx, wy, 0, wx + wsize, wy, 0));
          lines.push(perspectiveLine(wx, wy, 0, wx, wy + wsize, 0));
          lines.push(perspectiveLine(wx + wsize, wy, 0, wx + wsize, wy + wsize, 0));
          lines.push(perspectiveLine(wx, wy + wsize, 0, wx + wsize, wy + wsize, 0));
        } else if (windowStyle < 0.9) {
          // Rectangular window (vertical or horizontal)
          const isVertical = bt.rand() < 0.5;
          if (isVertical) {
            // Vertical rectangle
            lines.push(perspectiveLine(wx, wy, 0, wx + wsize/2, wy, 0));
            lines.push(perspectiveLine(wx, wy, 0, wx, wy + wsize * 1.5, 0));
            lines.push(perspectiveLine(wx + wsize/2, wy, 0, wx + wsize/2, wy + wsize * 1.5, 0));
            lines.push(perspectiveLine(wx, wy + wsize * 1.5, 0, wx + wsize/2, wy + wsize * 1.5, 0));
          } else {
            // Horizontal rectangle
            lines.push(perspectiveLine(wx, wy, 0, wx + wsize * 1.5, wy, 0));
            lines.push(perspectiveLine(wx, wy, 0, wx, wy + wsize/2, 0));
            lines.push(perspectiveLine(wx + wsize * 1.5, wy, 0, wx + wsize * 1.5, wy + wsize/2, 0));
            lines.push(perspectiveLine(wx, wy + wsize/2, 0, wx + wsize * 1.5, wy + wsize/2, 0));
          }
        }
        // Some windows are intentionally skipped (20% chance)
      }
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
// Add cloud decorations
const cloudDecorations = generateClouds();

// Draw everything
drawLines([...cloudDecorations, ...cityscape]);