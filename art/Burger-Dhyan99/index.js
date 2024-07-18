// Set the canvas dimensions
setDocDimensions(800, 800);

// Settings
const seedTop = 3517;
const seedBottom = ((seedTop * 63) % 42) + 79;

// Create top bun
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

// Create bottom bun
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

// Create patty
const pattyY = 580

const pattyTurtle = new bt.Turtle();
pattyTurtle.jump([115, pattyY]);
pattyTurtle.right(180);
pattyTurtle.arc(180, 40);
const pattyDetail = 1150;
const pattyAmplitude = 1;

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5); // Adjust x position for each segment
  const y = pattyY-80 + pattyAmplitude * Math.sin(i * Math.PI / 10); // Calculate y position with sine function
  pattyTurtle.goTo([x, y]);
}
pattyTurtle.arc(180, 40);

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5); // Adjust x position for each segment
  const y = pattyY + pattyAmplitude * Math.sin(i * Math.PI / 10); // Calculate y position with sine function
  pattyTurtle.goTo([x, y]);
}

pattyTurtle.step([0,20])
pattyTurtle.goTo([115,pattyY+20])
pattyTurtle.step([0,-20])
pattyTurtle.step([450,0])
pattyTurtle.goTo([600,pattyY-60])
pattyTurtle.goTo([659,pattyY])

let pattyPolylines = pattyTurtle.lines();

// Draw squiggly line below the patty
const lettuceY = 450
const squiggleTurtle = new bt.Turtle();
squiggleTurtle.jump([115, lettuceY]); // Starting point below the patty
squiggleTurtle.right(0); // Start horizontally
const squiggleDetail = 150; // Number of points for squiggle
const squiggleAmplitude = 33; // Amplitude of the squiggle

for (let i = 0; i < squiggleDetail; i++) {
  const x = 115 + (i * 4); // Adjust x position for each segment
  const y = lettuceY + squiggleAmplitude * Math.sin(i * Math.PI / 10); // Calculate y position with sine function
  squiggleTurtle.goTo([x, y]);
}
let squigglePolylines = squiggleTurtle.lines();

// Draw everything
drawLines(polylinesTop);
drawLines(sesameSeedsTop);
drawLines(pattyPolylines);
drawLines(polylinesBottom);
drawLines(sesameSeedsBottom);
drawLines(squigglePolylines);
