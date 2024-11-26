/*
@title: myMobile
@author: Reffat
@snapshot: GreatestPhoneOfAllTime.png
*/

let size = 150; // Adjust board size for smaller phone
setDocDimensions(size, size);

const turtle = new bt.Turtle();

// Adjustable parameters
const phoneWidth = 80; // Phone body width
const phoneHeight = 150; // Phone body height
const screenMargin = 6; // Distance from the screen to phone edge
const screenWidth = phoneWidth - 2 * screenMargin; // Screen width
const screenHeight = phoneHeight - 2 * screenMargin; // Screen height
const buttonWidth = 2; // Side button width
const buttonHeight = 12; // Side button height
const buttonGap = 6; // Gap between buttons
const appsPerRow = 3; // Apps per row
const appSize = 10; // App icon size
const appSpacing = 8; // Space between apps

// Draw a rectangle
function drawRect(turtle, x, y, width, height) {
  return [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y],
  ];
}

// Draw a solid circle
function drawSolidCircle(turtle, x, y, radius) {
  const steps = 36;
  const angle = (2 * Math.PI) / steps;
  const circle = [];
  for (let i = 0; i <= steps; i++) {
    const dx = x + radius * Math.cos(i * angle);
    const dy = y + radius * Math.sin(i * angle);
    circle.push([dx, dy]);
  }
  return circle;
}

// Phone body
const phoneBody = drawRect(
  turtle,
  (size - phoneWidth) / 2,
  (size - phoneHeight) / 2,
  phoneWidth,
  phoneHeight
);

// Screen
const screen = drawRect(
  turtle,
  (size - phoneWidth) / 2 + screenMargin,
  (size - phoneHeight) / 2 + screenMargin,
  screenWidth,
  screenHeight
);


// Buttons
const buttons = [];
const buttonX = (size - phoneWidth) / 2 - buttonWidth + 3.8;
const buttonYStart = size / 2 - buttonHeight / 2 +20;
for (let i = 0; i < 2; i++) {
  buttons.push(
    drawRect(
      turtle,
      buttonX,
      buttonYStart + i * (buttonHeight + buttonGap),
      buttonWidth,
      buttonHeight
    )
  );
}

// Speaker grille
const speaker = [];
const speakerWidth = 20;
const speakerHeight = 2;
const speakerX = size / 2 - speakerWidth / 2;
const speakerY = (size + phoneHeight) / 2 - 10;
for (let i = 0; i < 3; i++) {
  speaker.push(
    drawRect(
      turtle,
      speakerX + i * (speakerWidth / 3),
      speakerY,
      speakerWidth / 6,
      speakerHeight
    )
  );
}

// App icons
const apps = [];
const totalAppWidth = appsPerRow * appSize + (appsPerRow - 1) * appSpacing;
const appStartX = size / 2 - totalAppWidth / 2;
const appStartY =
  size / 2 - (Math.floor(screenHeight / (appSize + appSpacing)) / 2) * (appSize + appSpacing);

for (let row = 0; row < 7; row++) {
  for (let col = 0; col < appsPerRow; col++) {
    const appX = appStartX + col * (appSize + appSpacing);
    const appY = appStartY + row * (appSize + appSpacing);
    if (
      appX + appSize + screenMargin < size &&
      appY + appSize + screenMargin < size
    ) {
      apps.push(drawRect(turtle, appX, appY, appSize, appSize));
    }
  }
}

// Draw the phone with fills
drawLines([phoneBody], { fill: "darkBlue" }); // Phone body color
drawLines([screen], { fill: "white" }); // Screen color
drawLines(buttons, { fill: "white" }); // Buttons color
drawLines(speaker, { fill: "darkBlue" }); // Speaker grille color
drawLines(apps, { fill: "lightblue" }); // App icons color
