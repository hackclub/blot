/*
@title: Waves of the Horizon
@author: Audrey Wang
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();
const finalLines = [];

function drawHeart() {
  t.setAngle(180);
  t.forward(20);
  t.arc(180, 6);
  t.setAngle(-120);
  t.arc(180, 6);
  t.setAngle(63);
  t.forward(20);
}

function drawHeart2() {
  t.setAngle(170);
  t.forward(5);
  t.arc(180, 2);
  t.setAngle(-120);
  t.arc(180, 2);
  t.setAngle(68);
  t.forward(5);
}

function flower() {
  for (let i = 0; i < 10; i++) {
    t.forward(3);
    t.arc(160, 1);
  }
}

const sun = new bt.Turtle();
sun.jump([65, 57]);
sun.arc(360, 15);

// const flower = new bt.Turtle();
// for (let i = 0; i < 10; i++) {
//     flower.forward(3);
//     flower.arc(160, 1);
// }
// drawLines(flower.lines(), {fill: 'MediumPurple'});

const randx1 = bt.randIntInRange(Math.sin * 5, Math.sin * 25);
const randx2 = bt.randIntInRange(width / 5, width / 3);
const randx3 = bt.randIntInRange(width / 3, width / 2);
const randx4 = bt.randIntInRange(width / 2, width - 40);
const randx5 = bt.randIntInRange(width - 40, width - 20);
const randx6 = bt.randIntInRange(Math.sin * 105, Math.sin * 125);

const randy1 = bt.randIntInRange(30, 50);
const randy2 = bt.randIntInRange(40, 60);
const randy3 = bt.randIntInRange(50, 70);
const randy4 = bt.randIntInRange(60, 80);

const sky = [
  [
    [0, 125],
    [125, 125],
    [125, 20],
    [0, 20]
  ]
]

const horizon1 = [
  bt.nurbs([
    [0, 40], 
    [randx1, randy4],
    [randx2, randy3],
    [randx3, randy4],
    [125, 65],
    [125, 40]
  ])
]

const horizon2 = [
  bt.nurbs([
    [0, 35], 
    [-2, 50], 
    [randx2, randy3],
    [125, 55],
    [125, 35]
  ])
]

const horizon3 = [
  bt.nurbs([
    [0, 30], 
    [-2, 40], 
    [randx3, randy2],
    [randx5, randy2],
    [125, 45],
    [125, 30]
  ])
]

const horizon4 = [
  bt.nurbs([
    [0, 25], 
    [0, 40], 
    [randx2, randy2],
    [randx4, randy1],
    [125, 35],
    [125, 25]
  ])
]

const horizon5 = [
  bt.nurbs([
    [0, 20], 
    [0, 30], 
    [randx1, randy1],
    [randx2, randy1],
    [125, 35],
    [125, 20]
  ])
]

const centermtn = [
  bt.nurbs([
    [35, 0], 
    [55, 70], 
    [100, 0]
  ])
]

const leftmtn = [
  bt.nurbs([
    [0, 30],
    [170, -2], 
    [0, 0]
  ])
]

const rightmtn = [
  bt.nurbs([
    [125, 35],
    [-30, -2], 
    [125, 0]
  ])
]

for (let i = 0; i < 20; i++) {
  const randx = bt.randIntInRange(width / 12, width - 10);
  const randy = bt.randIntInRange(height / 20, height / 5);
  let degrees = bt.randIntInRange(0, 179);
  t.jump([randx, randy]);
  flower();
}

drawLines(sky, { fill: "DeepSkyBlue" });
drawLines(sun.lines(), {fill: 'Gold'});
drawLines(horizon1, { fill: "OliveDrab" });
drawLines(horizon2, { fill: "Olive" });
drawLines(horizon3, { fill: "DarkOliveGreen" });
drawLines(horizon4, { fill: "Green" });
drawLines(horizon5, { fill: "DarkGreen" });
drawLines(rightmtn, { fill: "ForestGreen" });
drawLines(leftmtn, { fill: "DarkSeaGreen" });
drawLines(centermtn, { fill: "MediumSeaGreen" });

drawLines(t.lines());

