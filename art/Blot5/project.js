const width = 125;
const height = 125;

setDocDimensions(width, height);

// Store final lines here
const finalLines = [];

// Cat's head (circle-like shape)
const headCenter = [62, 62];
const headRadius = 40;
const head = [];
const segments = 20;
for (let i = 0; i <= segments; i++) {
  const angle = (Math.PI * 2 * i) / segments;
  const x = headCenter[0] + Math.cos(angle) * headRadius;
  const y = headCenter[1] + Math.sin(angle) * headRadius;
  head.push([x, y]);
}
finalLines.push(head);

// Cat's ears (triangles)
const earHeight = 20;
const earWidth = 15;
// Left ear
finalLines.push([
  [headCenter[0] - 30, headCenter[1] - 30], // Bottom left
  [headCenter[0] - 45, headCenter[1] - 50], // Tip
  [headCenter[0] - 15, headCenter[1] - 50], // Bottom right
  [headCenter[0] - 30, headCenter[1] - 30]  // Back to start
]);
// Right ear
finalLines.push([
  [headCenter[0] + 30, headCenter[1] - 30], // Bottom right
  [headCenter[0] + 45, headCenter[1] - 50], // Tip
  [headCenter[0] + 15, headCenter[1] - 50], // Bottom left
  [headCenter[0] + 30, headCenter[1] - 30]  // Back to start
]);

// Cat's eyes (circles)
const eyeRadius = 5;
const eyeOffsetX = 20;
const eyeOffsetY = 10;
const leftEye = [];
const rightEye = [];
for (let i = 0; i <= segments; i++) {
  const angle = (Math.PI * 2 * i) / segments;
  const lx = headCenter[0] - eyeOffsetX + Math.cos(angle) * eyeRadius;
  const ly = headCenter[1] - eyeOffsetY + Math.sin(angle) * eyeRadius;
  const rx = headCenter[0] + eyeOffsetX + Math.cos(angle) * eyeRadius;
  const ry = headCenter[1] - eyeOffsetY + Math.sin(angle) * eyeRadius;
  leftEye.push([lx, ly]);
  rightEye.push([rx, ry]);
}
finalLines.push(leftEye, rightEye);

// Cat's nose (small triangle)
finalLines.push([
  [headCenter[0] - 5, headCenter[1] + 10], // Left corner
  [headCenter[0] + 5, headCenter[1] + 10], // Right corner
  [headCenter[0], headCenter[1] + 15],     // Bottom tip
  [headCenter[0] - 5, headCenter[1] + 10]  // Back to start
]);

// Cat's mouth (small curves)
const mouth = [];
const mouthSegments = 10;
// Left side of the mouth
for (let i = 0; i <= mouthSegments; i++) {
  const angle = (Math.PI * i) / mouthSegments; // Half-circle
  const x = headCenter[0] - 5 + Math.cos(angle) * 10;
  const y = headCenter[1] + 15 + Math.sin(angle) * 5;
  mouth.push([x, y]);
}
// Right side of the mouth
for (let i = 0; i <= mouthSegments; i++) {
  const angle = (Math.PI * i) / mouthSegments; // Half-circle
  const x = headCenter[0] + 5 - Math.cos(angle) * 10;
  const y = headCenter[1] + 15 + Math.sin(angle) * 5;
  mouth.push([x, y]);
}
finalLines.push(mouth);

// Cat's whiskers
const whiskerLength = 20;
// Left whiskers
finalLines.push(
  [[headCenter[0] - 15, headCenter[1] + 10], [headCenter[0] - 35, headCenter[1] + 5]],
  [[headCenter[0] - 15, headCenter[1] + 15], [headCenter[0] - 35, headCenter[1] + 15]],
  [[headCenter[0] - 15, headCenter[1] + 20], [headCenter[0] - 35, headCenter[1] + 25]]
);
// Right whiskers
finalLines.push(
  [[headCenter[0] + 15, headCenter[1] + 10], [headCenter[0] + 35, headCenter[1] + 5]],
  [[headCenter[0] + 15, headCenter[1] + 15], [headCenter[0] + 35, headCenter[1] + 15]],
  [[headCenter[0] + 15, headCenter[1] + 20], [headCenter[0] + 35, headCenter[1] + 25]]
);

// Rotate all lines by 180 degrees
bt.rotate(finalLines, 180);

// Draw the final lines
drawLines(finalLines);
