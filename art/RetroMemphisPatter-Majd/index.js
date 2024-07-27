/*
@title: Retro Memphis Pattern
@author: Majd
@snapshot: snap2.png
*/

const frameWidth = 300
const frameHeight = 300
const amountOfShapes = 10

const frame = [
  [
    [0, 0],
    [frameWidth, 0],
    [frameWidth, frameHeight],
    [0, frameHeight],
    [0, 0]
  ]
]

setDocDimensions(frameWidth, frameHeight)

function createLightning(size) {
  const t = new bt.Turtle()
  t.left(60)
  t.forward(size)
  t.left(130)
  t.forward(size / 5)
  t.right(120)
  t.forward(size)
  t.left(170)
  t.forward(size + (size / 4))
  t.left(130)
  t.forward(size / 4)
  t.right(120)
  t.forward(size / 1.3)
  t.left(180)
  t.forward(size / 2.9)
  return t.path
}

function createSquiggle(size, turn) {
  const t = new bt.Turtle()
  t.left(90)
  
  for (let i = 0; i < turn; i++){
    t.arc(-180,size)
    t.arc(180,size)
  }
  
  t.arc(180, size/6.66667)
  
  for(let i = 0; i < turn; i++){
    t.arc(-180, size/1.42857)
    t.arc(180, size/0.76923)
  }
  
  t.arc(180, size/6.66667)

  return t.path
}

function createRec(width, height) {
  const t = new bt.Turtle()
  t.forward(width)
  t.left(90)
  t.forward(height)
  t.left(90)
  t.forward(width)
  t.left(90)
  t.forward(height)
  console.log("Rec")
  return t.path
}

function createCircle(radius) {
  const t = new bt.Turtle()
  t.arc(360, radius)
  console.log("circle")
  return t.path
}

function createTriangle(size) {
  const t = new bt.Turtle()
  t.forward(size)
  t.left(120)
  t.forward(size)
  t.left(120)
  t.forward(size)
  console.log("triangle")
  return t.path
}

function generateShapes() {
  let randomChoice = bt.randIntInRange(1, 5)
  let shape = []

  if (randomChoice == 1) {
    shape = createRec(bt.randInRange(10, 50), bt.randInRange(10, 50))
  } else if (randomChoice == 2) {
    shape = createCircle(bt.randInRange(10, 50))
  } else if (randomChoice == 3) {
    shape = createTriangle(bt.randInRange(10, 50))
  } else if (randomChoice == 4) {
    shape = createLightning(bt.randInRange(10, 50))
  } else {
    shape = createSquiggle(bt.randInRange(10, 20), bt.randIntInRange(1,3))
  }



  bt.rotate(shape, bt.randInRange(0, 360))
  bt.translate(shape, [bt.randInRange(0, frameWidth), bt.randInRange(0, frameHeight)])
  bt.cut(shape, frame)
  return shape
}


drawLines(frame, { fill: "Black", width: 20 })

let color = ""



for (let i = 0; i <= amountOfShapes; i++) {
  const randomNum = bt.randIntInRange(1, 5)
  if (randomNum == 1) {
    color = "HotPink"
  } else if (randomNum == 2) {
    color = "Yellow"
  } else if (randomNum == 3) {
    color = "GreenYellow"
  } else if (randomNum == 4) {
    color = "Aqua"
  } else if (randomNum == 5) {
    color = "Orange"
  }

  drawLines(generateShapes(), { fill: color, width: 20 })
}