setDocDimensions(800, 600);

// Settings
const seedTop = 3439;
//


const seedBottom = ((seedTop * 63) % 42) + 79;

const myTurtleTop = new bt.Turtle();
myTurtleTop.jump([600, 375]);
myTurtleTop.right(-90);
myTurtleTop.arc(180, 200);
myTurtleTop.goTo([600, 375]);
let polylinesTop = myTurtleTop.lines();

bt.scale(polylinesTop, [1.5, 0.8]);

bt.setRandSeed(seedTop);

const sesameSeedsTop = [];
const numSeedsTop = 35;

for (let i = 0; i < numSeedsTop; i++) {
  const x = bt.randInRange(150, 650);
  const y = bt.randInRange(425, 500);

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

const pattyTurtle = new bt.Turtle();
pattyTurtle.jump([115, 390]);
pattyTurtle.right(180);
pattyTurtle.arc(180, 50);
pattyTurtle.goTo([685, 290]);
pattyTurtle.arc(180, 50);
pattyTurtle.goTo([115, 390])
let pattyPolylines = pattyTurtle.lines();

drawLines(polylinesTop);
drawLines(sesameSeedsTop);

drawLines(pattyPolylines);

drawLines(polylinesBottom);
drawLines(sesameSeedsBottom);