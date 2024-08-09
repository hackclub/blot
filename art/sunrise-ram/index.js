/*
@title: Sunrise
@author: Ram
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

// Randomize sunrise position
const randx = bt.randIntInRange(0, 10);
const randy = bt.randIntInRange(0, 17); // Adjusted for sunrise effect

// Birds flying across the sunrise
const birdLines = [];
const birdleft = [
  bt.nurbs([
    [0, 0],
    [3, 6],
    [6, 0]
  ])
];
const birdright = [
  bt.nurbs([
    [6, 0],
    [10, 6],
    [12, 0]
  ])
];
const birdleft1 = [
  bt.nurbs([
    [15, 0],
    [18, 6],
    [21, 0]
  ])
];
const birdright1 = [
  bt.nurbs([
    [21, 0],
    [25, 6],
    [27, 0]
  ])
];
const birdleft2 = [
  bt.nurbs([
    [9, 5],
    [12, 11],
    [15, 5]
  ])
];
const birdright2 = [
  bt.nurbs([
    [15, 5],
    [19, 11],
    [21, 5]
  ])
];
const birdleft3 = [
  bt.nurbs([
    [30, 3],
    [33, 9],
    [36, 3]
  ])
];
const birdright3 = [
  bt.nurbs([
    [36, 3],
    [40, 9],
    [42, 3]
  ])
];
const birdleft4 = [
  bt.nurbs([
    [25, 8],
    [28, 14],
    [31, 8]
  ])
];
const birdright4 = [
  bt.nurbs([
    [31, 8],
    [35, 14],
    [37, 8]
  ])
];
bt.join(birdLines, birdleft, birdright, birdleft1, birdright1, birdleft2, birdright2, birdleft3, birdright3, birdleft4, birdright4);

// Position birds randomly across the sunrise
const randinsky = bt.randIntInRange(70, 70);
const randinskx = bt.randIntInRange(0, 80);
bt.translate(birdLines, [randinskx, randinsky], [0, 0]);
bt.copy(birdLines);

function createMountain(baseHeight, widthAdjust, heightAdjust) {
  const leftmount = [
    bt.nurbs([
      [0, baseHeight],                // Lowered
      [30 + randx - widthAdjust, 60 - randy - heightAdjust],       // Less wide
      [30 - randx + widthAdjust, 30 + randy - heightAdjust],       // Less wide
      [45, baseHeight]                // Lowered
    ])
  ];

  const rightmount = [
    bt.nurbs([
      [45, baseHeight],               // Lowered
      [95 - randx - widthAdjust, 55 + randy - heightAdjust],       // Wider
      [95 + randx + widthAdjust, 40 - randy - heightAdjust],       // Wider
      [width, baseHeight]             // Lowered
    ])
  ];

  return { leftmount, rightmount };
}


const baseHeight = randy + 10;

// Create three mountains with different sizes and heights
const mountain1 = createMountain(baseHeight, 0, 0);
const mountain2 = createMountain(baseHeight, 10, 10);
const mountain3 = createMountain(baseHeight, 20, 20);

// Combine all mountains into finalLines
const finalLines = [];
bt.iteratePoints(mountain1.rightmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, mountain1.rightmount);

bt.iteratePoints(mountain1.leftmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, mountain1.leftmount);

bt.iteratePoints(mountain2.rightmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, mountain2.rightmount);

bt.iteratePoints(mountain2.leftmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, mountain2.leftmount);

bt.iteratePoints(mountain3.rightmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, mountain3.rightmount);

bt.iteratePoints(mountain3.leftmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, mountain3.leftmount);

// Smaller and lower sun
const sun = [
  bt.nurbs([
    [25, randy + 10],               // Smaller and lower
    [25, randy + 20],               // Smaller and lower
    [50, randy + 30],               // Smaller and lower
    [75, randy + 20],               // Smaller and lower
    [75, randy + 10]                // Smaller and lower
  ])
];

// Cloud Creation
const cloudOne = new bt.Turtle();
const cloudTwo = new bt.Turtle();

// Cloud One
const cloudOneBase = [16, 90]; // Static
cloudOne.up();
cloudOne.goTo(cloudOneBase);
cloudOne.down();
cloudOne.forward(47.54);
cloudOne.arc(103, 7);
cloudOne.setAngle(102);
cloudOne.arc(86, 8);
cloudOne.setAngle(-93);
cloudOne.arc(125, -9);
cloudOne.setAngle(172);
cloudOne.arc(28, 23);
cloudOne.setAngle(145);
cloudOne.arc(113, 15);
cloudOne.setAngle(215);
cloudOne.arc(28, 7);
cloudOne.arc(106, 7);
const cloudOneLines = cloudOne.lines();

// Cloud Two
const cloudTwoBase = [70.3, 99]; // Static
cloudTwo.up();
cloudTwo.goTo(cloudTwoBase);
cloudTwo.down();
cloudTwo.forward(35);
cloudTwo.arc(103, 8);
cloudTwo.setAngle(103);
cloudTwo.arc(86, 8);
cloudTwo.setAngle(-90);
cloudTwo.arc(146, -9);
cloudTwo.setAngle(155);
cloudTwo.arc(48, 12);
cloudTwo.setAngle(209);
cloudTwo.arc(72, 9);
cloudTwo.setAngle(142);
cloudTwo.arc(76, 11);
const cloudTwoLines = cloudTwo.lines();

// Draw the sunrise landscape
drawLines([
  [
    [0, 0],
    [125, 0],
    [125, 125],
    [0, 125]
  ]
], { fill: "LightSkyBlue" }); // Sky color for sunrise

drawLines(sun, { fill: "Orange" }); // Sun color for sunrise

// Draw mountains with different colors
drawLines(finalLines.slice(0, mountain1.rightmount.length + mountain1.leftmount.length), { fill: "lightgrey" }); // Mountain 1
drawLines(finalLines.slice(mountain1.rightmount.length + mountain1.leftmount.length, mountain1.rightmount.length + mountain1.leftmount.length + mountain2.rightmount.length + mountain2.leftmount.length), { fill: "darkgrey" }); // Mountain 2
drawLines(finalLines.slice(mountain1.rightmount.length + mountain1.leftmount.length + mountain2.rightmount.length + mountain2.leftmount.length), { fill: "grey" }); // Mountain 3

drawLines(birdLines); // Birds flying across the sunrise
drawLines(cloudOneLines, { stroke: "White", width: 4, fill: "White" }); // Cloud One
drawLines(cloudTwoLines, { stroke: "White", width: 4}); // Cloud Two

function tree(t, prevBranchEnd, angle, branchLen, iteration, max_iteration, angle_change, left_shift, right_shift) {
  if (iteration > max_iteration) {
    return;
  }

  t.jump(prevBranchEnd);
  t.setAngle(angle + angle_change);
  t.forward(branchLen);

  const end = () => t.path.at(-1).at(-1);
  tree(t, end(), angle + angle_change, branchLen * 2 / 3 * left_shift, iteration + 1, max_iteration, angle_change, left_shift, right_shift);

  t.jump(prevBranchEnd);
  t.setAngle(angle - angle_change);
  t.forward(branchLen);

  tree(t, end(), angle - angle_change, branchLen * 2 / 3 * right_shift, iteration + 1, max_iteration, angle_change, left_shift, right_shift);
}

function drawMultipleTrees() {
  const MAX_ITERATION = 8;
  const ANGLE_CHANGE = bt.randIntInRange(30, 45);
  const treeHeightFactor = 0.8; 
  
  const t1 = new bt.Turtle();
  tree(t1, [100, 24], 122, 10 * treeHeightFactor, 1, MAX_ITERATION, ANGLE_CHANGE, 1, 3 / 4);
  drawLines(t1.lines(), { stroke: 'green', width: 2 });
  
  const t2 = new bt.Turtle();
  tree(t2, [14, 20], 90, 8 * treeHeightFactor, 1, (MAX_ITERATION - 2), ANGLE_CHANGE, 3 / 4, 1);
  drawLines(t2.lines(), { stroke: 'green', width: 2 });

  const t3 = new bt.Turtle();
  tree(t3, [101, 23], -9, 10 * treeHeightFactor, 1, MAX_ITERATION, ANGLE_CHANGE, 1, 3 / 4);
  drawLines(t3.lines(), { stroke: 'green', width: 2 });
  // Draw Trunks
  drawLines([[[14, 20], [14, 10 * treeHeightFactor]]], { width: 7, stroke: 'brown' });
  drawLines([[[99, 3], [100, 30 * treeHeightFactor]]], { width: 7, stroke: 'brown' });

}

// Draw multiple trees
drawMultipleTrees();
