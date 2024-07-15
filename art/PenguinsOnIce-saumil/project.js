/*
@title: Penguins On Ice (not the musical)
@author: Saumil
@snapshot: snapshot.png
*/

// DOC DIMENSIONS
const width = 125;
const height = 125;

// BACKGROUND
const numberOfIceCracks = 10;
const iceCrackWidth = 15;

const maxCrackOffset = 5;
const minCrackOffset = -5;
const crackSegments = 20; // Increase the number of segments for more jagged cracks

// NUMBER OF PENGUINS
const maxNumPenguins = 8;
const minNumPenguins = 3;

// POSITION
const maxPenguinXValue = width;
const minPenguinXValue = 0;

const maxPenguinYValue = height;
const minPenguinYValue = 0;

// SCALE
const maxPenguinScale = 15;
const minPenguinScale = 5;

setDocDimensions(width, height);

function DrawPenguin(center, scale) {
  const centerX = center[0];
  const centerY = center[1];

  // Ensure penguins are drawn within the boundaries
  if (centerX - scale < 0 || centerX + scale > width || centerY - scale < 0 || centerY + scale > height) {
    return;
  }

  // Body (approximated with a polygon)
  const bodyPoints = bt.catmullRom([
    [centerX, centerY - scale],
    [centerX - scale / 2, centerY - scale / 2],
    [centerX - scale / 2, centerY + scale / 2],
    [centerX, centerY + scale],
    [centerX + scale / 2, centerY + scale / 2],
    [centerX + scale / 2, centerY - scale / 2],
    [centerX, centerY - scale]
  ]);

  // Belly (approximated with a smaller polygon)
  const bellyPoints = bt.catmullRom([
    [centerX, centerY - scale / 1.5],
    [centerX - scale / 3, centerY - scale / 3],
    [centerX - scale / 3, centerY + scale / 3],
    [centerX, centerY + scale / 1.5],
    [centerX + scale / 3, centerY + scale / 3],
    [centerX + scale / 3, centerY - scale / 3],
    [centerX, centerY - scale / 1.5]
  ]);

  // Function to simulate fill by drawing lines
  function fillPolygon(points, color, lineWidth = 1) {
    const numLines = 50;
    const minX = Math.max(0, Math.min(...points.map(p => p[0])));
    const maxX = Math.min(width, Math.max(...points.map(p => p[0])));

    for (let i = 0; i <= numLines; i++) {
      const t = i / numLines;
      const x = minX + t * (maxX - minX);

      const intersections = [];
      for (let j = 0; j < points.length - 1; j++) {
        const [x1, y1] = points[j];
        const [x2, y2] = points[j + 1];

        if ((x1 <= x && x2 >= x) || (x2 <= x && x1 >= x)) {
          const y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
          intersections.push(y);
        }
      }

      intersections.sort((a, b) => a - b);

      for (let k = 0; k < intersections.length; k += 2) {
        if (k + 1 < intersections.length) {
          drawLines([
            [
              [x, Math.max(0, intersections[k])],
              [x, Math.min(height, intersections[k + 1])]
            ]
          ], { stroke: color, width: lineWidth });
        }
      }
    }
  }

  // Draw body with thicker lines
  fillPolygon(bodyPoints, 'black', 2);

  // Draw belly with a light grey instead of white
  fillPolygon(bellyPoints, 'lightgrey');

  // Beak with slightly thicker lines
  const beakPoints = bt.catmullRom([
    [centerX, centerY - scale],
    [centerX - scale / 8, centerY - scale / 1.2],
    [centerX, centerY - scale / 1.1],
    [centerX + scale / 8, centerY - scale / 1.2],
    [centerX, centerY - scale]
  ]);

  fillPolygon(beakPoints, 'orange', 1.5);
}

// Draw background and ice cracks
drawLines([
  [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
    [0, 0]
  ]
], { stroke: "#B0E0E6", width: 1 });

for (let i = 0; i < numberOfIceCracks; i++) {
  const startY = Math.max(0, Math.min(height, ((height / numberOfIceCracks) * i) + bt.randInRange(minCrackOffset, maxCrackOffset)));
  const endY = Math.max(0, Math.min(height, ((height / numberOfIceCracks) * (i + 1)) + bt.randInRange(minCrackOffset, maxCrackOffset)));
  const crackPoints = [[0, startY]];

  for (let j = 0; j < crackSegments; j++) {
    const x = ((j + 1) / crackSegments) * width;
    const y = Math.max(0, Math.min(height, startY + ((endY - startY) * (j + 1)) / crackSegments + bt.randInRange(minCrackOffset, maxCrackOffset)));
    crackPoints.push([x, y]);
  }

  crackPoints.push([width, endY]);

  for (let j = 0; j < crackPoints.length - 1; j++) {
    drawLines([
      [
        crackPoints[j],
        crackPoints[j + 1]
      ]
    ], { stroke: "#ADD8E6", width: iceCrackWidth });
  }
}

function DrawRandomPenguins() {
  const randomNumPenguins = bt.randInRange(minNumPenguins, maxNumPenguins);

  for (let i = 0; i < randomNumPenguins; i++) {
    const randomPenguinXValue = bt.randInRange(minPenguinXValue, maxPenguinXValue);
    const randomPenguinYValue = bt.randInRange(minPenguinYValue, maxPenguinYValue);
    const randomPenguinScale = bt.randInRange(minPenguinScale, maxPenguinScale);

    DrawPenguin([randomPenguinXValue, randomPenguinYValue], randomPenguinScale);
  }
}

// Draw penguins
DrawRandomPenguins();
