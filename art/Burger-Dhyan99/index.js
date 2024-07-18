setDocDimensions(800, 800);

// Settings
const seedTop = 5056;




const seedBottom = ((seedTop * 63) % 42) + 79;

const myTurtleTop = new bt.Turtle();
myTurtleTop.jump([600, 600]);
myTurtleTop.right(-90);
myTurtleTop.arc(180, 200);
myTurtleTop.goTo([600, 600]);
let polylinesTop = myTurtleTop.lines();
bt.scale(polylinesTop, [1.5, 0.8]);
bt.setRandSeed(seedTop);

const sesameSeedsTop = [];
const numSeedsTop = 35;

for (let i = 0; i < numSeedsTop; i++) {
  const x = bt.randInRange(150, 650);
  const y = bt.randInRange(650, 725);

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


const pattyY = 580

const pattyTurtle = new bt.Turtle();
pattyTurtle.jump([115, pattyY]);
pattyTurtle.right(180);
pattyTurtle.arc(180, 40);
const pattyDetail = 1150;
const pattyAmplitude = 1;

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5);
  const y = pattyY - 80 + pattyAmplitude * Math.sin(i * Math.PI / 10);
  pattyTurtle.goTo([x, y]);
}
pattyTurtle.arc(180, 40);

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5); 
  const y = pattyY + pattyAmplitude * Math.sin(i * Math.PI / 10); 
  pattyTurtle.goTo([x, y]);
}

pattyTurtle.step([0, 20])
pattyTurtle.goTo([115, pattyY + 20])
pattyTurtle.step([0, -20])
pattyTurtle.step([450, 0])
pattyTurtle.up()
pattyTurtle.step([0, 20])
pattyTurtle.down()
pattyTurtle.goTo([600, pattyY - 60])
pattyTurtle.goTo([660, pattyY + 20])

let pattyPolylines = pattyTurtle.lines();

const lettuceY = 450
const squiggleTurtle = new bt.Turtle();
squiggleTurtle.jump([115, lettuceY]); 
squiggleTurtle.right(0);
const squiggleDetail = 150;
const squiggleAmplitude = 33;

for (let i = 0; i < squiggleDetail; i++) {
  const x = 115 + (i * 4);
  const y = lettuceY + squiggleAmplitude * Math.sin(i * Math.PI / 10); 
  squiggleTurtle.goTo([x, y]);
}
let squigglePolylines = squiggleTurtle.lines();

const tomatoTurtle = new bt.Turtle();
const numTomatoes = 4;
const tomatoRadius = 32;
const tomatoThickness = 11;
const tomatoXStart = 344;
const tomatoYStart = 340;

bt.setRandSeed(seedTop)

for (let i = 0; i < numTomatoes; i++) {
  const x = tomatoXStart + i * 53;
  const y = tomatoYStart;
  const rand = bt.randInRange(-40, 30)
  const xrand = bt.randInRange(-10, 10)

  tomatoTurtle.jump([x - tomatoRadius + xrand, y + rand]);
  tomatoTurtle.right(0);
  tomatoTurtle.arc(360, tomatoRadius);

  tomatoTurtle.jump([x - tomatoRadius + xrand, y - tomatoThickness + rand]);
  tomatoTurtle.right(0);
  tomatoTurtle.arc(360, tomatoRadius);

  tomatoTurtle.jump([x - tomatoRadius, y]);
  tomatoTurtle.goTo([x - tomatoRadius, y - tomatoThickness]);

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
