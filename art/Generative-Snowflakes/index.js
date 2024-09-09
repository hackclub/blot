/*
@title: Generative-Snowflakes
@author: Ye Gao
@snapshots: 1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const flakeWidth = 2;
const flakeLength = 20;
const maxDepth = 3;
const myTurtle = new bt.Turtle();

const grid = bt.randIntInRange(4, 9);

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
  
  const sizeVariation = 1 + bt.randIntInRange(-1, 1) * 0.05;
  const flakeLen = (flakeLength / grid) * sizeVariation;
  const flakeWid = (flakeWidth / grid) * sizeVariation;
  
  flake(flakeLen, flakeWid, 6, 1);
}

for (let i = 0; i < grid; ++i) {
  for (let j = 0; j < grid; ++j) {
    let x = (width / grid) * (i + 0.5) + bt.randIntInRange(-3, 3);
    let y = (height / grid) * (j + 0.5) + bt.randIntInRange(-3, 3);
    let rot = bt.randIntInRange(0, 360);

    walk(x, y, rot);
  }
}

drawLines(myTurtle.lines());
