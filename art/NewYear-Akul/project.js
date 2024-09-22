/*
@title: New Year
@author:Akul Saju
@snapshot: 0.png
*/

setDocDimensions(800, 800);

// Draw black background
drawLines([[[0, 0], [800, 0], [800, 800], [0, 800], [0, 0]]], { fill: 'black', stroke: 'black' });

const greenShades = [
  '#228B22', '#32CD32', '#006400', '#7CFC00',
  '#ADFF2F', '#98FB98', '#00FF00'
];

function drawGrassBlade(turtle, x, y, length, color) {
  const angle = bt.randIntInRange(-15, 15);
  const randomLength = length + bt.randIntInRange(-5, 5);
  turtle.jump([x, y])
        .setAngle(90 + angle)
        .down()
        .forward(randomLength)
        .up();
}

const grassPaths = [];
const grassHeight = 200;

function getRandomGreenShade() {
  return greenShades[bt.randIntInRange(0, greenShades.length)];
}

for (let y = 0; y <= grassHeight; y += 5) {
  for (let x = 0; x < 800; x += 5) {
    const length = bt.randIntInRange(10, 20);
    const color = getRandomGreenShade();

    const grassTurtle = new bt.Turtle();
    drawGrassBlade(grassTurtle, x, y, length, color);

    grassPaths.push({ path: grassTurtle.path, color });
  }
}

grassPaths.forEach(grassBlade => {
  drawLines(grassBlade.path, { stroke: grassBlade.color, width: 2 });
});

const hairColors = ['#000000', '#A0522D', '#FF4500', '#FFD700'];
const hairStyles = [
  (x, y, width, height) => [[x - width / 2, y], [x + width / 2, y], [x + width / 2, y - height], [x - width / 2, y - height], [x - width / 2, y]],
  (x, y, width, height, thickness = 3) => [[x - width / 2, y - thickness], [x + width / 2, y - thickness], [x + width / 2 + thickness, y - height], [x - width / 2 - thickness, y - height], [x - width / 2, y - thickness]],
  (x, y, width, height, thickness = 5) => [[x - width / 2 - thickness, y - thickness], [x + width / 2 + thickness, y - thickness], [x + width / 2 + 2 * thickness, y - height], [x - width / 2 - 2 * thickness, y - height], [x - width / 2 - thickness, y - thickness]],
];

function shadeColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = ((num >> 8) & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1).toUpperCase()}`;
}

function drawTShirt(x, y, width, height, color) {
  const shirtPaths = [];
  const stripeWidth = 4;
  const isSideways = Math.random() > 0.5; // Randomly choose between upward or sideways pattern

  for (let i = 0; i < (isSideways ? height : width) / stripeWidth; i++) {
    const shade = (i % 2 === 0) ? shadeColor(color, 20) : shadeColor(color, -20);
    if (isSideways) {
      shirtPaths.push({
        path: [
          [x - width / 2, y - i * stripeWidth],
          [x + width / 2, y - i * stripeWidth],
          [x + width / 2, y - (i + 1) * stripeWidth],
          [x - width / 2, y - (i + 1) * stripeWidth],
          [x - width / 2, y - i * stripeWidth]
        ],
        color: shade
      });
    } else {
      shirtPaths.push({
        path: [
          [x - width / 2 + i * stripeWidth, y],
          [x - width / 2 + (i + 1) * stripeWidth, y],
          [x - width / 2 + (i + 1) * stripeWidth, y - height],
          [x - width / 2 + i * stripeWidth, y - height],
          [x - width / 2 + i * stripeWidth, y]
        ],
        color: shade
      });
    }
  }
  return shirtPaths;
}

function drawPerson(x, baseY, isChild = false) {
  const scaleFactor = isChild ? 0.7 : 1; // Scale down the child
  const legLength = 40 * scaleFactor;
  const pantColor = ['#8B0000', '#00008B', '#228B22'][Math.floor(Math.random() * 3)];

  drawLines([[[x - 10 * scaleFactor, baseY], [x - 10 * scaleFactor, baseY + legLength], [x - 2 * scaleFactor, baseY + legLength], [x - 2 * scaleFactor, baseY]]], { fill: pantColor, stroke: pantColor });
  drawLines([[[x + 10 * scaleFactor, baseY], [x + 10 * scaleFactor, baseY + legLength], [x + 2 * scaleFactor, baseY + legLength], [x + 2 * scaleFactor, baseY]]], { fill: pantColor, stroke: pantColor });

  const bodyHeight = 60 * scaleFactor;
  const bodyWidth = 30 * scaleFactor;
  const shirtColor = ['#FF4500', '#1E90FF', '#FFD700', '#32CD32', '#4682B4'][Math.floor(Math.random() * 5)];
  const tshirtPaths = drawTShirt(x, baseY + legLength + bodyHeight, bodyWidth, bodyHeight, shirtColor);

  tshirtPaths.forEach(section => {
    drawLines([section.path], { fill: section.color, stroke: section.color });
  });

  const armColor = '#FFDAB9';
  drawLines([[[x - bodyWidth / 2 - 10 * scaleFactor, baseY + legLength + 40 * scaleFactor], [x - bodyWidth / 2, baseY + legLength + 40 * scaleFactor], [x - bodyWidth / 2, baseY + legLength + 10 * scaleFactor], [x - bodyWidth / 2 - 10 * scaleFactor, baseY + legLength + 10 * scaleFactor], [x - bodyWidth / 2 - 10 * scaleFactor, baseY + legLength + 40 * scaleFactor]]], { fill: armColor, stroke: armColor });
  drawLines([[[x + bodyWidth / 2 + 10 * scaleFactor, baseY + legLength + 40 * scaleFactor], [x + bodyWidth / 2, baseY + legLength + 40 * scaleFactor], [x + bodyWidth / 2, baseY + legLength + 10 * scaleFactor], [x + bodyWidth / 2 + 10 * scaleFactor, baseY + legLength + 10 * scaleFactor], [x + bodyWidth / 2 + 10 * scaleFactor, baseY + legLength + 40 * scaleFactor]]], { fill: armColor, stroke: armColor });

  const headSize = 20 * scaleFactor;
  drawLines([[[x - headSize / 2, baseY + legLength + bodyHeight], [x + headSize / 2, baseY + legLength + bodyHeight], [x + headSize / 2, baseY + legLength + bodyHeight + headSize], [x - headSize / 2, baseY + legLength + bodyHeight + headSize], [x - headSize / 2, baseY + legLength + bodyHeight]]], { fill: armColor, stroke: armColor });

  const hairHeight = 15 * scaleFactor;
  const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
  const hairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
  const hairPath = hairStyle(x, baseY + legLength + bodyHeight + headSize, headSize, hairHeight);
  hairPath.push(hairPath[0]);

  drawLines([hairPath], { fill: hairColor, stroke: hairColor });
}

const peoplePositions = [];

function getRandomPosition(existingPositions) {
  let validPosition;
  while (true) {
    const x = bt.randIntInRange(200, 600);
    const y = bt.randIntInRange(170, 190);
    let overlap = false;

    for (const pos of existingPositions) {
      if (Math.abs(pos.x - x) < 50 && Math.abs(pos.y - y) < 50) {
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

const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan'];
const fireworks = [];

function doFireworksOverlap(firework, others) {
  const { x, y, radius } = firework;
  return others.some(other => {
    const dx = x - other.x;
    const dy = y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius + other.radius;
  });
}

function createFirework(x, y, size, color) {
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
  return { path: turtle.path, color, x, y, radius: size * 1.5 };
}

function drawRandomArc(turtle, baseX, baseY) {
  const radius = bt.randIntInRange(20, 100);
  const maxAngle = Math.min(180, radius);
  const angle = bt.randIntInRange(30, maxAngle);
  const [endX, endY] = turtle.copy().arc(angle, radius).pos;
  if (endX < 0 || endX > 800 || endY < 0 || endY > 800) {
    turtle.jump([baseX, baseY]);
  }
  turtle.arc(angle, radius);
}

function drawRandomLine(turtle, baseX, baseY) {
  const length = bt.randIntInRange(50, 200);
  const [endX, endY] = turtle.copy().forward(length).pos;
  if (endX < 0 || endX > 800 || endY < 0 || endY > 800) {
    turtle.jump([baseX, baseY]);
  }
  turtle.forward(length);
}

for (let i = 0; i < 10; i++) {
  const size = bt.randIntInRange(20, 50);
  const x = bt.randIntInRange(size, 800 - size);
  const y = bt.randIntInRange(400, 800 - size);
  const color = colors[i % colors.length];

  const newFirework = createFirework(x, y, size, color);
  if (!doFireworksOverlap(newFirework, fireworks)) {
    fireworks.push(newFirework);
  }
}

fireworks.forEach(firework => {
  drawLines(firework.path, { stroke: firework.color, width: 1 });
});