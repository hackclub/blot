/*
@title: Sunflower
@author: Parv
@snapshot: 1.png
*/

const width = 125
const height = 125
setDocDimensions(width, height)

const r = Math.floor((Math.random() * 10) + 20)
const x = width / 2
const y = height / 2 + 30 

const petalNum = Math.floor((Math.random() * 8) + 15)
const petalLength = Math.floor((Math.random() * 15) + 25)
const seedNum = Math.floor((Math.random() * 50) + 100)

function getCirclePoints(h, k, r, n, startAngle = 0) {
  const points = [];
  const angleStep = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep;
    const x = h + r * Math.cos(angle);
    const y = k + r * Math.sin(angle);
    points.push({ x, y });
  }

  return points;
}

const genRanCir = (x, y, r, ran) => {
  const circle = new bt.Turtle()
  circle.jump([x, y])
  circle.forward(r)
  circle.left(90)
  circle.forward(r)
  circle.left(90)
  circle.forward(r)
  circle.left(90)
  circle.forward(r)
  const tmp = bt.catmullRom(circle.lines()[0])
  const finCircle = bt.catmullRom(bt.resample([tmp], ran)[0])
  return finCircle
}

const genPetal = (x, y, r, angle, length) => {
  const petal = new bt.Turtle()
  petal.jump([x, y])
  const tipX = x + length * Math.cos(angle)
  const tipY = y + length * Math.sin(angle)
  const controlX1 = x + length * 0.5 * Math.cos(angle - 0.3)
  const controlY1 = y + length * 0.5 * Math.sin(angle - 0.3)
  const controlX2 = x + length * 0.5 * Math.cos(angle + 0.3)
  const controlY2 = y + length * 0.5 * Math.sin(angle + 0.3)
  
  petal.goTo([controlX1, controlY1])
  petal.goTo([tipX, tipY])
  petal.goTo([controlX2, controlY2])
  petal.goTo([x, y])
  
  return bt.catmullRom(petal.lines()[0])
}

const genStem = (x, y, r) => {
  const stem = new bt.Turtle()
  stem.jump([x, y - r])
  stem.goTo([x, 0])
  drawLines([bt.catmullRom(stem.lines()[0])])
}

const genLeaf = (x, y, r, side) => {
  const leaf = new bt.Turtle()
  const leafSize = r * 0.8
  const stemLength = y - r
  const leafY = y - r - stemLength * 0.6
  
  leaf.jump([x, leafY])
  leaf.goTo([x + side * leafSize, leafY + leafSize / 2])
  leaf.goTo([x + side * leafSize / 2, leafY + leafSize])
  leaf.goTo([x, leafY + leafSize / 2])
  
  drawLines([bt.catmullRom(leaf.lines()[0])])
}

const genSunflower = (r, x, y, petalNum, petalLength, seedNum) => {

  for (let i = 0; i < petalNum; i++) {
    const angle = (2 * Math.PI * i) / petalNum + Math.PI // Add Math.PI to rotate 180 degrees
    const petal = genPetal(x, y, r, angle, petalLength)
    drawLines([petal])
  }

  const center = genRanCir(x, y, r)
  drawLines([center])

  for (let i = 0; i < seedNum; i++) {
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * r * 0.9
    const seedX = x + distance * Math.cos(angle)
    const seedY = y + distance * Math.sin(angle)
    const seed = genRanCir(seedX, seedY, 0.5, 4)
    drawLines([seed])
  }
  
  genStem(x, y, r)
  genLeaf(x, y, r, 1)  // Right leaf
  genLeaf(x, y, r, -1) // Left leaf
}

genSunflower(r, x, y, petalNum, petalLength, seedNum)