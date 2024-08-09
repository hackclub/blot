/*
@title: Dog with headphones
@author: Aneta Cachová
@snapshot: dog1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);


const t = new bt.Turtle()

const faceTranslation = 8

const eyeHeight = 74 - faceTranslation
const headHeight = 26

const leftEyeX = 44.5
const rightEyeX = 75.5

const e = new bt.Turtle() // Turtle for eyes

const eyesArray = [
  // half circle
  (x) => {
    e.jump([x, eyeHeight])
    e.forward(6)
    e.left(-90)
    e.arc(-180, 3)
  },
  // happy arrow
  (x) => {
    e.jump([x, eyeHeight - 3])
    e.right(-60)
    e.forward(6)
    e.right(120)
    e.forward(6)
  },
  // sleepy
  (x) => {
    e.jump([x, eyeHeight])
    e.forward(6)
  },
  // open
  (x) => {
    e.jump([x + 3, eyeHeight - 3])
    e.arc(360, 3)
  },
  // sour
  (x) => {
    e.jump([x, eyeHeight + 3])
    e.right (45)
    e.forward (6)
    e.right (90)
    e.forward (6)
  },
  // happy arc
  (x) => {
    e.jump([x + 6, eyeHeight])
    e.left (90)
    e.arc(180,3)
  },
  // sleeping
  (x) => {
    e.jump([x, eyeHeight])
    e.right (90)
    e.arc(180,3)
  },
]

// Randomness
const leftEyeIndex = bt.randIntInRange(0, eyesArray.length - 1)
const rightEyeIndex = bt.randIntInRange(0, eyesArray.length - 1)

const noseRadius = 5 + bt.randInRange(-1, 1)
const mouthRadius = 8 + bt.randInRange(-3, 3)

// Nose
t.jump([width / 2, height / 2 - faceTranslation])
t.arc(360, noseRadius)

// Mouth
t.right(90)
t.arc(90, mouthRadius)
t.jump([width / 2, height / 2 - faceTranslation])
t.right(90)
t.arc(-90, mouthRadius)

// Draw random eyes
const leftEyeFn = eyesArray[leftEyeIndex]
e.setAngle(0)
leftEyeFn(leftEyeX)

const rightEyeFn = eyesArray[rightEyeIndex]
e.setAngle(0)
rightEyeFn(rightEyeX)


t.setAngle(90)
//Head
t.jump([width / 4, 43])
t.forward(headHeight)

t.jump([(3 * width) / 4, 43])
t.forward(headHeight)

t.arc(180, width / 4)

// Headphones
t.up()
t.left(180)
t.forward(4.5)
t.left(90)
t.forward(2)
t.right(90)
t.down()
t.arc(-180, width / 4 + 2)

// Left ear headphone
t.jump([width / 4, 43 + headHeight])
t.left(180)
t.arc(180, 6)
t.forward(26)
t.arc(180, 6)

// Right ear headphone
t.setAngle(270)
t.jump([3 * width / 4, 43 + headHeight])
t.left(180)
t.arc(-180, 6)
t.forward(26)
t.arc(-180, 6)


drawLines(t.lines())
drawLines(e.lines())
