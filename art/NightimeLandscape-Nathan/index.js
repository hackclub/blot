/*
@title: NightimeLandscape
@author: Nathan
@snapshot: pic3
*/
const width = 500;
const height = 500;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
//draw horizon
t.jump([0, height/ 2])
t.forward(width)

//138 - 215
function drawStar() {
  t.up()
  let randomY = Math.random() * (height / 2) + height / 2
  let randomX = Math.random() * width
  t.goTo([randomX, randomY])
  t.down()
  const starSeed = Math.random() * (215 - 138) + 138
  for (let i = 0; i < 52; i++) {
    t.forward(i);
    t.right(starSeed);
  }
}
for (let i = 0; i< 5; i++) {
  drawStar()
}
function drawRiver() {
  let point1 = [bt.randInRange(150, 350), 61];
  let point2 = [bt.randInRange(150, 350), 130];
  let point3 = [bt.randInRange(150, 350), 250];
  const curve1 = bt.catmullRom([[230, 0], point1, point2, point3])
  const curve2 = bt.catmullRom([[330, 0], [point1[0] + 100, point1[1]], [point2[0] + 100, point2[1]], [point3[0] + 100, point3[1]]])
  drawLines([curve1, curve2])
}

drawRiver()

//draw river
t.setAngle(0)
t.up()
t.goTo([0,height - 131])
t.down()
t.arc(90, 131)
// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
// bt.translate(finalLines, [width/2, height / 2], cc);

// draw it
drawLines(finalLines);