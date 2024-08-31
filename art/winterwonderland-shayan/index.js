/*
@title: Winter Wonderland
@author: Shayan Mazahir
@snapshot: image3.png
*/

setDocDimensions(125, 125); // Canvas dimensions

// Variables for colours
const NIGHT_SKY_COLOR = 'black'; // Set to black for black-and-white theme
const SNOWFLAKE_COLORS = ['white', 'lightgrey', 'silver'];
const TREE_COLOR = 'grey'; // Set to grey for black-and-white theme
const TRUNK_COLOR = 'darkgrey'; // Set to dark grey for black-and-white theme
const HAT_COLOR = 'black';
const CARROT_COLOR = 'white'; // White for visibility in black-and-white
const BUTTON_COLOR = 'black';
const ARM_COLOR = 'darkgrey'; // Set to dark grey for black-and-white theme
const LIGHT_COLORS = ['white', 'lightgrey', 'silver']; 
const STAR_COLOR = 'white'; // Set to white for black-and-white theme

// Draw night sky
drawLines([[[0, 0], [125, 0], [125, 125], [0, 125], [0, 0]]], { fill: NIGHT_SKY_COLOR, stroke: NIGHT_SKY_COLOR });

// Functions to check if snowflake is within a tree or snowman
function isWithinTreeOrSnowman(x, y, trees, snowman) {
    for (let tree of trees) {
        if (x >= tree.x - tree.width / 2 && x <= tree.x + tree.width / 2 &&
            y >= tree.y && y <= tree.y + tree.height) {
            return true;
        }
    }
    if (x >= snowman.x - snowman.width / 2 && x <= snowman.x + snowman.width / 2 &&
        y >= snowman.y && y <= snowman.y + snowman.height) {
        return true;
    }
    return false;
}

// Draw snowflakes without collisions
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

let snowflakePositions = []; // Store positions of snowflakes

function checkCollision(x, y, size, trees, snowman) {
    for (let pos of snowflakePositions) {
        let dist = Math.sqrt(Math.pow(x - pos[0], 2) + Math.pow(y - pos[1], 2));
        if (dist < size * 2.5) { // Increased distance threshold to reduce collisions
            return true;
        }
    }
    return isWithinTreeOrSnowman(x, y, trees, snowman); // Check if within tree or snowman
}

let trees = [
    { x: 45, y: 30, width: 15, height: 28 }, // Tree 1
    { x: 86, y: 45, width: 15, height: 28 }, // Tree 2
    { x: 115, y: 55, width: 13.5, height: 25 } // Tree 3 (slightly smaller)
];
let snowman = { x: 20, y: 35, width: 24, height: 35 };

for (let i = 0; i < 30; i++) { // Number of snowflakes
    let attempts = 0;
    let x, y, size, color;

    do {
        size = bt.randIntInRange(2, 6); // Snowflake size
        x = bt.randIntInRange(size, 125 - size); // Ensure snowflake stays within canvas
        y = bt.randIntInRange(size, 125 - size); // Ensure snowflake stays within canvas
        color = SNOWFLAKE_COLORS[bt.randIntInRange(0, SNOWFLAKE_COLORS.length)];
        attempts++;
    } while (checkCollision(x, y, size, trees, snowman) && attempts < 100); // Retry if there's a collision

    if (attempts < 100) { // Increased attempts for finding non-colliding positions
        snowflakePositions.push([x, y]);
        const snowflakeTurtle = new bt.Turtle();
        drawSnowflake(snowflakeTurtle, x, y, size, color);
        drawLines(snowflakeTurtle.path, { stroke: color, width: 1 });
    }
}

// Draw a single snowman
function drawSnowman(x, y, scale) {
    const BASE_SIZE = 12 * scale;
    const MIDDLE_SIZE = 10 * scale;
    const HEAD_SIZE = 8 * scale;

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
drawSnowman(20, 35, 1); // Moved snowman to the left

// Draw a pine tree with lights
function drawPineTree(x, y, size) {
  const TRUNK_HEIGHT = 8 * size;
  const TRUNK_WIDTH = 5 * size;
  const FOLIAGE_HEIGHT = 20 * size;
  const FOLIAGE_WIDTH = 15 * size; // Wider foliage
  
  // Draw trunk
  drawLines([[[x - TRUNK_WIDTH / 2, y], [x + TRUNK_WIDTH / 2, y], [x + TRUNK_WIDTH / 2, y + TRUNK_HEIGHT], [x - TRUNK_WIDTH / 2, y + TRUNK_HEIGHT], [x - TRUNK_WIDTH / 2, y]]], { fill: TRUNK_COLOR, stroke: TRUNK_COLOR });

  // Draw foliage
  drawLines([[[x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT], [x + FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT], [x, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT], [x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT]]], { fill: TREE_COLOR, stroke: TREE_COLOR });
  drawLines([[[x - FOLIAGE_WIDTH / 1.5, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.5], [x + FOLIAGE_WIDTH / 1.5, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.5], [x, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT + FOLIAGE_HEIGHT * 0.5], [x - FOLIAGE_WIDTH / 1.5, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.5]]], { fill: TREE_COLOR, stroke: TREE_COLOR });
  drawLines([[[x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.75], [x + FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.75], [x, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT + FOLIAGE_HEIGHT * 0.75], [x - FOLIAGE_WIDTH / 2, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT * 0.75]]], { fill: TREE_COLOR, stroke: TREE_COLOR });
  
  // Draw lights on the tree
  function drawLight(x, y, color) {
    const LIGHT_SIZE = 2; // Size of the light
    drawLines([[[x - LIGHT_SIZE, y], [x + LIGHT_SIZE, y]]], { stroke: color, width: 2 }); // Horizontal line
    drawLines([[[x, y - LIGHT_SIZE], [x, y + LIGHT_SIZE]]], { stroke: color, width: 2 }); // Vertical line
  }

  // Light positions on the tree
  for (let i = 0; i < 10; i++) { // Increased number of lights to 10
    const xLight = bt.randIntInRange(x - FOLIAGE_WIDTH / 2 + 1, x + FOLIAGE_WIDTH / 2 - 1);
    const yLight = bt.randIntInRange(y + TRUNK_HEIGHT + 1, y + TRUNK_HEIGHT + FOLIAGE_HEIGHT - 1);
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
  const STAR_SIZE = 6;
  const starX = x;
  const starY = y + TRUNK_HEIGHT + FOLIAGE_HEIGHT + (STAR_SIZE * 2.5); 

  // Draw the star at the calculated position
  drawStar(starX, starY, STAR_SIZE, STAR_COLOR);
}

// Draw three pine trees with adjusted positions
drawPineTree(45, 30, 1); // Moved tree to avoid overlap
drawPineTree(86, 45, 1); // Adjusted position
drawPineTree(115, 55, 0.9); // Adjusted position