/*
@title: Generative-Snowflakes
@author: Ye Gao
@snapshot: the name of the snapshot file you want in the gallery
*/

const width = 125;
const height = 125;
setDocDimensions(125, 125);

const flakeWidth = 3;
const flakeLength = 40;
const maxDepth = 3;
const grid = 4;
const myTurtle = new bt.Turtle();

function flake(len, wid, num, depth) {
  for (let i = 0; i < num; i++) {
    myTurtle.forward(len);
    if (depth >= maxDepth) {
      myTurtle.left(90);
      myTurtle.forward(wid);
      myTurtle.left(90);
    } else {
      myTurtle.right(120);
      flake(len / 4, wid, 5, depth + 1);
    }
    myTurtle.forward(len);
    myTurtle.right(120);
  }
}

function walk(x, y, rot) {
  myTurtle.up();
  myTurtle.setAngle(rot);
  myTurtle.goTo([x, y]);
  myTurtle.down();
  
  const sizeVariation = bt.randInRange(0.8, 1.2);
  const flakeLen = (flakeLength / grid) * sizeVariation;
  const flakeWid = (flakeWidth / grid) * sizeVariation;
  flake(flakeLen, flakeWid, 6, 1);
}

for (let i = 0; i < grid; ++i) {
  for (let j = 0; j < grid; ++j) {
    let x = (width / grid) * (i + 0.5) + bt.randInRange(-5, 5);
    let y = (height / grid) * (j + 0.5) + bt.randInRange(-5, 5);
    let rot = bt.randIntInRange(0, 360);
    walk(x, y, rot);
  }
}

drawLines(myTurtle.lines());