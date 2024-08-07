/*
@title: A Fractal Foray into the Forest
@author: Adya
@snapshot: FractalTree.png
*/

// Set Dimensions
const width = 165;
const height = 160;
setDocDimensions(width, height);

// Store final lines, leaves, flowers, and fruits
const finalLines = [];
const finalLeaves = [];
const finalFlowers = [];
const finalFruits = [];

// Draw a branch
function branch(startX, startY, len, angle) {
  const endX = startX + len * Math.cos(angle);
  const endY = startY + len * Math.sin(angle);
  // Create a line
  const line = [
    [startX, startY],
    [endX, endY]
  ];
  // Add line to the final lines
  finalLines.push(line);
  if (len > 8) { // Increase the length threshold to reduce the number of elements
    // Draw 2 new branches
    const newAngle = bt.randInRange(-0.15, 0.15); // Add some randomness to the angle
    branch(endX, endY, len * 0.67, angle + Math.PI / 4 + newAngle); // Adjust the angles here
    branch(endX, endY, len * 0.67, angle - Math.PI / 4 + newAngle); // Here as well
  } else {
    // Add leaves, flowers, and fruits at the tips with spacing
    if (bt.rand() > 0.7) {
      finalLeaves.push([endX, endY]);
    } else if (bt.rand() > 0.5) {
      finalFlowers.push([endX, endY]);
    } else {
      finalFruits.push([endX, endY]);
    }
  }
}

// Draw the tree
branch(width / 2, height / 100, 50, Math.PI / 2); // Start the tree from the center of the canvas

// Draw final lines, leaves, flowers, and fruits
drawFinalLines(finalLines);
drawLeaves(finalLeaves);
drawFlowers(finalFlowers);
drawFruits(finalFruits);

function drawFinalLines(lines) {
  // Implement the drawing logic for lines
  drawLines(lines);
}

function drawLeaves(leaves) {
  // Implement the drawing logic for leaves
  leaves.forEach(leaf => {
    const leafShape = new bt.Turtle()
      .jump(leaf)
      .down()
      .forward(5)
      .right(120)
      .forward(5)
      .right(120)
      .forward(5)
      .lines();
    drawLines(leafShape);
  });
}

function drawFlowers(flowers) {
  // Implement the drawing logic for flowers
  flowers.forEach(flower => {
    const flowerShape = new bt.Turtle()
      .jump(flower)
      .down()
      .arc(360, 3)
      .right(45)
      .arc(360, 3)
      .right(45)
      .arc(360, 3)
      .right(45)
      .arc(360, 3)
      .lines();
    drawLines(flowerShape);
  });
}

function drawFruits(fruits) {
  // Implement the drawing logic for fruits
  fruits.forEach(fruit => {
    const fruitShape = new bt.Turtle()
      .jump(fruit)
      .down()
      .forward(4)
      .right(90)
      .forward(4)
      .right(90)
      .forward(4)
      .right(90)
      .forward(4)
      .lines();
    drawLines(fruitShape);
  });
}
