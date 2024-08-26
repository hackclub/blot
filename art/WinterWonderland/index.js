
setDocDimensions(1260, 1050); // Canvas dimensions

// Draw night sky
drawLines([[[0, 0], [1260, 0], [1260, 1050], [0, 1050], [0, 0]]], { fill: 'midnightblue', stroke: 'midnightblue' });

// Draw snowflakes
const snowflakeColors = ['white', 'lightgrey', 'silver'];

function drawSnowflake(turtle, x, y, size, color) {
  turtle.jump([x, y])
        .setAngle(0)
        .down()
        .forward(size);
  
  for (let i = 0; i < 6; i++) {
    turtle.right(60);
    turtle.forward(size);
    turtle.jump([x, y]); // Reposition for next line
    turtle.forward(size); // Draw line from the new position
  }

  turtle.up();
}

for (let i = 0; i < 157; i++) { // Number of snowflakes
  const x = bt.randIntInRange(0, 1260);
  const y = bt.randIntInRange(0, 1050);
  const size = bt.randIntInRange(5, 21);
  const color = snowflakeColors[bt.randIntInRange(0, snowflakeColors.length)];
  
  const snowflakeTurtle = new bt.Turtle();
  drawSnowflake(snowflakeTurtle, x, y, size, color);
  
  drawLines(snowflakeTurtle.path, { stroke: color, width: 1 });
}

// Draw snowmen
function drawSnowman(x, y) {
  const baseSize = 78; // Size for snowmen
  const middleSize = 63;
  const headSize = 48;
  
  // Draw snowman body
  drawLines([[[x - baseSize, y], [x + baseSize, y], [x + baseSize, y + baseSize * 1.55], [x - baseSize, y + baseSize * 1.55], [x - baseSize, y]]], { fill: 'white', stroke: 'white' });
  drawLines([[[x - middleSize, y + baseSize * 1.55], [x + middleSize, y + baseSize * 1.55], [x + middleSize, y + baseSize * 2.6], [x - middleSize, y + baseSize * 2.6], [x - middleSize, y + baseSize * 1.55]]], { fill: 'white', stroke: 'white' });
  drawLines([[[x - headSize, y + baseSize * 2.6], [x + headSize, y + baseSize * 2.6], [x + headSize, y + baseSize * 3.3], [x - headSize, y + baseSize * 3.3], [x - headSize, y + baseSize * 2.6]]], { fill: 'white', stroke: 'white' });
  
  // Draw snowman features
  const hatColor = 'black';
  drawLines([[[x - 31, y + baseSize * 3.3], [x + 31, y + baseSize * 3.3], [x + 31, y + baseSize * 3.7], [x - 31, y + baseSize * 3.7], [x - 31, y + baseSize * 3.3]]], { fill: hatColor, stroke: hatColor });
  
  drawLines([[[x - 16, y + baseSize * 3.3], [x, y + baseSize * 3.45], [x + 16, y + baseSize * 3.3]]], { stroke: 'orange', width: 2 }); // Carrot nose
  
  // Draw snowman eyes
  drawLines([[[x - 11, y + baseSize * 2.9], [x - 11, y + baseSize * 2.9]]], { stroke: 'black', width: 3 });
  drawLines([[[x + 11, y + baseSize * 2.9], [x + 11, y + baseSize * 2.9]]], { stroke: 'black', width: 3 });
  
  // Draw snowman buttons
  drawLines([[[x, y + baseSize * 2.7], [x, y + baseSize * 2.7]]], { stroke: 'black', width: 3 });
  drawLines([[[x, y + baseSize * 2.5], [x, y + baseSize * 2.5]]], { stroke: 'black', width: 3 });
  drawLines([[[x, y + baseSize * 2.3], [x, y + baseSize * 2.3]]], { stroke: 'black', width: 3 });
  
  // Draw snowman arms
  drawLines([[[x - baseSize * 0.84, y + baseSize * 1.9], [x - baseSize * 1.68, y + baseSize * 2.5]]], { stroke: 'brown', width: 2 });
  drawLines([[[x + baseSize * 0.84, y + baseSize * 1.9], [x + baseSize * 1.68, y + baseSize * 2.5]]], { stroke: 'brown', width: 2 });
}

for (let i = 0; i < 6; i++) { // Number of snowmen
  const maxX = 1260 - 78; // 78 is the baseSize
  const maxY = 1050 - 78 * 1.55; // 1.55 times the baseSize to fit the full height of the snowman
  const x = bt.randIntInRange(78, maxX);
  const y = bt.randIntInRange(78, maxY);
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

for (let i = 0; i < 31; i++) { // Number of stars
  const x = bt.randIntInRange(0, 1260);
  const y = bt.randIntInRange(0, 1050);
  const size = bt.randIntInRange(5, 21);
  const color = starColors[bt.randIntInRange(0, starColors.length)];
  
  const starTurtle = new bt.Turtle();
  drawStar(x, y, size, color);
  
  drawLines(starTurtle.path, { stroke: color, width: 2 });
}
