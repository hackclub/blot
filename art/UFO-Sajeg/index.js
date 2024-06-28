/*
 @ title: UFO
 @author: Sajeg
 @snapshot: image2.png
*/

//A flying Unknown Flying Object, or UFO in short.

//Changeable parameters
const r = bt.randIntInRange(15, 45) //Size of the top, should be <65
const n = bt.randIntInRange(1, 20) //Number of stripes on the body
const rc = bt.randIntInRange(1, 15) //Radius of the circle

const width = 125
const height = 125

setDocDimensions(width, height);

//Draw the body of the ship
const t = new bt.Turtle()
const c = 3 / 5 * r

t.jump([25 / 2, 25 / 2])
t.goTo([25 / 2 + 100, 25 / 2])
t.goTo([125 / 2 + c, 1 / 5 * r + 25 / 2])
t.goTo([125 / 2 - c, 1 / 5 * r + 25 / 2])
t.goTo([25 / 2, 25 / 2])

drawLines(t.lines())

//Draw the top of the ship 
const m = [125 / 2, 25 / 2 + r]
const curve = bt.nurbs([
  [125 / 2 + c, 1 / 5 * r + 25 / 2],
  [m[0] + r, m[1]],
  [m[0], m[1] + r],
  [m[0] - r, m[1]],
  [125 / 2 - c, 1 / 5 * r + 25 / 2]
], 100)

drawLines([curve])

//Draw Decorations
//The circle in the middle
const cT = new bt.Turtle()

cT.jump([m[0], m[1] - (rc)])
cT.arc(360, rc)

drawLines(cT.lines())

//The stripes on the body
const sT = new bt.Turtle()

for (let i = 1; i <= n; i++) {
  sT.jump([(i / (n + 1) * 100) + (25 / 2), 25 / 2])
  sT.goTo([(i / (n + 1) * (2 * c)) + (125 / 2 - c), 1 / 5 * r + 25 / 2])
}

drawLines(sT.lines())

//draws random planets on the left side in the background
for (let i = 0; i < bt.randIntInRange(1, 4); i++) {
  const pT = new bt.Turtle()
  let radius = bt.randIntInRange(1, 10)
  while(radius > (m[0] - r)){
    radius = bt.randIntInRange(1, 10)
  }
  
  const xPos = bt.randIntInRange(radius, m[0] - r)
  const yPos = bt.randIntInRange(1 / 5 * r + 25 / 2, 120 - radius)

  pT.jump([xPos, yPos])
  pT.arc(360, radius)

  drawLines(pT.lines())
}

//draws random planets on the right side in the background
for (let i = 0; i < bt.randIntInRange(1, 4); i++) {
  const pT = new bt.Turtle()
  let radius = bt.randIntInRange(1, 10)
  while(120 - radius < (m[0] + r)){
    radius = bt.randIntInRange(1, 10)
  }
  
  const xPos = bt.randIntInRange(m[0] + r, 120 - radius)
  const yPos = bt.randIntInRange(1 / 5 * r + 25 / 2, 120 - radius)

  pT.jump([xPos, yPos])
  pT.arc(360, radius)

  drawLines(pT.lines())
}

//draws random planets in the top middle in the background
for (let i = 0; i < bt.randIntInRange(1, 4); i++) {
  const pT = new bt.Turtle()
  let radius = bt.randIntInRange(1, 10)
  while((120 - radius < (m[0] + r)) || ((120 - radius) < (m[1] + r))){
    radius = bt.randIntInRange(1, 10)
  }
  
  const xPos = bt.randIntInRange(radius, 120 - radius)
  const yPos = bt.randIntInRange(m[1] + r, 120 - radius)

  pT.jump([xPos, yPos])
  pT.arc(360, radius)

  drawLines(pT.lines())
}
