/*
@title: Star Pattern
@author: Surbhi
@snapshot: S_3.png
*/

const width = 400;
const height = 400;

setDocDimensions(width, height);

// Store lines to draw
const finalLines = [];

// Define a function to create a star shape
function createStar(cx, cy, outerRadius, innerRadius, points) {
  const angleIncrement = (2 * Math.PI) / points;
  let angle = -Math.PI / 2; // Start from the top

  const starPoints = [];
  for (let i = 0; i < points; i++) {
    let outerX = cx + outerRadius * Math.cos(angle);
    let outerY = cy + outerRadius * Math.sin(angle);
    starPoints.push([outerX, outerY]);

    angle += angleIncrement;

    let innerX = cx + innerRadius * Math.cos(angle);
    let innerY = cy + innerRadius * Math.sin(angle);
    starPoints.push([innerX, innerY]);

    angle += angleIncrement;
  }

  return starPoints;
}

// Create a star shape centered in the canvas
const star = createStar(width / 2, height / 2, 150, 75, 10);
finalLines.push(star);

// Draw the central star
drawLines(finalLines);

// Rotate and draw additional stars around the central star
for (let i = 1; i < 12; i++) {
  // Calculate rotation angle in degrees
  const angle = (i * 30) % 360;

  // Rotate each point of the star and draw
  const rotatedStar = star.map(point => {
    const rotatedX = point[0] * Math.cos(angle * Math.PI / 180) - point[1] * Math.sin(angle * Math.PI / 180);
    const rotatedY = point[0] * Math.sin(angle * Math.PI / 180) + point[1] * Math.cos(angle * Math.PI / 180);
    return [rotatedX, rotatedY];
  });

  finalLines.push(rotatedStar);
}

// Draw all rotated stars
drawLines(finalLines);
