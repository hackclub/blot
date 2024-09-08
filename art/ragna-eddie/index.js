// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

const body = [];
const back = [];
const exclaim = [];
const arms = [];

const clouds = [];

const bodyOutline = [];
// const bodyEyes = [];
// const bodyMouth = [];
// const bodyCheecks = [];
const bodyFace = []
const bodyBack = [];
const bodyBelly = [];

const turnMove = (turtle, direction, directionAngle, length) => {
  switch (direction) {
    case "left":
      turtle.left(directionAngle)
      break;
    case "right":
      turtle.right(directionAngle)
      break;
    default:
      return "no direction specified"
  }
  turtle.forward(length)
}

const angleMove = (turtle, direction, length) =>  {
  turtle.setAngle(direction)
  turtle.forward(length)
}

const bo = new bt.Turtle()

bo.pos = [61, 93]
bo.up();
bo.down();

turnMove(bo, "right", 27, 19)
turnMove(bo, "right", 38, 22)
angleMove(bo, -90, 29)

bo.left(20)
bo.arc(73, 14)

bo.right(-67)
bo.arc(-70, -11)

turnMove(bo, "right", 181, 10)
turnMove(bo, "right", 400, 7)
turnMove(bo, "right", 230, 6)
turnMove(bo, "left", 270, 16)
turnMove(bo, "left", 287, 7)
turnMove(bo, "left", 143, 6)
turnMove(bo, "left", 288, 10)

bo.right(425)
bo.arc(-48, 56)

bo.right(271)
bo.arc(-88, 16)
bo.right(381)
bo.arc(-54, 25)

const bb = new bt.Turtle()
bb.pos = [66, 91]
bb.up();
bb.down();
bb.right(269)
bb.arc(171, 9)

bb.pos = [82, 76]
bb.up();
bb.down();
bb.right(220)
bb.arc(181, 8)

bb.pos = [87, 55]
bb.up();
bb.down();
bb.right(213)
bb.arc(181, 8)

bb.pos = [87, 37]
bb.up();
bb.down();
bb.right(192)
bb.arc(181, 6)

bb.pos = [95, 27]
bb.up();
bb.down();
bb.right(133)
bb.arc(181, 5)


const be = new bt.Turtle()
function drawMad() {
  // lefteye
  be.pos = [47, 82]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)
  
  // righteye
  be.pos = [65, 81.5]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)
  
  // right eyebrow
  be.pos = [61, 83.4]
  be.up();
  be.down();
  turnMove(be, "left", 289, 4)
  
  // left eyebrow
  be.pos = [48.5, 85.5]
  be.up();
  be.down();
  turnMove(be, "left", 286, 4)
  
  //mouth
  be.pos = [47.4, 76.7]
  be.up();
  be.down();
  turnMove(be, "left", 49, 4)
  
  be.right(3)
  be.arc(-65, 2.5)
  be.right(-103)
  be.arc(23, 3.0)
  be.right(26)
  be.arc(-65, 2.5)
  be.right(44)
  be.arc(20, 5.0)
  be.right(-100)
  be.arc(-71, 4.0)
  be.right(0)
  be.arc(-71, 4.0)
  be.right(17)
  be.arc(-71, 4.4)
  be.right(-4)
  be.arc(-45, 7.1)
  be.right(-71)
  be.arc(-45, 10.0)
  be.right(10)
  be.arc(-117, 3.6)
}
// drawMad()

function drawHappy() {
  be.pos = [47, 82]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)
  
  // righteye
  be.pos = [65, 81.5]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)

  be.pos = [50.3, 76.2]
  be.up();
  be.down();
  turnMove(be, "left", -105, 9)
  be.right(84)
  be.arc(-89, 4.0)
  be.right(9)
  be.arc(-67, 6.1)
}

function drawEh() {
  be.pos = [47, 82]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)
  
  // righteye
  be.pos = [65, 81.5]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)

  be.pos = [48.7, 76.2]
  be.up();
  be.down();
  turnMove(be, "left", -105, 9)
}

function drawP() {
  be.pos = [47, 82]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)
  
  // righteye
  be.pos = [65, 81.5]
  be.up();
  be.down();
  be.right(127)
  be.arc(360, 1.5)

  be.pos = [50.3, 76.2]
  be.up();
  be.down();
  turnMove(be, "left", -105, 9)
  be.right(58)
  be.arc(-89, 2.2)
  be.right(9)
  be.arc(-136, 2.1)
}

const faces = [drawMad, drawHappy, drawEh, drawP]
function callRandomFunction() {
  const randomIndex = Math.floor(bt.rand() * faces.length);
  const selectedFunction = faces[randomIndex];
  return selectedFunction();
}
callRandomFunction()

// belly
be.setAngle(761)

be.pos = [47.3, 48.3]
be.up();
be.down();
be.right(154)
be.arc(208, 12.2)
be.right(0)
be.arc(76, 14.4)
be.right(-16)
be.arc(65, 13.8)

be.pos = [56.0, 44.3]
be.up();
be.down();
turnMove(be, "left", 59, 4)
be.pos = [56.0, 41.8]
be.up();
be.down();
turnMove(be, "left", 92, 4)

