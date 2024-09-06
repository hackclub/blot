/*
@title: A Fractal Foray into the Forest
@author: Adya
@snapshot: FractalTree.png
*/

// Set Dimensions
const width = 165;
const height = 160;
setDocDimensions(width, height);

// Store final lines, leaves, flowers, fruits, and background elements
const finalLines = [];
const finalLeaves = [];
const finalFlowers = [];
const finalFruits = [];
const finalBackground = [];

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);
  drawRainbowArc(width / 2, height / 2, 50);
}

function drawRainbowArc(centerX, centerY, radius) {
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
  for (let i = colors.length - 1; i >= 0; i--) {
    fill(colors[i]);
    arc(centerX, centerY, radius * 2, radius * 2, PI, TWO_PI);
    radius -= 5;
  }
}

// Draw a branch
function branch(startX, startY, len, angle) {
  const endX = startX + len * Math.cos(angle);
  const endY = startY + len * Math.sin(angle);
  finalLines.push([[startX, startY], [endX, endY]]);
  if (len > 10) {
    const newAngle = bt.randInRange(-0.1, 0.1);
    branch(endX, endY, len * 0.67, angle + Math.PI / 4 + newAngle);
    branch(endX, endY, len * 0.67, angle - Math.PI / 4 + newAngle);
  } else {
    addLeafFlowerOrFruit(endX, endY);
  }
}

function addLeafFlowerOrFruit(x, y) {
  const rand = bt.randInRange(0, 1);
  if (rand > 0.7) {
    finalLeaves.push([x, y]);
  } else if (rand > 0.5) {
    finalFlowers.push([x, y]);
  } else {
    finalFruits.push([x, y]);
  }
}

// Draw the tree
branch(width / 2, height / 100, 50, Math.PI / 2);

// Add background elements
addBackgroundElements();

// Draw final lines, leaves, flowers, fruits, and background elements
drawBackground(finalBackground);
drawFinalLines(finalLines);
drawLeaves(finalLeaves);
drawFlowers(finalFlowers);
drawFruits(finalFruits);

function drawFinalLines(lines) {
  drawLines(lines);
}

