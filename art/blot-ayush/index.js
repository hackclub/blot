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
  const t = new tk.Turtle();

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

  return t.lines();
}

function endCap(padding, stepperSize, extrusionWidth, legSize) {
  const t = new tk.Turtle();
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
  return t.lines();
}

function cube(sideLength) {
  const t = new tk.Turtle();
  for (let i = 0; i < 4; i++) {
    t.forward(sideLength);
    t.right(90);
  }
  return t.lines();
}

function createHolder(padding, extrusionWidth, penRad) {
  const t = new tk.Turtle();
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
  return t.lines();
}

function carriageSide(padding, extrusionWidth, wheelRad) {
  let t = new tk.Turtle();
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

  return t.lines();
}

const leftCap = endCap(padding, 12, extrusionWidth, 7);
tk.translate(leftCap, [width / 6, height / 2], tk.bounds(leftCap).cc);

const leftCarriage = carriageSide(2, extrusionWidth, 2);
const center = createExtrusion(extrusionWidth, extrusionLength, fillRepeat);

const uncoveredLength =
  extrusionLength - (tk.bounds(leftCarriage).width * 2 + tk.bounds(center).width);

const left = createExtrusion(extrusionWidth, uncoveredLength * x, fillRepeat);
tk.rotate(left, 90, tk.bounds(left).cc);
tk.translate(left, tk.bounds(leftCap).rc, tk.bounds(left).lc);

tk.translate(leftCarriage, tk.bounds(left).rc, tk.bounds(leftCarriage).lc);
tk.translate(
  center,
  tk.bounds(leftCarriage).rt,
  [
    tk.bounds(center).lc[0],
    tk.bounds(center).lc[1] + tk.bounds(center).height * y,
  ]
);

const rightCarriage = carriageSide(2, extrusionWidth, 2);
tk.rotate(
  rightCarriage,
  180,
  rightCarriage.cc
);
tk.translate(
  rightCarriage,
  [
    tk.bounds(leftCarriage).rc[0] + tk.bounds(center).width,
    tk.bounds(leftCarriage).rc[1]
  ],
  tk.bounds(rightCarriage).lc
);

const right = createExtrusion(
  extrusionWidth,
  uncoveredLength * (1 - x),
  fillRepeat
);
tk.rotate(right, 90, tk.bounds(right).cc);
tk.translate(right, tk.bounds(rightCarriage).rc, tk.bounds(right).lc);

const topCap = cube(padding + extrusionWidth);
tk.translate(topCap, tk.bounds(center).ct, tk.bounds(topCap).cb);

const rightCap = endCap(padding, 12, extrusionWidth, 7);
tk.rotate(rightCap, 180, tk.bounds(rightCap).cc);
tk.translate(rightCap, tk.bounds(right).rc, tk.bounds(rightCap).lc);

const holder = createHolder(padding, extrusionWidth, 1);
tk.rotate(holder, 180, tk.bounds(holder).cc);
tk.translate(holder, tk.bounds(center).cb, tk.bounds(holder).ct);

drawLines([
  ...center,
  ...leftCarriage,
  ...rightCarriage,
  ...left,
  ...right,
  ...topCap,
  ...leftCap,
  ...rightCap,
  ...holder,
]);