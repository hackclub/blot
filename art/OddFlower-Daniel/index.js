/*
@title: Odd Flower
@author: Daniel McEgan
@snapshot: snapshot1.png
*/

const width = 459;
const height = 484;
setDocDimensions(width, height);

const numBranches = 7;
const branchLength = 12;
const branchAngle = 38;

function drawBranch(t, length, num) {
  if (num === 0) return;

  t.forward(length);

  const randLength = length * (0.5 + 0.8 * bt.rand());
  const leftAngle = branchAngle + (branchAngle * 0.8 * bt.rand());
  const rightAngle = branchAngle - (branchAngle * 0.8 * bt.rand());

  t.left(leftAngle);
  drawBranch(t, randLength, num - 1);
  t.right(leftAngle);

  t.right(rightAngle);
  drawBranch(t, randLength, num - 1);
  t.left(rightAngle);

  t.left(180);
  t.forward(length);
  t.left(180);
}

function drawTree() {
  const t = new bt.Turtle();
  t.jump([(width/2), (height/2)]);
  t.left(90);

  for (let i = 0; i < numBranches; i++) {
    drawBranch(t, branchLength, numBranches);
    t.right(360 / numBranches);
  }

  const tree = [...t.lines()];

  drawLines(tree);
}
drawTree();

drawLines([
  bt.nurbs([
    [width/1.5, 0],
    [(width/1.5)-30, height/8],
    [width/2, (height/2)+20],
    [(width/2.5)+20, height/8.2],
    [width/2.5, 0]
  ])
])
