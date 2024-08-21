/*
@title: Baseball field
@author: Ventengo
@snapshot: pic1
*/

const width = 125;
const height = 125;
const smallSquareSize = 20;
const smallSquareOffsets = [
  [0, 0],
  [width - smallSquareSize, 0],
  [width - smallSquareSize, height - smallSquareSize],
  [0, height - smallSquareSize]
];



setDocDimensions(width * 2, height * 2);

const lines = [];
const triangles = [];

// Draw the mound
const moundRadius = 15;
const moundX = width / 2;
const moundY = height / 2;
const numPoints = 30;
const angleIncrement = 2 * Math.PI / numPoints;
for (let i = 0; i < numPoints; i++) {
  const angle = i * angleIncrement;
  const x = moundX + moundRadius * Math.cos(angle);
  const y = moundY + moundRadius * Math.sin(angle);
  lines.push([
    [x, y],
    [moundX + moundRadius * Math.cos(angle + angleIncrement), moundY + moundRadius * Math.sin(angle + angleIncrement)]
  ]);
}

// Draw the fence
const fenceRadius = 196;
const fenceRotation = 105;
const fenceStartAngle = Math.PI / 2 + fenceRotation;
const fenceEndAngle = 2.25 * Math.PI / 2 + fenceRotation;

const fenceCenterX = 39;
const fenceCenterY = 50;

const numFencePoints = 50;
const fenceAngleIncrement = (fenceEndAngle - fenceStartAngle) / numFencePoints;
for (let i = 0; i <= numFencePoints; i++) {
  const angle = fenceStartAngle + i * fenceAngleIncrement;
  const x = fenceCenterX + fenceRadius * Math.cos(angle);
  const y = fenceCenterY + fenceRadius * Math.sin(angle);
  lines.push([
    [x, y],
    [fenceCenterX + fenceRadius * Math.cos(angle + fenceAngleIncrement), fenceCenterY + fenceRadius * Math.sin(angle + fenceAngleIncrement)]
  ]);
}

// Draw the star
const starPoints = 5;
const starInnerRadius = 10;
const starOuterRadius = 20;
const starCenterX = width / 2;
const starCenterY = height / 2;

const starLines = [];
for (let i = 0; i < starPoints; i++) {
  const outerAngle = (i * 2 * Math.PI) / starPoints;
  const innerAngle = outerAngle + Math.PI / starPoints;

  const outerX = starCenterX + starOuterRadius * Math.cos(outerAngle);
  const outerY = starCenterY + starOuterRadius * Math.sin(outerAngle);
  const innerX = starCenterX + starInnerRadius * Math.cos(innerAngle);
  const innerY = starCenterY + starInnerRadius * Math.sin(innerAngle);

  const triangle1 = [
    [10, 144],
    [30, 171],
    [50, 144]
  ];

  const triangle2 = [
    [137, 97],
    [155, 127],
    [173, 100]
  ];

  const triangle3 = [
    [164, 7],
    [177, 32],
    [199, 7]
  ];

  bt.translate(triangles, [2, 16]);
  

  // Draw the triangles
  triangles.push(triangle1);
  triangles.push(triangle2);
  triangles.push(triangle3);
  drawLines(triangles);

  // Draw the outer square
  lines.push([
    [0, 0],
    [width, 0]
  ]);
  lines.push([
    [width, 0],
    [width, height]
  ]);
  lines.push([
    [width, height],
    [0, height]
  ]);
  lines.push([
    [0, height],
    [0, 0]
  ]);



  smallSquareOffsets.forEach(([offsetX, offsetY]) => {
    lines.push([
      [offsetX, offsetY],
      [offsetX + smallSquareSize, offsetY]
    ]);
    lines.push([
      [offsetX + smallSquareSize, offsetY],
      [offsetX + smallSquareSize, offsetY + smallSquareSize]
    ]);
    lines.push([
      [offsetX + smallSquareSize, offsetY + smallSquareSize],
      [offsetX, offsetY + smallSquareSize]
    ]);
    lines.push([
      [offsetX, offsetY + smallSquareSize],
      [offsetX, offsetY]
    ]);
  });



  starLines.push([
    [outerX, outerY],
    [innerX, innerY]
  ]);
}

lines.push(...starLines);

// Draw all lines (including the star)
drawLines(lines);
