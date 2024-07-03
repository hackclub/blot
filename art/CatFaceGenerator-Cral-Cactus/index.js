/*
@title: Cat Face Generator
@author: Cral_Cactus
@snapshot: 1.png
*/

setDocDimensions(125, 125);

const lerp = (a, b, t) => a + (b - a) * t;

const warp = (turtle, bezier) => {
  const newPath = [];
  for (let pt of turtle.path) {
    const t = bezier(pt[0] / 1000);
    newPath.push([pt[0] + t * 100, pt[1] + t * 100]);
  }
  turtle.path = newPath;
};

const bezierEasing = (duration, p1, p2, stepSize) => {
  const [p1x, p1y] = p1;
  const [p2x, p2y] = p2;

  const bezier = (t, p0, p1, p2, p3) => {
    const cX = 3 * (p1 - p0);
    const bX = 3 * (p2 - p1) - cX;
    const aX = p3 - p0 - cX - bX;

    const cY = 3 * (p1 - p0);
    const bY = 3 * (p2 - p1) - cY;
    const aY = p3 - p0 - cY - bY;

    const x = ((aX * t + bX) * t + cX) * t;
    const y = ((aY * t + bY) * t + cY) * t;

    return [x, y];
  };

  return (t) => {
    let lower = 0;
    let upper = 1;
    let x, y;

    while (upper - lower > stepSize) {
      const mid = (lower + upper) / 2;
      [x, y] = bezier(mid, 0, p1x, p2x, 1);

      if (x < t) {
        lower = mid;
      } else {
        upper = mid;
      }
    }

    [x, y] = bezier((lower + upper) / 2, 0, p1x, p2x, 1);
    return y;
  };
};

const createCatFace = () => {
  const catTurtle = new bt.Turtle();

  catTurtle.jump([60, 20]).arc(360, 50);

  drawCatEars(catTurtle);

  const eyeOffsetX = 10;
  const eyeOffsetY = 10;
  const eyeStyle = Math.floor(Math.random() * 8);
  drawCatEyes(catTurtle, eyeStyle, eyeOffsetX, eyeOffsetY);

  const mouthStyle = Math.floor(Math.random() * 11);
  drawCatMouth(catTurtle, mouthStyle);

  const noseStyle = Math.floor(Math.random() * 4);
  drawCatNose(catTurtle, noseStyle);

  drawCatMoustaches(catTurtle);

  for (let i = 0; i < 2; i++) {
    const noiseTurtle = new bt.Turtle();
    bt.scale(noiseTurtle.path, [0.0475 + (i * 0.0002), 0.0475 + (i * 0.0002)]);
    bt.translate(noiseTurtle.path, [-2631, -2847]);
    bt.iteratePoints(noiseTurtle.path, (pt, tValue) => {
      const [x, y] = pt;
      pt[0] += bt.noise(y * 7.3) * bt.rand() * (i * 3 + 4) + Math.sin(y * 0.42);
      if (bt.rand() < 0.97) return pt;
      if (bt.rand() < lerp(0, 1, 0.20 * tValue ** 2)) return 'BREAK';
      if (bt.rand() < 0.44) return 'BREAK';
    });
    bt.join(catTurtle.path, noiseTurtle.path);
    bt.resample(catTurtle.path, bt.randInRange(1, i * 5));
  }

  const background = new bt.Turtle();
  drawBackground(background);

  drawLines(background.lines());
  drawLines(catTurtle.lines());
};

const drawCatMouth = (turtle, style) => {
  turtle.jump([60, 40]);

  switch (style) {
    case 0:
      turtle.jump([40, 50]).setAngle(270).arc(180, 20);
      break;
    case 1:
      turtle.setAngle(270).arc(180, 5);
      break;
    case 2:
      turtle.jump([80, 40]).setAngle(90).arc(180, 20);
      break;
    case 3:
      turtle.jump([60, 30]).arc(360, 15);
      break;
    case 4:
      turtle.jump([75, 40]).setAngle(180).forward(30).jump([65, 40]).setAngle(270).arc(180, 5);
      break;
    case 5:
      turtle.jump([75, 40]).setAngle(180).forward(30);
      break;
    case 6:
      turtle.jump([75, 40]).setAngle(180).forward(30).setAngle(270).forward(10).setAngle(0).forward(30).setAngle(90).forward(10).jump([75, 35]).setAngle(180).forward(30);
      break;
    case 7:
      turtle.jump([40, 55]).setAngle(270).arc(180, 20).jump([80, 55]).setAngle(180).forward(40);
      break;
    case 8:
      turtle.jump([75, 40]).setAngle(180).forward(30).jump([55, 40]).setAngle(90).arc(180, 5);
      break;
    case 9:
      turtle.jump([60, 40]).setAngle(270);
      for (let i = 0; i < 4; i++) {
        turtle.forward(5).left(90);
      }
      break;
    case 10:
      const t = new bt.Turtle();
      const edge = new bt.Turtle().forward(5);
      bt.resample(edge.path, 0.01);
      warp(edge, bezierEasing(0.654, [0.400, 2.290], [0.520, 0.310], 0.9720));
      const newPath = [];
      bt.join(newPath, edge.lines());
      bt.translate(newPath, [60, 45]);
      bt.scale(newPath, 4);
      drawLines(newPath);
      break;
  }
};

