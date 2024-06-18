/*
@title: DragonBall
@author: Mayank
@snapshot: snapshot3.png
*/

// Set up the canvas dimensions

function randomBetween1And7() {
  return Math.floor(Math.random() * 7) + 1;
}

// Assigning a random number between 1 and 7 to a variable
const numStars = randomBetween1And7();



const width = 200;
const height = 200;
setDocDimensions(width, height);

// Function to draw a star
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;
  const path = [];

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    path.push([x, y]);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    path.push([x, y]);
    rot += step;
  }
  path.push([cx, cy - outerRadius]);
  drawLines([path], { fill: "red" });
}

// Main drawing function
function drawDragonBall() {
  // Set up the circle parameters
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 80;

  // Draw the orange circle
  const circlePath = new bt.Turtle();
  circlePath.up();
  circlePath.goTo([centerX, centerY - radius]);
  circlePath.down();
  circlePath.arc(360, radius);

  // Render the circle
  drawLines([circlePath.lines()[0]], { fill: "orange" });

  // Draw the stars
  // Number of stars in the Dragon Ball
  const starOuterRadius = 10;
  const starInnerRadius = 5;

  for (let i = 0; i < numStars; i++) {
    const angle = (Math.PI * 2 / numStars) * i;
    const starX = centerX + Math.cos(angle) * (radius / 2);
    const starY = centerY + Math.sin(angle) * (radius / 2);
    drawStar(starX, starY, 5, starOuterRadius, starInnerRadius);
  }
}

// Call the function to draw the Dragon Ball
drawDragonBall();
