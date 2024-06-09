/*
@title: [Updated] Serenity in Strokes
@author: Pranav Gupta
@snapshot: updated_serenityinstrokes1.png
*/

const width = 124;
const height = 124;

setDocDimensions(width, height);

function drawBranch(x, y, length, angle, depth) {
  if (depth === 0 || length < 10) return [];
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

function drawEllipse(centerX, centerY, width, height, steps=30) {
  const angleStep = (Math.PI * 2) / steps;
  let polyline = [];
  for (let i = 0; i <= steps; i++) {
    let angle = i * angleStep;
    let x = centerX + width * Math.cos(angle);
    let y = centerY + height * Math.sin(angle);
    polyline.push([x, y]);
  }
  return [polyline];
}

function drawSittingPerson(centerX, centerY, scale) {
  let height = 30 * scale;
  let bodyHeight = height * 0.7;
  let legHeight = height * 0.3;
  let armWidth = height * 0.25;
  let headWidth = height * 0.15;
  let headHeight = height * 0.2;

  let lines = [];
  // Torso
  lines.push([[centerX - 1, centerY - 2], [centerX - 1, centerY - bodyHeight]]);
  lines.push([[centerX + 1, centerY - 2], [centerX + 1, centerY - bodyHeight]]);
  // Legs
  lines.push([[centerX - 1, centerY - bodyHeight], [centerX - armWidth / 2 - 1, centerY - bodyHeight - legHeight]]);
  lines.push([[centerX - 1, centerY - bodyHeight], [centerX + armWidth / 2 - 1, centerY - bodyHeight - legHeight]]);
  lines.push([[centerX + 1, centerY - bodyHeight], [centerX - armWidth / 2 + 1, centerY - bodyHeight - legHeight]]);
  lines.push([[centerX + 1, centerY - bodyHeight], [centerX + armWidth / 2 + 1, centerY - bodyHeight - legHeight]]);
  // Arms
  lines.push([[centerX - 1, centerY - bodyHeight * 0.5], [centerX - armWidth - 1, centerY - bodyHeight * 0.5]]);
  lines.push([[centerX - 1, centerY - bodyHeight * 0.5], [centerX - armWidth - 1, centerY - bodyHeight * 0.5]]);
  lines.push([[centerX + 1, centerY - bodyHeight * 0.5], [centerX + armWidth + 1, centerY - bodyHeight * 0.5]]);
  lines.push([[centerX + 1, centerY - bodyHeight * 0.5], [centerX + armWidth + 1, centerY - bodyHeight * 0.5]]);

  lines.push([[centerX - 1, centerY - bodyHeight * 0.5 - 1], [centerX - armWidth - 1, centerY - bodyHeight * 0.5 - 1]]);
  lines.push([[centerX - 1, centerY - bodyHeight * 0.5 - 1], [centerX - armWidth - 1, centerY - bodyHeight * 0.5 - 1]]);
  lines.push([[centerX + 1, centerY - bodyHeight * 0.5 - 1], [centerX + armWidth + 1, centerY - bodyHeight * 0.5 - 1]]);
  lines.push([[centerX + 1, centerY - bodyHeight * 0.5 - 1], [centerX + armWidth + 1, centerY - bodyHeight * 0.5 - 1]]);
  // Head
  lines = lines.concat(drawEllipse(centerX, centerY, headWidth, headHeight));
  return lines;
}

function drawSoccerBall(centerX, centerY, radius) {
  return drawEllipse(centerX, centerY, radius, radius);
}

let tree = drawBranch(width / 2, height / 4 - 10, 50, -Math.PI / 2, 6);
let grass = drawGrass(0, 5, width, 15, 100);
let parent = drawSittingPerson(width / 2 + 20, height / 4 + 10, 1);
//let parent1 = drawSittingPerson(width / 2 + 22, height / 4 + 12, 1);
let child = drawSittingPerson(width / 2 + 30, height / 4, 0.75);
//let child1 = drawSittingPerson(width / 2 + 37, height / 4 + 12, 0.75);
let soccerBall = drawSoccerBall(width / 2 + 40, height / 4 - 18, 3);


let finalLines = [...tree, ...grass, ...parent, ...child, ...soccerBall];
drawLines(finalLines);