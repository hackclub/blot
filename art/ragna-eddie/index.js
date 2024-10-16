// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

// fire

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
const text = [];
const btm = [];
const background = [];

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
cloud.pos = [0,0]
function drawClouds(x, y) {
  // cloud.jump([0,0])
  const cloud = new bt.Turtle()
  cloud.down()
  // cloud.pos = [0,0]
  // cloud.goTo([10,0])
  // console.log(cloud.pos)
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
  clouds.push(...bt.scale(cloud.lines(), bt.randInRange(0.2, 0.3)))
  cloud.up()
}

// drawClouds(bt.randIntInRange(29, 40), bt.randIntInRange(38, 101))

// drawClouds(bt.randInRange(111, 125), bt.randInRange(26, 121))

// drawClouds(bt.randInRange(15, 150), bt.randInRange(15, 150))

const txt = new bt.Turtle()
txt.pos = [0,0]
function textDraw() {
  // txt.pos = [23, 8]
  txt.down()
  txt.jump([15, 99])
  turnMove(txt, "left", 90, 18)
  turnMove(txt, "left", -93, 11)
  turnMove(txt, "left", -90, 11)
  turnMove(txt, "left", -90, 2)
  turnMove(txt, "left", 100, 8)
  turnMove(txt, "left", -90, 4)
  turnMove(txt, "left", -90, 6)
  turnMove(txt, "left", 90, 2)
  turnMove(txt, "left", 83, 4)
  turnMove(txt, "left", -93, 3)
  txt.jump([18, 108])
  turnMove(txt, "left", -89, 6)
  turnMove(txt, "left", -93, 3.5)
  turnMove(txt, "left", -93, 5.5)
  turnMove(txt, "left", -80, 3.2)
  // A
  txt.jump([18, 108])
  txt.up()
}

// textDraw()

text.push(...txt.lines())

let randomness;
function randomtext(number) {
  switch (number) {
    case 0:
      randomness = bt.text("RAGNOHACKS",[29,109],2.7)
      break;
    case 1:
      randomness = bt.text("ragnohacks.ca",[21,109],2.7)
      break;
    case 2:
      randomness = bt.text("register now!",[23,109],2.7)
      break;
  }
}
randomtext(bt.randIntInRange(0, 2))

let bottom = new bt.Turtle();
function rbottom(num) {
  switch (num) {
    case 0:
      bottom.down()
      bottom.jump([39, 19])
      bottom.right(-93)
      bottom.arc(172, 10)
      bottom.right(153)
      bottom.arc(172, 7)
      bottom.right(168)
      bottom.arc(172, 4)
      bottom.right(106)
      bottom.arc(172, 4)
      bottom.right(46)
      bottom.arc(89, 11)
      bottom.right(82)
      bottom.arc(89, 11)
      bottom.right(87)
      bottom.arc(89, 11)
      bottom.right(92)
      bottom.arc(89, 8)
      bottom.right(45)
      bottom.arc(172, 4)
      bottom.right(106)
      bottom.arc(172, 4)
      bottom.right(170)
      bottom.arc(172, 6)
      btm.push(...bt.rotate(bt.scale(bottom.lines(), 0.8), bt.randIntInRange(-10, 10)))
      btm.push(...bt.rotate(bt.translate(bt.scale(bottom.lines(), 0.5), [41, -1]), bt.randIntInRange(-13, 13)))
      btm.push(...bt.rotate(bt.translate(bt.scale(bottom.lines(), 0.6), [77, -1]), bt.randIntInRange(-13, 13)))
      bottom.up()
      break;
    case 1:
      bottom.down()
      bottom.jump([124, 0])
      for (let i=0; i<11; i++) {
        const randNum = bt.randIntInRange(5, 20)
        bottom.angle = 90
        bottom.forward(randNum)
        turnMove(bottom, "left", 90, 11.2)
        turnMove(bottom, "left", 90, randNum)
      }
      btm.push(...bottom.lines())
      bottom.up()
      break;
    default:
      console.log("ehyo?")
  }
}
rbottom(bt.randIntInRange(0, 1))


const bg = new bt.Turtle()
function fireBump(size) {
  turnMove(bg, "left", bt.randIntInRange(75, 86), size)
  turnMove(bg, "left", bt.randIntInRange(-126, -154), bt.randIntInRange(size-2, size+5))
}

function drawLightning(turtle, length, size, onezero) {
  let x;
  const rdm = onezero
  
  if (rdm === 0) {
    x = bt.randIntInRange(10, 30)
  } else {
    x = bt.randIntInRange(90, 105)
  }
  turtle.jump([x, 104])
  
  turtle.setAngle(-90)
  const direction = (rdm === 1) ? "left" : "right"
  for (let i=0; i<size; i++) {
    
    turnMove(turtle, direction, bt.randIntInRange(22, 33), length);
    if (bt.randIntInRange(0, 1) === 0) {
      turnMove(turtle, direction, bt.randIntInRange(-165, -106), bt.randIntInRange(length-4, length+10))
    } else {
      turnMove(turtle, direction, 307, bt.randIntInRange(length-4, length+13))
    }
    turtle.setAngle(-90)
  }
  turnMove(turtle, direction, 0, bt.randIntInRange(length-4, length))
}

function randomBg(num) {
  switch (num) {
      case 0:
        bg.down()
        bg.jump([30, 19])
        turnMove(bg, "left", -272, 2)
        fireBump(11)

        for (let i=0; i<17; i++) {
          bg.left(114)
          fireBump(bt.randIntInRange(5, 6))
          bg.setAngle(bt.randIntInRange(-19, -21))
        }
        
        for (let i=0; i<10; i++) {
          bg.left(10)
          fireBump(bt.randIntInRange(5, 6))
          bg.setAngle(bt.randIntInRange(-19, -21))
        }
        const pas = bg.pos
      
        bg.jump([112, 19])
        for (let i=0; i<17; i++) {
          bg.setAngle(-258)
          // bg.setAngle(h)
          fireBump(bt.randIntInRange(4, 5))
        }
        for (let i=0; i<11; i++) {
          bg.setAngle(-201)
          // bg.setAngle(h)
          fireBump(bt.randIntInRange(4, 5))
        }
        bg.goTo(pas)
        background.push(...bg.lines())
        break;
      case 1:
        bg.down()
        bg.jump([41, 54])
        // turnMove(bg, "left", -66, 83)
        drawLightning(bg, 5, 8, 0);
        drawLightning(bg, 5, 8, 1);

        // background.push(...bg.lines(), ...bt.translate(bg.lines(), [3, 0]))
        background.push(...bg.lines())
        break;
      // case 2:
      //   randomness = bt.text("register now!",[23,109],2.7)
      //   break;
  }
}
randomBg(bt.randIntInRange(0, 1))
// randomBg(0)


// btm.push(...bottom.lines())
bodyOutline.push(...bo.lines())
bodyBack.push(...bb.lines())
bodyFace.push(...be.lines())
bodyBelly.push(...bl.lines())
arms.push(...arm.lines())


body.push(...bodyOutline,  ...bodyBack, ...bodyFace, ...bodyBelly, ...text)

const final = [...body, ...back, ...exclaim, ...arms, ...clouds, ...randomness, ...btm, ...background]
drawLines(final)
