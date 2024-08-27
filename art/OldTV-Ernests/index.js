/*
@title: OldTV
@author: Ernests
@snapshot: snap1.png
*/
const width = 200;
const height = 200;

const tvWidth = bt.randInRange(240, 320) // default: 230
const tvHeight = bt.randInRange(210, 250) // default: 180
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
t.arc(tvScreenDeg, tvWidth)
t.arc(-70, tvCornerRad)
t.arc(tvScreenDeg, tvHeight)
t.arc(-70, tvCornerRad)
t.arc(tvScreenDeg, tvWidth)
t.arc(-70, tvCornerRad)
t.arc(tvScreenDeg, tvHeight)
t.arc(-70, tvCornerRad)

// Scene
t.up()
t.right(100).forward(getChord(tvHeight, tvScreenDeg) + tvCornerRad * 2)

const randScene = bt.randInRange(0, 3)
if (randScene <= 1) {
  // SCENE 2
  t.left(180).forward(getChord(tvHeight, tvScreenDeg) * (2 / 3) + tvCornerRad).left(90).forward(tvCornerRad).left(180)
  t.down()
  t.forward((getChord(tvWidth, tvScreenDeg) + tvCornerRad * 2) * (2 / 3))
  t.left(90)
  t.arc(180, 20).left(180)
  t.up()
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down().forward(3).up().left(180).forward(3).left(90)
  t.arc(-20, 20).left(90).down()
  t.forward((getChord(tvWidth, tvScreenDeg) + tvCornerRad * 2) / 3)

  t.up()
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) * (2 / 3) / 3).right(90)
  t.down()
  t.arc(-80, 10).left(170)
  t.arc(-180, 10).arc(-90, 5).left(180).arc(90, 10)
  t.arc(-170, 5).left(170).arc(-180, 5)
  t.arc(-80, 7).left(180).arc(60, 12)
  t.left(17).arc(-180, 5).left(180).arc(-180, 5)
  t.arc(-90, 10).left(180).arc(70, 20)
  t.up()
  t.left(23).forward(25)
  t.left(90).forward(15)
  t.down()
  t.right(30).forward(15).left(30).forward(30).left(60).forward(8.65)
  t.left(120).forward(47.3).up()
  t.left(180).forward(20).down()
  t.left(90).forward(20).left(170).arc(20, 50)
  t.up()
  t.left(180).arc(-20, 50).right(170).forward(20).left(90)
  t.forward(10)
  // SECOND MAST
  if (bt.randInRange(0, 1) >= 0.5) {
  t.left(90).down()
  t.forward(15).left(170).arc(20, 35).up()
  t.left(180).arc(-20, 35).right(170).forward(15)
  t.left(90)
  }
  t.forward(5).down().left(60).forward(5)
  t.right(60).forward(9.8).right(90).forward(4.33)

  t.up()
  t.left(90).forward(24.8).left(90)
  t.forward(getChord(tvHeight, tvScreenDeg) * (2 / 3) / 3 + 25 + tvCornerRad + getChord(tvHeight, tvScreenDeg) / 3)
  t.left(90).forward(getChord(tvWidth, tvScreenDeg) + tvCornerRad).right(90)
  t.forward(tvBezel).right(90)
} else if (randScene <= 2) {


  // SCENE 1
  t.left(90).forward(getChord(tvWidth, tvScreenDeg) / 2 - 40 > 0 ? getChord(tvWidth, tvScreenDeg) / 2 - 40 : 0)
  t.down()
  t.left(70)
    .forward(getChord(tvHeight, tvScreenDeg) * (3 / 4))
  t.right(70).forward(2).right(70)
    .forward(getChord(tvHeight, tvScreenDeg) * (3 / 4))

  // a = c * sin(angle a)
  t.right(110).up().forward(getChord(tvHeight, tvScreenDeg) * (3 / 4) * Math.sin(toRadians(20)) + 1).right(90).down()

  t.forward(10).up().forward(3).down()
  t.forward(8).up().forward(3).down()

  if (bt.randInRange(0, 10) > 5) {
    const offsetY = bt.randInRange(0, 11)
    t.forward(offsetY).right(90).up().forward(3).down().forward(7).right(80).forward(15)
    t.right(100).forward(10).right(90).forward(15).left(90).up()
    t.forward(3).left(90).forward(offsetY).right(180).down()
  }

  t.forward(6).up().forward(3).down()
  t.forward(4).up().forward(3).down()
  t.forward(3).up().forward(3).down()
  t.forward(2).up().forward(3).down()
  t.forward(1).up()
  t.left(180).forward(52).left(90)
  // a = c * sin(angle a)
  t.forward(getChord(tvHeight, tvScreenDeg) * (3 / 4) * Math.sin(toRadians(20)) + 1).down().forward(bt.randInRange(10, 15))


  t.left(130).forward(10)
  t.right(100).forward(20)
  t.left(80).forward(15)
  t.left(60).forward(10)
  t.right(100).forward(10)
  t.right(40).forward(5)
  t.left(120).forward(15)
  t.right(50).forward(10)
  t.right(100).forward(getChord(tvWidth, tvScreenDeg) / 2 - 2)

  t.right(180).forward(getChord(tvWidth, tvScreenDeg) / 4 + 3)
  t.left(100).forward(10)
  t.left(50).forward(15)
  t.right(120).forward(5)
  t.left(40).forward(10)
  t.left(100).forward(10)
  t.right(60).forward(15)
  t.right(80).forward(20)
  t.left(100).forward(10)
  t.right(130).forward(getChord(tvWidth, tvScreenDeg) / 4 + 5)

  t.up()
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) * (3 / 4) * Math.sin(toRadians(70))).down()
  t.left(90).forward(((getChord(tvWidth, tvScreenDeg) / 2 - 40 > 0 ? getChord(tvWidth, tvScreenDeg) / 2 - 40 : 0) + 15 + 2 * getChord(tvHeight, tvScreenDeg) * (3 / 4) * Math.sin(toRadians(20)) - 3))
  t.up()
  t.left(180).forward(getChord(tvWidth, tvScreenDeg) / bt.randInRange(6, 12)).down()
  t.left(90).arc(-180, getChord(tvHeight, tvScreenDeg) / 4)
  t.left(180).up()

  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).down().forward(2).up().left(180).forward(2).right(90)
  t.arc(20, getChord(tvHeight, tvScreenDeg) / 4).right(90).forward(getChord(tvWidth, tvScreenDeg) / 8 - 5)
  t.right(90)
    .forward(getChord(tvHeight, tvScreenDeg) - (getChord(tvHeight, tvScreenDeg) * (3 / 4) * Math.sin(toRadians(70))) + 2 * tvCornerRad)
  t.forward(tvBezel).right(90)

  // -------------------
} else if (randScene <= 3) {
  // SCENE 3
  // BUILDING 1
  t.left(180).down()
  t.forward(getChord(tvHeight, tvScreenDeg)).right(90).forward(getChord(tvWidth, tvScreenDeg) / 6)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg))
  t.up()
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 6 - 2)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down().forward(4).right(90).forward(4)
  t.right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).up()
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 6 / 2).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(4).right(90).forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).up()
  t.left(90).forward(getChord(tvWidth, tvScreenDeg) / 6 - 2 - getChord(tvWidth, tvScreenDeg) / 12 - 4)
  t.down()
  // BUILDING 2
  t.left(90).forward(getChord(tvHeight, tvScreenDeg) - 5).right(90).down()
  t.forward(getChord(tvWidth, tvScreenDeg) / 12).right(90).forward(getChord(tvHeight, tvScreenDeg) - 15).up()
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 1)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) / 5).left(90).down().forward(1).left(180)
  t.forward(4.5).right(90).forward(10)
  t.right(90).forward(4.5)
  t.right(90).up().forward(10).right(90).forward(1).left(90).forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(3.5).right(90).forward(3.5).right(90).forward(3.5)
  t.right(90).forward(3.5).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(3.5).right(90).forward(3.5).right(90).forward(3.5)
  t.right(90).forward(3.5).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(3.5).right(90).forward(3.5).right(90).forward(3.5)
  t.right(90).forward(3.5).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(3.5).right(90).forward(3.5).right(90).forward(3.5)
  t.right(90).forward(3.5).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(3.5).right(90).forward(3.5).right(90).forward(3.5)
  t.right(90).forward(3.5).up().right(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 1)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) / 5 + getChord(tvHeight, tvScreenDeg) / 10 * 5)
  t.left(90).forward(getChord(tvWidth, tvScreenDeg) / 12).left(90).forward(10)

  // BUILDING 3
  t.down()
  t.forward(30).left(90).forward(getChord(tvWidth, tvScreenDeg) / 12).up()
  t.left(90).forward(3).left(90).down()
  t.forward(getChord(tvWidth, tvScreenDeg) / 12 - 2).right(135).forward(3).left(90).forward(3)
  t.right(135).forward(getChord(tvWidth, tvScreenDeg) / 12 - 2).up()
  t.left(90).forward(4).left(90).down().forward(getChord(tvWidth, tvScreenDeg) / 12 - 2).right(90)
  t.forward(getChord(tvHeight, tvScreenDeg) / 10 - 1).right(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 2)
  t.up().left(90).forward(2).left(90).down().forward(getChord(tvWidth, tvScreenDeg) / 12 - 2).right(90)
  t.forward(getChord(tvHeight, tvScreenDeg) / 10 - 1).right(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 2)
  t.right(90).up().forward((getChord(tvHeight, tvScreenDeg) / 10 - 1) * 2 + 6 + 2 * Math.sqrt(4.5) + 3)
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 12)

  t.forward(getChord(tvWidth, tvScreenDeg) / 3).right(90).forward(30).left(180)
  t.down()

  // BUILDING 4
  t.forward(getChord(tvHeight, tvScreenDeg) - 30).right(90).forward(getChord(tvWidth, tvScreenDeg) / 6 - 1)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) - 55).up()
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 1).left(90).forward(25)
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 2)
  t.right(90)
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down().forward(3).right(90).forward(3)
  t.right(90).forward(3)
  t.right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).down()
  t.forward(3).right(90).forward(3).right(90).forward(3)
  t.right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).down()
  t.forward(3).right(90).forward(3).right(90).forward(3)
  t.right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).down()
  t.forward(3).right(90).forward(3).right(90).forward(3)
  t.right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).down()
  t.forward(3).right(90).forward(3).right(90).forward(3)
  t.right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).down()
  t.forward(3).right(90).forward(3).right(90).forward(3)
  t.right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).down()
  t.forward(3).right(90).forward(3).right(90).forward(3)
  t.right(90).forward(3).up().right(90).forward((getChord(tvWidth, tvScreenDeg) / 6) / 2)
  t.down().forward(3).right(90).forward(3).right(90).forward(3).right(90).forward(3).up()
  t.right(90).forward(3).right(90).forward(3).forward(getChord(tvHeight, tvScreenDeg) / 13)
  t.right(90).down().forward(3).right(90).forward(3)
  t.right(90).forward(3).right(90).forward(3).up().forward(getChord(tvHeight, tvScreenDeg) / 13)
  t.right(90).down().forward(3).right(90).forward(3)
  t.right(90).forward(3).right(90).forward(3)
  t.up()
  t.right(90).forward(3 + getChord(tvWidth, tvScreenDeg) / 12 - (getChord(tvWidth, tvScreenDeg) / 12 - 2))
  t.left(90).forward(getChord(tvHeight, tvScreenDeg) / 13 * 4 + getChord(tvHeight, tvScreenDeg) / 10 - 3)
  t.forward(10).left(180).down()

  // BUILDING 5
  t.forward(35).right(90).forward(getChord(tvWidth, tvScreenDeg) / 12).up()
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) / 13).right(90).forward(2)
  t.down().forward(4).left(90).forward(4).left(90).forward(4).left(90).forward(4).up()
  t.right(90).forward(2).right(90).forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(getChord(tvWidth, tvScreenDeg) / 12 - 1).left(135).forward(4).right(90).forward(4)
  t.left(135).forward(getChord(tvWidth, tvScreenDeg) / 12 - 1).up().right(90)
  t.forward(getChord(tvHeight, tvScreenDeg) / 15)
  t.right(90).down().forward(getChord(tvWidth, tvScreenDeg) / 12 - 1).left(90)
  t.forward(getChord(tvHeight, tvScreenDeg) / 10)
  t.left(90).forward(getChord(tvWidth, tvScreenDeg) / 12 - 1).right(90) //.up()
  t.forward(35 - getChord(tvHeight, tvScreenDeg) / 13 - getChord(tvHeight, tvScreenDeg) / 10 * 2 - getChord(tvHeight, tvScreenDeg) / 15 - Math.sqrt(8) * 2)
  t.forward(10)

  // BUILDING 6
  t.left(180)
  t.forward(getChord(tvHeight, tvScreenDeg)).right(90).forward(getChord(tvWidth, tvScreenDeg) / 6)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg))
  t.up()
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 6 - 2)
  t.right(90).forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down().forward(4).right(90).forward(4)
  t.right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4)
  t.right(90).forward(4).up().forward(getChord(tvHeight, tvScreenDeg) / 10).right(90).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).up()
  t.right(90).forward(getChord(tvWidth, tvScreenDeg) / 6 / 2).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(4).right(90).forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).down()
  t.forward(4).right(90).forward(4).right(90).forward(4).right(90).forward(4).right(90).up()
  t.forward(getChord(tvHeight, tvScreenDeg) / 10).up()

  // STREET
  t.left(90).forward(getChord(tvWidth, tvScreenDeg) / 6 - 2 - getChord(tvWidth, tvScreenDeg) / 12 - 4)
  t.left(180).forward(getChord(tvWidth, tvScreenDeg) / 3 - 10).right(60).down()
  t.forward(getChord(tvWidth, tvScreenDeg) / 6 + 20).left(180).up()
  t.forward(getChord(tvWidth, tvScreenDeg) / 6 + 20).right(120)
  t.forward((20 + getChord(tvWidth, tvScreenDeg) / 3) / 2).right(90).down()
  t.forward(getChord(tvHeight, tvScreenDeg) / 15).up().forward(4)
  // CAR
  if (bt.randInRange(0, 1) > 0.5) {
    t.right(90).forward(6.4).down().forward(8.6).left(110).forward(11).left(70).forward(5).left(90).forward(10.3).right(90).up().forward(6.1).right(90)
  }

  t.down().forward(getChord(tvHeight, tvScreenDeg) / 15).up().forward(3).down()
  t.forward(getChord(tvHeight, tvScreenDeg) / 20).up().forward(2).down()
  t.forward(getChord(tvHeight, tvScreenDeg) / 30).up().forward(1.5).down()
  t.forward(getChord(tvHeight, tvScreenDeg) / 40).up().left(180)
  t.forward(getChord(tvHeight, tvScreenDeg) / 15 + getChord(tvHeight, tvScreenDeg) / 15 + getChord(tvHeight, tvScreenDeg) / 20 + getChord(tvHeight, tvScreenDeg) / 40 + getChord(tvHeight, tvScreenDeg) / 30 + 10.5).right(90)
  t.forward((20 + getChord(tvWidth, tvScreenDeg) / 3) / 2).down()
  t.right(120).forward(getChord(tvWidth, tvScreenDeg) / 6 + 20).up()
  t.left(120).forward(getChord(tvWidth, tvScreenDeg) / 12).left(180).down()
  t.forward(getChord(tvWidth, tvScreenDeg) / 3).up()
  const sunY = bt.randInRange(5, 20)
  t.left(180).forward(getChord(tvWidth, tvScreenDeg) / 6).right(90).forward(sunY)

  // SUN
  if (bt.randInRange(0, 1) >= 0.4) {
    t.forward(2).left(90).down().arc(-360, 13).left(180).up()
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up().left(180).forward(2).right(90)
    t.arc(20, 13).down().right(90).forward(2).up()
  } else {
    t.left(180)
  }
  t.forward(sunY).right(30).forward(getChord(tvWidth, tvScreenDeg) / 6 + 20).right(60)
  t.forward(getChord(tvWidth, tvScreenDeg) * (5 / 12) - 10).right(90)
  t.forward(getChord(tvHeight, tvScreenDeg) + tvCornerRad * 2 + tvBezel).right(90)






} else {
  t.left(180).forward(tvBezel).right(90)
}

t.down()
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
