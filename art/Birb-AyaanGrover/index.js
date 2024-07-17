/*
@title: Happy Birb
@author: Ayaan Grover
@snapshot: a birb
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const birbScale = 1
const birbStretch = 2

const finalLines = [];

const topEdge = [
  bt.nurbs([
    [0, 0],
    [birbScale*0.5, birbStretch*1.2],
    [birbScale*3, birbStretch*0.9],
    [birbScale*5, 0]
  ]),
  [
    [0, 0],
    [birbScale, birbStretch*0],
    [birbScale*2.5, birbStretch*0],
    [birbScale*5, 0]
  ],
  [
    [-10, -10],
    [birbScale*0, birbStretch*0]
  ],
  bt.nurbs([
    [-10, -10],
    [birbScale, birbStretch*-6],
    [birbScale*1.5, birbStretch*0],
    [birbScale*5, 0]
  ]),
  [
    [-10, -10],
    [birbScale*-21, birbStretch*-8],
    [birbScale*1.5, birbStretch*0],
    [birbScale*5, 0]
  ],
  [
    [-9, -11],
    [-9, -10]
  ],
  // ^Left leg
  [
    [-2.4, -11],
    [-3, -9.6]
  ],
  // ^Right leg
  [
    [0, -13],
    [-2.4, -11]
  ],
  [
    [-4, -13],
    [-2.4, -11]
  ],
  // ^Right leg foot/toes
  [
    [-6.5, -13],
    [-9, -11]
  ],
  [
    [-11, -13],
    [-9, -11]
  ],
  // ^Left leg foot/toes
  [
    [4.6, 0.4],
    [3.6, 0.3]
  ],
  [
    [3.2, 0.5],
    [3.6, 0.3]
  ],
  // ^Mouth/smile
  [
    [1.3, 1.3],
    [1.7, 1.2],
    [1.5, 1.3],
    [1.3, 1.2]
  ],
  [
    [-4, -6],
    [-4, -8],
    [-1, -6]
  ]
];

bt.join(finalLines, topEdge);

// center piece
const finalBounds = bt.bounds(finalLines);
const finalScale = width/finalBounds.width*.85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

// draw it
drawLines(finalLines);
