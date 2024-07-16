/*
@title: BlotCampfire
@author: Colin
@snapshot: example1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

bt.setRandSeed = 128;
const numberOfFlames = bt.randInRange(3, 6);

const logTurtle = new bt.Turtle()
const flameTurtle = new bt.Turtle()

function drawCircle(startX, startY, radius) {
  logTurtle.jump([startX, startY - radius]);
  logTurtle.arc(360, radius);
}

//Create Logs
logTurtle.down();
drawCircle(30, 25, 10);
drawCircle(95, 25, 10);
drawCircle(30, 50, 10);
drawCircle(95, 50, 10);

logTurtle.jump([30, 35]);
logTurtle.goTo([95, 60]);
logTurtle.jump([30, 15]);
logTurtle.goTo([95, 40]);

logTurtle.jump([30, 60]);
logTurtle.goTo([95, 35]);
logTurtle.jump([30, 40]);
logTurtle.goTo([95, 15]);
drawLines(logTurtle.lines(), { stroke: "brown", width: 3 });

flameTurtle.jump([30, 70]);
flameTurtle.right(90);
flameTurtle.arc(180, 32.5);

flameTurtle.left(20)

for (let i = 0; i <= numberOfFlames; i++) {
  let flameAngle = bt.randInRange(120, 170);
  flameTurtle.forward(80 / numberOfFlames);
  flameTurtle.left(flameAngle);
  flameTurtle.forward(80 / numberOfFlames);
  flameTurtle.right(flameAngle);
}

flameTurtle.goTo([30, 70])

drawLines(flameTurtle.lines(), { stroke: "red", width: 10 });
drawLines(flameTurtle.lines(), { stroke: "orange", width: 3 });