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
  if (len > 4) {
    // Draw 2 new branches
    const newAngle = bt.randInRange(-0.15, 0.15); // Add some randomness to the angle
    branch(endX, endY, len * 0.67, angle + Math.PI / 4 + newAngle); // Adjust the angles here
    branch(endX, endY, len * 0.67, angle - Math.PI / 4 + newAngle); // Here as well
  } else {
    // Add leaves, flowers, and fruits at the tips
    finalLeaves.push([endX, endY]);
    if (bt.rand() > 0.5) {
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
    const leafCircle = new bt.Turtle()
      .jump(leaf)
      .down()
      .arc(360, 2)
      .lines();
    drawLines(leafCircle);
  });
}

function drawFlowers(flowers) {
  // Implement the drawing logic for flowers
  flowers.forEach(flower => {
    const flowerCircle = new bt.Turtle()
      .jump(flower)
      .down()
      .arc(360, 3)
      .lines();
    drawLines(flowerCircle);
  });
}

function drawFruits(fruits) {
  // Implement the drawing logic for fruits
  fruits.forEach(fruit => {
    const fruitCircle = new bt.Turtle()
      .jump(fruit)
      .down()
      .arc(360, 4)
      .lines();
    drawLines(fruitCircle);
  });
}
