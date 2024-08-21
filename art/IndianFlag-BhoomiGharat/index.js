/*
@title: Indian Flag
@author: Bhoomi Gharat
@snapshot: snapshot1.png
*/

const width = 125
const height = 125

setDocDimensions(width, height);

// declaration
const CENT = width / 2; // horizontal center
const PoleH = bt.randInRange(60, 100); // pole height ex: 80
const curveH = bt.randInRange(-2, 2); // min-max curve turn ex: 2
const CurvePos = (n) => 15 + (PoleH - 20) + 20 * n / 3;
const ACPos = 15 + (PoleH - 20) + 20 / 3; // ashoka chakra height ex 15 + 60 + 20 / 3
const BaseW = bt.randInRange(30, 60); // base stand width ex: 30

// creating base, pole of flag
const pole = new bt.Turtle();
pole.jump([(width - 2.5) / 2, 15])
  .left(90)
  .forward(PoleH)
  .right(90)
  .forward(2)
  .right(90)
  .forward(PoleH)

const base = new bt.Turtle();
base.jump([(width - BaseW) / 2, 0])
  .left(90)
  .forward(5)
  .right(90)
  .forward(BaseW / 6)
  .left(90)
  .forward(5)
  .right(90)
  .forward(BaseW / 6)
  .left(90)
  .forward(5)
  .right(90)
  .forward(BaseW / 3)

  .right(90)
  .forward(5)
  .left(90)
  .forward(BaseW / 6)
  .right(90)
  .forward(5)
  .left(90)
  .forward(BaseW / 6)
  .right(90)
  .forward(5)
  .left(90)

const dome = new bt.Turtle();
dome.jump([(width - 0.5) / 2, (15 + PoleH)])
  .arc(360, 2.5)

drawLines(dome.lines(), { fill: "gold" })
drawLines(base.lines(), { fill: "silver" })
drawLines(pole.lines(), { fill: "silver" })

// generate flag band
const genBand = (n) => bt.join(
  // left vertcal curve
  [
    [CENT + 0.8, CurvePos(n)],
    [CENT + 0.8, CurvePos(n - 1)]
  ],

  // top curve
  bt.catmullRom([
    [CENT + 0.8, CurvePos(n - 1)],
    [CENT + 40 / 3, CurvePos(n - 1) + curveH],
    [CENT + 80 / 3, CurvePos(n - 1) - curveH],
    [CENT + 40, CurvePos(n - 1)]
  ]),

  // right vertical curve
  [
    [CENT + 40, CurvePos(n - 1)],
    [CENT + 40, CurvePos(n)]
  ],

  // bottom curve
  bt.catmullRom([
    [CENT + 40, CurvePos(n)],
    [CENT + 80 / 3, CurvePos(n) - curveH],
    [CENT + 40 / 3, CurvePos(n) + curveH],
    [CENT + 0.8, CurvePos(n)]
  ]),
);

// first band
drawLines([genBand(3)], { fill: "orange" });
// second band
drawLines([genBand(2)], { fill: "white" });
// third band
drawLines([genBand(1)], { fill: "green" });

// Ashoka Chakra
const ashokaChakra = new bt.Turtle();

ashokaChakra.jump([(CENT + 20), ACPos + (20 / 3 - 5) / 2])
  .arc(360, 2.5)

// creating spokes (24) of ashoka chakra
for (let i = 0; i < 24; i++) {
  ashokaChakra.jump([(CENT + 20), ACPos + (20 / 3) / 2])
    .forward(2.5)
    .jump([(CENT + 20), ACPos + (20 / 3) / 2])
    .right(15)
}
// drawing ashoka chakra
drawLines(ashokaChakra.lines(), { stroke: "blue" });
