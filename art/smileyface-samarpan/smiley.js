const smileyFace = createTurtle();

// Draw the face
smileyFace.jump([60, 110]); // 1 inch is approximately 25.4 mm
smileyFace.arc(360, 50);

// Draw the eyes
smileyFace.jump([80, 80]); // Adjusted for 0.5 inch (12.7 mm) to the left
smileyFace.arc(360, 7);
smileyFace.jump([40, 80]); // Adjusted for 0.5 inch (12.7 mm) to the right
smileyFace.arc(360, 7);

// Draw the mouth
smileyFace.jump([80, 40]); // Adjusted for 0.59 inch (15 mm) down
smileyFace.setAngle(270);
smileyFace.arc(180, 20);

// Render the turtle
drawTurtles([smileyFace]);
