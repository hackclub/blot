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
      turtle.jump([45, 45]).down();
      for (let x = 0; x <= (4 * Math.PI) / 2; x += 0.1) {
        const y = Math.sin(x) * 4;
        turtle.forward(2).jump([45 + x * 4, 45 + y]);
      }
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
