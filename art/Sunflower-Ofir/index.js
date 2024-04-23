/*
@title: Sunflower
@author: Ofir
@snapshot: sunflower1.png
*/

const width = 125
const height = 125

setDocDimensions(width, height)

const arcOneCount = bt.randIntInRange(1, 2)
const arcTwoCount = bt.randIntInRange(1, 2)
const petalsCount = 21 //choose more than 12
const flowerSize = 9 // changes size of the center
const petalSize = 27
const petalSizeVariation = 2 //changes how diffrent each petal can be
const stemThickness = 3
const stemCurve = -3 // negetive is to the left, pos is to the right
const flowerpos = [width / 2, height / 2] // you can put any location you want
const arcthickness = .5 //changes the thickness of the arcs in the center of the flower
const varBetweenPetals = 2 //changes the random variation in space between each petal
const centreColor = true // either true or false


console.log("POS", flowerpos)
const arc1 = (n, flowerSize, flowerpos) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n + 1; i++) {
    t.up()
    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(i * (360 / n))
    t.forward(2)
    t.down()
    t.arc(-90, flowerSize)
  }
  return t.lines()
}

const arc2 = (n, flowerSize, flowerpos) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n + 1; i++) {
    t.up()
    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(i * (360 / n))
    t.forward(2)
    t.down()
    t.arc(90, flowerSize)
  }
  return t.lines()
}

const middle = (flowerSize, flowerpos) => {
  const t = new bt.Turtle()
  const tt = new bt.Turtle()
  t.up()
  t.goTo([flowerpos[0], flowerpos[1] - 2 - (flowerSize * Math.sqrt(2))])
  t.down()
  t.arc(360, 2 + (flowerSize * Math.sqrt(2)))
  drawLines(t.lines(), { fill: "brown" })
  tt.up()
  tt.goTo([flowerpos[0], flowerpos[1] - 2])
  tt.down()
  tt.arc(360, 2)
  drawLines(tt.lines(), { fill: "black" })



}

const petals = (n, flowerSize, flowerpos, varBetweenPetals) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) {
    let s = bt.randInRange(petalSize - petalSizeVariation, petalSize + petalSizeVariation)
    let petal = []
    t.up()

    const randomSpace = bt.randInRange(-varBetweenPetals, varBetweenPetals)

    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(i * (360 / n) + 5 + randomSpace)
    t.forward(2 + (flowerSize * Math.sqrt(2)))
    petal.push(t.pos)

    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(i * (360 / n) + randomSpace)
    t.forward(2 + (flowerSize * Math.sqrt(2)))
    t.forward(s / 2)
    petal.push(t.pos)

    let second = (i + 1) * (360 / n) + randomSpace

    if (second > 360) {
      second = second - 360
    }

    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(((i + 1) * (360 / n) + i * (360 / n)) / 2 + randomSpace)
    t.forward(2 + (flowerSize * Math.sqrt(2)))
    t.down()
    t.forward(s / 4)
    t.up()
    t.forward(s - s / 4)
    petal.push(t.pos)
    t.up()

    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(second)
    t.forward(2 + (flowerSize * Math.sqrt(2)))
    t.forward(s / 2)
    petal.push(t.pos)


    t.goTo([flowerpos[0], flowerpos[1]])
    t.setAngle(second - 5 + randomSpace)
    t.forward(2 + (flowerSize * Math.sqrt(2)))
    petal.push(t.pos)

    let curve = bt.catmullRom(petal)

    drawLines([curve], { fill: "yellow", width: 2 })
  }
  return t.lines()
}

const stem = (flowerpos, stemThickness, stemCurve, flowerSize) => {
  let curves = [
    [flowerpos[0], 0],
    [flowerpos[0] + stemCurve, (flowerpos[1] - 2) / 3],
    [flowerpos[0], (flowerpos[1] - 2 - flowerSize * Math.sqrt(2))]
  ]
  drawLines([bt.catmullRom(curves)], { stroke: "green", width: stemThickness })
}

stem(flowerpos, stemThickness, stemCurve, flowerSize)

if (centreColor == true){
   middle(flowerSize, flowerpos)
}


if (arcOneCount == 1) {
  drawLines(arc1(21, flowerSize, flowerpos), { width: arcthickness })
} else {
  drawLines(arc1(34, flowerSize, flowerpos), { width: arcthickness })
}

if (arcTwoCount == 1) {
  drawLines(arc2(21, flowerSize, flowerpos), { width: arcthickness })
} else {
  drawLines(arc2(34, flowerSize, flowerpos), { width: arcthickness })
}

drawLines(petals(petalsCount, flowerSize, flowerpos, varBetweenPetals))
