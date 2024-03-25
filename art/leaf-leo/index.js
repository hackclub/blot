/*
@title: leaf
@author: leomcelroy
@snapshot: leaf.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const leafLength = 5
const leafW = 1.8

tk.setRandSeed(10);

const finalLines = [];

const topEdge = [
  tk.nurbs([
    [0, 0],
    [leafLength*0.3, leafW],
    [leafLength*0.8, leafW*.01],
    [leafLength, 0]
  ])
]

const bottomEdge = tk.copy(topEdge);
tk.scale(bottomEdge, [1, -1], [0, 0]);
tk.join(finalLines, bottomEdge);

tk.iteratePoints(topEdge, (pt, t) => {
  const [x, y] = pt;
  const freq = 2.84;
  const dy = tk.noise(t * 20.4, { octaves: 2 }) * 0.15 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

tk.iteratePoints(bottomEdge, (pt, t) => {
  const [x, y] = pt;
  const dy = tk.noise(t * 20.8, { octaves: 2 }) * -0.2 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

tk.join(finalLines, topEdge);

const veins = [];

let littleLinesMax = 61
for (let i = 4; i < littleLinesMax - 5; i++) {
  const t = i / (littleLinesMax - 1) // this line to get t values 0 to 1 while iterating is very common
  const x0 = t * leafLength
  const y0 = 0

  const y = tk.getPoint(topEdge, t + 0.1)[1]

  const angle = (-70 + t * 37 + tk.randInRange(-4, 4)) / 180 * Math.PI;
  let r = y * 0.8;

  const line = [
    tk.nurbs([
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
    tk.randInRange(0.7, 0.9) :
    tk.randInRange(0.1, 0.7);

  tk.trim(line, 0, trimTo);

  tk.resample(line, .03)

  tk.iteratePoints(line, pt => {
    return Math.random() < (i % 5 === 0 ? 0.28 : 0.40) ? 'BREAK' : pt
  });


  tk.join(veins, line);
}

tk.join(finalLines, veins)

const bottomVeins = tk.copy(veins);
tk.scale(bottomVeins, [1, -1], [0, 0])
tk.join(finalLines, bottomVeins)


const stem = [
  [
    [-leafLength*.2, 0],
    [leafLength, 0]
  ]
];
tk.resample(stem, 0.01);
tk.join(finalLines, stem);

tk.iteratePoints(finalLines, pt => {
  let [x, y] = pt
  y += x * x * 0.02
  y += tk.noise([x * 0.2]) * 0.3
  return [x, y]
})

// center piece
const finalBounds = tk.bounds(finalLines);
const finalScale = width/finalBounds.width*.85;
tk.scale(finalLines, finalScale);
tk.translate(finalLines, [width / 2, height / 2], tk.bounds(finalLines).cc);

// draw it
drawLines(finalLines);