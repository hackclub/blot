/*
@title: OldTV
@author: Ernests
@snapshot: snap1.png
*/
const width = 200;
const height = 200;

const tvWidth = bt.randInRange(150, 320) // default: 230
const tvHeight = bt.randInRange(180, 250) // default: 180
const tvBezel = bt.randInRange(5, 15) // default: 7
const tvCornerRad = bt.randInRange(1, 4) // default: 2
const tvScreenDeg = -20 //default: -20
const tvPanelW = bt.randInRange(35, 50) // default: 40

setDocDimensions(width, height);

// Helper functions
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

// Get chord of circle from arc degrees & radius
const getChord = (radius, arcDeg) => {
  // Get radians from arc width in degrees & divide in half
  const radians = toRadians(Math.abs(arcDeg) / 2)
  // Formula: 2 * radius * sin(arc degrees / 2)
  const chord = 2 * radius * Math.sin(radians)
  return chord
}

const createGrill = (length, distanceBetween, width) => {
  const lineCount = width / distanceBetween
  // if (typeof lineCount !== 'integer') throw new Error('createGrill(): width / distanceBetween must be an integer!')

  for (let i = 0; i++; i >= lineCount / 2) {
    t.forward(length)
    t.left(90).up()
    t.forward(distanceBetween).left(90).down()
    t.forward(length)
    t.up().right(90).forward(distanceBetween)
    t.right(90).down()
  }
}

const t = new bt.Turtle();

t.left(10)
t.arc(-20, tvWidth)
t.arc(-70, tvCornerRad)
t.arc(tvScreenDeg, tvHeight)
t.arc(-70, tvCornerRad)
t.arc(tvScreenDeg, tvWidth)
t.arc(-70, tvCornerRad)
t.arc(tvScreenDeg, tvHeight)
t.arc(-70, tvCornerRad)

t.left(170).up()
t.forward(tvCornerRad)
t.right(90)
t.forward(tvBezel)
t.right(90).down()

t.forward(getChord(tvWidth, tvScreenDeg)).forward(tvCornerRad + tvBezel)
t.arc(-90, tvCornerRad)
t.forward(getChord(tvHeight, tvScreenDeg)).forward(tvBezel * 2)
t.arc(-90, tvCornerRad)
t.forward(getChord(tvWidth, tvScreenDeg)).forward(tvBezel * 2)
t.arc(-90, tvCornerRad)
t.forward(getChord(tvHeight, tvScreenDeg)).forward(tvBezel * 2)
t.arc(-90, tvCornerRad)
t.forward(tvBezel).up()

t.forward(getChord(tvWidth, tvScreenDeg) + tvBezel).down()

t.forward(tvPanelW)
t.arc(-90, tvCornerRad)
t.forward(getChord(tvHeight, tvScreenDeg) + 2 * tvBezel)
t.arc(-90, tvCornerRad)
t.forward(tvPanelW).up()

t.left(180).forward(tvCornerRad)
t.forward(tvPanelW / 8)
t.left(90).forward((getChord(tvHeight, tvScreenDeg) + tvBezel + tvCornerRad))
t.down()

t.arc(-90, tvCornerRad)
t.forward(tvPanelW * (6 / 8) - 2 * tvCornerRad)
t.arc(-90, tvCornerRad)
t.forward(getChord(tvHeight, tvScreenDeg) / 2)
t.arc(-90, tvCornerRad)
t.forward(tvPanelW * (6 / 8) - 2 * tvCornerRad)
t.arc(-90, tvCornerRad)
t.forward(getChord(tvHeight, tvScreenDeg) / 2)

// Maybe create a sort of 'grill' at the top of the control panel
t.up()
t.right(90)
// t.right(90).forward(getChord(tvHeight, tvScreenDeg) / 2 / 2).left(90)
t.down()

const length = tvPanelW * (6 / 8)

t.forward(length)
  .right(90).up()
  .forward(2).right(90).down()
  .forward(length)
  .up().left(90).forward(2)
  .left(90).down()
t.forward(length)
  .right(90).up()
  .forward(2).right(90).down()
  .forward(length)
  .up().left(90).forward(2)
  .left(90).down()

t.up().right(90).forward(getChord(tvHeight, tvScreenDeg) / 8)
t.left(90).forward(length / 2).down()

t.arc(-360, getChord(tvHeight, tvScreenDeg) / 4 / 2)


const verticalLen = getChord(tvHeight, tvScreenDeg) / 2
const between = tvPanelW / 16

t.up().forward(length / 2).right(90)
t.forward(getChord(tvHeight, tvScreenDeg) * (6 / 8) + tvBezel + tvCornerRad)
t.left(90).forward(tvPanelW * (1 / 8) - between).left(90)
t.down()

t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)
  .left(90).up()
  .forward(between).left(90).down()
  .forward(verticalLen)
  .up().right(90).forward(between)
  .right(90).down()
t.forward(verticalLen)

t.up().left(180).forward(verticalLen)
t.left(90).forward(between * 15 - tvBezel - tvCornerRad)
t.down().right(80).forward(50)
t.up().left(180).forward(50).left(80)
t.forward(getChord(tvWidth, tvScreenDeg) + tvPanelW).down()
t.left(80).forward(50)

t.up().left(180).forward(50).left(100).forward(tvBezel)
t.arc(-90, tvCornerRad).forward(getChord(tvHeight, tvScreenDeg) + tvBezel * 2)
t.right(90).forward((getChord(tvWidth, tvScreenDeg) + tvBezel * 2 + tvCornerRad * 3 + tvPanelW) / 2)
t.down()

t.left(45).forward(20)
t.up().left(180).forward(20)
t.right(bt.randInRange(80, 100)).down()
t.forward(20)
t.up()

const cc = bt.bounds(t.lines()).cc;
const centered = bt.translate(t.lines(), [height / 2, width / 2], cc);


// draw it
drawLines(centered);