/*
@title: Winter Wonderland
@author: Shayan Mazahir
@snapshot: 
*/

setDocDimensions(125, 125); // Canvas dimensions

// Variables for colours
const NIGHT_SKY_COLOR = 'midnightblue';
const SNOWFLAKE_COLORS = ['white', 'lightgrey', 'silver'];
const TREE_COLOR = 'forestgreen';
const TRUNK_COLOR = 'saddlebrown';
const HAT_COLOR = 'black';
const CARROT_COLOR = 'orange';
const BUTTON_COLOR = 'black';
const ARM_COLOR = 'brown';
const LIGHT_COLORS = ['red', 'yellow', 'blue', 'purple', 'pink'];
const STAR_COLOR = 'gold';

// Snowflake variables
const SNOWFLAKE_SIZE_MIN = 2;
const SNOWFLAKE_SIZE_MAX = 6;
const NUM_SNOWFLAKES = 30;

// Snowman variables
const SNOWMAN_BASE_SIZE = 12;
const SNOWMAN_MIDDLE_SIZE = 10;
const SNOWMAN_HEAD_SIZE = 8;
const SNOWMAN_SCALE = 1;
const SNOWMAN_X = 20;
const SNOWMAN_Y = 35;

// Tree variables
const TREE_TRUNK_HEIGHT = 8;
const TREE_TRUNK_WIDTH = 5;
const TREE_FOLIAGE_HEIGHT = 20;
const TREE_FOLIAGE_WIDTH = 15;
const LIGHT_SIZE = 2;
const NUM_LIGHTS = 8;
const STAR_SIZE = 6;
const TREE_X = 90;
const TREE_Y = 35;

// Draw night sky
drawLines([[[0, 0], [125, 0], [125, 125], [0, 125], [0, 0]]], { fill: NIGHT_SKY_COLOR, stroke: NIGHT_SKY_COLOR });

// Draw snowflakes
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

for (let i = 0; i < NUM_SNOWFLAKES; i++) {
  const size = bt.randIntInRange(SNOWFLAKE_SIZE_MIN, SNOWFLAKE_SIZE_MAX);
  const x = bt.randIntInRange(size, 125 - size);
  const y = bt.randIntInRange(size, 125 - size);
  const color = SNOWFLAKE_COLORS[bt.randIntInRange(0, SNOWFLAKE_COLORS.length)];
  
  const snowflakeTurtle = new bt.Turtle();
  drawSnowflake(snowflakeTurtle, x, y, size, color);
  
  drawLines(snowflakeTurtle.path, { stroke: color, width: 1 });
}

// Draw a single snowman
function drawSnowman(x, y, scale) {
  const BASE_SIZE = SNOWMAN_BASE_SIZE * scale;
  const MIDDLE_SIZE = SNOWMAN_MIDDLE_SIZE * scale;
  const HEAD_SIZE = SNOWMAN_HEAD_SIZE * scale;
  
  // Draw snowman body
  drawLines([[[x - BASE_SIZE, y], [x + BASE_SIZE, y], [x + BASE_SIZE, y + BASE_SIZE * 1.3], [x - BASE_SIZE, y + BASE_SIZE * 1.3], [x - BASE_SIZE, y]]], { fill: 'white', stroke: 'white' });
  drawLines([[[x - MIDDLE_SIZE, y + BASE_SIZE * 1.3], [x + MIDDLE_SIZE, y + BASE_SIZE * 1.3], [x + MIDDLE_SIZE, y + BASE_SIZE * 2.2], [x - MIDDLE_SIZE, y + BASE_SIZE * 2.2], [x - MIDDLE_SIZE, y + BASE_SIZE * 1.3]]], { fill: 'white', stroke: 'white' });
  drawLines([[[x - HEAD_SIZE, y + BASE_SIZE * 2.2], [x + HEAD_SIZE, y + BASE_SIZE * 2.2], [x + HEAD_SIZE, y + BASE_SIZE * 2.9], [x - HEAD_SIZE, y + BASE_SIZE * 2.9], [x - HEAD_SIZE, y + BASE_SIZE * 2.2]]], { fill: 'white', stroke: 'white' });
  
  // Draw snowman features
  drawLines([[[x - 8 * scale, y + BASE_SIZE * 2.9], [x + 8 * scale, y + BASE_SIZE * 2.9], [x + 8 * scale, y + BASE_SIZE * 3.1], [x - 8 * scale, y + BASE_SIZE * 3.1], [x - 8 * scale, y + BASE_SIZE * 2.9]]], { fill: HAT_COLOR, stroke: HAT_COLOR });
  
  drawLines([[[x - 4 * scale, y + BASE_SIZE * 2.2], [x, y + BASE_SIZE * 2.4], [x + 4 * scale, y + BASE_SIZE * 2.2]]], { stroke: CARROT_COLOR, width: 1 }); // Carrot nose
  
  // Draw snowman eyes
  drawLines([[[x - 2 * scale, y + BASE_SIZE * 2.1], [x - 2 * scale, y + BASE_SIZE * 2.1]]], { stroke: BUTTON_COLOR, width: 1 });
  drawLines([[[x + 2 * scale, y + BASE_SIZE * 2.1], [x + 2 * scale, y + BASE_SIZE * 2.1]]], { stroke: BUTTON_COLOR, width: 1 });
  
  // Draw snowman buttons
  drawLines([[[x, y + BASE_SIZE * 1.9], [x, y + BASE_SIZE * 1.9]]], { stroke: BUTTON_COLOR, width: 1 });
  drawLines([[[x, y + BASE_SIZE * 1.7], [x, y + BASE_SIZE * 1.7]]], { stroke: BUTTON_COLOR, width: 1 });
  drawLines([[[x, y + BASE_SIZE * 1.5], [x, y + BASE_SIZE * 1.5]]], { stroke: BUTTON_COLOR, width: 1 });
  
  // Draw snowman arms
  drawLines([[[x - BASE_SIZE * 0.6, y + BASE_SIZE * 0.8], [x - BASE_SIZE * 1.2, y + BASE_SIZE * 1.3]]], { stroke: ARM_COLOR, width: 1 });
  drawLines([[[x + BASE_SIZE * 0.6, y + BASE_SIZE * 0.8], [x + BASE_SIZE * 1.2, y + BASE_SIZE * 1.3]]], { stroke: ARM_COLOR, width: 1 });
}