function drawLeaves(leaves) {
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

function addBackgroundElements() {
  addSun();
  addMoon();
  addStars();
  addClouds();
  addFlyingElements();
  addBushes();
  addMiniBushes();
  addPlants();
  addGrass();
  addSquirrels();
}

function addSun() {
  const sun = new bt.Turtle()
    .jump([width - 17, height - 25])
    .down()
    .arc(360, bt.randInRange(8, 10))
    .arc(365, bt.randInRange(6, 10))
    .arc(180, bt.randInRange(10, 14))
    .arc(60, bt.randInRange(10, 14))
    .arc(100, bt.randInRange(-6, -4))
    .lines();
  finalBackground.push(sun);
}

function addMoon() {
  const moon = new bt.Turtle()
    .jump([bt.randInRange(16, 20), height - bt.randInRange(36, 39)])
    .down()
    .arc(380, 10)
    .arc(180, 8)
    .arc(170, 6)
    .lines();
  finalBackground.push(moon);
}

function addStars() {
  for (let i = 0; i < 4; i++) {
    const star = new bt.Turtle()
      .jump([16 + i * 48, height - 6])
      .down()
      .arc(190, bt.randInRange(0.6, 1.2))
      .right(90)
      .arc(180, bt.randInRange(0.6, 1.2))
      .right(120)
      .arc(180, bt.randInRange(0.6, 1.2))
      .right(90)
      .arc(180, bt.randInRange(0.6, 1.2))
      .right(126)
      .arc(180, bt.randInRange(0.6, 1.2))
      .lines();
    finalBackground.push(star);
  }
}

function addClouds() {
  const cloudPositions = [
    [width / 2 + 10, height / 2 + 52],
    [width / 2 - 27, height / 2 + 55],
    [width / 2 + 45, height / 2 + 58]
  ];
  cloudPositions.forEach(pos => {
    const cloud = new bt.Turtle()
      .jump(pos)
      .down()
      .arc(180, bt.randInRange(5, 7))
      .right(90)
      .arc(180, bt.randInRange(4, 6))
      .right(120)
      .arc(180, bt.randInRange(6, 8))
      .lines();
    finalBackground.push(cloud);
  });
}

function addFlyingElements() {
  const birdPositions = [
    [width / 2 + 42, height / 2 + 60],
    [width / 2 - 66, height / 2 + 40],
    [width / 2 + 70, height / 2 + 50]
  ];
  birdPositions.forEach(pos => {
    const bird = new bt.Turtle()
      .jump(pos)
      .down()
      .arc(180, bt.randInRange(-5, -4.6))
      .right(90)
      .arc(180, bt.randInRange(4.6, 5))
      .lines();
    finalBackground.push(bird);
  });

  const butterflyPositions = [
    [width / bt.randInRange(2, 2.3) + 30, height / 2 + -35],
    [width / bt.randInRange(2, 2.4) - 30, height / 2 + -25],
    [width / bt.randInRange(2, 2.2) + 45, height / 2 + -20]
  ];
  butterflyPositions.forEach(pos => {
    const butterfly = new bt.Turtle()
      .jump(pos)
      .down()
      .arc(bt.randInRange(140, 200), bt.randInRange(3, 4))
      .right(90)
      .arc(190, bt.randInRange(3, 4))
      .lines();
    finalBackground.push(butterfly);
  });
}

function addBushes() {
  for (let i = 0; i < 2; i++) {
    const bush = new bt.Turtle()
      .jump([width / 2 - -62, 20])
      .down()
      .arc(360, 10)
      .right(45)
      .arc(360, 10)
      .right(45)
      .arc(360, 10)
      .lines();
    finalBackground.push(bush);
  }
}

function addMiniBushes() {
  for (let i = 0; i < 3; i++) {
    const mini = new bt.Turtle()
      .jump([20 + i * 17.8, height - 147.5])
      .down()
      .arc(360, 4.26)
      .right(26)
      .arc(360, 5)
      .right(32)
      .arc(355, 5.26)
      .lines();
    finalBackground.push(mini);
  }
}

function addPlant() {
    for (let i = 0; i < 4; i++) {
    const plant = new bt.Turtle()
      .jump([width / 2 + 50, 13])
      .down()
      .arc(360, 5)
      .right(45)
      .arc(360, 5)
      .lines();
    finalBackground.push(plant);
  }
}

function addPlant() {
  for (let i = 0; i < 32; i++) {
    const grass = new bt.Turtle()
      .jump([1 + i * 5, 8.67])
      .down()
      .forward(5)
      .right(45)
      .forward(5)
      .right(45)
      .forward(5)
      .lines();
    finalBackground.push(grass);
  }
}

function addSquirrel() {
  for (let i = 0; i < 2; i++) {
    const squirrel = new bt.Turtle()
      .jump([width / 2 + 15, height / 2 + -60])
      .down()
      // Draw the body
      .forward(5)
      .right(90)
      .forward(10)
       .right(90)
      .forward(5)
      .right(90)
      .forward(10)
      // Draw the head
      .jump([width / 2 + 20, height / 2 + -60])
      .down()
      .arc(360, 2.5)
      // Draw the tail
      .jump([width / 2 + 20, height / 2 + -60])
      .down()
      .arc(180, 5)
      .right(90)
      .arc(181, 5)
      .lines();
      
    finalBackground.push(squirrel);
  }
}

function drawBackground(background) {
  // Implement the drawing logic for background elements
  background.forEach(element => {
    drawLines(element);
  });
}

function branch(len) {
    blot.push();
    if (len > 4) {
        blot.strokeWeight(map(len, 10, 100, 1, 4));
        blot.line(0, 0, 0, -len);
        blot.translate(0, -len);
        blot.rotate(angle);
        branch(len * 0.67);
        blot.rotate(-2 * angle);
        branch(len * 0.67);
    }
    blot.pop();
}

function draw() {
    blot.background(51);
    blot.translate(blot.width / 2, blot.height);
    branch(100);
}
