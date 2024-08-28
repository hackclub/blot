/*
@title: inkBlot
@author: Pitabread8
@snapshot: 0.png
*/

const width = 125
const height = 125

setDocDimensions(width, height);

const shape = (n) => {
  const t = new bt.Turtle();
  for (let i = 0; i < n; i++) t.forward(1).left(360 / n);
  return t.lines();
}

const shaft = bt.scale(shape(3), [2, 424]);
bt.rotate(shaft, 135);
bt.trim(shaft, 0.62, 0.75);
bt.rotate(shaft, -135);

const vanes = bt.scale(shape(11), [8, 33]);
bt.rotate(vanes, -135);
bt.trim(vanes, 0.413, 0.67);
bt.rotate(vanes, 135);
bt.translate(vanes, [-67, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1] + -7]);

const feather = [...shaft, ...vanes];
bt.translate(feather, [width / 2 + 30, height / 2 - 10], bt.bounds(feather).cc);
bt.resample(feather, 4);
bt.iteratePoints(feather, ([x, y]) => [x - 0.002 * (width / 2 - y) * (width / 2 - y), y]);

bt.rotate(feather, 155);
bt.translate(feather, [-16, 31]);
drawLines(feather, { width: 3 });

const a = 30;
const b = 55;
const c = 95;
const d = (a + c) / 2;
const e = 80;
const f = 82;

const inkBottle = [
  [
    [a, b + 20],
    [a, a - 10],
    [c, a - 10],
    [c, b + 20]
  ],
  bt.catmullRom([
    [a, a - 10],
    [d, a - 13],
    [c, a - 10]
  ])
]

drawLines([
  bt.catmullRom([
    [a, b + 20],
    [(a + (d - 8)) / 2, e],
    [d - 8, f]
  ]),
  bt.catmullRom([
    [d + 8, f],
    [(c + (d + 8)) / 2, e],
    [c, b + 20]
  ]),
  [
    [d - 8, f],
    [d - 8, f + 4]
  ],
  [
    [d + 8, f],
    [d + 8, f + 4]
  ],
  bt.catmullRom([
    [d - 9, f + 8],
    [d - 8, f + 4],
    [d, 85],
    [d + 8, f + 4],
    [d + 9, f + 8]
  ]),
  bt.catmullRom([
    [d - 9, f + 8],
    [d - 8, f + 10],
    [d, f + 11],
    [d + 8, f + 10],
    [d + 9, f + 8]
  ]),
  [
    [d - 4, f + 8.5],
    [d - 4, f + 5.5]
  ],
  [
    [d - 2, f + 8.5],
    [d - 2, f + 5.5]
  ],
  [
    [d - 2, f + 8.5],
    [d, f + 5.5]
  ],
  [
    [d, f + 8.5],
    [d, f + 5.5]
  ],
  [
    [d + 2, f + 8.5],
    [d + 2, f + 5.5]
  ],
  [
    [d + 2, f + 6.5],
    [d + 3.5, f + 8.5]
  ],
  [
    [d + 2, f + 7.5],
    [d + 3.5, f + 5.5]
  ]
], { width: 5 });

const createRing = (num, size) => {
  const petalLength = 0.5;
  const centerLength = petalLength * bt.randInRange(1.5, 1.75);

  for (let i = 1; i <= num; i++) {
    const petal = [];

    const firstHalf = [
      bt.nurbs([
        [0, 0],
        [petalLength * 0.5, centerLength],
        [petalLength, 0]
      ])
    ];

    const secondHalf = bt.copy(firstHalf);
    bt.scale(secondHalf, [1, -1], [0, 0]);
    bt.join(petal, firstHalf, secondHalf);

    bt.scale(petal, width / bt.bounds(petal).width * size);
    bt.translate(petal, [width / 2, height / 2 - 10], bt.bounds(petal).cc);
    bt.rotate(petal, 360 / num * i);

    drawLines(petal, { width: 4 });
  }
}

const fibonacci = (count, n = 1, prev = 0) => {
  if (count === 0) return [];
  const next = n + prev;
  return [next].concat(fibonacci(count - 1, next, n));
}

const ringSizes = fibonacci(2, 3, 2);
for (let i of ringSizes) createRing(i, 1 / Math.sqrt(i) * 0.4);

const t = new bt.Turtle();
t.up().goTo([100, bt.randInRange(38, 56)]).down();
let size = bt.randInRange(0.1, 0.35);
for (let i = 0; i < 365; i++) t.forward(size).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([bt.randInRange(80, 102), bt.randInRange(25, 44)]).down();
for (let i = 0; i < 365; i++) t.forward(0.2).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([81, 28]).down();
size = bt.randInRange(0.075, 0.2);
for (let i = 0; i < 365; i++) t.forward(size).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([67, 24]).down();
size = bt.randInRange(0.1, 0.2);
for (let i = 0; i < 365; i++) t.forward(size).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([bt.randInRange(47, 61), 29]).down();
for (let i = 0; i < 365; i++) t.forward(0.2).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([37, 35]).down();
size = bt.randInRange(0.2, 0.3);
for (let i = 0; i < 365; i++) t.forward(size).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([21, bt.randInRange(18, 63)]).down();
size = bt.randInRange(0.1, 0.2);
for (let i = 0; i < 365; i++) t.forward(size).right(1);
bt.difference(inkBottle, t.lines());
t.up().goTo([17, bt.randInRange(39, 57)]).down();
size = bt.randInRange(0.1, 0.18);
for (let i = 0; i < 365; i++) t.forward(size).right(1);
drawLines(t.lines(), { width: 8 });

bt.difference(inkBottle, t.lines());
drawLines(inkBottle, { width: 5 });