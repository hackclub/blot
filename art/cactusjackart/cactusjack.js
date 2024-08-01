/*
@title: cactus jack
@author: Atharv and Aditya
@snapshot: cactusjack.png
*/

const width = 125;
const height = 125;
const rr = bt.randInRange;

setDocDimensions(width, height);

// Function to generate a stationary cactus body
function generateCactusBody(x, y) {
  const bodyHeight = 80; // Fixed height
  const bodyWidth = 23; // Fixed width

  return bt.catmullRom([
    [x, y + bodyHeight / 2],
    [x - bodyWidth / 2, y + bodyHeight * 0.35],
    [x - bodyWidth / 2, y - bodyHeight * 0.35],
    [x, y - bodyHeight / 2],
    [x + bodyWidth / 2, y - bodyHeight * 0.35],
    [x + bodyWidth / 2, y + bodyHeight * 0.35],
    [x, y + bodyHeight / 2]
  ], 20);
}

// Function to generate an oval cactus arm
function generateCactusArm(x, y, direction) {
  const armHeight = rr(0.25, 0.4) * 74; // Bigger arm height based on body height
  const armWidth = rr(0.1, 0.15) * 39; // Bigger arm width based on body width
  const parity = direction === 'left' ? -1 : 1;

  let arm = [bt.catmullRom([
    [x, y + armHeight / 2],
    [x + parity * armWidth / 2, y + armHeight * 0.3],
    [x + parity * armWidth / 2, y - armHeight * 0.3],
    [x, y - armHeight / 2],
    [x - parity * armWidth / 2, y - armHeight * 0.3],
    [x - parity * armWidth / 2, y + armHeight * 0.3],
    [x, y + armHeight / 2]
  ], 20)];

  // Apply translation and rotation to the arm to make it slanted and jut out
  bt.translate(arm, [(bt.randInRange(-1, 1) * 10) / 6, (bt.randInRange(-1, 1) * 10) / 6]);
  bt.rotate(arm, bt.randInRange(-20, 20), [x, y]);  // Rotation with respect to the arm's base

  return arm;
}

// Function to generate the eyes with glasses
function generateEyes(x, y) {
  const eyeRadius = 3; // Fixed radius for eyes
  const eyeSpacing = 8; // Fixed spacing between eyes
  const eyeDotRadius = 1; // Radius for eye dots

  const leftEye = [
    [x - eyeSpacing / 2 - eyeRadius, y + eyeRadius],
    [x - eyeSpacing / 2 + eyeRadius, y + eyeRadius],
    [x - eyeSpacing / 2 + eyeRadius, y - eyeRadius],
    [x - eyeSpacing / 2 - eyeRadius, y - eyeRadius],
    [x - eyeSpacing / 2 - eyeRadius, y + eyeRadius]
  ];

  const rightEye = [
    [x + eyeSpacing / 2 - eyeRadius, y + eyeRadius],
    [x + eyeSpacing / 2 + eyeRadius, y + eyeRadius],
    [x + eyeSpacing / 2 + eyeRadius, y - eyeRadius],
    [x + eyeSpacing / 2 - eyeRadius, y - eyeRadius],
    [x + eyeSpacing / 2 - eyeRadius, y + eyeRadius]
  ];

  const leftEyeDot = [
    [x - eyeSpacing / 2 - eyeDotRadius, y + eyeDotRadius],
    [x - eyeSpacing / 2 + eyeDotRadius, y + eyeDotRadius],
    [x - eyeSpacing / 2 + eyeDotRadius, y - eyeDotRadius],
    [x - eyeSpacing / 2 - eyeDotRadius, y - eyeDotRadius],
    [x - eyeSpacing / 2 - eyeDotRadius, y + eyeDotRadius]
  ];

  const rightEyeDot = [
    [x + eyeSpacing / 2 - eyeDotRadius, y + eyeDotRadius],
    [x + eyeSpacing / 2 + eyeDotRadius, y + eyeDotRadius],
    [x + eyeSpacing / 2 + eyeDotRadius, y - eyeDotRadius],
    [x + eyeSpacing / 2 - eyeDotRadius, y - eyeDotRadius],
    [x + eyeSpacing / 2 - eyeDotRadius, y + eyeDotRadius]
  ];

  return [leftEye, rightEye, leftEyeDot, rightEyeDot];
}

// Function to generate dreadlocks
function generateDreadlocks(x, y, numDreadlocks) {
  const dreadlocks = [];

  for (let i = 0; i < numDreadlocks; i++) {
    const dreadLength = rr(10, 30); // Random length for dreadlocks
    const dreadWidth = 2; // Fixed width for dreadlocks
    const dreadX = x + rr(-10, 10); // Random horizontal position for dreadlocks

    let dread = bt.catmullRom([
      [dreadX, y],
      [dreadX + rr(-2, 2), y - dreadLength * 0.5],
      [dreadX + rr(-2, 2), y - dreadLength]
    ], 10);

    dreadlocks.push(dread);
  }

  return dreadlocks;
}

// Function to generate a mouth with random length
function generateMouth(x, y) {
  const mouthWidth = rr(10, 30); // Random width for the mouth
  const mouthY = y - 20; // Position of the mouth

  return [
    [x - mouthWidth / 2, mouthY],
    [x + mouthWidth / 2, mouthY]
  ];
}

const cactusX = width / 2;
const cactusY = height / 2;
const cactusBody = generateCactusBody(cactusX, cactusY);
const cacti = [cactusBody];

// Generate exactly one left arm and one right arm
const leftArmX = cactusX - 15; // Position for the left arm
const rightArmX = cactusX + 15; // Position for the right arm
const leftArmY = rr(cactusY - 20, cactusY + 10); // Randomize left arm position within the body height
const rightArmY = rr(cactusY - 20, cactusY + 10); // Randomize right arm position within the body height

const leftArm = generateCactusArm(leftArmX, leftArmY, 'left');
const rightArm = generateCactusArm(rightArmX, rightArmY, 'right');

cacti.push(leftArm);
cacti.push(rightArm);

// Generate eyes with glasses
const eyes = generateEyes(cactusX, cactusY + 25);
eyes.forEach(eye => cacti.push(eye));

// Generate dreadlocks
const dreadlocks = generateDreadlocks(cactusX, cactusY + 40, 5); // 5 dreadlocks for this example
dreadlocks.forEach(dread => cacti.push(dread));

// Generate mouth
const mouth = generateMouth(cactusX, cactusY);
cacti.push(mouth);

// Combine all cacti parts and draw
const finalCacti = [];
cacti.forEach(cactus => {
  finalCacti.push(cactus);
});

bt.translate(finalCacti, [width / 2, height / 2], bt.bounds(finalCacti).cc);
drawLines(finalCacti);