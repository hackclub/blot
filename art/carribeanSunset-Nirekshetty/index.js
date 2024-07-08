/*
@title: Caribbean Sunset
@author: Nirek S
@snapshot: Snapshot1.png
*/
const width = 125;
const height = 125;
setDocDimensions(width, height);

const randx = bt.randIntInRange(0, 437);

const randy = bt.randIntInRange(32, 29);

const birdLines = [];
const birdleft = [
  bt.nurbs([
    [0,0],
    [3,6],
    [6,0]
  ])
];
const birdright = [
  bt.nurbs([
    [6,0],
    [10,6],
    [12,0]
  ])
];
const birdleft1 = [
  bt.nurbs([
    [15,0],
    [18,6],
    [21,0]
  ])
];
const birdright1 = [
  bt.nurbs([
    [21,0],
    [25,6],
    [27,0]
  ])
];

const birdleft2 = [
  bt.nurbs([
    [9,5],
    [12,11],
    [15,5]
  ])
];
const birdright2 = [
  bt.nurbs([
    [15,5],
    [19,11],
    [21,5]
  ])
];

bt.join(birdLines, birdleft, birdright, birdleft1, birdright1, birdleft2, birdright2);
const randinsky = bt.randIntInRange(75, 115);
const randinskx = bt.randIntInRange(0, 96);
bt.translate(birdLines, [randinskx, randinsky], [0, 0]);
bt.copy(birdLines);

const sun = [
  bt.nurbs([
    [32.5, randy + 20],
    [32.5, randy + 45],
    [62.5, randy + 63],
    [92.5, randy + 45],
    [92.5, randy + 20]
  ])
];

const land = [
  [
    [0, randy + 20],
    [125, randy + 20],
    [125, 0],
    [0, 0]
  ]
];

const clouds = [
  [
    [10, randy + 20],
    [130, randy + 20],
    [130, randy + 60],
    [10, randy + 60]
  ],
  [
    [150, randy + 50],
    [270, randy + 50],
    [270, randy + 90],
    [150, randy + 90]
  ]
];

const sky = [
  [
    [0, randy + 20],
    [125, randy + 20],
    [125, height],
    [0, height]
  ]
];

const randomnum = bt.randIntInRange(10, 50);
const randomnum2 = bt.randIntInRange(10, 50);
const finalLines = [];

const leftmount = [
  bt.nurbs([
    [0, randy + 20],
    [randomnum, 79],
    [randomnum, 60],
    [57.5, randy + 20]
  ])
];

const rightmount = [
  bt.nurbs([
    [67.5, randy + 20],
    [randomnum2 + 70, 76],
    [randomnum2 + 70, 55],
    [width, randy + 20]
  ])
];

bt.iteratePoints(rightmount, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, rightmount);

bt.iteratePoints(leftmount, (pt, t) => {
  const [x, y] = pt;
  const freq = 3.58;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});
bt.join(finalLines, leftmount);

const rightshadow = [
  bt.nurbs([
    [67.5, randy + 20],
    [randomnum2 + 70, 45],
    [randomnum2 + 70, 55],
    [width, randy + 20]
  ])
];

bt.iteratePoints(rightshadow, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 25, { octaves: 3 }) * -17 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});

const leftshadow = [
  bt.nurbs([
    [0, randy + 20],
    [randomnum, 40],
    [randomnum, 50],
    [57.5, randy + 20]
  ])
];

bt.iteratePoints(leftshadow, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 25, { octaves: 3 }) * -17 * (t === 0 || t === 1 ? 0 : 1);
  return [x, y + dy];
});

// Cloud generation function
function generateCloud(numBlots, centerX, centerY) {
  const polylines = [];
  
  for (let i = 0; i < numBlots; i++) {
    const x = bt.randInRange(centerX - 10, centerX + 10);
    const y = bt.randInRange(centerY - 5, centerY + 5);
    const size = bt.randInRange(2, 5);
    
    const blot = bt.catmullRom([
      [x - size, y],
      [x, y + size],
      [x + size, y],
      [x, y - size],
      [x - size, y]
    ], 20);

    polylines.push(blot);
  }
  
  return polylines;
}


let cloud = generateCloud(100, 6, 100);
let cloud2 = generateCloud(10, 108, 113);
let cloud3 = generateCloud(10, 43, 113);

drawLines(sky, { fill: "Tomato" });
drawLines(land, { fill: "#4489cf" });
drawLines(sun, { fill: "orange" });
drawLines(finalLines, { fill: "Black" });
drawLines(leftshadow, { fill: "DarkBlue" });
drawLines(rightshadow, { fill: "DarkBlue" });
drawLines(cloud, { fill: "white" }); 
drawLines(cloud2, { fill: "white" }); 
drawLines(cloud3, { fill: "white" }); 
drawLines(birdLines);

