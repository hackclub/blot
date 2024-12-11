const width = 125;
const height = 125;

// Set document dimensions
setDocDimensions(width, height);

// Store final lines
const finalLines = [];

// Parameters for the design
const tessellationDepth = 3; // Depth of recursion for tessellation
const baseHexSize = 20; // Size of the initial hexagon
const scaleFactor = 0.6; // Scale factor for recursive hexagons
const rotationIncrement = 15; // Rotation increment for each recursive layer

// Center of the canvas
const centerX = width / 2;
const centerY = height / 2;

/**
 * Function to draw a hexagon
 * @param {number} x - X-coordinate of the center
 * @param {number} y - Y-coordinate of the center
 * @param {number} size - Size of the hexagon
 * @param {number} depth - Current depth of recursion
 * @param {number} rotation - Current rotation angle
 */
function drawHexagon(x, y, size, depth, rotation) {
  if (depth === 0) return;

  // Generate vertices of the hexagon
  const hexagon = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 2 * Math.PI) / 6 + (rotation * Math.PI) / 180;
    const vertexX = x + size * Math.cos(angle);
    const vertexY = y + size * Math.sin(angle);
    hexagon.push([vertexX, vertexY]);
  }
  // Close the hexagon
  hexagon.push(hexagon[0]);

  // Add the hexagon to the final lines
  finalLines.push(hexagon);

  // Recursively draw smaller hexagons at each vertex
  for (let i = 0; i < 6; i++) {
    const nextX = hexagon[i][0];
    const nextY = hexagon[i][1];
    drawHexagon(nextX, nextY, size * scaleFactor, depth - 1, rotation + rotationIncrement);
  }
}

// Draw the tessellation starting from the center
drawHexagon(centerX, centerY, baseHexSize, tessellationDepth, 0);

// Rotate the entire pattern for added effect
bt.rotate(finalLines, 30, [centerX, centerY]);

// Draw the tessellation
drawLines(finalLines);
