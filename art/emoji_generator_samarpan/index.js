/*
@title: Emoji Generator
@author: Samarpan
@snapshot: 1.png
*/

const createComplexEmoji = () => {
  const emojiTurtle = createTurtle();

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
    const noiseface = createTurtle();
    noiseface.scale([0.0475 + (i * 0.0002), 0.0475 + (i * 0.0002)]);
    noiseface.translate([-2631, -2847]);
    noiseface.iteratePath((pt, tValue) => {
      const [x, y] = pt;
      pt[0] += noise(y * 7.3) * rand() * (i * 3 + 4) + Math.sin(y * 0.42);
      if (rand() < 0.97) return pt;
      if (rand() < lerp(0, 1, 0.20 * tValue ** 2)) return 'BREAK';
      if (rand() < 0.44) return 'BREAK';
    });
    emojiTurtle.join(noiseface);
    emojiTurtle.resample(randInRange(1, i * 5));
  }




  const background = createTurtle();
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
  background.resample(1);

  // Optionally, render the background turtle
  drawTurtles([background]);




  // Render the turtle
  drawTurtles([emojiTurtle]);
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
      const t = createTurtle()
      const edge = createTurtle()
        .forward(5)
        .resample(0.01)
        .warp(bezierEasing(0.654, [0.400,2.290], [0.520,0.310], 0.9720))
      const n = createTurtle()



      n.join(edge)

      n.translate([60, 45])
      n.scale(4)

      drawTurtles([n])
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
