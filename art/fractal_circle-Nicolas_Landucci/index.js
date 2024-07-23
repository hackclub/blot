// Fractal Circle by Nicolas Landucci is GPLv3-licensed.
// NOTE TO SELF: Arrays are passed by reference. To "duplicate" points,
// use Array.slice() .

// mm
const width = 125;
const height = 125;

// interesting effect (toggle)
const showSkeleton = true;

// determines next branch length
function lenMapping(x) {
  return x * .75;
}

// length of trunk
const initialLen =14;

// determines branch length threshold
const minLen = 1;
const angle = 20;

// base value
const randomFactor = 0.05;
// how much randomFactor increases at each sample on a branch
const randomFactorProgression = 0.05;

const circleRadius = 55;
const circlePointCount = 3000;
const circleRandomFactor = 2;
const drawCircle = true;

const signaturePointPositionRandomFactor = 0.05;
const signaturePositionRandomFactor = 0.5;
const signatureRotationRandomFactor = 2;
const jitterSignature = true;
const jitterInterval = 0.002;
const jitterRandomFactor = 0.5;

// we only use the Turtle to measure lines, not to draw them, unless showSkeleton is active
// in any case, pen down is OK
const t = new bt.Turtle()
  .left(90)
  .down();

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

const allLines = [];

function rec(x) {
  if (x < minLen) return;
  const line = [];
  const initialPos = t.pos;
  const initialAngle = t.angle;
  line.push(t.pos);
  for (let i = 0; i < 3; i++) {
    t.forward(x / 4);
    t.left(90);
    const step = bt.randInRange(
      -randomFactor * x - randomFactorProgression * i * x,
      randomFactor * x + randomFactorProgression * i * x
    );
    t.forward(step);
    line.push(t.pos);
    t.forward(-step);
    t.right(90);
  }
  t.forward(x / 4);
  line.push(t.pos);

  allLines.push(line);
  t.left(angle);
  rec(lenMapping(x));
  t.right(2 * angle);
  rec(lenMapping(x));
  t.jump(initialPos);
  t.setAngle(initialAngle);
}

for (let i = 0; i < 6; i++) {
  rec(initialLen);
  t.right(60);
}
for (let line in allLines) {
  const tmp = [bt.catmullRom(allLines[line])];
  bt.join(finalLines, tmp);
}

if (showSkeleton) bt.join(finalLines, t.path);

if (drawCircle) {
  const circlePoints = [];
  for (let i=0; i<circlePointCount; i++) {
    const val = bt.randInRange(-circleRandomFactor,circleRandomFactor);
    circlePoints.push([Math.cos(i*2*Math.PI/circlePointCount)*(circleRadius+val),
                       Math.sin(i*2*Math.PI/circlePointCount)*(circleRadius+val)]);
  }
  // close the circle
  circlePoints.push(circlePoints[0].slice());
  bt.join(finalLines, [circlePoints]);
}

bt.translate(
  finalLines,
  [width / 2, height / 2],
  bt.bounds(finalLines).cc
);

const signaturePoints = [
  [-2.07, 1.26],
  [0, 2],
  [1.33, 3.4],
  [1.22, 4.65],
  [0.18, 5.5],
  [-0.93, 4.29],
  [-1.64, -1.8],
  [-0.68, 0.79],
  [0.54, 1.06],
  [1.67, -2],
  [3.49, -1.29],
  [4.84, 2.55],
  [3.41, 6.11],
  [-1.22, 7.39],
  [-4.14, 4.86],
  [-4.5, 1.76],
  [-3.44, -1.43],
];

for (let i = 0; i < signaturePoints.length; i++) {
  signaturePoints[i][0] += bt.randInRange(
    -signaturePointPositionRandomFactor,
    signaturePointPositionRandomFactor);
  signaturePoints[i][1] += bt.randInRange(
    -signaturePointPositionRandomFactor,
    signaturePointPositionRandomFactor);
}

const signatureBase = bt.catmullRom(signaturePoints);
let signature = [];

if (jitterSignature) {
  for (let i = 0; i <= 1; i+=jitterInterval) {
    const val = bt.randInRange(-jitterRandomFactor,jitterRandomFactor);
    const point = bt.getPoint([signatureBase], i);
    const normal = bt.getNormal([signatureBase], i);
    signature.push([
      point[0]+normal[0]*val,
      point[1]+normal[1]*val
    ]);
  }

} else {
  signature = signatureBase;
}

signature = [signature];

bt.rotate(signature, bt.randInRange(
      -signatureRotationRandomFactor, signatureRotationRandomFactor
  ), bt.bounds(signature).cc
);
bt.translate(
  signature,
  [
    width -15 + bt.randInRange(
      -signaturePositionRandomFactor, signaturePositionRandomFactor),
    15 + bt.randInRange(
      -signaturePositionRandomFactor, signaturePositionRandomFactor)
  ],
  bt.bounds(signature).cc
);
bt.join(finalLines, signature);




// draw it
drawLines(finalLines);
