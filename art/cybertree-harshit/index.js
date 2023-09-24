const t = createTurtle();

// Set the position of the Sakura tree
t.up();
t.goto([60, -0.4]); // Adjust the y-coordinate as needed
t.down();

// Draw Sakura trunk in the middle
t.pensize = 39; // Set the pen size
t.pencolor = "brown"; // Set the pen color
t.setAngle(90);
t.forward(50); // Adjust the trunk's length and position in the middle

// Function to draw Sakura terminal branch
function drawTerminalBranch(x, y, length, angle) {
  t.up();
  t.goto([x, y]);
  t.down();
  t.pensize = length / 11; // Set the pen size for branches
  t.pencolor = "brown"; // Set the pen color for branches
  t.setAngle(angle);
  t.forward(length);
  
  // Draw Sakura sub-terminal branches
  if (length > 14) {
    drawTerminalBranch(x, y, length * -0.0, angle - 58); // Left sub-branch
    drawTerminalBranch(x, y, length * 0.6, angle + 14); // Right sub-branch
  }
}

// Draw Sakura terminal branch on the right
drawTerminalBranch(60, 28, 30, 45); // Adjust the parameters for the right branch

// Draw Sakura terminal branch on the left
drawTerminalBranch(60, 49, 30, 135); // Adjust the parameters for the left branch

// Function to draw a Sakura blossom at the specified location
function drawBlossomAtLocation(x, y) {
  const petalSize = 1; // Make the petals even smaller

  t.up();
  t.goto([x, y]);
  t.down();
  t.fillColor = "pink"; // Set the fill color
  t.pencolor = "pink"; // Set the pen color to pink

  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 151; j++) {
      t.forward(petalSize);
      t.right(-6);
    }

    t.up();
    t.right(72); 
    t.forward(petalSize * 5); 
    t.down();
  }
}

// Draw Sakura petals at the specified location (60.2mm, 48.3mm)
drawBlossomAtLocation(82.7, 67.5);

// Add one more Sakura petal at a different location
drawBlossomAtLocation(34, 80); // Adjust the coordinates for the new petal

// Render the Sakura Tree (trunk, terminal branches, and sub-terminal branches)
drawTurtles(t);
