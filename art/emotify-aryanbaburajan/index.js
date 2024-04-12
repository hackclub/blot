/*
@title: Emotify
@author: Aryan Baburajan
@snapshot: image3.png
*/

const width = 128;
const height = 128;
setDocDimensions(width, height);
let finalLines = [];
const t = new bt.Turtle();

const radius = 50,
  center = width / 2;

function drawArc(t, angle, radius) {
  const iPos = t.pos;
  const iAngle = t.angle;
  t.up();
  t.right(90);
  t.forward(radius);
  t.left(90);
  t.down();
  t.arc(angle, radius);
  t.jump(iPos);
  t.setAngle(iAngle);
}

// head
t.jump([center, center - radius]);
t.arc(360, radius);

// eyes
const eyes = [
  (t) => {
    const eyeGap = 20,
      eyeSize = 12,
      eyeWidth = 8,
      eyeHeight = 75;
    // l-eye
    t.setAngle(90);
    t.jump([center - eyeGap, eyeHeight]);
    drawArc(t, 170, eyeSize);
    drawArc(t, 180, eyeSize - eyeWidth);
    t.jump([center - eyeGap - eyeSize + eyeWidth / 2, eyeHeight]);
    t.setAngle(-90);
    drawArc(t, 180, eyeWidth / 2);
    t.jump([center - eyeGap + eyeSize - eyeWidth / 2, eyeHeight]);
    t.setAngle(-90);
    drawArc(t, 180, eyeWidth / 2);
    // r-eye
    t.setAngle(90);
    t.jump([center + eyeGap, eyeHeight]);
    drawArc(t, 170, eyeSize);
    drawArc(t, 180, eyeSize - eyeWidth);
    t.jump([center + eyeGap - eyeSize + eyeWidth / 2, eyeHeight]);
    t.setAngle(-90);
    drawArc(t, 180, eyeWidth / 2);
    t.jump([center + eyeGap + eyeSize - eyeWidth / 2, eyeHeight]);
    t.setAngle(-90);
    drawArc(t, 180, eyeWidth / 2);
  },
  (t) => {
    const eyeLength = 12,
      eyeGap = 27,
      eyeHeight = 89,
      eyeWidth = 4;
    // l-eye
    t.jump([center - eyeGap, eyeHeight]);
    t.setAngle(160);
    t.arc(180, eyeWidth);
    t.forward(eyeLength);
    t.right(135);
    t.forward(eyeLength);
    t.arc(180, eyeWidth);
    t.forward(eyeLength);
    t.arc(135, eyeWidth * 2);
    t.forward(eyeLength);
    // r-eye
    t.jump([center + eyeGap, eyeHeight]);
    t.setAngle(380);
    t.arc(-180, eyeWidth);
    t.forward(eyeLength);
    t.left(135);
    t.forward(eyeLength);
    t.arc(-180, eyeWidth);
    t.forward(eyeLength);
    t.arc(-135, eyeWidth * 2);
    t.forward(eyeLength);
  },
  (t) => {
    const eyeLength = 12,
      eyeGap = 27,
      eyeHeight = 89,
      eyeWidth = 4;
    // l-eye
    t.jump([center - eyeGap, eyeHeight]);
    t.setAngle(160);
    t.arc(180, eyeWidth);
    t.forward(eyeLength);
    t.arc(180, eyeWidth);
    t.forward(eyeLength);
    t.up();
    t.right(180);
    t.forward(eyeLength);
    t.arc(-180, eyeWidth);
    t.down();
    t.arc(360, eyeWidth);
    // r-eye
    t.jump([center + eyeGap, eyeHeight]);
    t.setAngle(200);
    t.forward(eyeLength);
    t.arc(180, eyeWidth);
    t.forward(eyeLength);
    t.arc(180, eyeWidth);
    t.forward(eyeLength);
    t.up();
    t.down();
    t.arc(180, eyeWidth);
    t.arc(-360, eyeWidth);
  },
];

const mouth = [
  (t) => {
    const laughSize = 30,
      laughHeight = 61,
      teethSize = 6;
    t.setAngle(-90);
    t.jump([center, laughHeight]);
    drawArc(t, 180, laughSize);
    t.jump([center - laughSize, laughHeight]);
    t.goTo([center + laughSize, laughHeight]);
    t.jump([center - laughSize, laughHeight - teethSize]);
    t.goTo([center + laughSize, laughHeight - teethSize]);
  },
  (t) => {
    const laughWidth = 12,
      laughHeight = 50,
      laughLength = 12;
    t.jump([center - laughWidth, laughHeight]);
    t.setAngle(90);
    t.forward(laughLength);
    t.arc(-180, laughWidth);
    t.forward(laughLength);
    t.arc(-180, laughWidth);
  },
  (t) => {
    const laughSize = 30,
      laughHeight = 38,
      teethSize = 7;
    t.setAngle(90);
    t.jump([center, laughHeight]);
    drawArc(t, 180, laughSize);
    t.jump([center - laughSize, laughHeight]);
    t.goTo([center + laughSize, laughHeight]);
    t.jump([center - laughSize + 11, laughHeight + laughSize - teethSize]);
    t.goTo([center + laughSize - 11, laughHeight + laughSize - teethSize]);
  },
];

const particle = [
  (t) => {
    const tearLength = 16,
      tearGap = 50,
      tearHeight = 56,
      tearWidth = 7;
    // l-tear
    t.jump([center - tearGap, tearHeight]);
    t.setAngle(45);
    t.forward(tearLength);
    t.arc(-180, tearWidth);
    t.forward(tearLength);
    t.arc(-180, tearWidth);
    // r-tear
    t.jump([center + tearGap, tearHeight]);
    t.setAngle(135);
    t.forward(tearLength);
    t.arc(180, tearWidth);
    t.forward(tearLength);
    t.arc(180, tearWidth);
  },
  (t) => {},
];

eyes[Math.floor(Math.random() * eyes.length)](t);
mouth[Math.floor(Math.random() * mouth.length)](t);
particle[Math.floor(Math.random() * particle.length)](t);

bt.join(finalLines, t.lines());
const cc = bt.bounds(finalLines).cc;
drawLines(finalLines);
