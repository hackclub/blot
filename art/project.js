/*
@title: The curve
@author: Aarav Mehta
@snapshot: The curve
*/const width = 125;
const height = 125;
setDocDimensions(width, height);

const leafLength = 120;  // Length of the leaf
const leafWidth = 60;  // Width of the leaf
const centerX = width / 2;
const centerY = height / 2;

// Function to draw an arc
const drawArc = (startX, startY, radiusX, radiusY, startAngle, endAngle, steps) => {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + (endAngle - startAngle) * (i / steps);
    const x = startX + radiusX * Math.cos(angle);
    const y = startY + radiusY * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
};

const leftArc = drawArc(centerX, centerY, leafLength / 2, leafWidth / 2, Math.PI, 0, 50);
const rightArc = drawArc(centerX, centerY, leafLength / 2, leafWidth / 2, 0, Math.PI, 50);

// Combine the arcs to form the leaf shape
const leafOutline = [...leftArc, ...rightArc];

// Draw the leaf outline
drawLines(leafOutline.map((point, index) => {
  if (index === leafOutline.length - 1) {
    return [point, leafOutline[0]];  // Close the loop
  }
  return [point, leafOutline[index + 1]];
}));
