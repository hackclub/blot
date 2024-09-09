/*
welcome to blot!

@title: cinnaSparkle 
@author: UNAG15HR1MP
@snapshot: cinnamonroll.png 

I wanted to create something I would love to print on a blot.
So decided to combine my love of Cinnamonroll (Sanrio)
and sparkles! To make it more dynamic and generative I 
randomized the head and sparkles. Yay!

check out this guide to learn how to program in blot
https://blot.hackclub.com/editor?guide=start
*/

const width = 125; 
const height = 125;

setDocDimensions(width, height);

// primary drawing arrays
const cinnaHead = [];
const eyes = [];
const smiles = [];
const blushes = [];

// draw eyes
const lefteye = new bt.Turtle();
lefteye.jump([49, 70]);
lefteye.arc(360, 2);
bt.join(eyes, bt.scale(lefteye.lines(),[0.85, 1.3]));

const righteye = new bt.Turtle();
righteye.jump([70, 70]);
righteye.arc(360, 2);
bt.join(eyes, bt.scale(righteye.lines(),[0.85, 1.3]));

// draw blush
const leftblush = new bt.Turtle();
leftblush.jump([43, 62]);
leftblush.arc(360, 4);
bt.join(blushes, bt.scale(leftblush.lines(),[1.17, -0.4]));

const rightblush = new bt.Turtle();
rightblush.jump([68, 62]);
rightblush.arc(360, 4);
bt.join(blushes, bt.scale(rightblush.lines(),[1.17, -0.4]));

// draw smile
const leftsmile = [
  bt.nurbs([
    [59, 68], 
    [53, 66], 
    [54, 70]
  ])
];
bt.join(smiles, leftsmile);

const rightsmile = [
  bt.nurbs([
    [65, 70], 
    [67, 66], 
    [59, 68]
  ])
];
bt.join(smiles, rightsmile);

// draw ears
const completeHead = [
  bt.nurbs([
    [37.0, 75],
    [11.5, 79.5],
    [8.2, 58],
    [37.7, 70],
    [44.0, 68],
    [37, 53], 
    [81, 52],
    [76, 65],
    [78.5, 70],
    [109.6, 58],
    [110.5, 76.4],
    [74.9, 77],//length of rightear line height of line
    [80, 75], //length of righthead line height of line
    [60, 85], //top head leftright or how high
    [37, 75] //length of lefthead line height of line
  ])
];

const starShape = (size) => {
  const t = new bt.Turtle()
  t.right(36)
  t.forward(size)
  t.left(108)
  t.forward(size)
  t.right(36)
  t.forward(size)
  t.left(108)
  t.forward(size)
  t.right(36)
  t.forward(size)
  t.left(108)
  t.forward(size)
  t.right(36)
  t.forward(size)
  t.left(108)
  t.forward(size)
  t.right(36)
  t.forward(size)
  t.left(108)
  t.forward(size)
  return t.lines()
}

const heartShape = (sizeHeart) => {
  const wholeHeart = []
  // draw left heart
  const leftHeart = [
    bt.nurbs([
      [35.0, 70],
      [24.0, 83.8],
      [10.2, 60],
      [35.0, 47]
    ])
  ];
  bt.join(wholeHeart, leftHeart);
  const rightHeart = bt.copy(leftHeart);
  bt.scale(rightHeart, [-1, 1], [35, 0]);
  bt.join(wholeHeart, rightHeart);
  bt.scale(wholeHeart, [sizeHeart * 0.25, sizeHeart * 0.25], [0,0]);
  return wholeHeart
}

const colors = ["yellow", "lightgreen", "lightorange", "black", "red", "lightblue"];

function getRandomColor() {
  return colors[bt.randIntInRange(0, colors.length - 1)];
}

const heartLine = [];
const starLine = [];

const gridWidth = 15
const gridHeight = 15
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    const star = starShape(2)
    const heart = heartShape(.7)
    const randNum = bt.randIntInRange(1, 10);
    const shapeRotation = bt.randIntInRange(-50, 50);
    if (randNum % 2 === 0) {
      bt.translate(star, [gridWidth * i, gridHeight * j])
      bt.rotate(star, shapeRotation);
      bt.join(starLine, star);
    } else {
      bt.translate(heart, [gridWidth * i, gridHeight * j])
      bt.rotate(heart, shapeRotation);
      bt.join(heartLine, heart);
    }
  }
}

// this moves the center of our drawing to the center of our doc
bt.translate(
  starLine,
  [ width / 2, height / 2 ], 
  bt.bounds(starLine).cc
); 

bt.translate(
  heartLine,
  [ width / 2, height / 2 ], 
  bt.bounds(heartLine).cc
); 

drawLines(starLine,{ fill:getRandomColor()});
drawLines(heartLine,{ fill:getRandomColor()});

const headRotation = bt.randIntInRange(-30, 30);

bt.translate(completeHead, [width/2, height/2], bt.bounds(completeHead).cc)
bt.rotate(completeHead, headRotation);
drawLines(completeHead, { fill: "white" });

bt.translate(smiles, [width/2,(height/2)-3], bt.bounds(smiles).cc)
bt.rotate(smiles, headRotation);
drawLines(smiles);

bt.translate(eyes, [width/2, (height/2)+1], bt.bounds(eyes).cc)
bt.rotate(eyes, headRotation);
drawLines(eyes, { fill: "lightblue" });

bt.translate(blushes, [width/2, (height/2)-4.25], bt.bounds(blushes).cc)
bt.rotate(blushes, headRotation);
drawLines(blushes, { fill: "pink" });
