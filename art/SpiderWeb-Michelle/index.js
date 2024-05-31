/*
@title: spiderweb
@author: michelle
@snapshot: 1.png
*/

// making document
const t = new bt.Turtle();
const width = 125;
const height = 125;
setDocDimensions(width, height);

const center = [width / 2, height / 2];
const radius = width / 2;
const lines = bt.randIntInRange(8, 16); // # vertical lines
const spirals = bt.randIntInRange(3, 8); // # horizontal lines

// drawing the vertical lines
for (let i = 0; i < lines; i++) {
  const angle = (360 / lines) * i;
  t.jump(center);
  t.setAngle(angle);
  t.forward(radius);
  t.jump(center);
}

for (let s = 1; s < spirals; s++) {
  for (let i = 0; i < lines; i++) {
    const angle = (360 / lines) * i;
    const nextAngle = (360 / lines) * ((i + 1) % lines);
    //random spacing between horizontal lines
    const randomSpacing = s * (radius / spirals) + bt.randInRange(-5, 5);
    const sp = pointCircle(center, randomSpacing, angle);
    const ep = pointCircle(center, randomSpacing, nextAngle);
    t.jump(sp);
    //drawing lines connecting the points
    t.setAngle(angleTowards(sp, ep));
    t.forward(distance(sp, ep));
  }
}


//coords of a point on the circumference of a circle
function pointCircle(center, radius, angleDegrees) {
  const angleRadians = (Math.PI / 180) * angleDegrees;
  return [
    center[0] + radius * Math.cos(angleRadians),
    center[1] + radius * Math.sin(angleRadians)
  ];
}

//angle formula
function angleTowards(from, to) {
  const x = to[0] - from[0];
  const y = to[1] - from[1];
  return Math.atan2(y, x) * (180 / Math.PI);
}

//distance formula
function distance(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  return Math.sqrt(dx * dx + dy * dy);
}

drawLines(t.lines());