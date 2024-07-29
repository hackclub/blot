/* 
@title: Flower Banquet
@author: Ankita
@snapshot: snapshot3.png
*/


/*
You can change the number and size of petals, and the positions, colors, and line colors of flowers.

*/

const detail = 6; // no. of petals
const size = 38; // size of petals

const linecolor = "black"; // color of lines
const fillcolor = "pink"; // filled color

// flower positions
const positions = [
  [146, 186],
  [85, 77],
  [272, 86],
  [90, 328],
  [258, 260],
  [307, 339],
];

const width = 400;
const height = 400;
setDocDimensions(width, height);
const drawing = [];

function draw_petal(turtle, length) {
  for (let i = 0; i < 2; i++) {
    turtle.forward(length);
    turtle.left(50);
    turtle.forward(length);
    turtle.left(130);
  }
}

function draw_flower(turtle, petals, length) {
  for (let i = 0; i < petals; i++) {
    draw_petal(turtle, length);
    turtle.left(360 / petals);
  }
}


positions.forEach(pos => {
  const t = new bt.Turtle();
  draw_flower(t, detail, size);
  const flowerLines = t.lines();
  bt.translate(flowerLines, pos);
  bt.join(drawing, flowerLines);
});

drawLines(drawing, { fill: fillcolor, stroke: linecolor, width: 2 });
