/*
@title: SmartPhoneFrontGenerator
@author: AhmedShaaban
@snapshot: ex1.png
*/

let size = 200 // width & height of the board
setDocDimensions(size, size);

const turtle = new bt.Turtle();

// adjustable parameters - self explanatory
let screenWidth = 80;
// screenWidth = bt.randIntInRange(80, 150); // uncomment for wider range of shapes
const screenHeight = bt.randIntInRange(130, 176);
const topBezel = bt.randInRange(2.2, 4.3);
const bottomBezel = 6-topBezel;
const leftBezel = bt.randInRange(2, 2.8);
const rightBezel = leftBezel; 
const cornerRadius = bt.randInRange(2,5);
let apps = bt.randIntInRange(9,29); // number of apps on the screen
const showButtons = 1; // toggle to show buttons
let buttonPosition = bt.randIntInRange(0,1); // 0 for 'left', 1 for 'right'
const buttonHeight = bt.randIntInRange(7,9); // height of each button
const cameraRadius = bt.randInRange(1.5, 2.7); // radius of the solid camera circle
const cameraX = bt.randInRange(-screenWidth/2.5, screenWidth/2.5); // 'x' position of the camera relative to the center of the screen
const cameraY = screenHeight-bt.randInRange(20.2, 23); // 'y' position of the camera relative to the top of the screen

// a function to draw a rounded rectangle
function drawRoundedRect(turtle, x, y, width, height, cornerRadius) {
  turtle.jump([x + cornerRadius, y]);
  turtle.forward(width - 2 * cornerRadius);
  turtle.arc(90, cornerRadius);
  turtle.forward(height - 2 * cornerRadius);
  turtle.arc(90, cornerRadius);
  turtle.forward(width - 2 * cornerRadius);
  turtle.arc(90, cornerRadius);
  turtle.forward(height - 2 * cornerRadius);
  turtle.arc(90, cornerRadius);
}

// a function to draw a solid circle using filled rectangles
function drawSolidCircle(turtle, x, y, radius) {
  let currentRadius = radius;
  for (let i = 0; currentRadius > 0; i++) {
    const rectWidth = 2 * currentRadius;
    const rectHeight = 2 * currentRadius;
    const rectX = x - currentRadius;
    const rectY = y - currentRadius;
    drawRoundedRect(turtle, rectX, rectY, 2*currentRadius, 2*currentRadius, currentRadius);
    currentRadius -= .1;
  }
}

// a function to draw the phone front with adjustable screen, bezels, applications, buttons, and camera
function drawPhoneFront(turtle, screenWidth, screenHeight, topBezel, bottomBezel, leftBezel, rightBezel, cornerRadius, apps, showButtons, buttonPosition, buttonHeight, cameraRadius, cameraX, cameraY) {
    // dimensions of the phone body
  const phoneWidth = screenWidth + leftBezel + rightBezel;
  const phoneHeight = screenHeight + topBezel + bottomBezel;
    // drawing the phone body with rounded corners
  drawRoundedRect(turtle, (size - phoneWidth) / 2, (size - phoneHeight) / 2, phoneWidth, phoneHeight, cornerRadius);
    // calculate the position of the screen within the phone body
  const screenX = (size - phoneWidth) / 2 + leftBezel;
  const screenY = (size - phoneHeight) / 2 + topBezel;
    // draw the screen with rounded corners
  drawRoundedRect(turtle, screenX, screenY, screenWidth, screenHeight, cornerRadius);
    // calculate the number of applications per row based on screen width
  const minAppSize = bt.randInRange(5.5, 10);
  const appSpacing = phoneWidth / minAppSize/4;
  const numAppsPerRow = Math.floor(screenWidth / (minAppSize + appSpacing));
  const appSize = (screenWidth - (numAppsPerRow + 1) * appSpacing) / numAppsPerRow; 
    // draw the applications
  for (let row = 0; row < Math.ceil(apps / 2*numAppsPerRow); row++) {
    for (let col = 0; col < Math.min(numAppsPerRow, apps - row * numAppsPerRow); col++) {
      const x = screenX + appSpacing + col * (appSize + appSpacing);
      const y = screenY + appSpacing + row * (appSize + appSpacing);
      drawRoundedRect(turtle, x, y, appSize, appSize, cornerRadius);
    }
  }
     // drawing the buttons
  if (showButtons) {
    const buttonWidth = leftBezel-.4; // narrowing button width
    const buttonSpacing = screenHeight/(screenHeight-bt.randIntInRange(40, 60));
    const buttonY = (size - phoneHeight) / 1.4 + topBezel + (screenHeight - buttonHeight) / 2;
    let buttonX;
    if (buttonPosition == 0) {
      buttonX = (size - phoneWidth) / 2;
    } else {
      buttonX = (size + phoneWidth) / 2 - buttonWidth;
    }
    drawRoundedRect(turtle, buttonX, buttonY, buttonWidth, buttonHeight, buttonWidth);
    drawRoundedRect(turtle, buttonX, buttonY + buttonHeight + buttonSpacing, buttonWidth, buttonHeight, buttonWidth);
    drawRoundedRect(turtle, buttonX, buttonY + 2 * (buttonHeight + buttonSpacing), buttonWidth, buttonHeight, buttonWidth);
  }
    // drawing the camera (solid circle using concentric filled rectangles)
  drawSolidCircle(turtle, screenX + screenWidth / 2 + cameraX, screenY + screenHeight / 10 + cameraY, cameraRadius);
}

drawPhoneFront(turtle, screenWidth, screenHeight, bottomBezel, topBezel, leftBezel, rightBezel, cornerRadius, apps, showButtons, buttonPosition, buttonHeight, cameraRadius, cameraX, cameraY);
drawLines(turtle.lines());
