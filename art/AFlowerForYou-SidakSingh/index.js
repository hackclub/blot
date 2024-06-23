/*
@title: AFlowerForYou
@author: SidakSingh
@snapshot: image2.png
*/

const width = 125
const height = 125
setDocDimensions(width, height)

const r = Math.floor((Math.random() * 10) + 5)
const x = (width - r) / 2 
const y = 65
const petalNum = Math.floor((Math.random() * 12) + 7)
const petalHeight = Math.floor((Math.random() * 20) + 20)
const innerPetalNum = Math.floor((Math.random() * 7) + 5)
const innerPetalHeight = Math.floor((Math.random() * 10) + 5)
const circleMorph = Math.floor((Math.random() * 8) + 1)
const innerCircleMorph = Math.floor((Math.random() * 3) + 1)
// all of the const values above can be changed as per your preference

function getCirclePoints(h, k, r, n, startAngle = 0) {
  const points = [];
  const angleStep = (2 * Math.PI) / n; // Angle between points

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

const genPetal = (x, y, r, num, h) => {
  r = r / 1.5
  x = x + r * 0.75
  y = y + r * 0.75
  const circlePoints = getCirclePoints(x, y, r, num);
  const outerCircPoints = getCirclePoints(x, y, r + h, num);
  
  const midCircPoints1 = getCirclePoints(x, y, r + ((h / 10)* 2.3), num, 5.9);
  const midCircPoints2 = getCirclePoints(x, y, r + ((h / 7)* 2.3), num, -5.9);

  const midHighCircPoints1 = getCirclePoints(x, y, r + ((h / 10)* 7), num, 5.9);
  const midHighCircPoints2 = getCirclePoints(x, y, r + ((h / 10)* 7), num, -5.9);
  
  for (let i = 0; i < circlePoints.length; i++) {
    let xCor = circlePoints[i].x
    let yCor = circlePoints[i].y
    
    let xOutCor = outerCircPoints[i].x
    let yOutCor = outerCircPoints[i].y
    
    let xMidCor1 = midCircPoints1[i].x
    let yMidCor1 = midCircPoints1[i].y
    let xMidCor2 = midCircPoints2[i].x
    let yMidCor2 = midCircPoints2[i].y

    let xMidHighCor1 = midHighCircPoints1[i].x
    let yMidHighCor1 = midHighCircPoints1[i].y
    let xMidHighCor2 = midHighCircPoints2[i].x
    let yMidHighCor2 = midHighCircPoints2[i].y

    
    const petal = new bt.Turtle()
    petal.jump([xCor, yCor])
    petal.goTo([xMidCor1,yMidCor1])
    petal.goTo([xMidHighCor1,yMidHighCor1])
    petal.goTo([xOutCor,yOutCor])
    petal.goTo([xMidHighCor2,yMidHighCor2])
    petal.goTo([xMidCor2,yMidCor2])
    petal.goTo([xCor, yCor])
    drawLines([bt.catmullRom(petal.lines()[0],)])
    drawLines(petal.lines())
  }
}

const genStem = (x, y, r, petalHeight) => {
  const offset = 8
  const stem = new bt.Turtle()
  stem.jump([x + offset, y - petalHeight + 5])
  stem.goTo([x + offset, 10])
  stem.goTo([x + offset - 5, 10])
  stem.goTo([x + offset - 5, y - petalHeight + 5])
  stem.goTo([x + offset, y - petalHeight + 5])
  drawLines([bt.catmullRom(stem.lines()[0])])
}

const genFlower = (r, x, y, petalNum, PetalHeight, innerPetalNum, innerPetalHeight, circleMorph, innerCircleMorph) => {
  const outerCircle = genRanCir(x, y, r, circleMorph)
  const innerCircle = genRanCir(x + 1.5, y + 1.5, r - 3, innerCircleMorph)
  genPetal(x, y, r, petalNum, petalHeight)
  genPetal(x, y, r, innerPetalNum, innerPetalHeight)
  genStem(x, y, r, petalHeight)
  drawLines([outerCircle, innerCircle])
}

genFlower(r, x, y, petalNum, petalHeight, innerPetalNum, innerPetalHeight, circleMorph, innerCircleMorph)







