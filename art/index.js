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
  if (len > 10) { // Increase the length threshold to reduce the number of elements
    // Draw 2 new branches
    const newAngle = bt.randInRange(-0.1, 0.1); // Add some randomness to the angle
    branch(endX, endY, len * bt.randInRange(0.6, 0.75), angle + Math.PI / 4 + newAngle); // Adjust the angles here
    branch(endX, endY, len * bt.randInRange(0.6, 0.75), angle - Math.PI / 4 + newAngle); // Here as well
  } else {
    // Add leaves, flowers, and fruits at the tips with spacing
    const rand = bt.randInRange(0, 1);
    if (rand > 0.7) {
      finalLeaves.push([endX, endY]);
    } else if (rand > 0.5) {
      finalFlowers.push([endX, endY]);
    } else {
      finalFruits.push([endX, endY]);
    }
  }
}

// Add background elements
function addBackgroundElements() {
  // Add sun
  const sun = new bt.Turtle()
    .jump([width - bt.randInRange(15, 20), height - bt.randInRange(20, 30)])
    .down()
    .arc(360, bt.randInRange(8, 12))
    .arc(365, bt.randInRange(6, 10))
    .arc(180, bt.randInRange(10, 14))
    .arc(60, bt.randInRange(10, 14))
    .arc(100, bt.randInRange(-6, -4))
    .lines();
  finalBackground.push(sun);

  // Add crescent moon
  const moon = new bt.Turtle()
    .jump([bt.randInRange(15, 25), height - bt.randInRange(30, 40)])
    .down()
    .arc(380, bt.randInRange(8, 12))
    .arc(180, bt.randInRange(6, 10))
    .arc(170, bt.randInRange(4, 8))
    .lines();
  finalBackground.push(moon);

  // Add stars
  for (let i = 0; i < 4; i++) {
    const star = new bt.Turtle()
      .jump([bt.randInRange(10, 20) + i * bt.randInRange(40, 50), height - bt.randInRange(5, 10)])
      .down()
      .arc(190, bt.randInRange(0.5, 1.5))
      .right(90)
      .arc(180, bt.randInRange(0.5, 1.5))
      .right(120)
      .arc(180, bt.randInRange(0.5, 1.5))
      .right(90)
      .arc(180, bt.randInRange(0.5, 1.5))
      .right(126)
      .arc(180, bt.randInRange(0.5, 1.5))
      .lines();
    finalBackground.push(star);
  }

  // Add clouds
  const cloudPositions = [
    [width / 2 + bt.randInRange(5, 15), height / 2 + bt.randInRange(50, 55)],
    [width / 2 - bt.randInRange(25, 30), height / 2 + bt.randInRange(50, 60)],
    [width / 2 + bt.randInRange(40, 50), height / 2 + bt.randInRange(55, 60)]
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

  // Flying (near tree, above and below in background)
  const birdPositions = [
    [width / 2 + bt.randInRange(40, 45), height / 2 + bt.randInRange(55, 65)],
    [width / 2 - bt.randInRange(60, 70), height / 2 + bt.randInRange(35, 45)],
    [width / 2 + bt.randInRange(65, 75), height / 2 + bt.randInRange(45, 55)]
  ];
  birdPositions.forEach(pos => {
    const bird = new bt.Turtle()
      .jump(pos)
      .down()
      .arc(180, bt.randInRange(-5, -4))
      .right(90)
      .arc(180, bt.randInRange(4, 5))
      .lines();
    finalBackground.push(bird);
  });

  const butterflyPositions = [
    [width / bt.randInRange(2, 2.3) + bt.randInRange(25, 35), height / 2 + bt.randInRange(-40, -30)],
    [width / bt.randInRange(2, 2.4) - bt.randInRange(25, 35), height / 2 + bt.randInRange(-30, -20)],
    [width / bt.randInRange(2, 2.2) + bt.randInRange(40, 50), height / 2 + bt.randInRange(-25, -15)]
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

  // In background
  for (let i = 0; i < 2; i++) {
    const bush = new bt.Turtle()
      .jump([width / 2 - bt.randInRange(60, 65), bt.randInRange(15, 25)])
      .down()
      .arc(360, bt.randInRange(8, 12))
      .right(45)
      .arc(360, bt.randInRange(8, 12))
      .right(45)
      .arc(360, bt.randInRange(8, 12))
      .lines();
    finalBackground.push(bush);
  }

  // Add mini-bushes
  for (let i = 0; i < 3; i++) {
    const mini = new bt.Turtle()
      .jump([bt.randInRange(15, 25) + i * bt.randInRange(15, 20), height - bt.randInRange(140, 150)])
      .down()
      .arc(360, bt.randInRange(4, 5))
      .right(bt.randInRange(20, 30))
      .arc(360, bt.randInRange(4, 6))
      .right(bt.randInRange(30, 35))
      .arc(355, bt.randInRange(4, 6))
      .lines();
    finalBackground.push(mini);
  }

  for (let i = 0; i < 4; i++) {
    const plant = new bt.Turtle()
      .jump([width / 2 + bt.randInRange(45, 55), bt.randInRange(10, 15)])
      .down()
      .arc(360, bt.randInRange(4, 6))
      .right(45)
      .arc(360, bt.randInRange(4, 6))
      .lines();
    finalBackground.push(plant);
  }

  for (let i = 0; i < 32; i++) {
    const grass = new bt.Turtle()
      .jump([bt.randInRange(0, 5) + i * bt.randInRange(4, 6), bt.randInRange(5, 10)])
      .down()
      .forward(bt.randInRange(4, 6))
      .right(45)
      .forward(bt.randInRange(4, 6))
      .right(45)
      .forward(bt.randInRange(4, 6))
      .lines();
    finalBackground.push(grass);
  }

  for (let i = 0; i < 2; i++) {
    const squirrel = new bt.Turtle()
      .jump([width / 2 + bt.randInRange(10, 20), height / 2 + bt.randInRange(-65, -55)])
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
