/*
@title: Colorful eyes
@author: Dylan
@snapshot: Colorful eyes
*/

const { Turtle, rand, randInRange } = blotToolkit;
const t = new Turtle();

setDocDimensions(125, 125);

// Function to generate a random color
function randomColor() {
    const r = Math.floor(rand() * 256);
    const g = Math.floor(rand() * 256);
    const b = Math.floor(rand() * 256);
    return `rgb(${r},${g},${b})`;
}

const ovalWidth = randInRange(30, 50); 
const ovalHeight = randInRange(15, 25);
const circleRadius = randInRange(4, 8);

const centerX = 125 / 2;
const centerY = 125 / 2;

t.up()
  .goTo([centerX - ovalWidth/2, centerY])
  .down()
  .right(90)
  .arc(180, ovalHeight/2)
  .left(180)
  .arc(180, ovalHeight/2);

const leftCircleOffset = randInRange(2.5, 5);
const rightCircleOffset = randInRange(1.5, 2.5);

t.up()
  .goTo([centerX - ovalWidth/leftCircleOffset, centerY + ovalHeight/2 + circleRadius])
  .down()
  .arc(360, circleRadius);

t.up()
  .goTo([centerX + ovalWidth/rightCircleOffset, centerY + ovalHeight/2 + circleRadius])
  .down()
  .arc(360, circleRadius);

let polylines = t.lines();

drawLines([polylines[0]]);

drawLines([polylines[1]], { fill: randomColor() });

drawLines([polylines[2]], { fill: randomColor() });