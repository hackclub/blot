const createComplexEmoji = () => {
  const emojiTurtle = createTurtle();

  // Draw the face
  emojiTurtle.jump([60, 110]);
  emojiTurtle.arc(360, 50);

  // Draw the eyes
  const eyeOffsetX = 10;
  const eyeOffsetY = 10;

  const eyeExpression = Math.floor(Math.random() * 3);
  drawEyes(emojiTurtle, eyeExpression, eyeOffsetX, eyeOffsetY);

  // Draw the mouth
  const mouthExpression = Math.floor(Math.random() * 3);
  drawMouth(emojiTurtle, mouthExpression);

  // Add additional features
  drawEyebrows(emojiTurtle, eyeExpression, eyeOffsetX, eyeOffsetY);
  drawNose(emojiTurtle);

  // Render the turtle
  drawTurtles([emojiTurtle]);
};

// Function to draw different mouth expressions
const drawMouth = (turtle, expression) => {
  turtle.jump([60, 40]);

  switch (expression) {
    case 0:
      // Smile
      turtle.setAngle(270);
      turtle.arc(180, 20);
      break;
    case 1:
      // Neutral
      turtle.setAngle(270);
      turtle.arc(180, 5);
      break;
    case 2:
      // Frown
      turtle.setAngle(90);
      turtle.arc(180, 20);
      break;
    // Add more expressions as needed
  }
};

// Function to draw different eye expressions
const drawEyes = (turtle, expression, eyeOffsetX, eyeOffsetY) => {
  switch (expression) {
    case 0:
      // Normal
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY]);
      turtle.arc(360, 7);
      turtle.jump([60 + eyeOffsetX, 90 + eyeOffsetY]);
      turtle.arc(360, 7);
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
      // Draw closed eyelids
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY - 3]);
      turtle.setAngle(0);
      turtle.forward(2 * eyeOffsetX);
      turtle.jump([60 - eyeOffsetX, 90 + eyeOffsetY + 3]);
      turtle.setAngle(0);
      turtle.forward(2 * eyeOffsetX);
      break;
    // Add more expressions as needed
  }
};

// Function to draw eyebrows
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

// Function to draw blush
const drawNose = (turtle) => {
  const NoseSize = 8;
  turtle.jump([60 - NoseSize, 85]);
  turtle.setAngle(0);
  turtle.arc(180, NoseSize * 2);
};



// Create a complex emoji
createComplexEmoji();
