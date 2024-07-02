/*
@title: Infinite Skyline
@author: Rishabh Mittal
@snapshot: image(3).png
*/

const width = 138
setDocDimensions(width, 125)
const minBuildingHeight = 81
const maxBuildingHeight = 45
const spacingDistance = 9
const buildingWidth = 34
const windowSize = 4

const pencil = new bt.Turtle();
pencil.down()

function building(height) {
  pencil.forward(spacingDistance)
  pencil.left(90)
  pencil.forward(height)
  pencil.right(90)
  pencil.forward(buildingWidth)
  pencil.right(90)
  pencil.forward(height)
  pencil.left(90)
}

function door(buildingNo) {
  pencil.jump([(buildingNo * spacingDistance) + ((buildingNo - 1) * buildingWidth) + (buildingWidth / 2) - 2, 0])
  pencil.left(90)
  pencil.forward(7)
  pencil.right(90)
  pencil.forward(4)
  pencil.right(90)
  pencil.forward(7)
  pencil.left(90)
}

function window(buildingNo, height) {
  const windowNoRow = Math.floor(buildingWidth / (windowSize + 1)-0.5);
  const windowNoCol = Math.floor((height - 7) / (windowSize + 3));
  for (let j = 0; j < windowNoCol; j++) {
    for (let i = 0; i < windowNoRow; i++) {
      const gap = ((buildingWidth % windowSize)/2)+2
      pencil.jump([(buildingNo * spacingDistance) + ((buildingNo - 1) * buildingWidth) + gap + (i*windowSize) + (i*1), 10+(3*j)+(j*windowSize)])
      pencil.left(90)
      pencil.forward(windowSize)
      pencil.right(90)
      pencil.forward(windowSize)
      pencil.right(90)
      pencil.forward(windowSize)
      pencil.right(90)
      pencil.forward(windowSize)
      pencil.left(180)
    }
  }
}

let numBuildings = 0
let buildingHeights = []
let linesNum = 0

while (pencil.pos[0] < (width - buildingWidth - spacingDistance)) {
  const buildingHeight = bt.randIntInRange(minBuildingHeight, maxBuildingHeight)
  buildingHeights.push(buildingHeight)
  building(buildingHeight)
  numBuildings++
  linesNum++
}
  
drawLines(pencil.lines().slice(0,linesNum), {fill: "beige"})

for (let i = 0; i < numBuildings; i++) {
  door(i+1)
  linesNum++
}

drawLines(pencil.lines().slice(1,linesNum), {fill: "grey"})

for (let i = 0; i < numBuildings; i++) {
  window(i+1, buildingHeights[i])
  for (let i = 0; i < 176; i++) {linesNum++}
  drawLines(pencil.lines().slice(numBuildings+1,linesNum), {fill: "lightBlue"})
}
