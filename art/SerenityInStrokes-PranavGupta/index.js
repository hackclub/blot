/*
@title: Serenity in Strokes
@author: Pranav Gupta
@snapshot: serenityinstrokes1.png
*/

const width = 124;
const height = 124;

function drawBranch(x, y, length, angle, depth) {
  if (depth === 0 || length < 10)
    return [];

  let endX = x + length * Math.cos(angle);
  let endY = y + length * Math.sin(angle);
  let branch = [[x, y], [endX, endY]];
  let branches = [branch];

  branches = branches.concat(drawBranch(endX, endY, length * 0.67, angle + Math.PI / 7, depth - 1));
  branches = branches.concat(drawBranch(endX, endY, length * 0.67, angle - Math.PI / 7, depth - 1));

  return branches;
}

function drawGrass(startX, startY, endX, endY, numBlades) {
  let grassLines = [];

  for (let i = 0; i < numBlades; i++) {
    let x = Math.random() * (endX - startX) + startX;
    let height = Math.random() * (endY - startY) + startY;
    grassLines.push([[x, 0], [x, height]]);
  }
  return grassLines;
}

function drawCircle(centerX, centerY, radius) {
  const steps = 30;
  const angleStep = (Math.PI * 2) / steps;
  let polyline = [];

  for (let i = 0; i <= steps; i++) {
    let angle = i * angleStep;
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    polyline.push([x, y]);
  }
  return [polyline];
}

function drawPerson(centerX, centerY, height) {
  const bodyHeight = height * 0.7;
  const legHeight = height * 0.3;
  const armWidth = height * 0.25;
  const headRadius = height * 0.15;

  let lines = [];
  lines.push([[centerX, centerY], [centerX, centerY - bodyHeight]]);
  lines.push([[centerX, centerY - bodyHeight], [centerX - armWidth / 2, centerY - bodyHeight - legHeight]]);
  lines.push([[centerX, centerY - bodyHeight], [centerX + armWidth / 2, centerY - bodyHeight - legHeight]]);
  lines.push([[centerX, centerY - bodyHeight * 0.5], [centerX - armWidth, centerY - bodyHeight * 0.5]]);
  lines.push([[centerX, centerY - bodyHeight * 0.5], [centerX + armWidth, centerY - bodyHeight * 0.5]]);
  lines = lines.concat(drawCircle(centerX, centerY, headRadius));
  return lines;
}

function drawBasketBall(centerX, centerY, radius) {
  return drawCircle(centerX, centerY, radius);
}

let tree = drawBranch(width / 2, height / 10, 50, -Math.PI / 2, 7);
let grass = drawGrass(0, 5, width, 15, 100);
let person = drawPerson(width / 2 + 20, height / 4, 30);
let soccerBall = drawBasketBall(width / 2 + 25, height / 4 - 15, 3);
let finalLines = [...tree, ...grass, ...person, ...soccerBall];

drawLines(finalLines);
