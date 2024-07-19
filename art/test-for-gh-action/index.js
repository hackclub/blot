/*
@title: leaf
@author: leomcelroy
@snapshot: testing.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const leafLength = 5
const leafW = 1.8

bt.setRandSeed(10);

const finalLines = [];

const topEdge = [
  bt.nurbs([
    [0, 0],
    [leafLength*0.3, leafW],
    [leafLength*0.8, leafW*.01],
    [leafLength, 0]
  ])
]

const bottomEdge = bt.copy(topEdge);
bt.scale(bottomEdge, [1, -1], [0, 0]);
bt.join(finalLines, bottomEdge);

bt.iteratePoints(topEdge, (pt, t) => {
  const [x, y] = pt;
  const freq = 2.84;
  const dy = bt.noise(t * 20.4, { octaves: 2 }) * 0.15 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

bt.iteratePoints(bottomEdge, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.8, { octaves: 2 }) * -0.2 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

bt.join(finalLines, topEdge);

const veins = [];

let littleLinesMax = 61
for (let i = 4; i < littleLinesMax - 5; i++) {
  const t = i / (littleLinesMax - 1) // this line to get t values 0 to 1 while iterating is very common
  const x0 = t * leafLength
  const y0 = 0

  const y = bt.getPoint(topEdge, t + 0.1)[1]

  const angle = (-70 + t * 37 + bt.randInRange(-4, 4)) / 180 * Math.PI;
  let r = y * 0.8;

  const line = [
    bt.nurbs([
      [x0, y0],
      [
        x0 + Math.cos(angle) * r / 2 - y / 4,
        -(y0 + Math.sin(angle) * r / 2)
      ],
      [
        x0 + Math.cos(angle) * r,
        -(y0 + Math.sin(angle) * r)
      ]
    ])
  ];

  if (r < 0.01) continue

  const trimTo = (i % 5 === 0) ?
    bt.randInRange(0.7, 0.9) :
    bt.randInRange(0.1, 0.7);

  bt.trim(line, 0, trimTo);

  bt.resample(line, .03)

  bt.iteratePoints(line, pt => {
    return Math.random() < (i % 5 === 0 ? 0.28 : 0.40) ? 'BREAK' : pt
  });


  bt.join(veins, line);
}

bt.join(finalLines, veins)

const bottomVeins = bt.copy(veins);
bt.scale(bottomVeins, [1, -1], [0, 0])
bt.join(finalLines, bottomVeins)


const stem = [
  [
    [-leafLength*.2, 0],
    [leafLength, 0]
  ]
];
bt.resample(stem, 0.01);
bt.join(finalLines, stem);

bt.iteratePoints(finalLines, pt => {
  let [x, y] = pt
  y += x * x * 0.02
  y += bt.noise([x * 0.2]) * 0.3
  return [x, y]
})

// center piece
const finalBounds = bt.bounds(finalLines);
const finalScale = width/finalBounds.width*.85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

// draw it
drawLines(finalLines);