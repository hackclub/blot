/*
@title: Fractal 
@author: Mohit Srinivasan
@snapshot: 6/13/2024
*/

function fractalBranch(turtle, len, ang, dec) {
  if (len > 2) {
    turtle.forward(len);

    const leftBranch = turtle.copy();
    leftBranch.left(bt.randInRange(ang - 10, ang + 10))
              .apply(t => fractalBranch(t, len * dec, ang, dec));

    const rightBranch = turtle.copy();
    rightBranch.right(bt.randInRange(ang - 10, ang + 10))
               .apply(t => fractalBranch(t, len * dec, ang, dec));

    bt.join(turtle.path, leftBranch.path, rightBranch.path);

    turtle.jump([0, 0]);
  }
}

function fractalTree() {
  const lenBase = 35;
  const angBase = 30;
  const decBase = 0.75;

  const myTurtle = new bt.Turtle();
  myTurtle.setAngle(90);

  fractalBranch(myTurtle, lenBase, angBase, decBase);
  bt.resample(myTurtle.path, 5);

  const treeBounds = bt.bounds(myTurtle.path);
  bt.translate(myTurtle.path, [-treeBounds.cc[0], -treeBounds.yMin]);
  bt.scale(myTurtle.path, 125 / treeBounds.height);

  return bt.copy(myTurtle.path);
}

setDocDimensions(125, 125);

const myFractal = fractalTree();
drawLines(myFractal, {stroke: "#000"});