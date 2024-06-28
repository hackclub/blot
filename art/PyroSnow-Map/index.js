/*
@title: Pyro Snow
@author: Map
@snapshot: snapshot1.png
*/
const width = 300
const height = 300

setDocDimensions(width, height)

const rr = bt.randInRange
const ri = bt.randIntInRange
const t = new bt.Turtle()
const bg = new bt.Turtle()

//determine the size of each snowflake with these 2.
//warning; very unpredictable, trust me! I greatly limited the variables for now
//feel free to go wild though. see the white sun for yourself.
const shaftLength = ri(10, 15)
const branches = ri(2, 5)

//flip a coin to determine if your flake has a "third branch"
const third = ri(0, 1)

//main background drawer func
function drawBG() {

  //draws a white rectangular background up top for clouds
  const cg = new bt.Turtle();
  cg.jump([0, 250])
  for (let i = 250; i < 300; i++) {
    cg.forward(width - 2)
    if (i % 2 == 0) {
      cg.left(90)
      cg.forward(1)
      cg.left(90)
    } else {
      cg.right(90)
      cg.forward(1)
      cg.right(90)
    }
  }
  const cgs = cg.lines();
  drawLines(cgs, { width: 4, stroke: "black" })

  //draws the cloud bumps
  var clouds = []
  var base = 0
  for (let z = 0; z < 3; z++) {
    for (let a = 0; a < 3; a++) {
      const cloud = bt.catmullRom([
        [base, 250 + (a * 3.5)],
        [base + 50, 240 + (a * 3.5)],
        [base + 100, 250 + (a * 3.5)]
      ], 1000)
      clouds.push(cloud)
    }
    base += 100
  }
  drawLines(clouds, { width: 6, stroke: "black" })
}
drawBG();

//main branch creation logic; recursive
//i know loops exist; found it easier to do this instead though.
function generateBranch(brs) {
  t.right(90)
  t.forward(((shaftLength) / 2) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.left(90)
  t.forward(((shaftLength) / 4) * (brs / 10))
  t.left(90)
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.left(90)
  t.forward(((shaftLength) / 4) * (brs / 10))
  t.left(90)
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 2) * (brs / 10))

  if (brs != 0) {
    t.right(90)
  }
  if (brs == 0) {
    t.right(90)
    t.forward(shaftLength * (1 / 5))
  }
}

//generate the snowflake shaft itself
t.forward(shaftLength * (4 / 5))
generateBranch(branches);
t.left(90)
t.forward(Math.sqrt(shaftLength) / 4)
if (third == 1) generateBranch(branches);
t.forward(Math.sqrt(shaftLength) / 4)
t.left(90)
generateBranch(branches);
t.forward(shaftLength * (4 / 5))
generateBranch(branches)
t.left(90)
t.forward(Math.sqrt(shaftLength) / 4)
if (third == 1) generateBranch(branches);
t.forward(Math.sqrt(shaftLength) / 4)
t.left(90)
generateBranch(branches);


const shaft = t.lines()

//determine number of flake arms
const armNums = ri(3, 5)
bt.rotate(shaft, 90)

//draw multiple shafts based on randomized arm number
for (let x = 0; x < 30; x++) {
  //determine random location of 30 snowflakes
  var randX = rr(10, 290);
  var randY = rr(10, 230);
  for (let i = 0; i < armNums; i++) {
    bt.rotate(shaft, parseInt(360 / armNums));
    bt.originate(shaft)
    bt.translate(shaft, [randX, randY])
    bt.merge(shaft)
    bt.simplify(shaft)
    drawLines(shaft, { width: 0.1, stroke: "black" })
  }
}