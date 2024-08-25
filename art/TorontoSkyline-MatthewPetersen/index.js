/*
@title: Toronto Skyline
@author: Matthew Petersen
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle()
const rr = bt.randInRange

t.left(90)
t.forward(rr(45,60))

const buildingsBefore = bt.randIntInRange(3
                                          , 6)
const buildingBefore = buildingsBefore - 1
console.log(buildingsBefore, buildingBefore)

for (let i = 0; i < buildingsBefore; i ++){
  const buildingLength = rr(5,15)
  const buildingGap = rr(1,5)
  const heightDifference = rr(-10,10)
  // 25 < t.pos[2] < 100{
  t.right(90) // Aiming accross
  t.forward(buildingLength) // Building Across
  t.right(90) // Aiming down
  const buildingHeight = rr(0, t.pos[1])
  t.forward(buildingHeight) // Building Down
  t.left(90) // Aiming Across
  t.forward(buildingGap) // Building Across
  t.left(90) // Aiming Up
  if (i != buildingBefore){
    const maxIncrease = 60 - t.pos[1]
    const newbuildingHeight = rr(25, maxIncrease)
    t.forward(newbuildingHeight) // Building up
  }
}

t.right(180)


// Get to y-pos 10

const getToGround = t.pos[1]
t.forward(getToGround)
t.left(90)

// Rogers Centre

const currentPos = t.pos
const topOfCentre = [(t.pos[0] + 15), (t.pos[1] + 7)]
const endOfCentre = [(t.pos[0] + 30), t.pos[1]]

const curve = bt.catmullRom([currentPos, topOfCentre, endOfCentre])

// CN TOWER
t.left(88)
t.forward(80)



function createCirclePoints(centerX, centerY, radius, numSides = 32) {
  const points = [];
  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }
  points.push(points[0]); 
  return [points];
}
function drawCircle(centerX, centerY, radius, options = {fill:"#000"}) {
  const points = createCirclePoints(centerX, centerY, radius);
  drawLines(points, options);
}

const [centerX, centerY] = [t.pos[0] + 1, t.pos[1]];
drawCircle(centerX, centerY, 5)

for (let i = 0; i < 2; i ++){
  t.forward(6)
  t.left(92)
  t.forward(2)
  t.right(90)
  t.forward(1)
  t.right(90)
  t.forward(2.1)
  t.left(88)
  t.forward(2)
}
t.forward(5)
t.left(183)
t.forward(1)
for (let i = 0; i < 2; i ++){
  t.forward(6)
  t.left(92)
  t.forward(2)
  t.right(90)
  t.forward(1)
  t.right(90)
  t.forward(2.1)
  t.left(88)
  t.forward(2)
}
t.forward(84)
t.left(89)

t.left(90)
t.forward(rr(45,60))




for (let i = 0; i < 10; i ++){
  const buildingLength = rr(5,15)
  const buildingGap = rr(1,5)
  const heightDifference = rr(-10,10)
  if ((t.pos[0] + buildingGap) < 125){
    t.right(90) // Aiming accross
    
    if ((t.pos[0] + buildingLength) > 125){
      let newbuildingLength = 125 - t.pos[0]
      t.forward(newbuildingLength)
      break
    }
    else{
      t.forward(buildingLength) // Building Across
    }

    
    t.right(90) // Aiming down
    const buildingHeight = rr(0, t.pos[1])
    t.forward(buildingHeight) // Building Down
    t.left(90) // Aiming Across

    if ((t.pos[0] + buildingGap) > 125){
      let newbuildingGap = 125 - t.pos[0]
      t.forward(newbuildingGap)
      break
    }
    else{
      t.forward(buildingGap) // Building Across
    }

    
    t.left(90) // Aiming Up
    if (i != 3){
      const maxIncrease = 60 - t.pos[1]
      const newbuildingHeight = rr(25, maxIncrease)
      t.forward(newbuildingHeight) // Building up
    }
  }
  else{
      let newbuildingLength = 125 - t.pos[0]
      t.right(90)
      t.forward(newbuildingLength)
      break
  }

}
t.right(90)
t.forward(t.pos[1])

const moon = new bt.Turtle()
moon.left(rr(75,80))
moon.up().forward(rr(100,110)).down()
const ogPosition = moon.pos
moon.left(179)
moon.jump(ogPosition)
moon.arc(94, 13)
moon.right(496)
moon.arc(-183, 9.5)

const letterSpacing = 2

const sign = new bt.Turtle()
sign.up().left(70).forward(129)
sign.down()
sign.right(70)
sign.forward(5)
const endPos = sign.pos
sign.jump([(sign.pos[0]-2.5),(sign.pos[1])])
sign.right(90)
sign.forward(5)
sign.jump(endPos)
sign.up().left(22).forward(1)
sign.left(348)
sign.up().forward(letterSpacing)
sign.down().arc(360, 2.7)
sign.up().left(80).forward(7)
sign.up().right(90).forward(2.1).left(180)
sign.down().forward(5)
sign.right(73)
sign.arc(-212,1.7)
sign.right(205).forward(2.7)
sign.up().left(38).forward(4)
sign.down().arc(360, 2.7)
sign.up().left(2).forward(4.5)
sign.down().left(90).forward(5)
sign.right(145).forward(6)
sign.left(145).forward(5)
sign.up().right(90).forward(letterSpacing)
sign.down().forward(5)
const endPos2 = sign.pos
sign.jump([(sign.pos[0]-2.5),(sign.pos[1])])
sign.right(90)
sign.forward(5)
sign.jump(endPos2)
sign.up().left(22).forward(1)
sign.left(348)
sign.up().forward(letterSpacing)
sign.down().arc(360, 2.7)

  
drawLines(sign.lines())

drawLines(moon.lines(), {fill:"#f0c420"})

// drawLines([curve], {fill:"#FFFF00"})
drawLines(t.lines(), {fill:"#000"})
