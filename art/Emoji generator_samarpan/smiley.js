const createComplexEmoji = () => {
  const emojiTurtle = createTurtle();

  // Draw the face
  emojiTurtle.jump([60, 110]);
  emojiTurtle.arc(360, 50);

  // Draw the eyes
  const eyeOffsetX = 10;
  const eyeOffsetY = 10;

  const eyeExpression = Math.floor(Math.random() * 8);
  drawEyes(emojiTurtle, eyeExpression, eyeOffsetX, eyeOffsetY);

  // Draw the mouth
  drawEyebrows(emojiTurtle, eyeExpression, eyeOffsetX, eyeOffsetY);
  const mouthExpression = Math.floor(Math.random() * 11);
  drawMouth(emojiTurtle, mouthExpression);

  const nosexp = Math.floor(Math.random() * 4);
  drawNose(emojiTurtle,nosexp);

  // Render the turtle
  drawTurtles([emojiTurtle]);
};

// Function to draw different mouth expressions
const drawMouth = (turtle, expression) => {
  turtle.jump([60, 40]);

  switch (expression) {
    case 0:

      turtle.setAngle(270);
      turtle.arc(180, 20);
      break;
    case 1:

      turtle.setAngle(270);
      turtle.arc(180, 5);
      break;
    case 2:

      turtle.setAngle(90);
      turtle.arc(180, 20);
      break;
    case 3:

      turtle.jump([60, 35]);
      turtle.arc(360, 15);
      break;
    case 4:
      turtle.jump([75, 40]);
      turtle.setAngle(180);
      turtle.forward(30);
      turtle.jump([65, 40]);
      turtle.setAngle(270);
      turtle.arc(180, 5)

      break;
    case 5:
      turtle.jump([75, 40]);
      turtle.setAngle(180);
      turtle.forward(30);
      break;


    case 6:

      turtle.jump([75, 40]);
      turtle.setAngle(180);
      turtle.forward(30);
      turtle.setAngle(270)
      turtle.forward(10)
      turtle.setAngle(0)
      turtle.forward(30);
      turtle.setAngle(90)
      turtle.forward(10)
      turtle.jump([75, 35]);
      turtle.setAngle(180);
      turtle.forward(30);
      break;
    case 7:

      turtle.jump([60, 40]);
      turtle.setAngle(270);
      turtle.arc(180, 20);
      turtle.jump([60, 40]);
      turtle.setAngle(180);
      turtle.forward(40);
      break;
    case 8:
      turtle.jump([75, 40]);
      turtle.setAngle(180);
      turtle.forward(30);
      turtle.jump([50, 40]);
      turtle.setAngle(90);
      turtle.arc(180, 5)
      break;

    case 9:

      turtle.jump([60, 40]);
      turtle.setAngle(270);
      for (let i = 0; i < 4; i++) {
        turtle.forward(5);
        turtle.left(90);
      }
      break;
    case 10:
      turtle.jump([45, 45]);

      turtle.down();
      for (let x = 0; x <= (4 * Math.PI) / 2; x += 0.1) {
        const y = Math.sin(x) * 4;
        turtle.forward(2);
        turtle.jump([45 + x * 4, 45 + y]);
      }
      break;


  }
};

// Function to draw a rectangle
const drawRectangle = (turtle, width, height) => {
  for (let i = 0; i < 2; i++) {
    turtle.forward(i === 0 ? width : height);
    turtle.left(90);
    turtle.forward(i === 0 ? height : width);
    turtle.left(90);
  }
};

// Function to draw different eye expressions
const drawEyes = (turtle, expression, eyeOffsetX, eyeOffsetY) => {
  switch (expression) {
    case 0:
      // Normal
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      drawEllipse(turtle, 10, 5); // Draw ellipse for normal eyes
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      drawEllipse(turtle, 10, 5);
      break;
    case 1:
      // Raised eyebrows
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY - 2]);
      turtle.setAngle(90);
      turtle.arc(180, 5);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY - 2]);
      turtle.setAngle(90);
      turtle.arc(180, 5);
      break;
    case 2:
      // Closed eyes
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      turtle.arc(360, 7);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.arc(360, 7);
      break;
    case 3:
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      turtle.forward(7);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.forward(7);
      break;
    case 4:
      // Cross
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(45);
      turtle.forward(8);
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(135);
      turtle.forward(8);

      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(45);
      turtle.forward(8);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(135);
      turtle.forward(8);
      break;
    case 5:
      // One Circle, One Straight Line
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      drawEllipse(turtle, 8, 8);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(0);
      turtle.forward(8);
      break;
    case 6:
      turtle.jump([50 - eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(0);
      turtle.arc(10, 70);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.setAngle(0);
      turtle.arc(10, 70);
      break;
    case 7:
      turtle.jump([35,85]);
      turtle.setAngle(45);
      turtle.forward(20);
      turtle.jump([35,100]);
      turtle.setAngle(-45);
      turtle.forward(20);
      turtle.jump([70,85]);
      turtle.setAngle(45);
      turtle.forward(20);
      turtle.jump([75,100]);
      turtle.setAngle(-45);
      turtle.forward(20);
      
  }
};


const drawEyebrows = (turtle, expression, eyeOffsetX, eyeOffsetY) => {
  if (expression === 1) {
    // Draw raised eyebrows for the "Raised eyebrows" expression
    turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY - 2]);
    turtle.setAngle(90);
    turtle.arc(180, 7);
    turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY - 2]);
    turtle.setAngle(90);
    turtle.arc(180, 7);
  }
};

// Function to draw nose
const drawNose = (turtle,exp) => {
  switch (exp) {
    case 0:
      turtle.jump([60, 75]);
      turtle.setAngle(270);
      turtle.forward(15);
      break;
    case 1:
      turtle.jump([60, 85]);
      turtle.setAngle(0);
      turtle.arc(180, 4 * 2);
    case 2:
      break;
    case 3:
      turtle.jump([50, 65]);
      turtle.setAngle(60);
      turtle.forward(20);
      turtle.setAngle(-60);
      turtle.forward(20);
      turtle.setAngle(180);
      turtle.forward(20);
      break;
  }
};

// Function to draw ellipse
const drawEllipse = (turtle, width, height) => {
  for (let i = 0; i < 2; i++) {
    turtle.forward(i === 0 ? width : height);
    turtle.left(90);
    turtle.forward(i === 0 ? height : width);
    turtle.left(90);
  }
};


// Render the complex emoji
createComplexEmoji();
