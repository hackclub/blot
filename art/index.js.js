/*
@title: A Fractal Foray into the Forest
@author: Adya
@snapshot: FractalTree
*/

// Set Dimensions
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Store final lines...
const finalLines = [];

// Draw a branch
function branch(startX, startY, len, angle) {
  const endX = startX + len * Math.cos(angle);
  const endY = startY + len * Math.sin(angle);

  // Create a line
  const line = [
    [startX, startY],
    [endX, endY]
  ];

  // Add line to the final lines
  finalLines.push(line);

  if (len > 4) {
    // Draw 2 new branches
    const newAngle = Math.random() * 0.3 - 0.15; // Add some randomness to the angle
    branch(endX, endY, len * 0.67, angle + Math.PI / 4 + newAngle); // Adjust the angles here
    branch(endX, endY, len * 0.67, angle - Math.PI / 4 + newAngle); // And here
  }
}

// Draw the tree
branch(width / 2, height / 100, 50, Math.PI / 2); // Start the tree from the center of the canvas

// Draw final lines
drawLines(finalLines);