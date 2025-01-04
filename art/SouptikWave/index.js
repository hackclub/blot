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

// Moved the clock upward lol
const clockCenterX = canvasWidth - 35;
const clockCenterY = canvasHeight - 35;

function degreesToRadians(angleInDegrees) {
  return angleInDegrees * (Math.PI / 180);
}

// Function to check if a point is within canvas bounds
function isWithinBounds(x, y) {
  
  return x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight;
}

// Function to check if a point is outside the clock area
function isOutsideClock(x, y) {
  
  const dx = x - clockCenterX;
  const dy = y - clockCenterY;
  return Math.sqrt(dx * dx + dy * dy) > clockRadius;
}

// Safe move function for scenery with both boundary and clock checks
function safeMoveToForScenery(turtle, x, y) {
  if (isWithinBounds(x, y) && isOutsideClock(x, y)) {
    turtle.goTo([x, y]);

    
  }
  
  
}


// Draw the clock ofc
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
  safeMoveToForScenery(painter, 0, canvasHeight);
  painter.forward(sunDiameter + 2);
  painter.down();
  painter.forward(sunDiameter / 2.002);
  painter.right(4.4);
}



// Tree generation
function generateTree(treeX, treeY, treeHeight) {
  painter.up();
  safeMoveToForScenery(painter, treeX, treeY);
  painter.down();

  for (let l1y = 0; l1y < randomRange(1, 5); l1y++) {
    for (let layer = 0; layer < 1; layer++) {
      safeMoveToForScenery(painter, treeX, treeY + treeHeight);
      safeMoveToForScenery(painter, treeX + treeHeight / 6, treeY + treeHeight * 0.5);
      safeMoveToForScenery(painter, treeX, treeY + treeHeight);
      safeMoveToForScenery(painter, treeX - treeHeight / 6, treeY + treeHeight * 0.5);
      safeMoveToForScenery(painter, treeX, treeY + treeHeight);
      treeHeight -= 1;
    }
  }

  safeMoveToForScenery(painter, treeX, treeY);
  return painter;
}

painter.up();
let mountainX = 0;
let mountainY = canvasWidth - 110;
safeMoveToForScenery(painter, mountainX, mountainY);
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
      safeMoveToForScenery(painter, mountainX, mountainY);
    }
    mountainY += randomRange(-1, 3);
    safeMoveToForScenery(painter, mountainX, mountainY);
  }

  for (let step = 0; step < canvasWidth / (totalMountains * 2); step++) {
    let treeTrigger = Math.floor(randomRange(5, 14));
    if (treeTrigger === 9) {
      painter.up();
      generateTree(mountainX, mountainY, treeTrigger);
      painter.down();
      safeMoveToForScenery(painter, mountainX, mountainY);
    }
    mountainX += 1;
    mountainY += randomRange(-3, 1);
    safeMoveToForScenery(painter, mountainX, mountainY);
  }

  
  function drawBirds(count, regionCenterX, regionCenterY, regionRadius) {
  const birdLines = [];
  const birdTurtle = new bt.Turtle();
  const existingBirds = [];
  

  for (let i = 0; i < count; i++) {
    let birdX, birdY;
    let isValidPosition;


    
    do {
      isValidPosition = true;
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * regionRadius;
      birdX = regionCenterX + radius * Math.cos(angle);
      birdY = regionCenterY + radius * Math.sin(angle);


      
      if (!isWithinBounds(birdX, birdY) || !isOutsideClock(birdX, birdY)) {
        isValidPosition = false;
        continue;
      }


      
      for (const [existingX, existingY] of existingBirds) {
        const distance = Math.sqrt(
          Math.pow(birdX - existingX, 2) + Math.pow(birdY - existingY, 2)
        );
        if (distance < 8) { // Minimum distance to avoid overlap
          isValidPosition = false;
          break;
        }
      }
    } while (!isValidPosition);


        existingBirds.push([birdX, birdY]);

    const birdSize = Math.random() * 5 + 2; 

    


    birdTurtle.up();
    birdTurtle.goTo([birdX, birdY]);
    birdTurtle.down();
    birdTurtle.goTo([birdX - birdSize, birdY - birdSize / 2]);
    birdTurtle.goTo([birdX + birdSize, birdY - birdSize / 2]); 
  }

  bt.join(birdLines, birdTurtle.lines());
  drawLines(birdLines);
}


  
const regionCenterX = 30; 
  
const regionCenterY = 80; 
  
const regionRadius = 25;  
  

drawBirds(1, regionCenterX, regionCenterY, regionRadius);

}

bt.join(sceneElements, painter.lines() );

drawLines(sceneElements);
drawLines(clockLines);

