const width = 250;
const height = 250;
setDocDimensions(width, height);

const centerX = width / 2;
const centerY = height / 2;
const size = 62.5;  // Half the size of the leaf to make the full size 125mm

const leafPoints = [
  [centerX, centerY - size],               // Top point
  [centerX + size * 0.2, centerY - size * 0.6],
  [centerX + size * 0.6, centerY - size * 0.8],
  [centerX + size * 0.4, centerY - size * 0.4],
  [centerX + size * 0.8, centerY - size * 0.2],
  [centerX + size * 0.3, centerY - size * 0.1],
  [centerX + size * 0.5, centerY + size * 0.5],
  [centerX, centerY + size * 0.2],
  [centerX - size * 0.5, centerY + size * 0.5],
  [centerX - size * 0.3, centerY - size * 0.1],
  [centerX - size * 0.8, centerY - size * 0.2],
  [centerX - size * 0.4, centerY - size * 0.4],
  [centerX - size * 0.6, centerY - size * 0.8],
  [centerX - size * 0.2, centerY - size * 0.6],
  [centerX, centerY - size]                // Back to top point to close the shape
];

// Draw the leaf outline
drawLines(leafPoints.map((point, index) => {
  if (index === leafPoints.length - 1) {
    return [point, leafPoints[0]];  // Close the loop
  }
  return [point, leafPoints[index + 1]];
}));
