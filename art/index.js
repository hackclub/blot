/*
@title: A Fractal Foray into the Forest
@author: Adya
@snapshot: FractalTree.png
*/

// Set Dimensions
const width = 165;
const height = 160;
setDocDimensions(width, height);

// Store final lines...
const finalLines = [];

// Predefined sequence of angles for variation
const angleSequence = [0.1, -0.1, 0.05, -0.05, 0.15, -0.15, 0.2, -0.2];
let angleIndex = 0;

// Get the next angle from the sequence
function getNextAngle() {
  const angle = angleSequence[angleIndex];
  angleIndex = (angleIndex + 1) % angleSequence.length;
  return angle;
}

// Draw a branch
function branch(startX, startY, len, angle) {
  const endX = startX + len * Math.cos(angle);
  const endY = startY + len * Math.sin(angle);

  // Create a line
  const line = [
    [startX, startY],
    [endX, endY]
  ];

  // Add line to final lines
  finalLines.push(line);

if (len > 4) {
    // Draw 2 new branches
    const newAngle = getNextAngle(); // Use the predefined sequence of angles
    branch(endX, endY, len * 0.67, angle + Math.PI / 4 + newAngle); // Adjust the angles here
    branch(endX, endY, len * 0.67, angle - Math.PI / 4 + newAngle); // And here
  }
}

// Draw the tree
branch(width / 2, height / 100, 50, Math.PI / 2); // Start the tree from the center of the canvas

// Draw final lines
drawLines(finalLines);
