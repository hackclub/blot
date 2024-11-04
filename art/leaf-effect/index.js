/*
@title: leaf-effect
@author: Elijah R. Spitzer
@snapshot: snapshot1.png
*/

setDocDimensions(125, 125);

function rotatePoint([x, y], angle) {
  const centerX = 62.5;
  const centerY = 62.5;
  const radians = (Math.PI / 180) * angle;
  const rotatedX = centerX + (x - centerX) * Math.cos(radians) - (y - centerY) * Math.sin(radians);
  const rotatedY = centerY + (x - centerX) * Math.sin(radians) + (y - centerY) * Math.cos(radians);
  return [rotatedX, rotatedY];
}

function drawLeaf(rotationAngle, offsetX, offsetY) {
  const leafOutline = [
    [62.5 + offsetX, 20 + offsetY],
    [80 + offsetX, 40 + offsetY],
    [80 + offsetX, 60 + offsetY],
    [62.5 + offsetX, 100 + offsetY],
    [45 + offsetX, 60 + offsetY],
    [45 + offsetX, 40 + offsetY],
    [62.5 + offsetX, 20 + offsetY]
  ].map(point => rotatePoint(point, rotationAngle));

  drawLines([leafOutline]);

  const midrib = [
    [62.4 + offsetX, 20 + offsetY],
    [62.5 + offsetX, 100 + offsetY]
  ].map(point => rotatePoint(point, rotationAngle));

  drawLines([midrib]);

  const sideVeins = [
    [[62.5 + offsetX, 30 + offsetY], [70 + offsetX, 40 + offsetY]],
    [[62.5 + offsetX, 50 + offsetY], [75 + offsetX, 60 + offsetY]],
    [[62.5 + offsetX, 70 + offsetY], [70 + offsetX, 80 + offsetY]],
    [[62.5 + offsetX, 30 + offsetY], [55 + offsetX, 40 + offsetY]],
    [[62.5 + offsetX, 50 + offsetY], [50 + offsetX, 60 + offsetY]],
    [[62.5 + offsetX, 70 + offsetY], [55 + offsetX, 80 + offsetY]]
  ].map(vein => vein.map(point => rotatePoint(point, rotationAngle)));

  drawLines(sideVeins);
}

for (let i = 0; i < 3; i++) {
  const randomRotation = bt.randIntInRange(0, 360); 
  const offsetX = bt.randIntInRange(-5, 5);         
  const offsetY = bt.randIntInRange(-5, 5);         
  drawLeaf(randomRotation, offsetX, offsetY);
}
