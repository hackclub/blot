/*
@title: Emoji Generator
@author: Samarpan
@snapshot: 1.png
*/

setDocDimensions(125, 125);

const createComplexEmoji = () => {
  const emojiTurtle = new bt.Turtle();

  // Draw the face
  emojiTurtle.jump([60, 20]).arc(360, 50);

  // Draw the eyes
  const eyeOffsetX = 10;
  const eyeOffsetY = 10;
  const eyeExpression = Math.floor(Math.random() * 8);
  drawEyes(emojiTurtle, eyeExpression, eyeOffsetX, eyeOffsetY);

  // Draw the mouth
  drawEyebrows(emojiTurtle, eyeExpression, eyeOffsetX, eyeOffsetY);
  const mouthExpression = Math.floor(Math.random() * 11);
  drawMouth(emojiTurtle, mouthExpression);

  // Draw the nose
  const nosexp = Math.floor(Math.random() * 4);
  drawNose(emojiTurtle, nosexp);


  for (let i = 0; i < 2; i++) {
    const noiseface = new bt.Turtle();
    bt.scale(noiseface.path, [0.0475 + (i * 0.0002), 0.0475 + (i * 0.0002)]);
    bt.translate(noiseface.path, [-2631, -2847]);
    bt.iteratePoints(noiseface.path, (pt, tValue) => {
      const [x, y] = pt;
      pt[0] += bt.noise(y * 7.3) * bt.rand() * (i * 3 + 4) + Math.sin(y * 0.42);
      if (bt.rand() < 0.97) return pt;
      if (bt.rand() < lerp(0, 1, 0.20 * tValue ** 2)) return 'BREAK';
      if (bt.rand() < 0.44) return 'BREAK';
    });
    bt.join(emojiTurtle.path, noiseface.path);
    bt.resample(emojiTurtle.path, bt.randInRange(1, i * 5));
  }




  const background = new bt.Turtle();
  const maxX = 125; // Maximum x-coordinate
  const maxY = 125; // Maximum y-coordinate

  function isPointInsidePolygon(pt, polygon) {
    const x = pt[0];
    const y = pt[1];
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  // Draw shading only outside the polygon
  for (let i = 0; i < 75; i++) {
    for (let n = 0; n < 75; n++) {
      const polygonVertices = [
        [60, 120],
        [80, 115],
        [100, 100],
        [110, 70],
        [100, 40],
        [80, 25],
        [60, 20],
        [40, 25],
        [20, 40],
        [10, 70],
        [20, 100],
        [35, 115],
      ];

      const pointToCheck = [1 + i * 4, 2 + n * 4];

      if (!isPointInsidePolygon(pointToCheck, polygonVertices)) {
        const numIterations = Math.floor(Math.random() * 1) + 1; // Random number of iterations
        for (let m = 0; m < numIterations; m++) {
          const newX = 1 + i * 4;
          const newY = 2 + n * 4;

          // Ensure the new position stays within the specified dimensions
          if (newX < maxX && newY < maxY) {
            background.jump([newX, newY]);
            const distance = Math.random() * 5 + 1; // Random distance
            const angle = Math.random() * 360; // Random angle
            background.setAngle(angle).forward(distance);
          }
        }
      }
    }
  }



  // Resample the background turtle's path
  bt.resample(background.path, 1);

  // Optionally, render the background turtle
  drawLines(background.lines());




  // Render the turtle
  drawLines(emojiTurtle.lines());
};

const drawMouth = (turtle, expression) => {
  turtle.jump([60, 40]);

  switch (expression) {
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
      const t = new bt.Turtle()
      const edge = new bt.Turtle()
        .forward(5)
      
      bt.resample(edge.path, 0.01)
      warp(edge, bezierEasing(0.654, [0.400,2.290], [0.520,0.310], 0.9720))
      const n = []



      bt.join(n, edge.lines())

      bt.translate(n, [60, 45])
      bt.scale(n, 4)

      drawLines(n)
      console.log("test")
      break;
  }
};

const drawEyes = (turtle, expression, eyeOffsetX, eyeOffsetY) => {
  switch (expression) {
    case 0:
      drawEllipse(turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]), 10, 5);
      drawEllipse(turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]), 10, 5);
      break;
    case 1:
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY - 2]).setAngle(90).arc(180, 5);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY - 2]).setAngle(90).arc(180, 5);
      break;
    case 2:
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]).arc(360, 7);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]).arc(360, 7);
      break;
    case 3:
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]).forward(7);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]).forward(7);
      break;
    case 4:
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]).setAngle(45).forward(8);
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]).setAngle(135).forward(8);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]).setAngle(45).forward(8);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]).setAngle(135).forward(8);
      break;
    case 5:
      drawEllipse(turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]), 8, 8);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]).setAngle(0).forward(8);
      break;
    case 6:
      turtle.jump([50 - eyeOffsetX, 90 + eyeOffsetY]).setAngle(0).arc(10, 70);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]).setAngle(0).arc(10, 70);
      break;
    case 7:
      turtle.jump([35, 85]).setAngle(45).forward(20);
      turtle.jump([35, 100]).setAngle(-45).forward(20);
      turtle.jump([70, 85]).setAngle(45).forward(20);
      turtle.jump([75, 100]).setAngle(-45).forward(20);
      break;
  }
};

