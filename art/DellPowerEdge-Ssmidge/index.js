/*
@title: DellPowerEdge
@author: Ssmidge
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

/*
Positions:
1 - Top
2 - Middle
3 - Bottom
*/
const randomPosition = Math.round(blotToolkit.randInRange(1, 3));
const randomSize = Math.round(blotToolkit.randInRange(1, 3));
/*
Sizes:
1 - Middle, 2U
2 - Smaller, 1U
3 - Largest, 3U
*/
/*
Text options:
1 - Dell EMC
2 - Dell
*/
const randomText = Math.round(blotToolkit.randInRange(1, 2));

const serverTurtle = new bt.Turtle();
const textTurtle = new bt.Turtle();
const portTurtle = new bt.Turtle();

// Set starting point and dimensions
const startX = 5;
const startY = randomPosition == 1 ? 80 : randomPosition == 2 ? 45 : 30;
const serverWidth = 80;
const serverHeight = randomSize == 1 ? 25 : randomSize == 2 ? 15 : 30;
const caddyWidth = 20;
const bezelHeight = 5; // Height of the bezel at the top
const caddyHeight = randomSize == 3 ? (serverHeight - bezelHeight) / 3 : (serverHeight - bezelHeight) / 2; // Adjusted caddy height with bezel
const topDepth = 55;

function drawPowerEdgeServer(turtle) {
  turtle.jump([startX, startY]);

  // Front face
  turtle.down();
  turtle.forward(serverWidth);
  turtle.right(90);
  turtle.forward(serverHeight);
  turtle.right(90);
  turtle.forward(serverWidth);
  turtle.right(90);
  turtle.forward(serverHeight);
  turtle.right(90);


  // Space above the caddies
  turtle.up();
  turtle.jump([startX, startY - bezelHeight]);
  turtle.down();
  turtle.forward(serverWidth);

  // Draw the caddies (4 horizontal by 2 vertical)
  if (randomSize !== 3) {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        turtle.up();
        turtle.jump([startX + col * caddyWidth, startY - bezelHeight - row * caddyHeight]);
        turtle.down();
        turtle.forward(caddyWidth);
        turtle.right(90);
        turtle.forward(caddyHeight);
        turtle.right(90);
        turtle.forward(caddyWidth);
        turtle.right(90);
        turtle.forward(caddyHeight);
        turtle.right(90);
      }
    }
  } else {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        turtle.up();
        turtle.jump([startX + col * caddyWidth, startY - bezelHeight - row * caddyHeight]);
        turtle.down();
        turtle.forward(caddyWidth);
        turtle.right(90);
        turtle.forward(caddyHeight);
        turtle.right(90);
        turtle.forward(caddyWidth);
        turtle.right(90);
        turtle.forward(caddyHeight);
        turtle.right(90);
      }
    }
  }

  // Top face
  turtle.up();
  turtle.jump([startX, startY]);
  turtle.down();
  turtle.left(45);
  turtle.forward(topDepth);
  turtle.right(45);
  turtle.forward(serverWidth);
  turtle.right(135);
  turtle.forward(topDepth);
  turtle.right(45);
  turtle.forward(serverWidth);

  // Connect the edges of the top and front faces
  turtle.up();
  turtle.jump([startX + serverWidth, startY - serverHeight]);
  turtle.down();
  turtle.left(45);
  turtle.forward(-topDepth);
  turtle.left(45);
  turtle.forward(-serverHeight);

  turtle.up();
}

function drawDellEMC(turtle, size) {
  drawDell(turtle, size);
  drawEMC(turtle, size);
}

