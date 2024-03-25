/*
@title: Donut
@author: Bright Li
@snapshot: snapshot1.png
*/

const {Turtle,join,bounds,rotate,scale, translate, randInRange, randIntInRange} = toolkit

let t = new Turtle()
// shift from the bottom left to the center of the paper
let plotShift = 62.5
// radius of the donut  
let radius = randInRange(10, 30)
let scaler = 1.6
let rotater = randIntInRange(0, 18)
rotater = 0; // no rotation for now
function rectangle(size) {
  let t = new Turtle()
  let tpoly = []
  t.forward(size/2)
  
  t.right(90)
  t.forward(size / 16)
  t.right(90)
  t.forward(size/2)
  t.right(90)
  t.forward(size / 16)
  return (t)
}

function sprinkles(topFrosting, topIC, leftIC, rightIC) {
   let sprinkles = []
  for (let i = 0; i < radius * 3; i++) {
    let sprinkleLength = radius / 7
    let sprinklepoly = []
    let sprinkle = rectangle(sprinkleLength)
    let rotation = randInRange(0, 360)
    //sprinkle.rotate(rotation) //UNCOMMENT LATER
    // make sure sprinkles are on the donut
    // avoid frosting range for y-axis
    let y = randInRange(topFrosting, plotShift + radius - sprinkleLength)
    // now limit the location of the x-axis to within the ellipse
    let xBoundry = Math.sqrt((radius ** 2 - ((y - plotShift) ** 2))) * 1.6
    let x = randInRange(plotShift - xBoundry + sprinkleLength, plotShift + xBoundry - sprinkleLength)
    sprinklepoly.push(...sprinkle.polylines())
    translate(sprinklepoly,[x, y])
    // no sprinkles within the inner circle
    if (y < (topIC) && (leftIC < x < rightIC)) {
    } else {
      join(sprinkles, sprinklepoly)
    }
  }
  return sprinkles
}

function frosting() {
  let allofthem = new Turtle()
  let allofthempoly = []
  // number of frosting curves
  let waves = randIntInRange(3, 7)
  // odd number of frosting for better looking
  if (waves % 2 == 0) {
    waves = waves + 1
  }

  for (let i = 0; i < waves; i++) {
    let wave = new Turtle()
    let wavepoly = []
    wave.arc(-180, radius / 4)
    wavepoly.push(...wave.polylines())
    let scaler = 1.11 * (5 / waves)
    translate(wavepoly,[plotShift, plotShift])
    rotate(wavepoly,90, [plotShift, plotShift])
    scale(wavepoly,[scaler, 1])
    translate(wavepoly,[(radius / 4) * scaler - (radius / 4), 0])
    translate(wavepoly,[(-1.4 * radius), -1 * (radius / 2)])
    for (let j = 0; j < i; j++) {
      if (j % 2 == 0) {
        rotate(wavepoly,180, [bounds(wavepoly).rb[0], bounds(wavepoly).rb[1]])
      } else {
        rotate(wavepoly,180, [bounds(wavepoly).rt[0], bounds(wavepoly).rt[1]])
      }
    }
    join(allofthempoly, wavepoly)
  }
  return allofthempoly
}

let tpoly = []

// donut outer ring
t.arc(-360, radius)
tpoly.push(...t.polylines());
translate(tpoly, [plotShift, plotShift + radius])
scale(tpoly,[scaler, 1])
// donut inner ring
let t1poly = []
let t1 = new Turtle() //bottom arc
t1.arc(-178, radius / 3)
t1poly.push(...t1.polylines());
rotate(t1poly, 270, [0, -radius / 3.5])
scale(t1poly, [1.4, 0.5])
translate(t1poly, [plotShift, plotShift + (radius / 3)])
let t2poly = []
let t2 = new Turtle() //top arc
t2.arc(-178, radius / 3)
t2poly.push(...t2.polylines());
rotate(t2poly,90, [0, -radius / 3.5])
scale(t2poly,[0.9, 0.3])
translate(t2poly,[(bounds(t1poly).cc[0] - radius / 10)+1.0, plotShift])

// scale(t1poly,[1 / ((rotate / 18) + 1), 1])
// scale(t2poly,[(rotate / 18000) + 1, ((rotate / 18)) + 1])

// add frosting and sprinkles
let wave = frosting()
let wavepoly = []

let sprinklees = sprinkles(bounds(wave).ct[1], bounds(t1poly).ct[1], bounds(t1poly).lc[0], bounds(t1poly).rc[0])

drawLines(t1poly)
drawLines(t2poly)
drawLines(tpoly)
drawLines(wave)
drawLines(sprinklees)
