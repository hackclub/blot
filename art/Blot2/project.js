const width = 125;
const height = 125;

// Set document dimensions
setDocDimensions(width, height);

// Store final lines
const finalLines = [];

// Parameters for fractal design
const baseRadius = 20; // Radius of the first circle
const recursionDepth = 3; // Number of recursive levels
const branches = 6; // Number of branches from each circle
const angleOffset = 30; // Rotation offset for the fractal branches

// Center of the canvas
const centerX = width / 2;
const centerY = height / 2;

/**
 * Recursive function to generate fractal lines
 * @param {number} x - X-coordinate of the center
 * @param {number} y - Y-coordinate of the center
 * @param {number} radius - Radius of the current circle
 * @param {number} depth - Current recursion depth
 */
function drawFractal(x, y, radius, depth) {
  if (depth === 0) return;

  // Generate branches
  for (let i = 0; i < branches; i++) {
    const angle = (i * 2 * Math.PI) / branches;

    // Calculate end of each branch
    const endX = x + radius * Math.cos(angle);
    const endY = y + radius * Math.sin(angle);

    // Draw line for the branch
    finalLines.push([[x, y], [endX, endY]]);

    // Draw the next recursive layer
    drawFractal(endX, endY, radius / 2, depth - 1);
  }
}

// Start fractal from the center
drawFractal(centerX, centerY, baseRadius, recursionDepth);

// Apply rotation for aesthetic
bt.rotate(finalLines, angleOffset, [centerX, centerY]);

// Draw the fractal design
drawLines(finalLines);