function drawDell(turtle, size) {
  // D
  turtle.up();
  turtle.left(180);
  turtle.forward(size / 2);
  turtle.right(90);
  turtle.down();
  turtle.forward(size * 3 / 2);
  turtle.right(90);
  turtle.arc(-180, size * 3 / 4)
  turtle.up();

  // E
  turtle.right(180);
  turtle.forward(size);
  turtle.left(90);
  turtle.down();
  turtle.forward(size * 3 / 2);
  for (let i = 1; i <= 3; i++) {
    turtle.right(90);
    turtle.forward(size);
    turtle.up();
    turtle.forward(-size);
    turtle.left(90);
    turtle.forward(-size * 3 / 4);
    turtle.down();
  }
  turtle.up();
  turtle.forward(size * 3 / 4);
  turtle.right(90);
  turtle.forward(size / 3);
  // L
  turtle.forward(size);
  for (let i = 1; i <= 2; i++) {
    turtle.left(90);
    turtle.down();
    turtle.forward(size * 3 / 2);
    turtle.up();
    turtle.forward(-size * 3 / 2);
    turtle.right(90);
    turtle.down();
    turtle.forward(size * 3 / 4);
    turtle.up();
    turtle.forward(size / 3);
  }
  // turtle.forward(size);
}

function drawEMC(turtle, size) {
  // E
  turtle.forward(size);

  turtle.left(90);
  turtle.down();
  turtle.forward(size * 3 / 2);
  for (let i = 1; i <= 3; i++) {
    turtle.right(90);
    turtle.forward(size);
    turtle.up();
    turtle.forward(-size);
    turtle.left(90);
    turtle.forward(-size * 3 / 4);
    turtle.down();
  }
  turtle.up();
  turtle.forward(size * 3 / 4);
  turtle.right(90);
  turtle.forward(size / 3);
  turtle.forward(size);
  // M
  turtle.left(90);
  turtle.down();
  turtle.forward(size * 3 / 2);
  turtle.right(145);
  turtle.forward(size);
  turtle.left(115);
  turtle.forward(size);
  turtle.right(150);
  turtle.forward(size * 3 / 2);

  turtle.up();
  turtle.left(90);
  turtle.forward(size / 8);
  // C
  turtle.forward(size);
  turtle.left(90);
  turtle.forward(size * 3 / 2);
  turtle.right(90);
  turtle.down();

  turtle.arc(-25, size * 3 / 4);
  turtle.up();
  turtle.arc(-155, size * 3 / 4);
  turtle.right(90);
  turtle.forward(size * 3 / 2);
  turtle.left(90);
  turtle.down();
  turtle.arc(220, size * 3 / 4);
}

function drawVGAPort(turtle, size) {
  turtle.left(90);
  turtle.forward(size);
  turtle.down();
  turtle.arc(360, 0.15);
  turtle.right(90);
  turtle.up();
  turtle.forward(size / 4);
  turtle.right(90);
  turtle.forward(size / 4);
  turtle.left(90);
  turtle.forward(size / 8);
  turtle.down();

  turtle.left(115);
  turtle.forward(size / 2);
  turtle.right(115);
  turtle.forward(size);
  turtle.right(115);
  turtle.forward(size / 2);
  turtle.right(65);
  turtle.forward(size / 1.732);

  turtle.setAngle(0);
  turtle.up();
  turtle.forward(size / 1.732);
  turtle.forward(size / 4 + size / 8);

  turtle.left(90);
  turtle.forward(size / 4);
  turtle.down();
  turtle.right(180);
  turtle.arc(360, 0.15);
}

drawPowerEdgeServer(serverTurtle);
textTurtle.up();
textTurtle.setAngle(0);
textTurtle.goTo([startX + 5, startY - bezelHeight + 1]);
switch (randomText) {
  case 1: {
    drawDellEMC(textTurtle, 2);
  }
  break;
  case 2: {
    drawDell(textTurtle, 2);
  }
  break;
  default:
    drawDellEMC(textTurtle, 2);
}

portTurtle.up();
portTurtle.setAngle(0);
portTurtle.goTo([startX + serverWidth - 5, startY - bezelHeight + 1]);
drawVGAPort(portTurtle, 2);

drawLines(portTurtle.lines(), {
  stroke: "black",
  width: 3,
  fill: "gray"
});

drawLines(textTurtle.lines(), {
  width: 1,
  stroke: "LightSlateGray",
  width: 3
});
drawLines(serverTurtle.lines(), {
  width: 1,
  stroke: "DimGray",
  width: 4
});
