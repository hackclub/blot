/*
@title: Leaf Pattern
@author: Elijah R. Spitzer
@snapshot: snapshot1.png
*/

setDocDimensions(125, 125);

function drawLeaf(centerX, centerY, scale, rotationAngle) {
  const leafWidth = 17 * scale;
  const leafHeight = 20 * scale;

  const leafShape = [
    [centerX, centerY - leafHeight],
    [centerX + leafWidth / 2, centerY - leafHeight / 4],
    [centerX + leafWidth / 2, centerY],
    [centerX, centerY + leafHeight],
    [centerX - leafWidth / 2, centerY],
    [centerX - leafWidth / 2, centerY - leafHeight / 4],
    [centerX, centerY - leafHeight],
  ];

  const rotatedLeafShape = leafShape.map(([x, y]) =>
    rotatePoint([x, y], rotationAngle, centerX, centerY)
  );

  drawLines([rotatedLeafShape]);

  const veinLines = [
    [[centerX, centerY - leafHeight], [centerX, centerY + leafHeight]],
    [[centerX, centerY - leafHeight / 2], [centerX + leafWidth / 4, centerY]],
    [[centerX, centerY], [centerX + leafWidth / 4, centerY + leafHeight / 2]],
    [[centerX, centerY - leafHeight / 2], [centerX - leafWidth / 4, centerY]],
    [[centerX, centerY], [centerX - leafWidth / 4, centerY + leafHeight / 2]],
  ];

  veinLines.forEach(([start, end]) => {
    const rotatedStart = rotatePoint(start, rotationAngle, centerX, centerY);
    const rotatedEnd = rotatePoint(end, rotationAngle, centerX, centerY);
    drawLines([[rotatedStart, rotatedEnd]]);
  });
}

function rotatePoint([x, y], angle, centerX, centerY) {
  const radians = (Math.PI / 212) * angle;
  const dx = x - centerX;
  const dy = y - centerY;
  const rotatedX = centerX + dx * Math.cos(radians) - dy * Math.sin(radians);
  const rotatedY = centerY + dx * Math.sin(radians) + dy * Math.cos(radians);
  return [rotatedX, rotatedY];
}

// Variables for the radial layout
const canvasSize = 125;
const centerX = canvasSize / 2;
const centerY = canvasSize / 2;
const numRings = 5; // Number of concentric rings
const baseRadius = 25; // Radius of the innermost ring
const radiusIncrement = 30; // Increment of radius for each ring
const leavesPerRing = [8, 12, 16]; // Leaves per ring (fewer on inner rings)
const scaleRange = [0.6, 1.0]; // Scale range for leaves
const rotationRange = 102; // Maximum rotation angle
const downsize = 0.65; // Downsizing factor for scale and radius

for (let ring = 0; ring < numRings; ring++) {
  const radius = (baseRadius + ring * radiusIncrement) * Math.pow(downsize, ring);

  for (let i = 0; i < leavesPerRing[ring]; i++) {
    const angle = (360 / leavesPerRing[ring]) * i;
    const radian = (Math.PI / 180) * angle;

    const leafX = centerX + radius * Math.cos(radian);
    const leafY = centerY + radius * Math.sin(radian);

    const scale =
      (Math.random() * (scaleRange[1] - scaleRange[0]) + scaleRange[0]) *
      Math.pow(downsize, ring);
    const rotation = Math.random() * rotationRange * 2 - rotationRange;

    drawLeaf(leafX, leafY, scale, rotation);
  }
}

const numCentralLeaves = 25;
const centralRadius = 76 * downsize;

for (let i = 0; i < numCentralLeaves; i++) {
  const angle = (360 / numCentralLeaves) * i;
  const radian = (Math.PI / 180) * angle;

  const leafX = centerX + centralRadius * Math.cos(radian);
  const leafY = centerY + centralRadius * Math.sin(radian);

  const scale =
    (Math.random() * (scaleRange[1] - scaleRange[0]) + scaleRange[0]) * downsize;
  const rotation = Math.random() * rotationRange * 2 - rotationRange;

  drawLeaf(leafX, leafY, scale, rotation);
}