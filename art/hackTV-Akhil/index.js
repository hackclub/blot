/*
@title: hackTV
@author: Akhil
@snapshot: 1.png
*/

const width = 125;
const height = 125;
const t = new bt.Turtle();

setDocDimensions(width, height);

const finalLines = [];
const displayMode = 1;

const innerX = 32;
const innerY = 32;
const innerWidth = width - 55;
const innerHeight = height - 60;
const numberOfLines = 788;
const gridSpacing = 2;
const fillColors = [];

const keepInBounds = (x, y, xMin, yMin, xMax, yMax) => {
  const clampedX = Math.max(xMin, Math.min(x, xMax));
  const clampedY = Math.max(yMin, Math.min(y, yMax));
  return [clampedX, clampedY];
};

const createStaticLines = (x, y, w, h, numLines) => {
  const lines = [];
  for (let i = 0; i < numLines; i++) {
    let x1 = x + Math.floor(Math.random() * w);
    let y1 = y + Math.floor(Math.random() * h);
    const angle = Math.random() * 0 * Math.PI;
    const length = Math.random() * -2 + 1;
    let x2 = x1 + Math.cos(angle) * length;
    let y2 = y1 + Math.sin(angle) * length;

    [x1, y1] = keepInBounds(x1, y1, x, y, x + w, y + h);
    [x2, y2] = keepInBounds(x2, y2, x, y, x + w, y + h);

    lines.push([[x1, y1], [x2, y2]]);
  }
  return lines;
};

const createStickmanScene = (x, y, w, h) => {
  const lines = [];
  const fillColors = [];

  const hillHeight = h / 2;
  lines.push([[x, y + h], [x + w, y + h], [x + w, y + hillHeight]]);
  fillColors.push("green");

  const boulderRadius = 10;
  const boulderCenterX = x + w / 2;
  const boulderCenterY = y + h - hillHeight / 1.2;
  const boulderPoints = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * 2 * Math.PI;
    const x1 = boulderCenterX + boulderRadius * Math.cos(angle);
    const y1 = boulderCenterY + boulderRadius * Math.sin(angle);
    boulderPoints.push([x1, y1]);
  }
  lines.push(boulderPoints);
  fillColors.push("gray");

  const stickmanX = boulderCenterX - 15;
  const stickmanY = boulderCenterY - 8;

  const headRadius = 5;
  const headPoints = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * 2 * Math.PI;
    const x1 = stickmanX + headRadius * Math.cos(angle);
    const y1 = stickmanY - headRadius + headRadius * Math.sin(angle);
    headPoints.push([x1, y1]);
  }
  lines.push(headPoints);
  fillColors.push("black");

  lines.push([[stickmanX, stickmanY - headRadius], [stickmanX, stickmanY - 15 - headRadius]]);

  lines.push([[stickmanX, stickmanY - 10 - headRadius], [stickmanX + 9, stickmanY - -4 - headRadius]]);
  lines.push([[stickmanX, stickmanY - 10 - headRadius], [stickmanX - -25, stickmanY - -8 - headRadius]]);

  lines.push([[stickmanX, stickmanY - 15 - headRadius], [stickmanX + 10, stickmanY - 25 - headRadius]]);
  lines.push([[stickmanX, stickmanY - 15 - headRadius], [stickmanX - 10, stickmanY - 25 - headRadius]]);

  return { lines, fillColors };
};

const createGrid = (x, y, w, h, spacing) => {
  const lines = [];
  for (let i = x; i <= x + w; i += spacing) {
    lines.push([[i, y], [i, y + h]]);
  }
  for (let j = y; j <= y + h; j += spacing) {
    lines.push([[x, j], [x + w, j]]);
  }
  return lines;
};

if (displayMode === 1) {
  const staticLines = createStaticLines(innerX, innerY, innerWidth, innerHeight, numberOfLines);
  staticLines.forEach(line => finalLines.push(line));
} else if (displayMode === 2) {
  const { lines: stickmanSceneLines, fillColors: sceneColors } = createStickmanScene(innerX, innerY, innerWidth, innerHeight);
  stickmanSceneLines.forEach(line => finalLines.push(line));
  sceneColors.forEach(color => fillColors.push(color));
} else if (displayMode === 3) {
  const gridLines = createGrid(innerX, innerY, innerWidth, innerHeight, gridSpacing);
  gridLines.forEach(line => finalLines.push(line));
}

finalLines.forEach((line, index) => {
  drawLines([line], { fill: fillColors[index] || "black" });
});

// tv
const RoundedRectangle = (x, y, w, h, cornerRadius) => {
  const points = [];

  points.push([x + cornerRadius, y]);
  points.push([x + w - cornerRadius, y]);
  points.push(...Corners(x + w - cornerRadius, y + cornerRadius, 1.5 * Math.PI, 2 * Math.PI, cornerRadius));
  points.push([x + w, y + h - cornerRadius]);
  points.push(...Corners(x + w - cornerRadius, y + h - cornerRadius, 0, 0.5 * Math.PI, cornerRadius));
  points.push([x + cornerRadius, y + h]);
  points.push(...Corners(x + cornerRadius, y + h - cornerRadius, 0.5 * Math.PI, Math.PI, cornerRadius));
  points.push([x, y + cornerRadius]);
  points.push(...Corners(x + cornerRadius, y + cornerRadius, Math.PI, 1.5 * Math.PI, cornerRadius));

  return points;
};

const Corners = (cx, cy, startAngle, endAngle, radius) => {
  const points = [];
  const segments = 10;
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + (i / segments) * (endAngle - startAngle);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
};

const outerCornerRadius = 12;
const outerRectPoints = RoundedRectangle(20, 20, width - 24, height - 40, outerCornerRadius);
const innerCornerRadius = 6;
const innerRectPoints = RoundedRectangle(innerX, innerY, innerWidth, innerHeight, innerCornerRadius);

finalLines.push(outerRectPoints);
finalLines.push(innerRectPoints);

const createCircle = (cx, cy, radius) => {
  const points = [];
  const segments = 20;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
};

const dial1 = createCircle(110, 80, 6);
const dial2 = createCircle(110, 55, 6);

finalLines.push(dial1);
finalLines.push(dial2);

const Antenna1 = (x1, y1, x2, y2) => {
  const points = [
    [x1, y1],
    [x2, y2]
  ];
  return points;
};

const Antenna2 = (x1, y1, x2, y2) => {
  const points = [
    [x1, y1],
    [x2, y2]
  ];
  return points;
};

const AntennaPoints1 = Antenna1(47, 120, 68, 105);
const AntennaPoints2 = Antenna2(79, 120, 68, 105);

finalLines.push(AntennaPoints1);
finalLines.push(AntennaPoints2);

drawLines([dial1], { fill: "blue" });
drawLines([dial2], { fill: "blue" });
drawLines(finalLines);
