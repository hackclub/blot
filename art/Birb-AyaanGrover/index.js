/*
@title: Happy Birb
@author: Ayaan Grover
@snapshot: a birb
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const birbScale = randomNumber(1,1.5) // Slight birb height variation to mimic natural differences between birbs.
const tail = randomNumber(-8, 8)  // Looks a bit like a cape! Maybe its SuperBirb?
const birbStretch = 2
const l = 1.5 //Custom eye location(~1.5 recommended, can be changed to your preference!)
const f =  randomNumber(-1, 1.5) // Leg Length Randomness

const finalLines = [];

const topEdge = [
  bt.nurbs([
    [0, 0],
    [birbScale * 0.5, birbStretch * 1.2],
    [birbScale * 3, birbStretch * 0.9],
    [birbScale * 5, 0]
  ]),
  [
    [0, 0],
    [birbScale, birbStretch * 0],
    [birbScale * 2.5, birbStretch * 0],
    [birbScale * 5, 0]
  ],
  [
    [-10, -10],
    [birbScale * 0, birbStretch * 0]
  ],
  bt.nurbs([
    [-10, -10],
    [birbScale, birbStretch * -6],
    [birbScale * 1.5, birbStretch * 0],
    [birbScale * 5, 0]
  ]),
  [
    [-10, -10],
    [birbScale * -21, birbStretch * tail],
    [birbScale * 1.5, birbStretch * 0],
    [birbScale * 5, 0]
  ],
  [
    [-9, (-11-f)],
    [-9, (-10)]
  ],
  // ^Left leg
  [
    [-2.4, (-11-f)],
    [-3, (-9.6)]
  ],
  // ^Right leg
  [
    [0, (-13-f)],
    [-2.4, (-11-f)]
  ],
  [
    [-4, (-13-f)],
    [-2.4, (-11-f)]
  ],
  // ^Right leg foot/toes
  [
    [-6.5, (-13-f)],
    [-9, (-11-f)]
  ],
  [
    [-11, (-13-f)],
    [-9, (-11-f)]
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
    [l, 1.3],
    [l+0.4, 1.2],
    [l+0.1, 1.3],
    [l, 1.2]
  ], 
  // ^Eyes
  [
    [-4, -6],
    [-4, -8],
    [-1, -6]
  ],
  // ^Wing
  [
    [-20,-13-f],
    [5,-13-f]
  ]
];

bt.join(finalLines, topEdge);

// center piece
const finalBounds = bt.bounds(finalLines);
const finalScale = width / finalBounds.width * .85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// draw it
drawLines(finalLines);
