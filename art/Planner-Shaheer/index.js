/**
 * @title: NoteTakingPlanner
 * @author: Shaheer
 * @snapshot: snapshot.png
 */

// Set the canvas size
const canvasSize = 350;
setDocDimensions(canvasSize, canvasSize);

const turtle = new bt.Turtle();

// Was supposed to be a Planner in the beginning so thats why the code has these identifiers
const screenWidthRange = { min: 200, max: 280 };
const screenHeightRange = { min: 120, max: 160 };
const topBezelRange = { min: 5, max: 10 };
const bottomBezelRange = { min: 10, max: 20 };
const leftBezelRange = { min: 5, max: 10 };
const rightBezelRange = { min: 5, max: 10 };
const cornerRadiusRange = { min: 3, max: 6 };
const keyboardHeightRange = { min: 20, max: 30 };
const keyboardLayoutOptions = ['standard', 'compact', 'numeric'];

// Helper functions
function getRandomValue(range) {
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function getRandomOption(options) {
  return options[Math.floor(Math.random() * options.length)];
}

function drawRoundedRect(x, y, width, height, radius) {
  turtle.jump([x + radius, y]);
  turtle.forward(width - 2 * radius);
  turtle.arc(90, radius);
  turtle.forward(height - 2 * radius);
  turtle.arc(90, radius);
  turtle.forward(width - 2 * radius);
  turtle.arc(90, radius);
  turtle.forward(height - 2 * radius);
  turtle.arc(90, radius);
}

// Main function
function generatePlanner() {
  // Generate random parameter values
  const screenWidth = getRandomValue(screenWidthRange);
  const screenHeight = getRandomValue(screenHeightRange);
  const topBezel = getRandomValue(topBezelRange);
  const bottomBezel = getRandomValue(bottomBezelRange);
  const leftBezel = getRandomValue(leftBezelRange);
  const rightBezel = getRandomValue(rightBezelRange);
  const cornerRadius = getRandomValue(cornerRadiusRange);
  const keyboardHeight = getRandomValue(keyboardHeightRange);
  const keyboardLayout = getRandomOption(keyboardLayoutOptions);

  // Dimensions of the Planner body
  const PlannerWidth = screenWidth + leftBezel + rightBezel;
  const PlannerHeight = screenHeight + topBezel + bottomBezel + keyboardHeight;

  // Draw the Planner body with rounded corners
  drawRoundedRect(
    (canvasSize - PlannerWidth) / 2,
    (canvasSize - PlannerHeight) / 2,
    PlannerWidth,
    PlannerHeight,
    cornerRadius
  );

  // Calculate the position of the screen within the Planner body
  const screenX = (canvasSize - PlannerWidth) / 2 + leftBezel;
  const screenY = (canvasSize - PlannerHeight) / 2 + topBezel;

  // Draw the screen with rounded corners
  drawRoundedRect(screenX, screenY, screenWidth, screenHeight, cornerRadius);

  // Draw the keyboard
  const keyboardX = (canvasSize - PlannerWidth) / 2 + leftBezel;
  const keyboardY = (canvasSize + PlannerHeight) / 2 - bottomBezel - keyboardHeight;
  const keyboardWidth = screenWidth;

  // Draw the keyboard layout
  switch (keyboardLayout) {
    case 'standard':
      drawStandardKeyboard(keyboardX, keyboardY, keyboardWidth, keyboardHeight, cornerRadius);
      break;
    case 'compact':
      drawCompactKeyboard(keyboardX, keyboardY, keyboardWidth, keyboardHeight, cornerRadius);
      break;
    case 'numeric':
      drawNumericKeyboard(keyboardX, keyboardY, keyboardWidth, keyboardHeight, cornerRadius);
      break;
  }
}

// Keyboard layout functions
function drawStandardKeyboard(x, y, width, height, radius) {
  const numRows = 4;
  const numCols = 12;
  const keyWidth = width / numCols;
  const keyHeight = height / numRows;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const keyX = x + col * keyWidth;
      const keyY = y + row * keyHeight;
      drawRoundedRect(keyX, keyY, keyWidth, keyHeight, radius);
    }
  }
}

function drawCompactKeyboard(x, y, width, height, radius) {
  const numRows = 3;
  const numCols = 10;
  const keyWidth = width / numCols;
  const keyHeight = height / numRows;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const keyX = x + col * keyWidth;
      const keyY = y + row * keyHeight;
      drawRoundedRect(keyX, keyY, keyWidth, keyHeight, radius);
    }
  }
}

function drawNumericKeyboard(x, y, width, height, radius) {
  const numRows = 3;
  const numCols = 4;
  const keyWidth = width / numCols;
  const keyHeight = height / numRows;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const keyX = x + col * keyWidth;
      const keyY = y + row * keyHeight;
      drawRoundedRect(keyX, keyY, keyWidth, keyHeight, radius);
    }
  }
}

// Generate and draw the Planner
generatePlanner();
drawLines(turtle.lines());