const bl = new bt.Turtle()
// cheeks
bl.pos = [66, 76] 
bl.up()
bl.down()
bl.right(43)
bl.arc(105, 5)
turnMove(bl, "left", 38, 2)
bl.right(-40)
bl.arc(103, 5)
turnMove(bl, "left", 34, 2)
bl.pos = [68, 78] 
bl.up()
bl.down()
turnMove(bl, "left", 23, 2.5)
bl.pos = [69.6, 79.1] 
bl.up()
bl.down()
turnMove(bl, "left", 3, 3.5)
bl.setAngle(-80)

bl.pos = [35, 76] 
bl.up()
bl.down()
bl.right(-32)
bl.arc(100, 5)
turnMove(bl, "left", 36, 2)
bl.right(-40)
bl.arc(103, 5)
turnMove(bl, "left", 37, 2.1)

bl.pos = [37, 78] 
bl.up()
bl.down()
turnMove(bl, "left", 23, 2.5)
bl.pos = [39.5, 78.5] 
bl.up()
bl.down()
turnMove(bl, "left", -7, 2.8)

const arm = new bt.Turtle()
function rightarm(angle) {
  arm.setAngle(angle)
  arm.pos = [79, 62] 
  arm.up()
  arm.down()
  turnMove(arm, "left", 16, 12)
  arm.right(46)
  arm.arc(-43, 6)
  arm.right(17)
  arm.arc(-35, 11)
  turnMove(arm, "left", -62, 11)

  // arm.pos = [99, 73]
  // arm.up()
  // arm.down()
  arm.up()
  arm.setAngle(9 + angle)
  arm.forward(8)
  // arm.up()
  arm.setAngle(-32 + angle)
  arm.forward(1)
  arm.down()
  arm.setAngle(-1)
  arm.forward(0)
  arm.right(278 - angle)
  arm.arc(-35, 9)
}
function leftarm(angle) {
  arm.setAngle(angle)
  arm.pos = [50, 57] 
  arm.up()
  arm.down()
  turnMove(arm, "left", 16, 12.3)
  arm.right(46)
  arm.arc(-43, 6)
  arm.right(17)
  arm.arc(-35, 11)
  turnMove(arm, "left", -62, 11.0)
}

const random = bt.randInRange(159, 220)
const opprandom = 180 - random
leftarm(random)
rightarm(opprandom)


const ex = new bt.Turtle()
// ex.pos = [63, 57] 
// ex.up()
// ex.down()
// turnMove(ex, "left", 16, 6.3)
function createTriangle(sideLength, height, y, x, angle) {
    const rad = (Math.PI / 180) * angle;

    const vertices = [
        [0, 0],
        [sideLength, 0],
        [sideLength / 2, -height]
    ].map(([vx, vy]) => [
        Math.cos(rad) * vx - Math.sin(rad) * vy + y,
        Math.sin(rad) * vx + Math.cos(rad) * vy + x
    ]);

    vertices.push(vertices[0]);

    drawLines([vertices]);
}

if (Math.floor(bt.randInRange(0, 2)) == 1) {
  createTriangle(6, 9, 31, 97, 40)
  createTriangle(5, 13, 25, 91, 75)
  createTriangle(5, 14, 36, 105, 9)
} else {
  createTriangle(8, 14, 27, 99, 40)
  createTriangle(5, 10, 28, 90, 75)
  createTriangle(5, 10, 36, 102, 9)
}


const cloud = new bt.Turtle()
function drawClouds(x, y) {
  cloud.jump([x, y])
  cloud.setAngle(bt.randInRange(-10, 10))
  cloud.right(-93)
  cloud.arc(172, 10)
  cloud.right(153)
  cloud.arc(172, 7)
  cloud.right(168)
  cloud.arc(172, 4)
  cloud.right(106)
  cloud.arc(172, 4)
  cloud.right(46)
  cloud.arc(89, 11)
  cloud.right(82)
  cloud.arc(89, 11)
  cloud.right(87)
  cloud.arc(89, 11)
  cloud.right(92)
  cloud.arc(89, 8)
  cloud.right(45)
  cloud.arc(172, 4)
  cloud.right(106)
  cloud.arc(172, 4)
  cloud.right(170)
  cloud.arc(172, 6)
  clouds.push(...bt.scale(cloud.lines(), bt.randInRange(0.1, 0.5)))
}

drawClouds(bt.randIntInRange(27, 40), bt.randIntInRange(15, 121))

drawClouds(bt.randInRange(86, 150), bt.randInRange(15, 121))

drawClouds(bt.randInRange(15, 150), bt.randInRange(15, 150))


bodyOutline.push(...bo.lines())
bodyBack.push(...bb.lines())
bodyFace.push(...be.lines())
bodyBelly.push(...bl.lines())
arms.push(...arm.lines())


body.push(...bodyOutline,  ...bodyBack, ...bodyFace, ...bodyBelly)

const final = [...body, ...back, ...exclaim, ...arms, ...clouds]
drawLines(final)
