/* 
@title: Snowflake Banquet
@author: Ankita
@snapshot: snapshot3.png
*/


/*
You can change the number and size of petals, and the positions, colors, and line colors of snowflakes.

*/

const detail = 5; // no. of petals
const size = 22; // size of petals

const linecolor = "black"; // color of lines
const fillcolor = "lightblue"; // filled color

// flower positions
const positions = [
  [128, 143],
  [47, 77],
  [328, 60],
  [56, 337],
  [181, 264],
  [328, 317],
  [47,226],
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


const horizontalLine = new bt.Turtle();
const lineY = 2*height/7; // Y-coordinate for the horizontal line (middle of the canvas)

// Draw the horizontal line
horizontalLine.jump([0, lineY]); // Start from the left edge of the canvas
horizontalLine.forward(400); // Move to the right edge of the canvas


// Render the line
drawLines(horizontalLine.lines(), { stroke: "black", width: 1 });



const snowman = new bt.Turtle();
const snowmanBaseX = 293; // X-coordinate for the snowman base
const snowmanBaseY = 245; // Y-coordinate for the snowman base

// Draw the bottom circle (base)
snowman.jump([snowmanBaseX, snowmanBaseY]);
snowman.arc(360, 26); // larger circle

// Draw the middle circle
snowman.jump([snowmanBaseX, snowmanBaseY - 61]);
snowman.arc(360, 37); // medium circle

// Draw the top circle (head)
snowman.jump([snowmanBaseX, snowmanBaseY - 138]);
snowman.arc(360, 48); // smaller circle

// Draw the snowman body (including the head)
drawLines(snowman.lines(), { fill: "white", stroke: "black" });

// Draw the eyes (after the head)
const snowmanEye1 = new bt.Turtle();
snowmanEye1.jump([snowmanBaseX - 7, snowmanBaseY - -31]);
snowmanEye1.arc(360, 1);
drawLines(bt.scale(snowmanEye1.lines(), [1.0, 1.0]), { fill: "black" });

const snowmanEye2 = new bt.Turtle();
snowmanEye2.jump([snowmanBaseX + 9, snowmanBaseY - -31]);
snowmanEye2.arc(360, 1);
drawLines(bt.scale(snowmanEye2.lines(), [1.0, 1.0]), { fill: "black" });

// Draw the nose (carrot)
const snowmanNose = new bt.Turtle();
snowmanNose.jump([snowmanBaseX + 3, snowmanBaseY - -25]);
snowmanNose.forward(10);
drawLines(snowmanNose.lines(), { stroke: "orange", width: 4 });

// Draw the arms
const snowmanLeftArm = new bt.Turtle();
snowmanLeftArm.jump([snowmanBaseX - 45, snowmanBaseY - 1]);
snowmanLeftArm.right(45);
snowmanLeftArm.forward(15);
drawLines(snowmanLeftArm.lines(), { stroke: "brown", width: 2 });

const snowmanRightArm = new bt.Turtle();
snowmanRightArm.jump([snowmanBaseX + 35, snowmanBaseY - 9]);
snowmanRightArm.left(45);
snowmanRightArm.forward(15);
drawLines(snowmanRightArm.lines(), { stroke: "brown", width: 2 });
