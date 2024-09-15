
/*
THE FUN OBJ
Refresh continuously to see the animation.
This is a fun porject .
@title: THE FUN OBJ
@author: Anubhav Shivam Nath
@snapshot: index.js
*/


const width = 433;
const height = 433;

setDocDimensions(width, height);

const shape = (n) => {
  const t = new bt.Turtle();
  for (let i = 0; i < n; i++) t.forward(-1).right(360 / n);
  return t.lines();
};

const x1 = bt.scale(shape(44), [0, 24]);
const y1 = bt.scale(shape(44), [0, 23]);
const ballSet1 = bt.scale(shape(34), [2, 2]);
const ballSet2 = bt.scale(shape(34), [2, 2]);

bt.translate(x1, [width / 2, height / 2]);
bt.translate(y1, [width / 2, height / 2]);

const position1 = [326, 317];
const position2 = [101, 108];
const position3 = [216, 383];
const position4 = [-14, 156];

const seed = bt.randIntInRange(0, 1); 
if (seed === 0) {
  bt.translate(ballSet1, position1);
  bt.translate(ballSet2, position2);
} else {
  bt.translate(ballSet1, position3);
  bt.translate(ballSet2, position4);
}

bt.rotate(y1, 495, [width / 2, height / 2]);
bt.rotate(ballSet2, 900, position2);

const XY = bt.join(x1, y1, ballSet1, ballSet2);
drawLines(XY);

const CenterCircle = [];
const numCircle = 3;

for (let i = 0; i < numCircle; i++) {
  const CenterRadius = 72 + i * 56;
  const circle = new bt.Turtle();
  circle.jump([width / 2 + CenterRadius, height / 2]).right(-90);
  circle.arc(360, CenterRadius);
  CenterCircle.push(circle.lines());
}

const allCircle = bt.join(...CenterCircle);
drawLines(allCircle);

bt.rotate(XY, 90, [width / 2, height / 2]);
bt.rotate(allCircle, 100, [width / 2, height / 2]);

drawLines([...XY, ...allCircle]);
