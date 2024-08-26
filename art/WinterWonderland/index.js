setDocDimensions(800, 800);

// Draw night sky
drawLines([[[0, 0], [800, 0], [800, 800], [0, 800], [0, 0]]], { fill: 'lightblue', stroke: 'liightblue' });

// Draw snowflakes
const snowflakeColors = ['white', 'grey', 'silver'];

function drawSnowflake(turtle, x, y, size, color) {
  turtle.jump([x, y])
        .setAngle(0)
        .down()
        .forward(size);
  
  for (let i = 0; i < 6; i++) {
    turtle.right(60);
    turtle.forward(size);
    turtle.backward(size);
  }

  turtle.up();
}

for (let i = 0; i < 100; i++) {
  const x = bt.randIntInRange(0, 800);
  const y = bt.randIntInRange(0, 800);
  const size = bt.randIntInRange(5, 15);
  const color = snowflakeColors[bt.randIntInRange(0, snowflakeColors.length)];
  
  const snowflakeTurtle = new bt.Turtle();
  drawSnowflake(snowflakeTurtle, x, y, size, color);
  
  drawLines(snowflakeTurtle.path, { stroke: color, width: 1 });
}

// Draw snowmen
function drawSnowman(x, y) {
  const baseSize = 50;
  const middleSize = 40;
  const headSize = 30;
  
  // Draw snowman body
  drawLines([[[x - baseSize, y], [x + baseSize, y], [x + baseSize, y + baseSize * 1.5], [x - baseSize, y + baseSize * 1.5], [x - baseSize, y]]], { fill: 'white', stroke: 'white' });
  drawLines([[[x - middleSize, y + baseSize * 1.5], [x + middleSize, y + baseSize * 1.5], [x + middleSize, y + baseSize * 2.5], [x - middleSize, y + baseSize * 2.5], [x - middleSize, y + baseSize * 1.5]]], { fill: 'white', stroke: 'white' });
  drawLines([[[x - headSize, y + baseSize * 2.5], [x + headSize, y + baseSize * 2.5], [x + headSize, y + baseSize * 3.2], [x - headSize, y + baseSize * 3.2], [x - headSize, y + baseSize * 2.5]]], { fill: 'white', stroke: 'white' });
  
  // Draw snowman features
  const hatColor = 'black';
  drawLines([[[x - 20, y + baseSize * 3.2], [x + 20, y + baseSize * 3.2], [x + 20, y + baseSize * 3.6], [x - 20, y + baseSize * 3.6], [x - 20, y + baseSize * 3.2]]], { fill: hatColor, stroke: hatColor });
  
  drawLines([[[x - 10, y + baseSize * 3.2], [x + 10, y + baseSize * 3.2]]], { stroke: 'orange', width: 2 }); // Carrot nose
  
  // Draw snowman eyes
  drawLines([[[x - 5, y + baseSize * 2.8], [x - 5, y + baseSize * 2.8]]], { stroke: 'black', width: 3 });
  drawLines([[[x + 5, y + baseSize * 2.8], [x + 5, y + baseSize * 2.8]]], { stroke: 'black', width: 3 });
  
  // Draw snowman buttons
  drawLines([[[x, y + baseSize * 2.6], [x, y + baseSize * 2.6]]], { stroke: 'black', width: 3 });
  drawLines([[[x, y + baseSize * 2.4], [x, y + baseSize * 2.4]]], { stroke: 'black', width: 3 });
  drawLines([[[x, y + baseSize * 2.2], [x, y + baseSize * 2.2]]], { stroke: 'black', width: 3 });
  
  // Draw snowman arms
  drawLines([[[x - baseSize * 0.6, y + baseSize * 1.8], [x - baseSize * 1.2, y + baseSize * 2.4]]], { stroke: 'brown', width: 2 });
  drawLines([[[x + baseSize * 0.6, y + baseSize * 1.8], [x + baseSize * 1.2, y + baseSize * 2.4]]], { stroke: 'brown', width: 2 });
}

for (let i = 0; i < 3; i++) {
  const x = bt.randIntInRange(100, 700);
  const y = bt.randIntInRange(300, 600);
  drawSnowman(x, y);
}

// Adding some random stars
const starColors = ['white', 'lightyellow', 'lightblue'];

function drawStar(x, y, size, color) {
  const turtle = new bt.Turtle().jump([x, y]).setAngle(0).down();
  for (let i = 0; i < 5; i++) {
    turtle.forward(size);
    turtle.right(144);
  }
  turtle.up();
}

for (let i = 0; i < 20; i++) {
  const x = bt.randIntInRange(0, 800);
  const y = bt.randIntInRange(0, 800);
  const size = bt.randIntInRange(5, 15);
  const color = starColors[bt.randIntInRange(0, starColors.length)];
  
  const starTurtle = new bt.Turtle();
  drawStar(x, y, size, color);
  
  drawLines(starTurtle.path, { stroke: color, width: 2 });
}
