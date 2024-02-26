/*
@title: Self Portrait
@author: ayush
@snapshot: blot1.png
*/

// Check the workshop tab to get started

const x = 20 / 100;
const y = 45 / 100;

const width = 125;
const height = 125;
const extrusionWidth = 8;
const extrusionLength = 48;
const padding = 2;
const fillRepeat = 1;

setDocDimensions(width, height);

function createExtrusion(extrusionWidth, extrusionLength, fillRepeat) {
  const t = createTurtle();

  t.left(90);
  t.forward(extrusionLength);
  t.right(90);
  t.forward(extrusionWidth / 4);
  t.right(90);
  t.forward(extrusionLength);
  t.right(90);
  t.forward(extrusionWidth / 4);
  t.right(180);
  t.forward(extrusionWidth / 2);
  t.left(90);
  for (let i = 0; i < extrusionLength; i++) {
    if (i % fillRepeat == 0) {
      t.left(90);
      t.forward(extrusionWidth / 4);
      t.left(180);
      t.forward(extrusionWidth / 4);
      t.left(90);
    }
    t.forward(1);
  }
  // t.forward(extrusionLength % 1);
  t.left(90);
  t.forward(extrusionWidth / 4);
  t.left(180);
  t.forward(extrusionWidth / 2);
  t.right(90);
  t.forward(extrusionLength);
  t.right(90);
  t.forward(extrusionWidth / 4);

  return t;
}

function endCap(padding, stepperSize, extrusionWidth, legSize) {
  const t = createTurtle();
  t.left(90);

  const paddedStepper = stepperSize + padding;
  const paddedExtrusion = extrusionWidth + padding;
  const legWidth = padding * 1.5;

  t.forward(paddedStepper);
  t.right(90);
  t.forward(paddedStepper - legWidth);
  t.left(90);
  t.forward(legSize);
  t.right(90);
  t.forward(legWidth);
  t.right(90);
  t.forward(legSize + (stepperSize - extrusionWidth) / 2);
  t.left(90);
  t.forward(paddedExtrusion / 2);
  t.right(90);
  t.forward(paddedExtrusion);
  t.right(90);
  t.forward(paddedExtrusion / 2);
  t.left(90);
  t.forward(legSize + (stepperSize - extrusionWidth) / 2);
  t.right(90);
  t.forward(legWidth);
  t.right(90);
  t.forward(legSize);
  t.left(90);
  t.forward(paddedStepper - legWidth);
  return t;
}

function cube(sideLength) {
  const t = createTurtle();
  for (let i = 0; i < 4; i++) {
    t.forward(sideLength);
    t.right(90);
  }
  return t;
}

function createHolder(padding, extrusionWidth, penRad) {
  const t = createTurtle();
  t.left(90);
  t.forward(extrusionWidth * 2);
  t.right(90);
  t.forward(padding + extrusionWidth);
  t.right(90);
  t.forward(extrusionWidth * 2);
  t.right(90);
  t.forward(padding + extrusionWidth);

  t.jump([(padding + extrusionWidth) / 2, extrusionWidth * 2 - padding]);
  t.arc(360, penRad);
  return t;
}

function carriageSide(padding, extrusionWidth, wheelRad) {
  let t = createTurtle();
  t.left(90);
  const width = 2 * (padding + wheelRad * 2) + extrusionWidth;
  const length = padding + wheelRad * 2;

  t.forward(width);
  t.right(90);
  t.forward(length);
  t.right(90);
  t.forward(width);
  t.right(90);
  t.forward(length);
  t.right(90);

  t.jump([length, wheelRad + padding]);
  t.arc(360, wheelRad);

  t.jump([length, width - (wheelRad + padding)]);
  t.arc(360, wheelRad);

  return t;
}

const leftCap = endCap(padding, 12, extrusionWidth, 7);
leftCap.translate([width / 6, height / 2], leftCap.cc);

const leftCarriage = carriageSide(2, extrusionWidth, 2);
const center = createExtrusion(extrusionWidth, extrusionLength, fillRepeat);

const uncoveredLength =
  extrusionLength - (leftCarriage.width * 2 + center.width);

const left = createExtrusion(extrusionWidth, uncoveredLength * x, fillRepeat);
left.rotate(90, left.cc);
left.translate(leftCap.rc, left.lc);

leftCarriage.translate(left.rc, leftCarriage.lc);
center.translate(leftCarriage.rt, [
  center.lc[0],
  center.lc[1] + center.height * y,
]);

const rightCarriage = carriageSide(2, extrusionWidth, 2);
rightCarriage.rotate(180, rightCarriage.cc);
rightCarriage.translate(
  [leftCarriage.rc[0] + center.width, leftCarriage.rc[1]],
  rightCarriage.lc
);

const right = createExtrusion(
  extrusionWidth,
  uncoveredLength * (1 - x),
  fillRepeat
);
right.rotate(90, right.cc);
right.translate(rightCarriage.rc, right.lc);

const topCap = cube(padding + extrusionWidth);
topCap.translate(center.ct, topCap.cb);

const rightCap = endCap(padding, 12, extrusionWidth, 7);
rightCap.rotate(180, rightCap.cc);
rightCap.translate(right.rc, rightCap.lc);

const holder = createHolder(padding, extrusionWidth, 1);
holder.rotate(180, holder.cc);
holder.translate(center.cb, holder.ct);

drawTurtles([
  center,
  leftCarriage,
  rightCarriage,
  left,
  right,
  topCap,
  leftCap,
  rightCap,
  holder,
]);
