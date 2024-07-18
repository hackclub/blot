/*
@title: Ocean
@author: dkim19375
@snapshot: snapshot0.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// constants
const fishesColsSpacing = 40;
const fishesRowsSpacing = 20;
const fishHeight = 10;
const waveY = 80;
const sunRadius = 18;
const sunRays = 23;

// turtle at center
const turtle = new bt.Turtle()
  .setAngle(0);

// sun
turtle.jump([sunRadius, height]).setAngle(270).down().arc(-90, sunRadius); // circle
for (let i = 1; i < sunRays + 1; i++) {
  let angle = -i / (sunRays + 1) * 90;
  let distance = i % 2 == 1 ? 13 : 9;
  turtle.jump([sunRadius, height]).setAngle(270).down().arc(angle, sunRadius); // go to pos
  turtle.setAngle(angle).up().forward(0.2).down().forward(distance); // sun ray
}

// waves
turtle.jump([0, waveY]);
while (turtle.position[0] < width - 0.5) {
  let waveAngle = 90.4;
  turtle.setAngle(-waveAngle / 2).arc(waveAngle, 8);
}

// fishes
let fishY = waveY;
let even = true;
while (fishY - fishesRowsSpacing > fishHeight) {
  fishY -= fishesRowsSpacing;
  even = !even;
  let fishAngle = 105;
  let fishAngleRadius = 17;
  let tailAngle = 45;
  let tailLength = 9.5;

  let fishX = even ? -13 : -34.5;
  while (fishX + fishesColsSpacing < width - 20) {
    fishX += fishesColsSpacing;
    // body
    turtle.jump([fishX, fishY]).setAngle(fishAngle / 2).arc(-fishAngle, fishAngleRadius)
      .setAngle(tailAngle).forward(tailLength).setAngle(90)
      .forward(2 * (fishY - turtle.position[1])).setAngle(-tailAngle).forward(-tailLength)
      .setAngle(fishAngle / 2 + 180).arc(-fishAngle, fishAngleRadius);

    // eye
    turtle.up().setAngle(0).forward(6.5).left(90).forward(2).down().arc(360, 0.9);
    
    // mouth
    turtle.up().jump([fishX, fishY]).setAngle(-fishAngle / 2).arc(5, fishAngleRadius)
      .down().arc(100, 5).up();

    // gills
    let gillHeight = 6;
    let gillAngle = -50;
    turtle.setAngle(0).forward(9).left(90).forward(gillHeight / 2);
    for (let i = 0; i < 2; i++) {
      turtle.setAngle(-90 - gillAngle / 2).down().arc(gillAngle, 6);
      turtle.up().setAngle(0).forward(2.7).left(90).forward(gillHeight / 1.18).down();
    }
  }
}

// clouds
turtle.jump([ sunRadius * 2.2 - 15, height - 15 ]);
for (let i = 0; i < 2; i++) {
  let angle = 90;
  turtle.up().setAngle(0).forward(15).setAngle(-angle / 2).down();
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      turtle.left(angle).arc(-angle, 7);
    }
    turtle.right(90);
    for (let j = 0; j < 2; j++) {
      turtle.left(angle).arc(-angle, 4);
    }
    turtle.setAngle(180 - angle / 2);
  }
  turtle.setAngle(0).up().forward(27);
}

// draw it
drawLines(turtle.lines());