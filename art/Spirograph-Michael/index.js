/*
@title: spirograph
@author: Michael Garcia
@snapshot: the name of the snapshot file you want in the gallery
*/

// Set constants for spirograph
const R = 50; // Radius of the outer circle
const r = 70; // Radius of the inner circle
const d = 40; // Distance of the pen from the center of the inner circle

// Function to generate points for spirograph pattern
const spirograph = (R, r, d) => {
  const points = [];
  const revolutions = 100;
  for (let t = 0; t < revolutions * 2 * Math.PI; t += 0.01) {
    const x = (R - r) * Math.cos(t) + d * Math.cos((R - r) / r * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin((R - r) / r * t);
    points.push([x, y]);
  }
  return points;
};

// Generate spirograph pattern
const pattern = spirograph(R, r, d);

// Translate the pattern to fit within the workspace
const width = 125;
const height = 125;
const centerX = width / 2;
const centerY = height / 2;
const maxX = Math.max(...pattern.map(point => point[0]));
const maxY = Math.max(...pattern.map(point => point[1]));
const minX = Math.min(...pattern.map(point => point[0]));
const minY = Math.min(...pattern.map(point => point[1]));
const scale = Math.min(width / (maxX - minX), height / (maxY - minY)) * 0.8;
const translatedPattern = pattern.map(point => [
  (point[0] - (minX + maxX) / 2) * scale + centerX,
  (point[1] - (minY + maxY) / 2) * scale + centerY
]);

// Set document dimensions and draw the pattern
setDocDimensions(width, height);
drawLines([translatedPattern]);
