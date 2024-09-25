/*
@title: New Year (Black and White, 125x125)
@author: Akul Saju
@snapshot: 0.png
*/

setDocDimensions(125, 125);

// Draw black background
drawLines([[[0, 0], [125, 0], [125, 125], [0, 125], [0, 0]]], { fill: 'black', stroke: 'black' });

// Simple black and white grass
function drawGrassBlade(turtle, x, y, length) {
  const angle = bt.randIntInRange(-15, 15);
  const randomLength = length + bt.randIntInRange(-5, 5);
  turtle.jump([x, y])
        .setAngle(90 + angle)
        .down()
        .forward(randomLength)
        .up();
}

const grassPaths = [];
const grassHeight = 50;

for (let y = 0; y <= grassHeight; y += 2) {
  for (let x = 0; x < 125; x += 2) {
    const length = bt.randIntInRange(5, 10);

    const grassTurtle = new bt.Turtle();
    drawGrassBlade(grassTurtle, x, y, length);

    grassPaths.push({ path: grassTurtle.path });
  }
}

grassPaths.forEach(grassBlade => {
  drawLines(grassBlade.path, { stroke: 'white', width: 1 });
});

// Black and white people
function drawTShirt(x, y, width, height) {
  const shirtPaths = [];
  const stripeWidth = 2;

  for (let i = 0; i < height / stripeWidth; i++) {
    shirtPaths.push({
      path: [
        [x - width / 2, y - i * stripeWidth],
        [x + width / 2, y - i * stripeWidth],
        [x + width / 2, y - (i + 1) * stripeWidth],
        [x - width / 2, y - (i + 1) * stripeWidth],
        [x - width / 2, y - i * stripeWidth]
      ]
    });
  }
  return shirtPaths;
}

function drawPerson(x, baseY, isChild = false) {
  const scaleFactor = isChild ? 0.7 : 1; // Scale down the child
  const legLength = 10 * scaleFactor;

  // Draw legs
  drawLines([[[x - 3 * scaleFactor, baseY], [x - 3 * scaleFactor, baseY + legLength], [x - 1 * scaleFactor, baseY + legLength], [x - 1 * scaleFactor, baseY]]], { stroke: 'white' });
  drawLines([[[x + 3 * scaleFactor, baseY], [x + 3 * scaleFactor, baseY + legLength], [x + 1 * scaleFactor, baseY + legLength], [x + 1 * scaleFactor, baseY]]], { stroke: 'white' });

  // Draw body (T-shirt)
  const bodyHeight = 15 * scaleFactor;
  const bodyWidth = 10 * scaleFactor;
  const tshirtPaths = drawTShirt(x, baseY + legLength + bodyHeight, bodyWidth, bodyHeight);

  tshirtPaths.forEach(section => {
    drawLines([section.path], { stroke: 'white' });
  });

  // Draw arms
  drawLines([[[x - bodyWidth / 2 - 3 * scaleFactor, baseY + legLength + 10 * scaleFactor], [x - bodyWidth / 2, baseY + legLength + 10 * scaleFactor], [x - bodyWidth / 2, baseY + legLength + 2 * scaleFactor], [x - bodyWidth / 2 - 3 * scaleFactor, baseY + legLength + 2 * scaleFactor], [x - bodyWidth / 2 - 3 * scaleFactor, baseY + legLength + 10 * scaleFactor]]], { stroke: 'white' });
  drawLines([[[x + bodyWidth / 2 + 3 * scaleFactor, baseY + legLength + 10 * scaleFactor], [x + bodyWidth / 2, baseY + legLength + 10 * scaleFactor], [x + bodyWidth / 2, baseY + legLength + 2 * scaleFactor], [x + bodyWidth / 2 + 3 * scaleFactor, baseY + legLength + 2 * scaleFactor], [x + bodyWidth / 2 + 3 * scaleFactor, baseY + legLength + 10 * scaleFactor]]], { stroke: 'white' });

  // Draw head
  const headSize = 5 * scaleFactor;
  drawLines([[[x - headSize / 2, baseY + legLength + bodyHeight], [x + headSize / 2, baseY + legLength + bodyHeight], [x + headSize / 2, baseY + legLength + bodyHeight + headSize], [x - headSize / 2, baseY + legLength + bodyHeight + headSize], [x - headSize / 2, baseY + legLength + bodyHeight]]], { stroke: 'white' });
}

const peoplePositions = [];

// Define getRandomPosition to avoid overlaps
function getRandomPosition(existingPositions) {
  let validPosition;
  while (true) {
    const x = bt.randIntInRange(20, 105);
    const y = bt.randIntInRange(20, 50);
    let overlap = false;

    for (const pos of existingPositions) {
      if (Math.abs(pos.x - x) < 10 && Math.abs(pos.y - y) < 10) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      validPosition = { x, y };
      break;
    }
  }
  return validPosition;
}

for (let i = 0; i < 4; i++) {
  const pos = getRandomPosition(peoplePositions);
  peoplePositions.push(pos);
  drawPerson(pos.x, pos.y);
}

// Adding a child
const pos = getRandomPosition(peoplePositions);
peoplePositions.push(pos);
drawPerson(pos.x, pos.y, true);

// Fireworks in black and white
function createFirework(x, y, size) {
  const turtle = new bt.Turtle().down();
  const segments = 8;
  const segmentAngle = 360 / segments;

  for (let i = 0; i < segments; i++) {
    turtle.setAngle(segmentAngle * i);
    const baseX = x, baseY = y;

    for (let j = 0; j < 5; j++) {
      turtle.jump([baseX, baseY]);
      if (bt.rand() > 0.5) {
        drawRandomArc(turtle, baseX, baseY);
      } else {
        drawRandomLine(turtle, baseX, baseY);
      }
      turtle.right(bt.randIntInRange(20, 45));
    }
  }
  return { path: turtle.path, x, y, radius: size * 1.5 };
}

function drawRandomArc(turtle, baseX, baseY) {
  const radius = bt.randIntInRange(5, 25);
  const maxAngle = Math.min(180, radius);
  const angle = bt.randIntInRange(30, maxAngle);
  const [endX, endY] = turtle.copy().arc(angle, radius).pos;
  if (endX < 0 || endX > 125 || endY < 0 || endY > 125) {
    turtle.jump([baseX, baseY]);
  }
  turtle.arc(angle, radius);
}

function drawRandomLine(turtle, baseX, baseY) {
  const length = bt.randIntInRange(10, 40);
  const [endX, endY] = turtle.copy().forward(length).pos;
  if (endX < 0 || endX > 125 || endY < 0 || endY > 125) {
    turtle.jump([baseX, baseY]);
  }
  turtle.forward(length);
}

const fireworks = [];

for (let i = 0; i < 5; i++) {
  const size = bt.randIntInRange(5, 15);
  const x = bt.randIntInRange(size, 125 - size);
  const y = bt.randIntInRange(60, 125 - size);

  const newFirework = createFirework(x, y, size);
  if (!doFireworksOverlap(newFirework, fireworks)) {
    fireworks.push(newFirework);
  }
}

fireworks.forEach(firework => {
  drawLines(firework.path, { stroke: 'white', width: 1 });
});

function doFireworksOverlap(firework, others) {
  const { x, y, radius } = firework;
  return others.some(other => {
    const dx = x - other.x;
    const dy = y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius + other.radius;
  });
}
