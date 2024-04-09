/*
@title: Random Cat Generator
@author: TheBaconPug
@snapshot: cat1.png
*/

const width = 125;
const height = 125;

const segments = 100;
const radius = 40;
const jitterStrength = 5;

const earLength = bt.randIntInRange(12, 20);
const earWidth = bt.randIntInRange(12, 20);

const eyeRadius = 7;
const eyeDistance = 10;

const noseWidth = 10;
const noseHeight = 10;

const mouthWidth = 10;
const mouthHeight = 10;

const whiskerLength = 25;
const numWhiskers = bt.randIntInRange(3, 6);

setDocDimensions(width, height);

const finalLines = [];
const t = new bt.Turtle();

function drawCircle(x, y, radius) {
  t.up();
  t.goTo([x, y]);
  t.down();
  t.arc(360, radius);
}

// head
for (let i = 0; i <= segments; i++) {
  const angle = (i / segments) * 360;
  const jitterX = bt.rand() * jitterStrength;
  const jitterY = bt.rand() * jitterStrength;
  const x = radius * Math.cos((angle * Math.PI) / 180) + jitterX;
  const y = radius * Math.sin((angle * Math.PI) / 180) + jitterY;
  if (i === 0) {
    t.jump([x, y]);
  } else {
    t.goTo([x, y]);
  }
}

// ears
const earModifier = bt.randIntInRange(3, 6);

for (let i = 0; i < 2; i++) {
  t.up();
  const startX = (i === 0 ? -1 : 1) * (radius + earWidth / 2);
  const startY = radius + earModifier;
  const endX = (i === 0 ? -1 : 1) * (radius - earWidth);
  const endY = radius - earLength + earModifier;
  const midX = (startX + endX) / 2;
  const jitteredMidX = midX + (bt.rand() - 0.5) * jitterStrength;
  const jitteredEndY = endY + (bt.rand() - 0.5) * jitterStrength;
  t.goTo([startX, startY]);
  t.down();
  t.goTo([endX, endY]);
  t.goTo([jitteredMidX, jitteredEndY]);
  t.goTo([startX, startY]);
}

// eyes
const leftEyeY = bt.randIntInRange(10, 15);
const rightEyeY = bt.randIntInRange(10, 15);
drawCircle(-eyeDistance, leftEyeY, eyeRadius);
drawCircle(eyeDistance, rightEyeY, eyeRadius);

const pupilX = eyeDistance + (bt.rand() * eyeRadius) / 2;
drawCircle(-pupilX, leftEyeY + bt.rand() * 3, eyeRadius / 2);
drawCircle(pupilX, rightEyeY + bt.rand() * 3, eyeRadius / 2);

// nose
t.up();
const noseX = bt.randIntInRange(-5, 5);
const noseY = bt.randIntInRange(-10, 2);
t.goTo([noseX, noseY]);
t.down();
t.goTo([noseX + noseWidth / 2, noseY + noseHeight]);
t.goTo([noseX - noseWidth / 2, noseY + noseHeight]);
t.goTo([noseX, noseY]);

// mouth
const mouthX = noseX;
const mouthY = noseY - mouthHeight;
t.up();
t.goTo([mouthX - mouthWidth, mouthY]);
t.down();
t.arc(bt.randIntInRange(70, 90), mouthWidth);
t.arc(bt.randIntInRange(70, 90), -mouthWidth);

// whiskers
for (let i = 0; i < numWhiskers; i++) {
  const angle = bt.randIntInRange(20, 50);

  const whiskerEndX = noseX + Math.cos((angle * Math.PI) / 180) * whiskerLength;
  const whiskerEndY = noseY + Math.sin((angle * Math.PI) / 180) * whiskerLength;

  // left
  const leftWhiskerX = noseX - whiskerEndX;
  const leftWhiskerY = noseY - whiskerEndY;
  t.up();
  t.goTo([noseX - 5, noseY]);
  t.down();
  t.goTo([leftWhiskerX, leftWhiskerY]);

  // right
  const rightWhiskerX = noseX + whiskerEndX;
  const rightWhiskerY = noseY - whiskerEndY;
  t.up();
  t.goTo([noseX + 5, noseY]);
  t.down();
  t.goTo([rightWhiskerX, rightWhiskerY]);
}

bt.join(finalLines, t.lines());

const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

drawLines(finalLines);
