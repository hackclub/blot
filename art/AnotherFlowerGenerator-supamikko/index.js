/*
@title: Flower Generator
@author: supamikko
@snapshot: Example1.png
*/


// This is my personal prefrence for the values. They can be changed to your likeing however.
let color = true
// Turns color on and off. (Includes background and grass.)
let randomTRight = bt.randInRange(1.195, 1.2);
// How much the turtle rotates per iteration for the circles.
let randomIterate = bt.randInRange(180, 360);
// How many degrees the cirlces have.
let size = 500
// How big the doc dimentions are. (Pretty useless but i made it anyways.)
let circleCount = 75
// Increases how many circles are drawn. More circles makes the picture busier, so be careful if you want to draw this with the blot machine. (Sometimes the flower can generate with the cirlces not being spaced out enough. This can be fixed by increasing the circle count.)
let leafs = true
// Turns leafs on and off.
// There are about 360,000,000,000,000,000,000,000,000,000 possible variations only considering the values above. (Mainly due to randInRange using decimal points.)


// Dont edit after here. (WARNING: Code is VERY unoptimized after this point.)
const width = size;
const height = size;
const base_height = 500;
const base_width = 500;
const randomY = bt.randInRange(2.5, 3.4);
const randomY2 = bt.randInRange(2.5, 3.4);
const randomX = bt.randIntInRange(2.5, 3);
const randomDiv = bt.randIntInRange(35, 40);
const PHI = (1 + Math.sqrt(5)) / 2;
const radius = Math.sqrt(0.5);
const t = new bt.Turtle;
const PI = Math.PI;
const leafType = bt.randIntInRange(1, 2);
const grass = [
  [
    [0, 0],
    [width, 0],
    [width, height / (height / 7)],
    [0, height / (height / 7)],
    [0, 0]

  ]
]

const leftLeaf = [
  [
    [width / 2, height / randomY],
    [width / randomX, height / randomY - (height / randomDiv)],
    [width / 2, height / randomY - (height / 15)],
  ]
]
const rightLeaf = [
  [
    [width / 2, height / randomY2],
    [width / (randomX / 2), height / randomY2 - (height / randomDiv * randomTRight)],
    [width / 2, height / randomY2 - (height / 15)],
  ]
]

const leftLeaf2 = [
  bt.nurbs([
    [width / 2, height / randomY],
    [width / (randomX * 2), height / randomY - (height / randomDiv)],
    [width / 2, height / randomY - (height / 15)],
  ])
]
const rightLeaf2 = [
  bt.nurbs([
    [width / 2, height / randomY2],
    [width / (randomX / 2.4), height / randomY2 - (height / randomDiv * randomTRight)],
    [width / 2, height / randomY2 - (height / 15)],
  ])
]

const sky = [
  [
    [0, 0],
    [0, height],
    [width, height],
    [width, 0]
  ]
]
const stem = [
  [
    [(width / 2 + Math.cos(1 * PHI * PI) * (1 / 25 * radius)) - (height / base_height + width / base_width), height / 1.5 + Math.cos(1 * PHI * PI) * (1 / 25 * radius)],
    [(width / 2 + Math.cos(1 * PHI * PI) * (1 / 25 * radius)) - (height / base_height + width / base_width), height / 1.5 + Math.cos(1 * PHI * PI) * (1 / 25 * radius) - (height / 1.5)],
    [(width / 2 + Math.cos(1 * PHI * PI) * (1 / 25 * radius)) + (height / base_height + width / base_width), height / 1.5 + Math.cos(1 * PHI * PI) * (1 / 25 * radius)],
  ]
]
const randClr = bt.randIntInRange(0, 10);
let clr = "Empty"
// Probably could have made an array for this but idrc.
if (color == true) {
  if (randClr == 0) {
    clr = "MediumBlue";
  }
  if (randClr == 1) {

    clr = "DeepPink";
  }
  if (randClr == 2) {
    clr = "Red";
  }
  if (randClr == 3) {
    clr = "Gold";
  }
  if (randClr == 4) {
    clr = "Coral";
  }
  if (randClr == 5) {
    clr = "DarkOrchid";
  }
  if (randClr == 6) {
    clr = "DarkOrange";
  }
  if (randClr == 7) {
    clr = "Maroon";
  }
  if (randClr == 8) {
    clr = "Magenta";
  }
  if (randClr == 9) {
    clr = "Navy";
  }
  if (randClr == 10) {
    clr = "FireBrick";
  }
}

console.log("Random Iterate", randomIterate);
console.log("Random T Right", randomTRight);
console.log("Random Color", randClr);

setDocDimensions(width, height);
t.down();


for (let i = 1; i < circleCount; i++) {
  let f = i / circleCount;
  let angle = i * PHI;
  let dist = f * radius;

  let x = width / 2 + Math.cos(angle * PI) * dist;
  let y = height / 1.5 + Math.sin(angle * PI) * dist;

  t.jump([x, y]);

  for (let i = 0; i < randomIterate; i++) {
    t.forward(1);
    t.right(randomTRight);
  }

}
let scaledLines = bt.scale(t.lines(), (height / base_height + width / base_width) / 2);


if (color == true) {
  drawLines(sky, { fill: "SkyBlue" });
  drawLines(sky, { stroke: "Black" });
  if (leafs == true) {
    if (leafType == 1) {
      drawLines(leftLeaf, { fill: "Lime" });
      drawLines(rightLeaf, { fill: "Lime" });
    }
    if (leafType == 2) {
      drawLines(leftLeaf2, { fill: "Lime" });
      drawLines(rightLeaf2, { fill: "Lime" });
    }
  }
  drawLines(stem, { fill: "Chartreuse" });
  drawLines(stem, { stroke: "LimeGreen" });
  drawLines(grass, { fill: "LawnGreen" });
  drawLines(grass, { stroke: "Black" });
  drawLines(scaledLines, { fill: clr });
  drawLines(scaledLines, { stroke: "Black" });
}

if (color == false) {
  if (leafs == true) {
    if (leafType == 1) {
      drawLines(leftLeaf);
      drawLines(rightLeaf);
    }
    if (leafType == 2) {
      drawLines(leftLeaf2);
      drawLines(rightLeaf2);
    }
  }
  drawLines(stem);
  drawLines(scaledLines);
}