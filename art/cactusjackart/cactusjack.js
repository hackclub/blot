/*
@title: cactus jack in the stars
@author: Atharv and Aditya
@snapshot: cactusjack.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Function to generate a stationary cactus body
function generateCactusBody(x, y) {
  const bodyHeight = 70; // Scaled down height
  const bodyWidth = 18;  // Scaled down width

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
  const armHeight = bt.randInRange(0.2, 0.3) * 60; // Scaled down height
  const armWidth = bt.randInRange(0.08, 0.12) * 30; // Scaled down width
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

  bt.translate(arm, [(bt.randInRange(-1, 1) * 10) / 6, (bt.randInRange(-1, 1) * 10) / 6]);
  bt.rotate(arm, bt.randInRange(-20, 20), [x, y]);  // Rotation with respect to the arm's base

  return arm;
}

// Function to generate the eyes with glasses
function generateEyes(x, y) {
  const eyeRadius = 2.5; // Scaled down radius for eyes
  const eyeSpacing = 6;  // Scaled down spacing between eyes
  const eyeDotRadius = 0.8; // Scaled down radius for eye dots

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
    const dreadLength = bt.randInRange(8, 10); // Scaled down length for dreadlocks
    const dreadWidth = 1.5; // Scaled down width for dreadlocks
    const dreadX = x + bt.randInRange(-7, 7); // Scaled down horizontal position for dreadlocks

    let dread = bt.catmullRom([
      [dreadX, y],
      [dreadX + bt.randInRange(-2, 2), y - dreadLength * 0.5],
      [dreadX + bt.randInRange(-2, 2), y - dreadLength]
    ], 10);

    dreadlocks.push(dread);
  }

  return dreadlocks;
}

// Function to generate a mouth with random length
function generateMouth(x, y) {
  const mouthWidth = bt.randInRange(8, 18); // Scaled down width for the mouth
  const mouthY = y - 18; // Scaled down position of the mouth

  return [
    [x - mouthWidth / 2, mouthY],
    [x + mouthWidth / 2, mouthY]
  ];
}

// Function to generate spikes on the cactus
function generateSpikes(cactusParts) {
  const spikes = [];

  cactusParts.forEach(part => {
    // Check if 'part' is an array and if its elements are also arrays (indicating polylines)
    if (Array.isArray(part) && part.every(point => Array.isArray(point))) {
      part.forEach(([x, y]) => {
        if (bt.rand() > 0.8) { // Sparse spikes
          const spikeLength = bt.randInRange(2, -2); // Scaled down spikes
          const angle = bt.randInRange(0, 360);
          const spikeEndX = x + spikeLength * Math.cos(angle);
          const spikeEndY = y + spikeLength * Math.sin(angle);

          spikes.push([[x, y], [spikeEndX, spikeEndY]]);
        }
      });
    }
  });

  return spikes;
}

// Function to generate multiple stars
function generateStars(numStars) {
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const t = new bt.Turtle();
    const starSize = bt.randInRange(8, 26); // Size of stars
    const starX = bt.randInRange(0, width);
    const starY = bt.randInRange(0, height);

    t.jump([starX, starY]);

    for (let j = 0; j < starSize; j++) {
      const temp = bt.randInRange(1, 2);
      t.forward(temp);
      t.right(144);
    }

    bt.join(stars, t.lines());
  }

  return stars;
}

const numStars = 20; // Number of stars
const stars = generateStars(numStars);

const cactusX = width / 2;
const cactusY = height / 2;
const cactusBody = generateCactusBody(cactusX, cactusY);
const cacti = [cactusBody];

// Generate exactly one left arm and one right arm
const leftArmX = cactusX - 10; // Scaled down position for the left arm
const rightArmX = cactusX + 10; // Scaled down position for the right arm
const leftArmY = bt.randInRange(cactusY - 15, cactusY + 5); // Scaled down randomize left arm position within the body height
const rightArmY = bt.randInRange(cactusY - 15, cactusY + 5); // Scaled down randomize right arm position within the body height

const leftArm = generateCactusArm(leftArmX, leftArmY, 'left');
const rightArm = generateCactusArm(rightArmX, rightArmY, 'right');

cacti.push(...leftArm);
cacti.push(...rightArm);

// Generate eyes with glasses
const eyes = generateEyes(cactusX, cactusY + 20); // Scaled down
eyes.forEach(eye => cacti.push(eye));

// Generate dreadlocks
const dreadlocks = generateDreadlocks(cactusX, cactusY + 35, 6); // 4 dreadlocks, scaled down
dreadlocks.forEach(dread => cacti.push(dread));

// Generate mouth
const mouth = generateMouth(cactusX, cactusY);
cacti.push(mouth);

// Optionally generate spikes
const spikes = generateSpikes(cacti);
spikes.forEach(spike => cacti.push(spike));

// Combine stars and cacti parts
const finalDrawing = [];
bt.join(finalDrawing, cacti);
bt.join(finalDrawing, stars);

bt.translate(finalDrawing, [width / 2, height / 2], bt.bounds(finalDrawing).cc);
drawLines(finalDrawing);
