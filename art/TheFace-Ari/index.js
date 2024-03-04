/*
@title: The Face
@author: Ari
@snapshot: snapshot0.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = createTurtle();

function drawEye(pos) {
  t.jump(pos);
  t.arc(360, 7);
  t.up();
  t.arc(randInRange(0, 360), 7);
  t.down();
  t.arc(360, 3);
  t.setAngle(0);
}

// Used for symmetry, rotates depending on direction
function directionalRotate(dir, angle) {
  if (dir == "left") {
    t.left(angle);
  } else if (dir == "right") {
    t.right(angle);
  }
}

function drawBody(dir) {
  // Set inital direction for symmetrical body depending on direction
  dir == "left" ? t.setAngle(180) : t.setAngle(0);

  // Initial position
  t.jump([60, 100]);
  t.forward(10);

  // Top curve
  for (let i = 0; i < 4; i++) {
    directionalRotate(dir, 20);
    t.forward(10);
  }

  // Move down
  t.setAngle(-90);
  t.forward(25);

  // Bottom curve
  directionalRotate(dir, 30);
  t.forward(20);
  directionalRotate(dir, 60);
  t.forward(30);
}

function drawMouth(dir, angle, size) {
  t.jump([60, 55]);
  t.forward(15);

  for (let i = 0; i < 10; i++) {
    directionalRotate(dir, angle);
    t.forward(size);
  }

  dir == "left" ? t.setAngle(0) : t.setAngle(180);

  t.forward(25);
}

function drawArm(dir) {
  let initialXPos = dir == "right" ? 26.2 : 93.8;
  t.jump([initialXPos, 60]);
  let initialAngle = dir == "right" ? 0 : 180;
  t.setAngle(initialAngle);

  let angle = randInRange(110, 250);
  directionalRotate(dir, angle);
  t.forward(15);

  if (angle < 0) {
    directionalRotate(dir, 90);
  } else {
    directionalRotate(dir, -90);
  }
  t.forward(5);
  directionalRotate(dir, -90);

  // Move until side is reached
  while (Math.abs(t.position[0] - initialXPos) > 0.05) {
    t.forward(0.01);
  }
}

drawEye([50, 70]);
drawEye([70, 70]);

drawBody("left");
drawBody("right");

let mouthAngle = randInRange(10, 15);
let mouthSize = randInRange(1, 2);

drawMouth("left", mouthAngle, mouthSize);
drawMouth("right", mouthAngle, mouthSize);

drawArm("right");
drawArm("left");

drawTurtles([
  t,
]);

