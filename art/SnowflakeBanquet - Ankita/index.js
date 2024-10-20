
/* 
@title: Snowflake Banquet
@author: Ankita
@snapshot: snapshot3.png
*/


const detail = 5; // no. of flakes
const size = 22; // size of flakes
const number = 7; //number of snowflakes

const linecolor = "black"; // color of lines
const fillcolor = "lightblue"; // filled color


const treePositions = [ //tree positions
  [57, 111],
  [34, 111],
  [14, 111],
];

const positions = Array.from({ length: number }, () => [
  bt.randIntInRange(0, 400), // random X position between 0 and 400
  bt.randIntInRange(0, 400)  // random Y position between 0 and 400
]);

const width = 400;
const height = 400;
setDocDimensions(width, height);
const drawing = [];

// snow positions
const horizontalLine = new bt.Turtle();
const lineY = 2 * height / 7;

// Draw the horizontal line
horizontalLine.jump([0, lineY]);
horizontalLine.forward(400);

drawLines(horizontalLine.lines(), { stroke: "black", width: 1 });
const snowmanSize = 1.0; // Change this value to resize the snowman
const snowmanBaseX = 270; // X position of snowman (doesn't need scaling)
const snowmanBaseY = 245; // Y position of snowman (doesn't need scaling)





// shadow
const snowdrift = new bt.Turtle();
snowdrift.jump([snowmanBaseX + (8 * snowmanSize) - (70 * snowmanSize), 113]);
snowdrift.forward(59 * snowmanSize);
snowdrift.forward(31 * snowmanSize);
snowdrift.forward(-29 * snowmanSize);
snowdrift.forward(66 * snowmanSize);
snowdrift.right(54);
snowdrift.forward(75 * snowmanSize);
drawLines(snowdrift.lines(), { fill: "#D3D3D3", stroke: "#D3D3D3" });



// snowman body
const snowman = new bt.Turtle();
snowman.jump([snowmanBaseX, snowmanBaseY]);
snowman.arc(360, 26 * snowmanSize);

snowman.jump([snowmanBaseX, snowmanBaseY - 61 * snowmanSize]);
snowman.arc(360, 37 * snowmanSize);

snowman.jump([snowmanBaseX, snowmanBaseY - 138 * snowmanSize]);
snowman.arc(360, 48 * snowmanSize);

drawLines(snowman.lines(), { fill: "white", stroke: "black" });

// snowman eyes
const snowmanEye1 = new bt.Turtle();
snowmanEye1.jump([snowmanBaseX - 7 * snowmanSize, snowmanBaseY - -27 * snowmanSize]);
snowmanEye1.arc(360, 1 * snowmanSize);
drawLines(bt.scale(snowmanEye1.lines(), [1.0, 1.0]), { fill: "black" });

const snowmanEye2 = new bt.Turtle();
snowmanEye2.jump([snowmanBaseX + 9 * snowmanSize, snowmanBaseY - -27 * snowmanSize]);
snowmanEye2.arc(360, 1 * snowmanSize);
drawLines(bt.scale(snowmanEye2.lines(), [1.0, 1.0]), { fill: "black" });

// snowman nose
const snowmanNose = new bt.Turtle();
snowmanNose.jump([snowmanBaseX + 3 * snowmanSize, snowmanBaseY - -22 * snowmanSize]);
snowmanNose.forward(10 * snowmanSize);
drawLines(snowmanNose.lines(), { stroke: "orange", width: 4 * snowmanSize });

// snowman arms
const snowmanLeftArm = new bt.Turtle();
snowmanLeftArm.jump([snowmanBaseX - 45 * snowmanSize, snowmanBaseY - -2 * snowmanSize]);
snowmanLeftArm.right(45);
snowmanLeftArm.forward(15 * snowmanSize);
drawLines(snowmanLeftArm.lines(), { stroke: "brown", width: 2 * snowmanSize });

const snowmanRightArm = new bt.Turtle();
snowmanRightArm.jump([snowmanBaseX + 35 * snowmanSize, snowmanBaseY - 9 * snowmanSize]);
snowmanRightArm.left(45);
snowmanRightArm.forward(15 * snowmanSize);
drawLines(snowmanRightArm.lines(), { stroke: "brown", width: 2 * snowmanSize });

