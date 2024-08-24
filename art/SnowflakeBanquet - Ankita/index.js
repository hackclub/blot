/* 
@title: Snowflake Banquet
@author: Ankita
@snapshot: snapshot3.png
*/

/*
You can change the number and size of snow, and the positions, colors, and line colors of snowflakes.
*/

const detail = 5; // no. of flakes
const size = 22; // size of flakes

const linecolor = "black"; // color of lines
const fillcolor = "lightblue"; // filled color

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


/* Add snowdrifts */
const snowdrift = new bt.Turtle();
snowdrift.jump([213, 113]);
snowdrift.forward(59);
snowdrift.forward(31);
snowdrift.forward(-29);
snowdrift.forward(66);
snowdrift.right(54);
snowdrift.forward(75);
drawLines(snowdrift.lines(), { fill: "#D3D3D3", stroke: "#D3D3D3" });

/* Snowman */
const snowman = new bt.Turtle();
const snowmanBaseX = 293;
const snowmanBaseY = 245;

snowman.jump([snowmanBaseX, snowmanBaseY]);
snowman.arc(360, 26);

snowman.jump([snowmanBaseX, snowmanBaseY - 61]);
snowman.arc(360, 37);

snowman.jump([snowmanBaseX, snowmanBaseY - 138]);
snowman.arc(360, 48);

drawLines(snowman.lines(), { fill: "white", stroke: "black" });

const snowmanEye1 = new bt.Turtle();
snowmanEye1.jump([snowmanBaseX - 7, snowmanBaseY - -31]);
snowmanEye1.arc(360, 1);
drawLines(bt.scale(snowmanEye1.lines(), [1.0, 1.0]), { fill: "black" });

const snowmanEye2 = new bt.Turtle();
snowmanEye2.jump([snowmanBaseX + 9, snowmanBaseY - -31]);
snowmanEye2.arc(360, 1);
drawLines(bt.scale(snowmanEye2.lines(), [1.0, 1.0]), { fill: "black" });

const snowmandot1 = new bt.Turtle();
snowmanEye2.jump([snowmanBaseX + 3, snowmanBaseY - 26]);
snowmanEye2.arc(360, 1);
drawLines(bt.scale(snowmanEye2.lines(), [1.0, 1.0]), { fill: "black" });

const snowmandot2 = new bt.Turtle();
snowmanEye2.jump([snowmanBaseX + 3, snowmanBaseY - 15]);
snowmanEye2.arc(360, 1);
drawLines(bt.scale(snowmanEye2.lines(), [1.0, 1.0]), { fill: "black" });

const snowmandot3 = new bt.Turtle();
snowmanEye2.jump([snowmanBaseX + 3, snowmanBaseY - 37]);
snowmanEye2.arc(360, 1);
drawLines(bt.scale(snowmanEye2.lines(), [1.0, 1.0]), { fill: "black" });

const snowmanNose = new bt.Turtle();
snowmanNose.jump([snowmanBaseX + 3, snowmanBaseY - -25]);
snowmanNose.forward(10);
drawLines(snowmanNose.lines(), { stroke: "orange", width: 4 });

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

/* Add a hat on the snowman */
const hat = new bt.Turtle();
hat.jump([snowmanBaseX - 21, snowmanBaseY - -45]); // Base of the hat
hat.forward(40);
hat.left(90);
hat.forward(8);
hat.left(90);
hat.forward(40);
hat.left(90);
hat.forward(8);
hat.jump([snowmanBaseX - 18, snowmanBaseY - -80]); // Top part of the hat
hat.forward(30);
hat.left(90);
hat.forward(33);
hat.left(90);
hat.forward(30);
hat.left(90);
hat.forward(20);
drawLines(hat.lines(), { fill: "black", stroke: "black" });

/* Add a scarf on the snowman */
const scarf = new bt.Turtle();
scarf.jump([snowmanBaseX - 16, snowmanBaseY - -1]); // Start of the scarf
scarf.forward(40);
scarf.left(90);
scarf.forward(10);
scarf.left(90);
scarf.forward(47);
scarf.left(90);
scarf.forward(10);
scarf.jump([snowmanBaseX - 4, snowmanBaseY - -6]); // Scarf hanging down
scarf.right(90);
scarf.forward(15);
scarf.left(90);
scarf.forward(20);
scarf.left(90);
scarf.forward(15);
drawLines(scarf.lines(), { fill: "red", stroke: "red" });

//present
const present = new bt.Turtle();
present.jump([snowmanBaseX + -72, snowmanBaseY + -135]); 
present.forward(48);
present.left(90);
present.forward(46);
present.left(90);
present.forward(46);
present.left(90);
present.forward(46);
drawLines(present.lines(), { fill: "red", stroke: "red" });

const ribbon = new bt.Turtle();
ribbon.jump([snowmanBaseX + -47, snowmanBaseY + -94]);
ribbon.left(129);
ribbon.forward(26);
ribbon.jump([snowmanBaseX + -47, snowmanBaseY + -94]);
ribbon.left(275);
ribbon.forward(26);
ribbon.jump([snowmanBaseX + -47, snowmanBaseY + -95]);
ribbon.left(225);
ribbon.forward(38);
drawLines(ribbon.lines(), { stroke: "yellow", width: 10 });

/* Trees */
const treePositions = [
  [49, 111],
  [34, 111],
  [14, 111],
];

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

  /* Add lights to trees */
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




const positions = [
  [128, 143],
  [47, 77],
  [328, 60],
  [56, 337],
  [181, 264],
  [328, 317],
  [47,226],
];

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

