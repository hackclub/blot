// check out the workshop tab to get started
// welcome to blot!
/*
@title: Sunflowers
@author: Vignesh
@snapshot: Sunflowers
*/
// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 140;
const height = 140;

setDocDimensions(width, height);

// store final lines here
// [x, y], centerPoint[0] = x, centerPoint[1] = y
const linesToDraw = []

function draw(stuffToDraw, opts) {
  drawLines(stuffToDraw, opts)
}

function toRadians(angle) {
  return angle * (Math.PI/180)
}

function cosine(angle) {
  return Math.cos(toRadians(angle));
}

function sine(angle) {
  return Math.sin(toRadians(angle));
}

function circle(centerPoint, radius) {
    const turtle = new bt.Turtle()
      .jump([centerPoint[0], centerPoint[1] - radius])
      .arc(360, radius);
  
    return turtle.path;
}

function drawCircle(centerPoint, centerRadius, opts) {
    draw(circle(centerPoint, centerRadius), opts);
}

function drawRing(centerPoint, centerRadius, petalRadius, spacing=1, opts) {
  let startingX = centerPoint[0]; 
  let startingY = centerPoint[1]; 
  for (let i = 0; i < 360; i+=spacing) {
      let x = (startingX + (centerRadius+petalRadius) * cosine(i))
      let y = (startingY + (centerRadius+petalRadius) * sine(i))
      drawCircle([x, y], petalRadius, opts)
  }
}


function drawSunFlower(centerPoint, radius, scale) {
  drawCircle(centerPoint, radius, {scale, fill: "#964b00"})
  drawRing(centerPoint, radius, 3, 1, {scale, stroke: "#FAE033"});
  drawRing(centerPoint, radius + 3, 5, 1.9, {scale, stroke: "#FAE033"});
}

const numFlowers = 6;

for (let i = 0; i < numFlowers; i++) {
  const centerXCoord = bt.randInRange(20, width - 30); // Might return 15.6789
  const centerYCoord = bt.randInRange(20, height - 30); 
  const scale = bt.randInRange(0, height);
  const radius = bt.randIntInRange(2, 7);

  
  drawSunFlower([centerXCoord, centerYCoord], radius, scale)
}