// hat
const hat = new bt.Turtle();
hat.jump([snowmanBaseX - 20 * snowmanSize, snowmanBaseY - -42 * snowmanSize]); 
hat.forward(40 * snowmanSize);
hat.left(90);
hat.forward(8 * snowmanSize);
hat.left(90);
hat.forward(40 * snowmanSize);
hat.left(90);
hat.forward(8 * snowmanSize);
hat.jump([snowmanBaseX - 17 * snowmanSize, snowmanBaseY - -76 * snowmanSize]); 
hat.forward(30 * snowmanSize);
hat.left(90);
hat.forward(33 * snowmanSize);
hat.left(90);
hat.forward(30 * snowmanSize);
hat.left(90);
hat.forward(20 * snowmanSize);
drawLines(hat.lines(), { fill: "black", stroke: "black" });

// scarf
const scarf = new bt.Turtle();
scarf.jump([snowmanBaseX - 16 * snowmanSize, snowmanBaseY - 1 * snowmanSize]); // Start of the scarf
scarf.forward(40 * snowmanSize);
scarf.left(90);
scarf.forward(10 * snowmanSize);
scarf.left(90);
scarf.forward(47 * snowmanSize);
scarf.left(90);
scarf.forward(10 * snowmanSize);
scarf.jump([snowmanBaseX - 4 * snowmanSize, snowmanBaseY - -4 * snowmanSize]); // Scarf hanging down
scarf.right(90);
scarf.forward(15 * snowmanSize);
scarf.left(90);
scarf.forward(20 * snowmanSize);
scarf.left(90);
scarf.forward(15 * snowmanSize);
drawLines(scarf.lines(), { fill: "red", stroke: "red" });

// Continue scaling other parts like presents, shadows, and other objects accordingly



//present
// Present
const present = new bt.Turtle();
present.jump([snowmanBaseX + (-72 * snowmanSize), snowmanBaseY + (-135 * snowmanSize)]); 
present.forward(48 * snowmanSize);
present.left(90);
present.forward(46 * snowmanSize);
present.left(90);
present.forward(46 * snowmanSize);
present.left(90);
present.forward(46 * snowmanSize);
drawLines(present.lines(), { fill: "red", stroke: "red" });

const ribbon = new bt.Turtle();
ribbon.jump([snowmanBaseX + (-47 * snowmanSize), snowmanBaseY + (-94 * snowmanSize)]);
ribbon.left(129);
ribbon.forward(26 * snowmanSize);
ribbon.jump([snowmanBaseX + (-47 * snowmanSize), snowmanBaseY + (-94 * snowmanSize)]);
ribbon.left(275);
ribbon.forward(26 * snowmanSize);
ribbon.jump([snowmanBaseX + (-47 * snowmanSize), snowmanBaseY + (-95 * snowmanSize)]);
ribbon.left(225);
ribbon.forward(38 * snowmanSize);
drawLines(ribbon.lines(), { stroke: "yellow", width: 10 * snowmanSize });

/* Trees */


treePositions.forEach(pos => {
  const trunk = new bt.Turtle();
  trunk.jump([pos[0], pos[1]]);
  trunk.forward(9);
  trunk.left(90);
  trunk.forward(30);
  trunk.left(90);
  trunk.forward(10);
  trunk.left(90);
  trunk.forward(30);

  const leaves = new bt.Turtle();
  leaves.jump([pos[0] - 15, pos[1] + 11]);
  leaves.forward(41);
  leaves.left(105);
  leaves.forward(35);
  leaves.forward(42);

// tree lights
  const lights = new bt.Turtle();
  lights.jump([pos[0] + -5, pos[1] + 43]);
  for (let i = 0; i < 3; i++) {
    lights.forward(3);
    lights.arc(360, 2);
    lights.forward(5);
  }
  lights.jump([pos[0] + -9, pos[1] + 32]);
  for (let i = 0; i < 4; i++) {
    lights.forward(3);
    lights.arc(360, 2);
    lights.forward(5);
  }
  lights.jump([pos[0] + -9, pos[1] + 18]);
  for (let i = 0; i < 4; i++) {
    lights.forward(3);
    lights.arc(360, 2);
    lights.forward(5);
  }


  drawLines(trunk.lines(), { fill: "brown", stroke: "brown" });
  drawLines(leaves.lines(), { fill: "green", stroke: "green" });
  drawLines(lights.lines(), { fill: "yellow", stroke: "yellow" });
});





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

