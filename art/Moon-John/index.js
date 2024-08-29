/*
@title: Randomly Generated Moon
@author: John Tan-Aristy
@snapshot: Moon
*/
// welcome to blot!
// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start
const width = 128;
const height = 128;
setDocDimensions(width, height);
const numCraters = 10
const t = new bt.Turtle()

t.up()
t.jump([64, 64-32])
t.down()
t.arc(360, 32)

function findMaxDistance(x, y) {
  // Calculate the distance from the center (64, 64) to the point (x, y)
  const distanceToCenter = Math.sqrt((x - 64) ** 2 + (y - 64) ** 2);
  // Maximum radius is the distance from (x, y) to the edge of the main circle
  const maxRadius = 32 - distanceToCenter;
  return Math.abs(maxRadius); // Ensure radius is non-negative
}
function drawCircle(x, y, radius) {
  t.jump([x, y >= 64 ? y-radius : y+radius])
  t.arc(360, radius)
}

function doesOverlap(x, y, radius, circles) {
  for (let circle of circles) {
    const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    if (distance < radius + circle.radius) {
      return true;
    }
  }
  return false;
}
let circles = []
for (let i = 0; i < numCraters; i++) {
  let circle;
  let attempts = 0;
  const maxAttempts = 111; // Prevent infinite loop using an angel number for good luck :(
  do {
    // Finds a random coordinate in the circle
    const xCoord = bt.randIntInRange(40, 88);
    // Math to figure out max y distance possible at x coord so that the point is not outside the area
    const angle = Math.acos((xCoord - 64) / 32);
    const yOffset = Math.round(Math.sin(angle) * 32);
    
    const yCoord = bt.randIntInRange(64 - yOffset, 64 + yOffset);
    // Random circle radius
    const circleRadius = bt.randIntInRange(1, findMaxDistance(xCoord, yCoord));
    circle = { 
      x: xCoord, 
      y: yCoord, 
      radius: circleRadius 
    };
    attempts++;
  } while (doesOverlap(circle.x, circle.y, circle.radius, circles) && attempts < maxAttempts);
  if (attempts < maxAttempts) {
    circles.push(circle);
    drawCircle(circle.x, circle.y, circle.radius)
  }
  console.log(attempts)
}

drawLines(t.lines());
