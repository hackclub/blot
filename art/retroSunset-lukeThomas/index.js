/*
@title: retroSunset
@author: lukeThomas
@snapshot: snapshot1.png
*/


// PARAMETERS

// set width of sun rays around sun and on the floor
const rayWidth = 4 //( 1 to 10 typically work best)

// set width of the dark border around the sun
const sunBorder = 5

// set distance of ray from sun
const oddRayDistance = 5
const evenRayDistance = 10

// set length of rays around sun
const oddRayLen = 38
const evenRayLen = 15

// set sky and floor colour HEX codes
const skyCol = "#000058"
const floorCol = "#0c0021"
const floorRayCol = "#FF0099"

// set colour of sun
const sunCol = `#FF${(bt.randIntInRange(1,15)).toString(16)}${(bt.randIntInRange(1,15)).toString(16)}00`

const randomSeed = 0 // set to zero for total random

// --------------------------------------------------------------------------------

// setup page
const width = 125;
const height = 125;

setDocDimensions(width, height);

// set random seed if present
if (randomSeed) {
  bt.setRandSeed(randomSeed)
}

// store final lines here
const floorRays = [];

// create rays on floor
const numOfSkyRays = bt.randIntInRange(5, 24)
for (let i = 0; i < numOfSkyRays + 1; i++) {
  let top = (((width / 2) / numOfSkyRays) * i) + (width / 4);
  let bottom = (((width) / numOfSkyRays) * i);

  let line = [
    [top, 62.5],
    [bottom, 0.5]
  ]

  floorRays.push(line)
}


// used as options for the number of different rays
const factorsOf180 = [60, 36, 30, 20, 18, 12]

// create turtle for the sun semi-circle
const sunT = new bt.Turtle();

// create turtle for the rays around the sun
const rayT = new bt.Turtle();

// select a random number of rays
const numOfFloorRays = factorsOf180[bt.randIntInRange(0, factorsOf180.length - 1)]

function drawRay(position, angle, length, distance) {
  rayT.jump(position)
  rayT.setAngle(angle)

  rayT.left(90)
  rayT.up()
  rayT.forward(distance)
  rayT.down()
  rayT.forward(length)
}

// draw sun and rays around sun
sunT.jump([47, 104.2])
sunT.setAngle(90)
sunT.down()

for (let i = 1; i < numOfFloorRays + 1; i++) {
  // draw ray
  if (i % 2 == 0) {
    // draw even ray if i is even
    drawRay(sunT.pos, sunT.angle, evenRayLen, evenRayDistance)
  } else {
    // draw odd ray if i is odd
    drawRay(sunT.pos, sunT.angle, oddRayLen, oddRayDistance)
  }

  for (let j = 0; j < (180 / numOfFloorRays); j++) {
    // move the turtle round to draw more of the sun
    sunT.forward(1)
    sunT.right(1)
  }
}

// draw final ray 
sunT.forward(1)
drawRay(sunT.pos, sunT.angle, oddRayLen, oddRayDistance)


// extract paths from turtles and scale correctly
let ray = rayT.path
ray = bt.scale(ray, 0.6, [0, 0])

let sun = sunT.path
sun = bt.scale(sun, 0.6, [0, 0])


// draw it

// draw top part background
drawLines([
  [
    [0, 62.5],
    [0, 125],
    [125, 125],
    [125, 62.5],
  ]
], { fill: skyCol });

// draw bottom part background
drawLines([
  [
    [0, 62.5],
    [0, 0],
    [125, 0],
    [125, 62.5]
  ]
], { fill: floorCol })

drawLines(floorRays, { width: rayWidth, stroke: floorRayCol });
drawLines(sun, { width: sunBorder, fill: sunCol, stroke: floorCol });
drawLines(ray, { width: rayWidth, stroke: sunCol });
