/*
@title: Randomized Leaf Mandala
@author: Elijah R. Spitzer
@snapshot: leaf_mandala.png
*/

setDocDimensions(125, 125);

function rotatePoint([x, y], angle, centerX, centerY) {
  const radians = (Math.PI / 180) * angle;
  const dx = x - centerX;
  const dy = y - centerY;
  const rotatedX = centerX + dx * Math.cos(radians) - dy * Math.sin(radians);
  const rotatedY = centerY + dx * Math.sin(radians) + dy * Math.cos(radians);
  return [rotatedX, rotatedY];
}

function drawLeaf(centerX, centerY, rotationAngle, scale) {
  const leafOutline = [
    [centerX, centerY - 20 * scale],
    [centerX + 7.5 * scale, centerY - 10 * scale],
    [centerX + 7.5 * scale, centerY],
    [centerX, centerY + 20 * scale],
    [centerX - 7.5 * scale, centerY],
    [centerX - 7.5 * scale, centerY - 10 * scale],
    [centerX, centerY - 20 * scale],
  ].map((point) => rotatePoint(point, rotationAngle, centerX, centerY));

  drawLines([leafOutline]);

  const midrib = [
    [centerX, centerY - 20 * scale],
    [centerX, centerY + 20 * scale],
  ].map((point) => rotatePoint(point, rotationAngle, centerX, centerY));

  drawLines([midrib]);

  const sideVeins = [
    [[centerX, centerY - 15 * scale], [centerX + 5 * scale, centerY - 5 * scale]],
    [[centerX, centerY - 5 * scale], [centerX + 6 * scale, centerY + 5 * scale]],
    [[centerX, centerY + 5 * scale], [centerX + 5 * scale, centerY + 15 * scale]],
    [[centerX, centerY - 15 * scale], [centerX - 5 * scale, centerY - 5 * scale]],
    [[centerX, centerY - 5 * scale], [centerX - 6 * scale, centerY + 5 * scale]],
    [[centerX, centerY + 5 * scale], [centerX - 5 * scale, centerY + 15 * scale]],
  ].map((vein) =>
    vein.map((point) => rotatePoint(point, rotationAngle, centerX, centerY))
  );

  drawLines(sideVeins);
}

const centerX = 62.5;
const centerY = 62.5;
const numLeaves = bt.randIntInRange(8, 16);
const radius = 30;

for (let i = 0; i < numLeaves; i++) {
  const angle = (360 / numLeaves) * i + bt.randIntInRange(-10, 10);
  const leafRotation = bt.randIntInRange(-30, 30);
  const scale = bt.randIntInRange(80, 120) / 100;

  const radian = (Math.PI / 180) * angle;
  const leafX = centerX + radius * Math.cos(radian);
  const leafY = centerY + radius * Math.sin(radian);

  drawLeaf(leafX, leafY, angle + leafRotation, scale);
}