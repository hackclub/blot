// check out the workshop tab to get started
// welcome to blot!
/*
@title: SHREK
@author: Anirudh Paladugula 
@snapshot: Shrek3
*/
// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// function to create a simple circle
function createCircle(cx, cy, radius, numPoints) {
  const circle = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    circle.push([x, y]);
  }
  circle.push(circle[0]); // Close the circle
  return circle;
}

// function to create a simple oval
function createOval(cx, cy, rx, ry, numPoints) {
  const oval = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    oval.push([x, y]);
  }
  oval.push(oval[0]); // Close the oval
  return oval;
}

// function to create a polyline
function createPolyline(points) {
  return points.concat([points[0]]);
}

// Generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random float within a range
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Generate one version of Shrek's face
function generateShrekFace() {
  // Randomize head size and position
  const headWidth = getRandomInt(28, 32);
  const headHeight = getRandomInt(38, 42);
  const headX = width / 2;
  const headY = height / 2;
  const head = createOval(headX, headY, headWidth, headHeight, 100);
  finalLines.push(head);

  // Randomize ears size and position
  const leftEar = createOval(headX - headWidth - 5, headY - 20, 5, 15, 20);
  const rightEar = createOval(headX + headWidth + 5, headY - 20, 5, 15, 20);
  finalLines.push(leftEar);
  finalLines.push(rightEar);

  // Randomize eyes size and position
  const eyeRadius = getRandomInt(4, 6);
  const eyeOffsetX = getRandomInt(8, 12);
  const eyeOffsetY = getRandomInt(8, 12);
  const leftEye = createCircle(headX - eyeOffsetX, headY - eyeOffsetY, eyeRadius, 20);
  const rightEye = createCircle(headX + eyeOffsetX, headY - eyeOffsetY, eyeRadius, 20);
  finalLines.push(leftEye);
  finalLines.push(rightEye);

  // Randomize pupils size and position
  const pupilRadius = getRandomInt(1, 3);
  const leftPupil = createCircle(headX - eyeOffsetX, headY - eyeOffsetY, pupilRadius, 10);
  const rightPupil = createCircle(headX + eyeOffsetX, headY - eyeOffsetY, pupilRadius, 10);
  finalLines.push(leftPupil);
  finalLines.push(rightPupil);

  // Randomize eyebrows position
  const eyebrowOffsetY = getRandomInt(12, 18);
  const leftEyebrow = createPolyline([
    [headX - eyeOffsetX - 5, headY - eyebrowOffsetY],
    [headX - eyeOffsetX + 5, headY - eyebrowOffsetY - 5]
  ]);
  const rightEyebrow = createPolyline([
    [headX + eyeOffsetX + 5, headY - eyebrowOffsetY],
    [headX + eyeOffsetX - 5, headY - eyebrowOffsetY - 5]
  ]);
  finalLines.push(leftEyebrow);
  finalLines.push(rightEyebrow);

  // Randomize nose position
  const noseOffsetY = getRandomInt(5, 15);
  const nose = createPolyline([
    [headX - 5, headY + noseOffsetY],
    [headX, headY + noseOffsetY + 10],
    [headX + 5, headY + noseOffsetY]
  ]);
  finalLines.push(nose);

  // Randomize mouth position
  const mouthOffsetY = getRandomInt(18, 22);
  const mouth = createPolyline([
    [headX - 15, headY + mouthOffsetY],
    [headX - 10, headY + mouthOffsetY + 5],
    [headX + 10, headY + mouthOffsetY + 5],
    [headX + 15, headY + mouthOffsetY]
  ]);
  finalLines.push(mouth);

  // Randomize teeth position
  const leftTeeth = createPolyline([
    [headX - 10, headY + mouthOffsetY + 5],
    [headX - 5, headY + mouthOffsetY]
  ]);
  const rightTeeth = createPolyline([
    [headX + 5, headY + mouthOffsetY],
    [headX + 10, headY + mouthOffsetY + 5]
  ]);
  finalLines.push(leftTeeth);
  finalLines.push(rightTeeth);

  // Randomize neck position
  const neck = createPolyline([
    [headX - 15, headY + 40],
    [headX + 15, headY + 40]
  ]);
  finalLines.push(neck);

  // Randomize shoulders position
  const shoulders = createPolyline([
    [headX - 30, headY + 45],
    [headX - 15, headY + 40],
    [headX + 15, headY + 40],
    [headX + 30, headY + 45]
  ]);
  finalLines.push(shoulders);
}

// Generate three versions of Shrek's face
generateShrekFace();
generateShrekFace();
generateShrekFace();

// draw it
drawLines(finalLines);