/*
@title: Pete_the_Cat
@author: Alex Rabochii
@snapshot: snapshot0
*/
const width = 155
const height = 155

setDocDimensions(width, height)

const finalLines = []

const t = new bt.Turtle()

//body
const legLength = bt.randInRange(30, 32)
const legWidth = 6
const legAngle = bt.randInRange(110, 113)
const bodyLength = 60
const legGap = 7
const shoeLength = 27
const neckLength = bt.randInRange(4, 6)
const bodyHeight = 15
const headLength = bt.randInRange(43, 44)
const earLength = bt.randInRange(50, 60)

function makeShoe(lgAngle) {
  if (lgAngle < 90) {
    console.log("hi")
    console.log(Math.sin((90-lgAngle)*Math.PI/180)*legLength)
  }
  t.forward(legWidth)
  t.up()
  t.forward(-legWidth)
  t.down()
  t.right(lgAngle)
  t.forward(8)
  t.left(lgAngle)
  t.forward(shoeLength - (lgAngle < 90 ? 5 : 0))
  t.left(90)
  t.forward(4.2)
  t.up()
  t.forward(-4.2)
  t.right(90)
  t.forward(-shoeLength + (lgAngle < 90 ? 5 : 0))
  t.down()
  t.right(lgAngle)
  t.forward(4)
  t.left(lgAngle)
  t.forward(28 - (lgAngle < 90 ? Math.sin((90-lgAngle)*Math.PI/180)*24.5 : 0))
  t.arc(215.6, 4)
  t.setAngle(165.5)
  t.forward(16.1)
}

const makeLeg = (flipped=false) => {
  let lgAngle = !flipped ? legAngle : (legAngle - (legAngle-90)*2)
  lgAngle += bt.randInRange(0, (90-Math.acos(legGap/legLength)*180/Math.PI)/2)
  t.right(lgAngle)
  t.forward(legLength)
  t.left(lgAngle)
  makeShoe(lgAngle)
  t.setAngle(180-lgAngle)
  t.forward(legLength)
  t.right(180-lgAngle)
}

function drawTail() {
  let angle = bt.randInRange(161, 180)
  let radius = 1.5

  for (let i = 0; i<136; ++i) {
      t.setAngle(angle)
      t.forward(radius)

      angle -= 1.8*(1+i/bt.randInRange(57, 100))
      radius -= 0.01/(1+i/100)
  }
}

function drawEyes() {
  const eyeX = 18, eyeY = 38, eyeDist = 35
  t.setAngle(-81)
  t.jump([eyeX, eyeY])
  t.arc(161, 12)
  t.goTo([eyeX, eyeY])

  t.jump([eyeX + bt.randInRange(3, 7), eyeY])
  t.setAngle(-90)
  t.arc(180, 4)

  t.setAngle(-81)
  t.jump([eyeX+eyeDist, eyeY])
  t.arc(161, 12)
  t.goTo([eyeX+eyeDist, eyeY])

  t.jump([eyeX + eyeDist + bt.randInRange(3, 7), eyeY])
  t.setAngle(-90)
  t.arc(180, 4)
}

function drawMouth() {
  const mouthX = 45, mouthY = 33, mouthSize = 5
  t.setAngle(0)
  t.jump([mouthX, mouthY])
  t.forward(mouthSize)
  t.right(120)
  t.forward(mouthSize)
  t.right(120)
  t.forward(mouthSize)
}

function drawWhiskers() {
  const whisX = 11, whisY = 28, whisDist = 69

  

  let whiskerCount = bt.randInRange(0, 20)
  for (let i = 0; i<whiskerCount; ++i) {
      t.jump([whisX, whisY + 8*i/whiskerCount])
      t.setAngle(165+(185-180)*i/whiskerCount)
      t.arc(36, bt.randInRange(10, 15))
  }

  whiskerCount += bt.randInRange(-1, 1)
  for (let i = 0; i<whiskerCount; ++i) {
      t.jump([whisX+whisDist, whisY + 8*i/whiskerCount])
      t.setAngle(165+(185-180)*i/whiskerCount)
      t.arc(-36, -bt.randInRange(10, 15))
  }
}

function makeBody() { //basically a trapezoid
  makeLeg()
  t.forward(legGap)
  makeLeg()
  t.forward(bodyLength - (legWidth*4+legGap*2))
  makeLeg(true)
  t.forward(legGap)
  makeLeg(true)
  t.left(legAngle)
  t.forward(bodyHeight)
  t.setAngle(90)
  t.forward(neckLength)
  t.setAngle(0)
  t.arc(20, 90)
  t.setAngle(107)
  t.forward(headLength)
  t.setAngle(230)
  t.arc(20, earLength)
  t.setAngle(168)
  t.arc(17, 100)
  t.setAngle(105)
  t.arc(20, earLength)
  t.setAngle(245)
  t.forward(headLength)
  t.setAngle(333)
  t.arc(28, 90)
  t.setAngle(265)
  t.forward(neckLength)
  t.setAngle(180)
  t.forward(bodyLength - 15)
  drawTail()
  t.jump([0, 0])
  t.setAngle(180-legAngle)
  t.forward(bodyHeight)
  drawEyes()
  drawMouth()
  drawWhiskers()
}
makeBody()

// add turtle to final lines
bt.join(finalLines, t.lines())

// center piece
bt.rotate(finalLines, bt.randInRange(0,360))
const cc = bt.bounds(finalLines).cc
bt.translate(finalLines, [width / 2, height / 2], cc)
// draw it
drawLines(finalLines)
