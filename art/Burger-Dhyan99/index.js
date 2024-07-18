setDocDimensions(800, 650);

// Settings
const seedTop = 993236;
//

let pattyY;
let lettuceY;
let tomatoYStart;

function setOrder(o) {
  if (o == 1) {
    pattyY = 390
    lettuceY = 310
    tomatoYStart = 185
  } else if (o == 2) {
    pattyY = 185 + 70
    lettuceY = 390 - 20
    tomatoYStart = 310 - 70;
  } else if (o == 3) {
    pattyY = 310 + 15
    lettuceY = 185 + 59
    tomatoYStart = 390 - 77
  }
}
bt.setRandSeed(seedTop)
setOrder(bt.randIntInRange(1, 3))

const seedBottom = ((seedTop * 63) % 42) + 79;

const myTurtleTop = new bt.Turtle();
myTurtleTop.jump([600, 390]);
myTurtleTop.right(-90);
myTurtleTop.arc(180, 200);
myTurtleTop.goTo([600, 390]);
let polylinesTop = myTurtleTop.lines();
bt.scale(polylinesTop, [1.5, 0.8]);
bt.setRandSeed(seedTop);

const sesameSeedsTop = [];
const numSeedsTop = 35;

for (let i = 0; i < numSeedsTop; i++) {
  const x = bt.randInRange(150, 650);
  const y = bt.randInRange(440, 515);

  sesameSeedsTop.push([
    [x, y],
    [x + 2, y + 5],
    [x - 2, y + 5],
    [x, y]
  ]);
}

const myTurtleBottom = new bt.Turtle();
myTurtleBottom.jump([200, 225]);
myTurtleBottom.right(90);
myTurtleBottom.arc(180, 200);
myTurtleBottom.goTo([200, 225]);
let polylinesBottom = myTurtleBottom.lines();
bt.scale(polylinesBottom, [1.5, 0.8]);
bt.setRandSeed(seedBottom);

const sesameSeedsBottom = [];
const numSeedsBottom = 35;

for (let i = 0; i < numSeedsBottom; i++) {
  const x = bt.randInRange(150, 650);
  const y = bt.randInRange(100, 175);

  sesameSeedsBottom.push([
    [x, y],
    [x + 2, y + 5],
    [x - 2, y + 5],
    [x, y]
  ]);
}


bt.setRandSeed(seedTop)

const pattyTurtle = new bt.Turtle();
pattyTurtle.jump([115, pattyY]);
pattyTurtle.right(180);
pattyTurtle.arc(180, 20);
const pattyDetail = 1150;
const pattyAmplitude = 1;

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5);
  const y = pattyY - 40 + pattyAmplitude * Math.sin(i * Math.PI / 10);
  pattyTurtle.goTo([x, y]);
}
pattyTurtle.arc(180, 20);

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5);
  const y = pattyY + pattyAmplitude * Math.sin(i * Math.PI / 10);
  pattyTurtle.goTo([x, y]);
}
const randx = bt.randInRange(200, 450)
pattyTurtle.step([0, 10])
pattyTurtle.goTo([115, pattyY + 10])
pattyTurtle.step([0, -10])
pattyTurtle.step([randx, 0])
pattyTurtle.up()
pattyTurtle.step([0, 10])
pattyTurtle.down()
pattyTurtle.goTo([randx + 150, pattyY - 60])
pattyTurtle.goTo([randx + 210, pattyY + 10])

let pattyPolylines = pattyTurtle.lines();

const squiggleTurtle = new bt.Turtle();
squiggleTurtle.jump([115, lettuceY]);
squiggleTurtle.right(0);
const squiggleDetail = 150;
const squiggleAmplitude = 35;
const randDist = bt.randInRange(5, 10)
for (let h = 0; h < 3; h++) {
  for (let i = 0; i < squiggleDetail; i++) {
    const x = 100 + (i * 4) + (randDist * h);
    const y = lettuceY + squiggleAmplitude * Math.sin(i * Math.PI / 10);
    if (i == 0) {
      squiggleTurtle.jump([x, y]);
    } else {
      squiggleTurtle.goTo([x, y]);
    }
  }
}
let squigglePolylines = squiggleTurtle.lines();

const tomatoTurtle = new bt.Turtle();
const numTomatoes = 4;
const tomatoRadius = 32;
const tomatoThickness = 11;
const tomatoXStart = 344;

bt.setRandSeed(seedTop)

for (let i = 0; i < numTomatoes; i++) {
  const x = tomatoXStart + i * 53;
  const y = tomatoYStart;
  let yrand = 0;
  if (i % 2 == 0) {
    yrand = 65
  }
  const xrand = bt.randInRange(-10, 10)

  tomatoTurtle.jump([x - tomatoRadius + xrand, y + yrand]);
  tomatoTurtle.right(0);
  tomatoTurtle.arc(360, tomatoRadius);

  tomatoTurtle.jump([x - tomatoRadius + xrand, y - tomatoThickness + yrand]);
  tomatoTurtle.right(0);
  tomatoTurtle.arc(360, tomatoRadius);

  tomatoTurtle.jump([x - tomatoRadius + xrand, y + yrand]);
  tomatoTurtle.goTo([x - tomatoRadius + xrand, y - tomatoThickness + yrand]);

}

let tomatoPolylines = tomatoTurtle.lines();
bt.scale(tomatoPolylines, [3, 0.5])

drawLines(polylinesTop);
drawLines(sesameSeedsTop);
drawLines(pattyPolylines);
drawLines(squigglePolylines);
drawLines(tomatoPolylines);
drawLines(polylinesBottom);
drawLines(sesameSeedsBottom);
