/*
@title: 6-Sided Dice
@author: Owen O
@snapshot: snapshot1.png
*/

// Set the dimensions of the dice
setDocDimensions(100, 100);

// Create a function to draw a circle at a given position
function drawCircle(x, y, radius) {
  const steps = 360;
  const angleStep = 2 * Math.PI / steps;
  const points = [];

  for (let i = 0; i < steps; i++) {
    const angle = i * angleStep;
    points.push([x + radius * Math.cos(angle), y + radius * Math.sin(angle)]);
  }

  drawLines([points]);
}

// Create a function to draw the dice outline
function drawDiceOutline(thickness) {
  const outlinePoints = [[10, 10], [90, 10], [90, 90], [10, 90], [10, 10]];
 
  
  drawLines([outlinePoints]);
}
 drawDiceOutline(1);

// Create a function to draw the dots based on a random number
function drawDots(num) {
  const dotSpacing = 20;
  switch (num) {
    case 1:
      drawCircle(50, 50, 5);
      break;
    case 2:
      drawCircle(25, 25, 5);
      drawCircle(75, 75, 5);
      break;
    case 3:
      drawCircle(25, 25, 5);
      drawCircle(50, 50, 5);
      drawCircle(75, 75, 5);
      break;
    case 4:
      drawCircle(25, 25, 5);
      drawCircle(75, 25, 5);
      drawCircle(25, 75, 5);
      drawCircle(75, 75, 5);
      break;
    case 5:
      drawCircle(25, 25, 5);
      drawCircle(75, 25, 5);
      drawCircle(25, 75, 5);
      drawCircle(75, 75, 5);
      drawCircle(50, 50, 5);
      break;
    case 6:
      drawCircle(25, 25, 5);
      drawCircle(75, 25, 5);
      drawCircle(25, 50, 5);
      drawCircle(75, 50, 5);
      drawCircle(25, 75, 5);
      drawCircle(75, 75, 5);
      break;
    default:
      break;
  }
}

// Generate a random number between 1 and 6
const randomNumber = Math.floor(Math.random() * 6) + 1;

// Draw the dots based on the random number
drawDots(randomNumber);