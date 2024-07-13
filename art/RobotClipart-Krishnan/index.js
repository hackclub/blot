/*
@title: Robot Clipart
@author: Krishnan Shankar
@snapshot: image1.png
*/

// Size parameters
const WIDTH = 125;
const HEIGHT = 125;
setDocDimensions(WIDTH, HEIGHT);

// Antenna parameters
const leftAntStart = bt.randInRange(40, 50);
const leftAntEnd = bt.randInRange(40, 50);
const rightAntStart = bt.randInRange(75, 85);
const rightAntEnd = bt.randInRange(75, 85);
const antWidth = bt.randInRange(4, 6);

// Line and curve definitions
const botLeft = [
  [40, 25],
  [30, 25],
  [25, 30],
  [25, 40],
]
const botLeftCurve = bt.nurbs(botLeft, { steps: 100, degree: 3 });

const leftLine = [
  [25, 40],
  [25, 85]
];

const topLeft = [
  [25, 85],
  [25, 95],
  [30, 100],
  [40, 100],
]
const topLeftCurve = bt.nurbs(topLeft, { steps: 100, degree: 3 });

const topLine = [
  [40, 100],
  [85, 100]
];

const topRight = [
  [85, 100],
  [95, 100],
  [100, 95],
  [100, 85],
]
const topRightCurve = bt.nurbs(topRight, { steps: 100, degree: 3 });

const rightLine = [
  [100, 85],
  [100, 40]
];

const botRight = [
  [100, 40],
  [100, 30],
  [95, 25],
  [85, 25],
]
const botRightCurve = bt.nurbs(botRight, { steps: 100, degree: 3 });

const botLine = [
  [85, 25],
  [40, 25]
];

const leftMouth = [
  [50, 42],
  [45, 42],
  [40, 47],
  [45, 52],
  [50, 52]
]
const leftMouthCurve = bt.nurbs(leftMouth, { steps: 100, degree: 4 });

const topMouthLine = [
  [50, 42],
  [75, 42]
];

const rightMouth = [
  [75, 42],
  [80, 42],
  [85, 47],
  [80, 52],
  [75, 52],
]
const rightMouthCurve = bt.nurbs(rightMouth, { steps: 100, degree: 4 });

const botMouthLine = [
  [75, 52],
  [50, 52]
];

const leftEye = [
  [50, 67.5],
  [42.5, 75],
  [50, 82.5],
  [57.5, 75],
  [50, 67.5],
]
const leftEyeCurve = bt.nurbs(leftEye, { steps: 100, degree: 3 });

const rightEye = [
  [75, 67.5],
  [82.5, 75],
  [75, 82.5],
  [67.5, 75],
  [75, 67.5],
]
const rightEyeCurve = bt.nurbs(rightEye, { steps: 100, degree: 3 });

const leftAntLeft = [
  [leftAntStart, 100],
  [leftAntEnd, 110]
];
const leftAntRight = [
  [leftAntStart + antWidth, 100],
  [leftAntEnd + antWidth, 110]
]
const leftAntTop = [
  [leftAntEnd - (antWidth / 5), 110],
  [leftAntEnd + (antWidth / 2), 110 + (antWidth / 2) + (antWidth / 5)],
  [leftAntEnd + antWidth + (antWidth / 5), 110],
  [leftAntEnd + (antWidth / 2), 110 - (antWidth / 2) - (antWidth / 5)],
  [leftAntEnd - (antWidth / 5), 110],
]
const leftAntTopCircle = bt.nurbs(leftAntTop, { steps: 100, degree: 3 });

const rightAntLeft = [
  [rightAntStart - antWidth, 100],
  [rightAntEnd - antWidth, 110]
];
const rightAntRight = [
  [rightAntStart, 100],
  [rightAntEnd, 110]
];
const rightAntTop = [
  [rightAntEnd - antWidth - (antWidth / 5), 110],
  [rightAntEnd - (antWidth / 2), 110 + (antWidth / 2) + (antWidth / 5)],
  [rightAntEnd + (antWidth / 5), 110],
  [rightAntEnd - (antWidth / 2), 110 - (antWidth / 2) - (antWidth / 5)],
  [rightAntEnd - antWidth - (antWidth / 5), 110],
]
const rightAntTopCircle = bt.nurbs(rightAntTop, { steps: 100, degree: 3 });

// Draw them all!!
drawLines([
  botLeftCurve,
  leftLine,
  topLeftCurve,
  topLine,
  topRightCurve,
  rightLine,
  botRightCurve,
  botLine,
  leftMouthCurve,
  topMouthLine,
  rightMouthCurve,
  botMouthLine,
  leftEyeCurve,
  rightEyeCurve,
  leftAntLeft,
  leftAntRight,
  leftAntTopCircle,
  rightAntLeft,
  rightAntRight,
  rightAntTopCircle,
]);
