/*
@title: girlface
@author: gianna
@snapshot: coverSnapShot.png
*/
const width = 125;
const height = 125;
setDocDimensions(width, height);

// constants
const diff = 7
const headWidth = 39.5
const headHeight = 40

// store final lines here
const finalLines = [];

//nose
const nose = [
  ([
    [headWidth / 2 - 1.5, headHeight / 26 + 0.6],
    [headWidth / 2, headHeight / 26],
    [headWidth / 2 + 1.5, headHeight / 26 + 0.6]
  ])
]
bt.join(finalLines, nose);
//lip
const smile = bt.randInRange(-1, -5);
const lip = [
  bt.nurbs([
    [headWidth / 2 - 3, headHeight / 26 - 3],
    [headWidth / 2, headHeight / 26 + smile],
    [headWidth / 2 + 3, headHeight / 26 - 3]
  ])
]
bt.join(finalLines, lip);
//scalp
const polyline = [
  bt.nurbs([
    [0, 0],
    [3, headHeight * .5],
    [headWidth / 2, headHeight * .77],
    [headWidth - 3, headHeight * .5],
    [headWidth, 0]
  ])
];
//face
const face = [
  bt.nurbs([
    [diff, 7],
    [diff, -headHeight * .01 + 1.5],
    [headWidth / 2, -headHeight * .24], //center
    [headWidth - diff, -headHeight * .01 + 1.5],
    [headWidth - diff, 7],
  ])
]
bt.join(finalLines, face);

//eyeLeft
const open = bt.randInRange(-1.5, 2.7);

function eye() {
  const lids = [];
  const H = 0.22
  const W = 0.27
  const L = 5.5

  const upper = [
    bt.nurbs([
      [headWidth * W, headHeight * H],
      [headWidth * W + (L / 2), headHeight * H + open],
      [headWidth * W + L, headHeight * H]
    ])
  ]
  const brow = [
    bt.nurbs([
      [headWidth * W - 0.5, headHeight * H * 1.5],
      [headWidth * W + (L / 2), headHeight * H * 1.5 + open * .8],
      [headWidth * W + L + 0.5, headHeight * H * 1.5]
    ])
  ]
  bt.join(lids, brow);
  const numLash = 6;
  for (let j = 0; j < numLash; j++) {
    const t = j / numLash; //denom = strand num
    const y = bt.getPoint(upper, t)[1]
    const x = bt.getPoint(upper, t)[0]
    const leng = 10 - j / 1.7
    const angle = (-102 + t * 4 + bt.randInRange(-4, 4)) / 180 * Math.PI;

    const lash = [
      bt.nurbs([
        [x, y],
        [x + Math.cos(angle * 1.1) * leng / 2.5,
          y + Math.sin(angle * 1.1) * leng / 8
        ],
        [x + Math.cos(angle * 1.2) * leng / 2.8,
          y + Math.sin(angle * 1.2) * leng / 7.8
        ]
      ])
    ]
    bt.join(lids, lash);
  }

  const lower = [
    bt.nurbs([
      [headWidth * W, headHeight * H],
      [headWidth * W + (L / 2), headHeight * H - 3],
      [headWidth * W + L, headHeight * H]
    ])
  ]
  const P = 4.3;
  const pupil = [
    bt.nurbs([
      [headWidth * W + P, headHeight * H],
      [headWidth * W + (L / 2), headHeight * H - 3],
      [headWidth * W + L - P, headHeight * H]
    ])
  ]
  bt.join(lids, pupil);
  bt.join(lids, upper);
  bt.join(lids, lower);
  return lids;
}
const eyeRight = eye();
bt.scale(eyeRight, [-1, 1], [headWidth/2, 0]);
bt.join(finalLines, eye());
bt.join(finalLines, eyeRight);

//create hair (left side)
const strands = 40

function hair() {
  const hairs = [];
  for (let i = 0; i < 0.51 * strands; i++) { //strands = length
    const t = i / strands; //denom = strand num
    const y = bt.getPoint(polyline, t)[1]
    const x = bt.getPoint(polyline, t)[0]
    const leng = bt.randInRange(35,50)
    const angle = (-102 + t * 4 + bt.randInRange(-4, 4)) / 180 * Math.PI; //gets smaller
    //layer 1
    const layerOne = [
      bt.nurbs([
        [x, y],
        [x + Math.cos(angle * 1.05) * leng / 3,
          y + Math.sin(angle * 1.05) * leng / 3
        ],
        [x + Math.cos(angle * 1.3) * leng,
          y + Math.sin(angle * 1.3) * leng * 1.4
        ],
        [x + Math.cos(angle * 1.1) * leng * 1.65,
          y + Math.sin(angle * 1.1) * leng * 1.65
        ]

      ])
    ]
    //layer 2
    const layerTwo = [
      bt.nurbs([
        [x, y],
        [x + Math.cos(angle * .9) * leng / 2.5,
          y + Math.sin(angle * .9) * leng / 2.9
        ],
        [x + Math.cos(angle) * leng + 9,
          y + Math.sin(angle) * leng * .35
        ]
      ])
    ]
    //layer 3
    const t1 = i / (strands + 25)
    const y1 = bt.getPoint(face, t1)[1]
    const x1 = bt.getPoint(face, t1)[0]
    const leng1 = bt.randInRange(35,50)
    const angle1 = (-104 + t1 * 4 + bt.randInRange(-9, 9)) / 180 * Math.PI;
    const layerThree = [
      bt.nurbs([
        [x1, y1],
        [x1 + Math.cos(angle1 * 1.17) * leng1,
          y1 + Math.sin(angle1 * 1.17) * leng1 * .9
        ],
        [x1 + Math.cos(angle1) * leng,
          y1 + Math.sin(angle1) * leng * 1.25
        ]
      ])
    ]
    bt.join(hairs, layerThree);
    bt.join(hairs, layerTwo);
    bt.join(hairs, layerOne);
  }
  return hairs;
}
//hair right
const hairRight = hair();
bt.scale(hairRight, [-1, 1], [headWidth/2, 0]);
// add the polyline to the final lines
bt.join(finalLines, polyline);
bt.join(finalLines, hair());
bt.join(finalLines, hairRight);

// center piece
const finalBounds = bt.bounds(finalLines);
const finalScale = width / finalBounds.width * .85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

// draw it
drawLines(finalLines);