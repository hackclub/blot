/*
@title: Flowerspiral
@author: Zainab
@snapshot: FlowerSpiral
*/
const t = new bt.Turtle();
const width = 125;
const height = 125;
setDocDimensions(width, height);

const center = [width / 2, height / 2];
const radius = width / 2;
const lines = bt.randIntInRange(8, 16); 
const spirals = bt.randIntInRange(3, 8); 

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
    const randomSpacing = s * (radius / spirals) + bt.randInRange(-5, 5);
    const sp = pointCircle(center, randomSpacing, angle);
    const ep = pointCircle(center, randomSpacing, nextAngle);
    t.jump(sp);
  }
}

function pointCircle(center, radius, angleDegrees) {
  const angleRadians = (Math.PI / 180) * angleDegrees;
  return [
    center[0] + radius * Math.cos(angleRadians),
    center[1] + radius * Math.sin(angleRadians)
  ];
}


function flower() {
  t.forward(18);
  t.arc(186, 10);
  t.forward(25);
  t.arc(180, 10);
}

function core() {
  t.jump([65,61]); 
  for (let i = 0; i < 8; i++) {
    flower();
    t.right(960 / 7);
  }
}


t.jump([0, 0]);


drawLines(t.lines());
core();
drawLines(t.lines());