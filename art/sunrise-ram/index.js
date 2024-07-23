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

// Less wide, smaller, and lower left mountain
const leftmount = [
  bt.nurbs([
    [0, randy + 10],                // Lowered
    [30 + randx, 60 - randy],       // Less wide
    [30 - randx, 30 + randy],       // Less wide
    [45, randy + 10]                // Lowered
  ])
];

// Wider, smaller, and lower right mountain
const rightmount = [
  bt.nurbs([
    [45, randy + 10],               // Lowered
    [95 - randx, 55 + randy],       // Wider
    [95 + randx, 40 - randy],       // Wider
    [width, randy + 10]             // Lowered
  ])
];

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
const finalLines = [];
bt.iteratePoints(rightmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, rightmount);

bt.iteratePoints(leftmount, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, leftmount);

// Draw sunrise colors and elements
drawLines([
  [
    [0, 0],
    [125, 0],
    [125, 125],
    [0, 125]
  ]
], { fill: "LightSkyBlue" }); // Sky color for sunrise

drawLines(sun, { fill: "Gold" }); // Sun color for sunrise
drawLines(finalLines, { fill: "LightPink" }); // Mountain color for sunrise

drawLines(birdLines); // Birds flying across the sunrise
drawLines(cloudOneLines, { stroke: "gray", width: 4 }); // Cloud One
drawLines(cloudTwoLines, { stroke: "gray", width: 4 }); // Cloud Two
