/*
@title: Julia Set
@author: Shiv Gupta
@snapshot: patternVar_2.png
*/
```
const width = 125;
const height = 125;
const maxIterations = 100;
const zoom = 1;
const moveX = 0;
const moveY = 0;
const cRe = -0.7; // Real part of c
const cIm = 0.28; // Imaginary part of c

setDocDimensions(width, height);

let polylines = [];

function getColor(iter) {
    const hue = (iter * 360) / maxIterations;
    return `hsl(${hue}, 100%, 50%)`;
}

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        let zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
        let zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
        let i = maxIterations;
        while (zx * zx + zy * zy < 4 && i > 0) {
            const tmp = zx * zx - zy * zy + cRe;
            zy = 2.0 * zx * zy + cIm;
            zx = tmp;
            i--;
        }

        const color = getColor(i);
        if (i !== 0) {
            polylines.push([[x, y], [x + 1, y + 1]]);
        }
    }
}
drawLines(polylines, { stroke: 'black', width: 1 });

```
const width = 125;
const height = 125;
const numLines = 60;
const centerX = width / 2;
const centerY = height / 2;
const lineLength = 59;
const patternVariation = 3; // Change this to select different variations

setDocDimensions(width, height);

let lines = [];

function generatePoint(radius, angle) {
  let x = centerX + radius * Math.cos(angle);
  let y = centerY + radius * Math.sin(angle);
  return [x, y];
}

function generateLines(numLines, lineLength) {
  let lines = [];
  let angleIncrement = (2 * Math.PI) / numLines;

  for (let i = 0; i < numLines; i++) {
    let angle = i * angleIncrement;
    let startPoint = generatePoint(lineLength / 2, angle);
    let endPoint = generatePoint(lineLength / 2, angle + Math.PI);
    lines.push([startPoint, endPoint]);
  }
  return lines;
}

lines = generateLines(numLines, lineLength);

drawLines(lines, { stroke: 'black', width: 1 });

function generateQuadricCross(numLines, lineLength) {
  let quadricCross = [];
  let angleIncrement = (2 * Math.PI) / numLines;

  for (let i = 0; i < numLines; i++) {
    let angle = i * angleIncrement;
    let startPoint = generatePoint(lineLength, angle);
    let endPoint = generatePoint(lineLength, angle + Math.PI / 2);
    quadricCross.push([startPoint, endPoint]);
  }
  return quadricCross;
}

function generateComplexPattern(numLines, lineLength) {
  let complexPattern = [];
  let angleIncrement = (2 * Math.PI) / numLines;

  for (let i = 0; i < numLines; i++) {
    let angle = i * angleIncrement;
    let startPoint1 = generatePoint(lineLength, angle);
    let endPoint1 = generatePoint(lineLength, angle + Math.PI / 3);
    complexPattern.push([startPoint1, endPoint1]);

    let startPoint2 = generatePoint(lineLength, angle + Math.PI / 6);
    let endPoint2 = generatePoint(lineLength, angle + Math.PI / 2);
    complexPattern.push([startPoint2, endPoint2]);
  }
  return complexPattern;
}

function generatePatternWithVariations(numLines, lineLength) {
  let patternWithVariations = [];
  let angleIncrement = (2 * Math.PI) / numLines;

  for (let i = 0; i < numLines; i++) {
    let angle = i * angleIncrement;
    let startPoint1 = generatePoint(lineLength, angle);
    let endPoint1 = generatePoint(lineLength, angle + Math.PI / 4);
    patternWithVariations.push([startPoint1, endPoint1]);

    let startPoint2 = generatePoint(lineLength, angle + Math.PI / 8);
    let endPoint2 = generatePoint(lineLength, angle + Math.PI / 3);
    patternWithVariations.push([startPoint2, endPoint2]);

    let startPoint3 = generatePoint(lineLength, angle + Math.PI / 6);
    let endPoint3 = generatePoint(lineLength, angle + Math.PI / 2);
    patternWithVariations.push([startPoint3, endPoint3]);
  }
  return patternWithVariations;
}

function generateNestedPattern(numLines, lineLength) {
  let nestedPattern = [];
  let angleIncrement = (2 * Math.PI) / numLines;

  for (let i = 0; i < numLines; i++) {
    let angle = i * angleIncrement;
    for (let j = 1; j <= 5; j++) {
      let startPoint = generatePoint(lineLength / j, angle);
      let endPoint = generatePoint(lineLength / j, angle + Math.PI / j);
      nestedPattern.push([startPoint, endPoint]);
    }
  }
  return nestedPattern;
}

function generateConcentricCircles(numCircles, radiusIncrement) {
  let concentricCircles = [];
  for (let i = 1; i <= numCircles; i++) {
    let radius = i * radiusIncrement;
    let circle = [];
    for (let angle = 0; angle < 2 * Math.PI; angle += 0.1) {
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      circle.push([x, y]);
    }
    concentricCircles.push(circle);
  }
  return concentricCircles;
}

switch (patternVariation) {
  case 1:
    lines = generateQuadricCross(numLines, lineLength);
    break;
  case 2:
    lines = generateComplexPattern(numLines, lineLength);
    break;
  case 3:
    lines = generatePatternWithVariations(numLines, lineLength);
    break;
  case 4:
    lines = generateNestedPattern(numLines, lineLength);
    break;
  case 5:
    lines = generateConcentricCircles(10, 20);
    break;
  default:
    lines = generateQuadricCross(numLines, lineLength);
}

drawLines(lines, { stroke: 'black', width: 1 });
