/*
@title: Clockl
@author: souptik samanta
@snapshot: img1.png
*/

const canvasWidth = 125;
const canvasHeight = 125;

// Clock parameters so you may change :)
const clockRadius = 32;
const markerLength = 3.1;
const markerOffset = 1.4;
const includeSeconds = true;

setDocDimensions(canvasWidth, canvasHeight);

const clockLines = [];
const turtle = new bt.Turtle();

turtle.up();
turtle.forward(clockRadius);
turtle.down();
//moved the clock upward lol
const clockCenterX = canvasWidth - 35;
const clockCenterY = canvasHeight - 35;

function degreesToRadians(angleInDegrees) {
  return angleInDegrees * (Math.PI / 180);
}

for (let angle = 0; angle < degreesToRadians(360); angle += 0.01) {
  const x = Math.cos(angle) * clockRadius;
  const y = Math.sin(angle) * clockRadius;
  turtle.goTo([x, y]);
}
turtle.up();

for (let angle = 0; angle <= degreesToRadians(361); angle += degreesToRadians(360) / 12) {
  let x = Math.cos(angle) * (clockRadius - markerOffset);
  let y = Math.sin(angle) * (clockRadius - markerOffset);
  turtle.goTo([x, y]);
  turtle.down();
  x = Math.cos(angle) * (clockRadius - (markerOffset + markerLength));
  y = Math.sin(angle) * (clockRadius - (markerOffset + markerLength));
  turtle.goTo([x, y]);
  x = Math.cos(angle) * (clockRadius - markerOffset);
  y = Math.sin(angle) * (clockRadius - markerOffset);
  turtle.goTo([x, y]);
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


let x = Math.cos(hourRadian) * clockRadius / 2;
let y = Math.sin(hourRadian) * clockRadius / 2;
turtle.goTo([x, y]);
turtle.goTo([0, 0]);
x = Math.cos(minuteRadian) * clockRadius / 4 * 3;
y = Math.sin(minuteRadian) * clockRadius / 4 * 3;
turtle.goTo([x, y]);

if (includeSeconds) {
 
  let secondAngle = (currentTime.getSeconds()) / 60 * 360;
  let secondRadian = degreesToRadians(360 - secondAngle + 90);
  x = Math.cos(secondRadian) * clockRadius / 4 * 2.5;
  y = Math.sin(secondRadian) * clockRadius / 4 * 2.5;
  turtle.down();
  turtle.goTo([0, 0]);
  turtle.goTo([x, y]);
}

bt.join(clockLines, turtle.lines());




const centerCoordinates = bt.bounds(clockLines).cc;
bt.translate(clockLines, [clockCenterX, clockCenterY], centerCoordinates);


// Scenery drawing
const sceneElements = [];
const painter = new bt.Turtle();
const randomRange = bt.randInRange;
const sunDiameter = randomRange(12, 24);



for (let ray = 0; ray < 20; ray++) {
  painter.up();
  painter.goTo([0, canvasHeight]);
  painter.forward(sunDiameter + 2);
  painter.down();
  painter.forward(sunDiameter / 2.002);
  painter.right(4.4);
}

//tree gen

function generateTree(treeX, treeY, treeHeight) {
  painter.up();
  
  painter.goTo([treeX, treeY]);
  painter.down();

  for (let l1y = 0; l1y < randomRange(1, 5); l1y++) {
    for (let layer = 0; layer < 1; layer++) {
      painter.goTo([treeX, treeY + treeHeight]);
      painter.goTo([treeX + treeHeight / 6, treeY + treeHeight * 0.5]);
      painter.goTo([treeX, treeY + treeHeight]);
      painter.goTo([treeX - treeHeight / 6, treeY + treeHeight * 0.5]);
      painter.goTo([treeX, treeY + treeHeight]);
      treeHeight -= 1;
    }
  }


  painter.goTo([treeX, treeY]);
  return painter;
}


painter.up();
let mountainX = 0;
let mountainY = canvasWidth -110;
painter.goTo([mountainX, mountainY]);
painter.down();
const totalMountains = Math.floor(randomRange(2, 5));

for (let mountain = 0; mountain < totalMountains; mountain++) {
  mountainX = (canvasWidth / totalMountains) * mountain;

  for (let step = 0; step < canvasWidth / (totalMountains * 2); step++) {
    mountainX += 1;
    let treeTrigger = Math.floor(randomRange(9, 20));
    if (treeTrigger === 6) {
     
      painter.up();
      generateTree(mountainX, mountainY, treeTrigger);
      painter.down();
      painter.goTo([mountainX, mountainY]);
    }
    mountainY += randomRange(-1, 3);
  
    painter.goTo([mountainX, mountainY]);
  }
  

  for (let step = 0; step < canvasWidth / (totalMountains * 2); step++) {
    let treeTrigger = Math.floor(randomRange(5, 14));
    if (treeTrigger === 9) {
      painter.up();
      generateTree(mountainX, mountainY, treeTrigger);
      painter.down();
      painter.goTo([mountainX, mountainY]);
    }
    mountainX += 1;
    mountainY += randomRange(-3, 1);
    painter.goTo([mountainX, mountainY]);
  }
}


bt.join(sceneElements, painter.lines());
drawLines(sceneElements);
drawLines(clockLines);
