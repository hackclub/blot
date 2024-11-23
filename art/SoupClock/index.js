/*
@title: Clockl
@author: souptik samanta
@snapshot: clock.png
*/
const canvasWidth = 125;
const canvasHeight = 125;

// Clock radius you may change this : )
const clockRadius = 30;
const markerLength = 3;
const markerOffset = 1;
const includeSeconds = true;

setDocDimensions(canvasWidth, canvasHeight);

const clockLines = [];

const turtle = new bt.Turtle();

turtle.up();
turtle.forward(clockRadius);
turtle.down();
let centerX = canvasWidth / 2;
let centerY = canvasHeight / 2;

function degreesToRadians(angleInDegrees) {
  return angleInDegrees * (Math.PI / 180);
}

// Draw the clock's circular border
for (let angle = 0; angle < degreesToRadians(360); angle += 0.01) {
  centerX = Math.cos(angle) * clockRadius;
  centerY = Math.sin(angle) * clockRadius;
  turtle.goTo([centerX, centerY]);
}
turtle.up();

for (let angle = 0; angle <= degreesToRadians(361); angle += degreesToRadians(360) / 12) {
  centerX = Math.cos(angle) * (clockRadius - markerOffset);
  centerY = Math.sin(angle) * (clockRadius - markerOffset);
  turtle.goTo([centerX, centerY]);
  turtle.down();
  centerX = Math.cos(angle) * (clockRadius - (markerOffset + markerLength));
  centerY = Math.sin(angle) * (clockRadius - (markerOffset + markerLength));
  turtle.goTo([centerX, centerY]);
  centerX = Math.cos(angle) * (clockRadius - markerOffset);
  centerY = Math.sin(angle) * (clockRadius - markerOffset);
  turtle.goTo([centerX, centerY]);
  turtle.up();
}

turtle.up();
turtle.goTo([0, 0]);
turtle.down();

let currentTime = new Date();
let hourAngle = (currentTime.getMinutes() + currentTime.getHours() * 60) / 60 / 24 * 2 * 360;
let minuteAngle = (currentTime.getMinutes()) / 60 * 360;
let hourRadian = degreesToRadians(360 - hourAngle + 90);
let minuteRadian = degreesToRadians(360 - minuteAngle + 90);

centerX = Math.cos(hourRadian) * clockRadius / 2;
centerY = Math.sin(hourRadian) * clockRadius / 2;
turtle.goTo([centerX, centerY]);
turtle.goTo([0, 0]);
centerX = Math.cos(minuteRadian) * clockRadius / 4 * 3;
centerY = Math.sin(minuteRadian) * clockRadius / 4 * 3;
turtle.goTo([centerX, centerY]);

if (includeSeconds) {
  let secondAngle = (currentTime.getSeconds()) / 60 * 360;
  let secondRadian = degreesToRadians(360 - secondAngle + 90);
  centerX = Math.cos(secondRadian) * clockRadius / 4 * 2.5;
  centerY = Math.sin(secondRadian) * clockRadius / 4 * 2.5;
  turtle.down();
  turtle.goTo([0, 0]);
  turtle.goTo([centerX, centerY]);
}

bt.join(clockLines, turtle.lines());

const centerCoordinates = bt.bounds(clockLines).cc;
bt.translate(clockLines, [canvasWidth / 2, canvasHeight / 2], centerCoordinates);

drawLines(clockLines);