const drawEyebrows = (turtle, expression, eyeOffsetX, eyeOffsetY) => {
  if (expression === 1) {
    turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY - 2]).setAngle(90).arc(180, 7);
    turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY - 2]).setAngle(90).arc(180, 7);
  }
};

const drawNose = (turtle, exp) => {
  switch (exp) {
    case 0:
      turtle.jump([60, 85]).setAngle(270).forward(15);
      break;
    case 1:
      turtle.jump([60, 70]).setAngle(0).arc(180, 4 * 2);
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

createComplexEmoji();

// helper functions - added by Leo when porting piece from old library

function lerp( a, b, alpha ) {
 return a + alpha * ( b - a );
}

function calculateBezierPoint(t, p0, p1, p2, p3) {
  let u = 1 - t
  let tt = t * t
  let uu = u * u
  let uuu = uu * u
  let ttt = tt * t

  let p = [uuu * p0[0], uuu * p0[1]] // u^3 * p0
  p[0] += 3 * uu * t * p1[0] // 3u^2t * p1
  p[1] += 3 * uu * t * p1[1]
  p[0] += 3 * u * tt * p2[0] // 3ut^2 * p2
  p[1] += 3 * u * tt * p2[1]
  p[0] += ttt * p3[0] // t^3 * p3
  p[1] += ttt * p3[1]

  return p
}

function findTForGivenX(xTarget, p0, p1, p2, p3) {
  let tolerance = 0.00001
  let t = 0.5 // Start with approximate solution
  let iterations = 0

  while (iterations < 1000) {
    // Max iterations to prevent infinite loop
    let p = calculateBezierPoint(t, p0, p1, p2, p3)
    let difference = p[0] - xTarget
    if (Math.abs(difference) < tolerance) {
      return t
    } else {
      t = t - difference / 2 // Approximate a new t value
    }
    iterations++
  }
  return t // Return the approximate t value
}

function getYForX(x, p0, p1, p2, p3) {
  let t = findTForGivenX(x, p0, p1, p2, p3)
  let p = calculateBezierPoint(t, p0, p1, p2, p3)
  return p[1]
}

function bezierEasing(initial, p0, p1, final) {
  return (x) =>
    getYForX(
      x,
      [0, initial],
      [Math.min(Math.max(0, p0[0]), 1), p0[1]],
      [Math.min(Math.max(0, p1[0]), 1), p1[1]],
      [1, final]
    )
}

function warp(turtle, fn, baseAngle = null) {
  const tValues = tValuesForPoints(turtle.path);
  const newPts = [];
  tValues.forEach((t, i) => {
    const pt = turtle.path.flat()[i];
    let angle = baseAngle ?? bt.getAngle(turtle.path, t);
    if (typeof angle === "function") {
      angle = angle(bt.getAngle(turtle.path, t));
    } else if (typeof angle === "number") {
      angle = angle;
    }
    const y = fn(t);
    const newPoint = rotate([0, y], angle);
    newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
  });
  turtle.path.flat().forEach((pt, i, arr) => {
    pt[0] = newPts[i][0];
    pt[1] = newPts[i][1];
  });
  return turtle

  function rotate(pt, angle, origin = [0, 0]) {
    let delta = angle / 180 * Math.PI;
    let hereX = pt[0] - origin[0];
    let hereY = pt[1] - origin[1];
    let newPoint = [
      hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
      hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
    ];
    return newPoint;
  }
}

function tValuesForPoints(polylines) {
  let totalLength = 0;
  let lengths = [];
  let tValues = [];
  let segmentLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 0; j < polyline2.length; j++) {
      if (j > 0) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        segmentLength = Math.sqrt(dx * dx + dy * dy);
        totalLength += segmentLength;
      }
      lengths.push(segmentLength);
    }
  }
  let accumulatedLength = 0;
  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i];
    tValues.push(accumulatedLength / totalLength);
  }
  return tValues;
};
