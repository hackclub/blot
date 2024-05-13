/*
@title: rainingCloud
@author: blasty
@snapshot: 0.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);





// =====================
// User Parameters Start
// =====================
// These are the settings I recommend to change to customise the drawing
// Don't use negative numbers, they won't work on anything other than rainOffset
// There are some other changable parameters in the code, but I don't think they should be changed

// Random seed, leave commented for random cloud every time
// bt.setRandSeed(1234567890)

// Number of arcs the cloud should have
const cloudArcs = bt.randInRange(5, 7)

// Number of rows of rain that should be drawn
const rowsOfRain = Math.round(bt.randInRange(5, 7))
// Number of "raindrops" that should be drawn per row
const maxPerRow = bt.randInRange(20, 40)

// The distance the rain should start from the bottom of the cloud
const rainOffset = bt.randInRange(1, 3)
// The degrees the "raindrops" should vary by. A value of 1 will randomise between -1 and 1
const rainAngleRange = bt.randInRange(0, 2)

// ===================
// User Parameters End
// ===================





// cloud
const cloudFinalLines = [];
const ct = new bt.Turtle();

var cloudArcAngle = 270
for (let i = 0; i < cloudArcs; i++) {
  cloudArcAngle = bt.randInRange(-80, -40) * (i / 2)
  ct.setAngle(-cloudArcAngle)
  const min = 6
  const max = i == (cloudArcs - 1) ? 6 : 11
  ct.arc(180, bt.randInRange(min, max))
}

const cloudEndPoint = [
  ct.lines()[0][ct.lines()[0].length - 1][0],
  ct.lines()[0][ct.lines()[0].length - 1][1]
]

ct.goTo([0, 0])

// rain
const rainFinalLines = []
const rt = new bt.Turtle()

const cloudBottomLength = Math.sqrt(Math.pow(cloudEndPoint[0], 2)
                                    + Math.pow(cloudEndPoint[1], 2))
const cloudBottomAngle = Math.atan(cloudEndPoint[0] / cloudEndPoint[1]) * (180 / Math.PI)

bt.join(cloudFinalLines, ct.lines())
bt.translate(cloudFinalLines, [width / 2, height / 2], bt.bounds(cloudFinalLines).cb)
const angleOffset = cloudBottomAngle < 0 ? 90 : -90
bt.rotate(cloudFinalLines, cloudBottomAngle + angleOffset)
drawLines(cloudFinalLines)

for (let i = 0; i < maxPerRow; i++) {
  for (let j = 0; j < rowsOfRain; j++) {
    const pos = rt.pos
    rt.setAngle(bt.randInRange(-rainAngleRange, rainAngleRange) - 90)
    rt.forward(bt.randInRange(3, 6))
    rt.up()
    rt.forward(bt.randInRange(2, 4))
    rt.down()
  }
  rt.jump([rt.pos[0] + (cloudBottomLength / maxPerRow), 0])
}


bt.join(rainFinalLines, rt.lines())
bt.translate(rainFinalLines, [
  width / 2, bt.bounds(cloudFinalLines).yMin
], bt.bounds(rainFinalLines).cb)
bt.translate(rainFinalLines, [
  0, -bt.bounds(rainFinalLines).height - rainOffset
])
drawLines(rainFinalLines)



// the below draw bounding boxes, they were used for debug purposes

// const temp1 = bt.bounds(cloudFinalLines)
// drawLines([[[temp1.xMin, temp1.yMin], [temp1.xMin, temp1.yMax], [temp1.xMax, temp1.yMax], [temp1.xMax, temp1.yMin], [temp1.xMin, temp1.yMin]]])

// const temp2 = bt.bounds(rainFinalLines)
// drawLines([[[temp2.xMin, temp2.yMin], [temp2.xMin, temp2.yMax], [temp2.xMax, temp2.yMax], [temp2.xMax, temp2.yMin], [temp2.xMin, temp2.yMin]]])
