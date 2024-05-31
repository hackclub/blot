// Set up the canvas dimensions
const width = 200;
const height = 200;
const size = 1+Math.round(Math.random()*10)/10;
setDocDimensions(width, 300);

// Function to draw the Roblox logo
const drawRobloxLogo = () => {
  const centerX = width / 4;
  const centerY = -5;
  const outerSize = 100;  // size of the outer square
  const innerSize = 25;   // size of the inner square

  // Draw the outer square
  const outerSquare = new bt.Turtle();
  outerSquare.up();
  outerSquare.goTo([centerX, centerY]);
  outerSquare.setAngle(45);  // Rotate the square 45 degrees
  outerSquare.forward(outerSize / Math.sqrt(2));
  outerSquare.setAngle(135);
  outerSquare.down();
  for (let i = 0; i < 4; i++) {
    outerSquare.forward(size * outerSize);
    outerSquare.right(90);
  }
  drawLines(outerSquare.lines(), { stroke: "black", fill: "black" });

  // Draw the inner square
  const innerSquare = new bt.Turtle();
  innerSquare.up();
  innerSquare.goTo([width / 2.3, height / 2.5]);
  innerSquare.setAngle(45);  // Rotate the square 45 degrees
  innerSquare.forward(innerSize / Math.sqrt(2));
  innerSquare.setAngle(135);
  innerSquare.down();
  for (let i = 0; i < 4; i++) {
    innerSquare.forward(size * innerSize);
    innerSquare.right(90);
  }
  drawLines(innerSquare.lines(), { stroke: "white", fill: "white" });
};

drawRobloxLogo();
