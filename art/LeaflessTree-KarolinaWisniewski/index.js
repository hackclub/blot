/*
@title: Leafless Tree
@author: Karolina Wisniewski
@snapshot: snapshot0.png
*/

const width = 500;
const height = 500;
setDocDimensions(width, height);

// Parameters
const numBranches = 5;
const initialLength = 28;
const trunkHeight = 350;
const branchAngle = 25;
const randomnessFactor = 0.4;

// Functions
function drawBranch(t, length, depth) {
  if (depth === 0) return;

  t.forward(length);

  const newLength = length * (0.7 + randomnessFactor * Math.random());
  const leftAngle = branchAngle + (branchAngle * randomnessFactor * Math.random());
  const rightAngle = branchAngle - (branchAngle * randomnessFactor * Math.random());

  t.left(leftAngle);
  drawBranch(t, newLength, depth - 1);
  t.right(leftAngle);

  t.right(rightAngle);
  drawBranch(t, newLength, depth - 1);
  t.left(rightAngle);


  t.left(180);
  t.forward(length);
  t.left(180);
}

function drawTree() {
  const t = new bt.Turtle();
  t.jump([0, 350]);
  t.left(90);

  const trunkLines = t.lines();

  for (let i = 0; i < numBranches; i++) {
    drawBranch(t, initialLength, numBranches);
    t.right(360 / numBranches);
  }

  const tree = [...trunkLines, ...t.lines()];

  bt.translate(tree, [width / 2, 0]);

  drawLines(tree);
}
drawTree();

function drawTree2() {
  const t = new bt.Turtle();
  t.jump([100, 300]);
  t.left(90);

  const trunkLines = t.lines();

  for (let i = 0; i < numBranches; i++) {
    drawBranch(t, initialLength, numBranches);
    t.right(360 / numBranches);
  }

  const tree = [...trunkLines, ...t.lines()];

  bt.translate(tree, [width / 2, 0]);

  drawLines(tree);
}
drawTree2();

function drawTree3() {
  const t = new bt.Turtle();
  t.jump([-100, 300]);
  t.left(90);

  const trunkLines = t.lines();

  for (let i = 0; i < numBranches; i++) {
    drawBranch(t, initialLength, numBranches);
    t.right(360 / numBranches);
  }

  const tree = [...trunkLines, ...t.lines()];

  bt.translate(tree, [width / 2, 0]);

  drawLines(tree);
}
drawTree3();

drawLines([
  [
    [125, 0],
    [375, 0],
    [325, 10],
    [300, 40],
    [275, 150],
    [260, 275],
    [250, 350],
    [240, 300],
    [230, 250],
    [225, 230],
    [215, 160],
    [200, 120],
    [160, 30],
    [120, 0]
  ]
])
drawLines([
  [
    [275, 10],
    [260, 160]
  ],
  [
    [180, 20],
    [200, 80]
  ],
  [
    [230, 40],
    [235, 180]
  ],
  [
    [145, 5],
    [175, 10]
  ]
])