// Draw single snowman
drawSnowman(SNOWMAN_X, SNOWMAN_Y, SNOWMAN_SCALE); // Moved snowman to the left

// Draw a pine tree with lights
function drawPineTree(x, y, size) {
  const TRUNK_HEIGHT = TREE_TRUNK_HEIGHT * size;
  const TRUNK_WIDTH = TREE_TRUNK_WIDTH * size;
  const FOLIAGE_HEIGHT = TREE_FOLIAGE_HEIGHT * size;
  const FOLIAGE_WIDTH = TREE_FOLIAGE_WIDTH * size;
  
  // Draw trunk
  drawLines([[[x - TRUNK_WIDTH / 2, y], [x + TRUNK_WIDTH / 2, y], [x + TRUNK_WIDTH / 2, y + TRUNK_HEIGHT], [x - TRUNK_WIDTH / 2, y + TRUNK_HEIGHT], [x - TRUNK_WIDTH / 2, y]]], { fill: TRUNK_COLOR, stroke: TRUNK_COLOR });

  // Draw foliage
  drawLines([[[x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT], [x + FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT], [x, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT], [x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT]]], { fill: TREE_COLOR, stroke: TREE_COLOR });
  drawLines([[[x - FOLIAGE_WIDTH / 1.5, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.5], [x + FOLIAGE_WIDTH / 1.5, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.5], [x, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT + FOLIAGE_HEIGHT * 0.5], [x - FOLIAGE_WIDTH / 1.5, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.5]]], { fill: TREE_COLOR, stroke: TREE_COLOR });
  drawLines([[[x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.75], [x + FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.75], [x, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT + FOLIAGE_HEIGHT * 0.75], [x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.75]]], { fill: TREE_COLOR, stroke: TREE_COLOR });
  
  // Draw lights on the tree
  function drawLight(x, y, color) {
    drawLines([[[x - LIGHT_SIZE, y], [x + LIGHT_SIZE, y]]], { stroke: color, width: 2 }); // Horizontal line
    drawLines([[[x, y - LIGHT_SIZE], [x, y + LIGHT_SIZE]]], { stroke: color, width: 2 }); // Vertical line
  }

  // Light positions on the tree
  for (let i = 0; i < NUM_LIGHTS; i++) {
    const xLight = bt.randIntInRange(x - FOLIAGE_WIDTH / 2, x + FOLIAGE_WIDTH / 2);
    const yLight = bt.randIntInRange(y + TRUNK_HEIGHT, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT);
    const color = LIGHT_COLORS[bt.randIntInRange(0, LIGHT_COLORS.length)];
    
    drawLight(xLight, yLight, color);
  }

  // Draw star on top of the tree
  function drawStar(x, y, size, color) {
    const turtle = new bt.Turtle().jump([x - size / 2, y - size / 2]).setAngle(0).down(); // Adjusted x and y
    for (let i = 0; i < 5; i++) {
        turtle.forward(size);
        turtle.right(144);
    }
    turtle.up();
    drawLines(turtle.path, { stroke: color, width: 2 });
  }

  // Calculate the position of the star
  const starX = x;
  const starY = y + TRUNK_HEIGHT + FOLIAGE_HEIGHT + (STAR_SIZE * 2.85); // Further adjustment

  // Draw the star at the calculated position
  drawStar(starX, starY, STAR_SIZE, STAR_COLOR);
}

// Draw pine tree
drawPineTree(TREE_X, TREE_Y, 1); // Increased width and moved pine tree to the right
