const t = createTurtle();
t.up();

// Define parameters
const numCircles = 32;
const circleRadius = 50;
const dotRadius = 5;

// Function to draw a circle with dots
function drawCircleWithDots(radius, numDots) {
  const angleIncrement = (360 / numDots) * (Math.PI / 180);
  for (let i = 0; i < numDots; i++) {
    const angle = i * angleIncrement;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    t.goto([x, y]);
    t.down();
    t.forward(dotRadius * 2); // Draw short lines to simulate dots
    t.up();
  }
}

// Create a pattern of circles with dots
for (let i = 0; i < numCircles; i++) {
  const angle = (i * (360 / numCircles)) * (Math.PI / 180);
  const x = circleRadius * Math.cos(angle);
  const y = circleRadius * Math.sin(angle);
  
  t.goto([x, y]); // Move to the center of the circle
  t.down();
  drawCircleWithDots(dotRadius * 2, 36); // 36 dots for each circle with a smaller radius
  t.up();
  
  t.goto([0, 0]); // Return to the center
  t.up();
  t.forward(circleRadius * 2);
  t.right(360 / numCircles);
}

// Render the art
drawTurtles(t);