const drawCatEyes = (turtle, style, offsetX, offsetY) => {
  switch (style) {
    case 0:
      drawEllipse(turtle.jump([60 - offsetX, 90 + offsetY]), 10, 5);
      drawEllipse(turtle.jump([60 + offsetX, 90 + offsetY]), 10, 5);
      break;
    case 1:
      turtle.jump([60 - offsetX, 90 + offsetY - 2]).setAngle(90).arc(180, 5);
      turtle.jump([60 + offsetX, 90 + offsetY - 2]).setAngle(90).arc(180, 5);
      break;
    case 2:
      turtle.jump([60 - offsetX, 90 + offsetY]).arc(360, 7);
      turtle.jump([60 + offsetX, 90 + offsetY]).arc(360, 7);
      break;
    case 3:
      turtle.jump([60 - offsetX, 90 + offsetY]).forward(7);
      turtle.jump([60 + offsetX, 90 + offsetY]).forward(7);
      break;
    case 4:
      turtle.jump([60 - offsetX, 90 + offsetY]).setAngle(45).forward(8);
      turtle.jump([60 - offsetX, 90 + offsetY]).setAngle(135).forward(8);
      turtle.jump([60 + offsetX, 90 + offsetY]).setAngle(45).forward(8);
      turtle.jump([60 + offsetX, 90 + offsetY]).setAngle(135).forward(8);
      break;
    case 5:
      drawEllipse(turtle.jump([60 - offsetX, 90 + offsetY]), 8, 8);
      turtle.jump([60 + offsetX, 90 + offsetY]).setAngle(0).forward(8);
      break;
    case 6:
      turtle.jump([50 - offsetX, 90 + offsetY]).setAngle(0).arc(10, 70);
      turtle.jump([60 + offsetX, 90 + offsetY]).setAngle(0).arc(10, 70);
      break;
    case 7:
      turtle.jump([35, 85]).setAngle(45).forward(20);
      turtle.jump([35, 100]).setAngle(-45).forward(20);
      turtle.jump([70, 85]).setAngle(45).forward(20);
      turtle.jump([75, 100]).setAngle(-45).forward(20);
      break;
  }
};

const drawCatEars = (turtle) => {
  turtle.jump([94, 106])
    .setAngle(570)
    .forward(0)
    .setAngle(55)
    .forward(26)
    .setAngle(208)
    .forward(28)
    .jump([32, 111])
    .setAngle(160)
    .forward(0)
    .setAngle(140)
    .forward(24)
    .setAngle(-71)
    .forward(25);
};

const drawCatMoustaches = (turtle) => {
  turtle.jump([43, 65]).setAngle(210).forward(15);
  turtle.jump([43, 75]).setAngle(210).forward(15);
  turtle.jump([43, 85]).setAngle(210).forward(15);

  turtle.jump([77, 65]).setAngle(330).forward(15);
  turtle.jump([77, 75]).setAngle(330).forward(15);
  turtle.jump([77, 85]).setAngle(330).forward(15);
};

const drawCatNose = (turtle, style) => {
  switch (style) {
    case 0:
      turtle.jump([60, 85]).setAngle(270).forward(15);
      break;
    case 1:
      turtle.jump([60, 70]).setAngle(0).arc(180, 8);
      break;
    case 2:
      turtle.jump([60, 75]).arc(360, 7);
      break;
    case 3:
      turtle.jump([50, 75]).setAngle(60).forward(20).setAngle(-60).forward(20).setAngle(180).forward(20);
      break;
  }
};

const drawEllipse = (turtle, width, height) => {
  for (let i = 0; i < 2; i++) {
    turtle.forward(i === 0 ? width : height).left(90).forward(i === 0 ? height : width).left(90);
  }
};

const drawBackground = (turtle) => {
  const maxX = 125;
  const maxY = 125;

  const isInsidePolygon = (pt, polygon) => {
    const [x, y] = pt;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const fillRectWithNoise = (x, y, width, height) => {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const pt = [x + i, y + j];
        if (isInsidePolygon(pt, turtle.path)) {
          const noiseValue = bt.noise(pt[0] * 0.1, pt[1] * 0.1);
          if (noiseValue > 0.5) {
            turtle.jump(pt).dot(1);
          }
        }
      }
    }
  };

  fillRectWithNoise(0, 0, maxX, maxY);
};

createCatFace();