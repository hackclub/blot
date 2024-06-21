const width = 200;
const height = 200;

setDocDimensions(width, height);

// expose parameters at the top of the code
const randSeed = Math.random(); // random seed for variations
const rotationAngle = 10; // rotation angle for the entire design
const letterSize = 50; // size of the letters
const positionOffset = 10; // offset for the positions of the letters



// function to create the letter H
function createH(centerX, centerY, size) {
  const halfSize = size / 2;
  return [
    [centerX - halfSize, centerY + halfSize],
    [centerX - halfSize, centerY - halfSize],
    [centerX - halfSize, centerY - halfSize / 3],
    [centerX + halfSize, centerY - halfSize / 3],
    [centerX + halfSize, centerY - halfSize],
    [centerX + halfSize, centerY + halfSize],
    [centerX + halfSize, centerY + halfSize / 3],
    [centerX - halfSize, centerY + halfSize / 3],
    [centerX - halfSize, centerY + halfSize]
  ];
}

// function to create the letter C
function createC(centerX, centerY, size) {
  const halfSize = size / 2;
  return [
    [centerX + halfSize, centerY + halfSize],
    [centerX - halfSize, centerY + halfSize],
    [centerX - halfSize, centerY - halfSize],
    [centerX + halfSize, centerY - halfSize],
    [centerX + halfSize * 0.8, centerY - halfSize * 0.8],
    [centerX - halfSize * 0.8, centerY - halfSize * 0.8],
    [centerX - halfSize * 0.8, centerY + halfSize * 0.8],
    [centerX + halfSize * 0.8, centerY + halfSize * 0.8],
    [centerX + halfSize, centerY + halfSize]
  ];
}

// function to create a rounded square
function createRoundedSquare(centerX, centerY, size, cornerRadius) {
  const halfSize = size / 2;
  return [
    [centerX - halfSize + cornerRadius, centerY - halfSize],
    [centerX + halfSize - cornerRadius, centerY - halfSize],
    [centerX + halfSize, centerY - halfSize + cornerRadius],
    [centerX + halfSize, centerY + halfSize - cornerRadius],
    [centerX + halfSize - cornerRadius, centerY + halfSize],
    [centerX - halfSize + cornerRadius, centerY + halfSize],
    [centerX - halfSize, centerY + halfSize - cornerRadius],
    [centerX - halfSize, centerY - halfSize + cornerRadius],
    [centerX - halfSize + cornerRadius, centerY - halfSize]
  ];
}

// generate multiple versions
for (let i = 0; i < 3; i++) {
  // store final lines here
  const finalLines = [];

  // create the rounded square
  const squareSize = 150;
  const cornerRadius = 20;
  const squareCenterX = width / 2 + (Math.random() - 0.5) * positionOffset;
  const squareCenterY = height / 2 + (Math.random() - 0.5) * positionOffset;
  const roundedSquare = createRoundedSquare(squareCenterX, squareCenterY, squareSize, cornerRadius);
  finalLines.push(roundedSquare);

  // create the stylized H polyline
  const hCenterX = width / 2 - squareSize / 4 + (Math.random() - 0.5) * positionOffset;
  const hCenterY = height / 2 + (Math.random() - 0.5) * positionOffset;
  const hPolyline = createH(hCenterX, hCenterY, letterSize);
  finalLines.push(hPolyline);

  // create the stylized C polyline
  const cCenterX = width / 2 + squareSize / 4 + (Math.random() - 0.5) * positionOffset;
  const cCenterY = height / 2 + (Math.random() - 0.5) * positionOffset;
  const cPolyline = createC(cCenterX, cCenterY, letterSize);
  finalLines.push(cPolyline);

  // transform lines using the toolkit
  bt.rotate(finalLines, rotationAngle);

  // draw the final lines
  drawLines(finalLines);
}
