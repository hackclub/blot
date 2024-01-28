let t = createTurtle()
// shift from the bottom left to the center of the paper
let plotShift = 62.5
// radius of the donut  
let radius = randInRange(10, 30)
let scale = 1.6
let rotate = randIntInRange(0, 18)
rotate = 0; // no rotation for now
function rectangle(size) {
  let t = createTurtle()
  t.forward(size)
  t.rotate(90)
  t.forward(size / 8)
  t.rotate(90)
  t.forward(size)
  t.rotate(90)
  t.forward(size / 8)
  return (t)
}

function sprinkles(topFrosting, topIC, leftIC, rightIC) {
  let sprinkles = createTurtle()
  for (let i = 0; i < radius * 3; i++) {
    let sprinkleLength = radius / 7
    let sprinkle = rectangle(sprinkleLength)
    let rotation = randInRange(0, 360)
    sprinkle.rotate(rotation)
    // make sure sprinkles are on the donut
    // avoid frosting range for y-axis
    let y = randInRange(topFrosting, plotShift + radius - sprinkleLength)
    // now limit the location of the x-axis to within the ellipse
    let xBoundry = Math.sqrt((radius ** 2 - ((y - plotShift) ** 2))) * 1.6
    let x = randInRange(plotShift - xBoundry + sprinkleLength, plotShift + xBoundry - sprinkleLength)
    sprinkle.translate([x, y])
    // no sprinkles within the inner circle
    if (y < (topIC) && (leftIC < x < rightIC)) {
    } else {
      sprinkles.join(sprinkle)
    }
  }
  return sprinkles
}

function frosting() {
  let allofthem = createTurtle()
  // number of frosting curves
  let waves = randIntInRange(3, 7)
  // odd number of frosting for better looking
  if (waves % 2 == 0) {
    waves = waves + 1
  }

  for (let i = 0; i < waves; i++) {
    let wave = createTurtle()
    wave.arc(-180, radius / 4)
    let scale = 1.11 * (5 / waves)
    wave.translate([plotShift, plotShift])
    wave.rotate(90, [plotShift, plotShift])
    wave.scale([scale, 1])
    wave.translate([(radius / 4) * scale - (radius / 4), 0])
    wave.translate([(-1.4 * radius), -1 * (radius / 2)])
    for (let j = 0; j < i; j++) {
      if (j % 2 == 0) {
        wave.rotate(180, [wave.rb[0], wave.rb[1]])
      } else {
        wave.rotate(180, [wave.rt[0], wave.rt[1]])
      }
    }
    allofthem.join(wave)
  }
  return allofthem
}


// donut outer ring
t.arc(-360, radius)
t.translate([plotShift, plotShift + radius])
t.scale([scale, 1])
// donut inner ring
let t1 = createTurtle() //bottom arc
t1.arc(-178, radius / 3)
t1.rotate(270, [0, -radius / 3.5])
t1.scale([1.4, 0.5])
t1.translate([plotShift, plotShift + (radius / 3)])

let t2 = createTurtle() //top arc
t2.arc(-178, radius / 3)
t2.rotate(90, [0, -radius / 3.5])
t2.scale([0.9, 0.3])
t2.translate([t.cc[0] - radius / 10, plotShift])

t1.scale([1 / ((rotate / 18) + 1), 1])
t2.scale([(rotate / 18000) + 1, ((rotate / 18)) + 1])

// add frosting and sprinkles
let wave = frosting()
let sprinklees = sprinkles(wave.ct[1], t1.ct[1], t1.lc[0], t1.rc[0])

drawTurtles([t, t1, t2, sprinklees, wave])
