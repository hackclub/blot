/*
@title: Tuxedo Cupcake
@author: Olive
@snapshot: gallery.png
*/

// Dev Mode toggle (enables/disables console)
const devMode = false

let line = 0
function print(text) {
  if (!devMode) return
  if (typeof text !== "string") text = text.toString()
  drawLines(bt.text(text.toString(),[0,-5- (line * 5)],1))
  line++
}

print("Console:")


// These are the things that customize the cupcake!

// Because I want to allow you to see your seed, I need to randomly generate a seed to be the seed... kinda weird but it works
const seed = bt.randIntInRange(100000, 999999)
print("Seed: " + seed)

// Set to a specific if you want a seeded cupcake, otherwise just 'seed'
bt.setRandSeed(seed)

// Sets whether the cupcake is in black & white (what the blot will actually draw) vs. color (what looks better)
const color = false;

// Toppings
const toppingDensity = bt.randInRange(3,4)
const sprinkColors = ["#f75c5c", "#f7975c", "#f7e55c", "#97f75c", "#5c9cf7", "#5c5cf7", "#9a5cf7", "#dc6ef0"]

// Cake colors -> Vanilla, Chocolate, Cinnamon, Lemon
const cakeColors = ["#F8ECD4", "#512D1E", "#E3BB8B", "#FFDFA1"]

// Frosting colors -> Vanilla, Chocolate, Strawberry, Passion Fruit, Caramel, Raspberry, Cherry, Pistachio, Peanut Butter, Black Sesame, Red Bean
const frostingColors = [["#F0ECE3", "#EEE9DF"], ["#7E5E50", "#6F5144"], ["#ECBDC2", "#E9B7BD"], ["#FEE9C0", "#F8DEAC"], ["#E9C9A4", "#D8BC9B"], ["#DF779C", "#D36A8F"], ["#E0A5DE", "#CC96CA"], ["#D5F5BB", "#C9ECAD"], ["#F5DCBE", "#EED3B3"], ["#5A5550", "#393632"], ["#DBBBB1", "#C1A096"]]

const width = 100;
const height = 100;

setDocDimensions(width, height);

let boxHitbox = [[[12.5, 15], [10, 10], [10, 0], [90, 0], [90, 40], [85, 40], [72.5, 15], [12.5, 15]]]
let box = [[[10, 10], [75, 10], [90, 40], [25, 40], [10,10]], [[17.5, 15], [72.5, 15], [82.5, 35], [27.5, 35], [17.5, 15]], [[10, 10], [75, 10], [90, 40], [90, 30], [75, 0], [10, 0], [10, 10]], [[75, 10], [75, 0]]]
let boxStart = bt.bounds(box).cc
bt.originate(box)
bt.translate(box, [width / 2, height / 2])
let boxFinal = bt.bounds(box).cc
bt.translate(boxHitbox, [boxFinal[0] - boxStart[0], boxFinal[1] - boxStart[1]])

let overlapBounds = bt.copy(boxHitbox)

bt.join(overlapBounds, drawCupcake(-22, 0, 17, color, overlapBounds))
bt.join(overlapBounds, drawCupcake(-4, 0, 17, color, overlapBounds))
bt.join(overlapBounds, drawCupcake(14, 0, 17, color, overlapBounds))
bt.join(overlapBounds, drawCupcake(-14, 8, 17, color, overlapBounds))
bt.join(overlapBounds, drawCupcake(4, 8, 17, color, overlapBounds))
bt.join(overlapBounds, drawCupcake(22, 8, 17, color, overlapBounds))

bt.cover(overlapBounds, boxHitbox)
// idk why these two lines are necessary, but if you 
// remove them a line disappears, so I'll just leave this here
bt.translate(overlapBounds, [0, -150])
bt.translate(overlapBounds, [0, 150])
bt.cover(box, overlapBounds)
drawLines(box)

// Draw a cupcake on the screen @ cx,cy (centered at center of screen)
// Cupcake can be scaled with cwidth (height is scaled based off width)
// ccolor is a boolean for whether the cupcake should be drawn with color
function drawCupcake(cx, cy, cwidth, ccolor, overlap) {
  const startBaseLine = bt.randIntInRange(30, 70)

  const base = [
    [25, 40],
    [75, 40],
    [70, 10],
    [30, 10],
    [25, 40]
  ];
  
  
  const cakeTurte = new bt.Turtle() // Cake Turte
  
  cakeTurte.jump([75, 40])
  cakeTurte.setAngle(0)
  cakeTurte.arc(180, 2)
  cakeTurte.goTo([25, 44])
  cakeTurte.setAngle(180)
  cakeTurte.arc(180, 2)

  const cakeColor = cakeColors[bt.randIntInRange(0, cakeColors.length - 1)]
  

  // base bottom - 30 -> 70, 40pts
  // base top    - 25 -> 75, 50pts
  
  const baseLines = []
  
  for (let i = startBaseLine; i > 31; i -= 3 * Math.sin(Math.PI * (i-30) / 40) + 1) {
    baseLines.push(baseLine(i))
  }
  for (let i = startBaseLine + 3 * Math.sin(Math.PI * (startBaseLine-30) / 40) + 1; i < 69; i += 3 * Math.sin(Math.PI * (i-30) / 40) + 1) {
    baseLines.push(baseLine(i))
  }


  let turty = new bt.Turtle() // Frosting Turty

  turty.jump([70, 44])
  turty.setAngle(0)
  turty.arc(175, 4)
  for (let i = 0; i < 2; i++) {
    turty.forward(7.5)
    turty.setAngle(20)
    turty.forward(2)
    turty.arc(155, 4)
  }
  turty.forward(3.5)
  turty.arc(-120, 1)
  turty.forward(5)
  turty.setAngle(190)
  turty.forward(3)
  turty.arc(60, 8)
  turty.goTo([50 - 7.125, 70.15])
  turty.setAngle(185)
  for (let i = 0; i < 2; i++) {
    turty.arc(155, 4)
    turty.forward(2)
    turty.setAngle(185)
    turty.forward(7.5)
  }
  turty.arc(175, 4)
  
  const frostingPath = turty.path
  const frostingOutlinePath =  bt.offset(bt.copy(frostingPath), 1)
  
  const frosting = frostingColors[bt.randIntInRange(0, frostingColors.length - 1)]

  let toppingPaths = []

  // Random topping: 0=sprinkles, 1=choc chips, 3=cashews
  const pickedTopping = bt.randIntInRange(0, 2)
  const numOfToppings = bt.randIntInRange(20 * toppingDensity, 30 * toppingDensity)
  for (let i = 0; i < numOfToppings; i++) {
    let topping = getTopping(pickedTopping, bt.randIntInRange(24, 74), bt.randIntInRange(43, 78), frostingPath, toppingPaths)
    if (topping) bt.join(toppingPaths, topping)
  }

  // Draw all the lines
  if (ccolor) {
    let coloredPaths = []
    coloredPaths.push({path: [base], options: {fill: "#000000"}})
    coloredPaths.push({path: baseLines, options: {fill: "#1F1F1F"}})
    coloredPaths.push({path: frostingOutlinePath, options: {fill: frosting[1]}})
    coloredPaths.push({path: frostingPath, options: {fill: frosting[0]}})
    coloredPaths.push({path: cakeTurte.path, options: {fill: cakeColor}})

    let toppingOutlines = []
    switch (pickedTopping) {
      case 0:
        toppingPaths.forEach((path) => {
          let sColor = sprinkColors[bt.randIntInRange(0, sprinkColors.length - 1)]
          coloredPaths.push({path: [path], options: {fill: sColor}})
        })
        break;
      case 1:
        toppingOutlines = bt.offset(bt.copy(toppingPaths), .2)
        coloredPaths.push({path: toppingOutlines, options: {fill: "#463118"}})
        coloredPaths.push({path: toppingPaths, options: {fill: "#604320"}})
        break;
      case 2:
        toppingOutlines = bt.offset(bt.copy(toppingPaths), .2)
        coloredPaths.push({path: toppingOutlines, options: {fill: "#d4a973"}})
        coloredPaths.push({path: toppingPaths, options: {fill: "#efc591"}})
        break;
    }

    let wholeCupcake = []
    coloredPaths.forEach((path) => {
      bt.union(wholeCupcake, path.path)
    })

    let baseHeight = bt.bounds(wholeCupcake).height
    let baseCenter = bt.bounds(wholeCupcake).cc
    let baseWidth = bt.bounds(cakeTurte.path).width
    let cscale = cwidth / baseWidth
    coloredPaths.forEach((path) => {
      let pathCenter = bt.bounds(path.path).cc
      bt.originate(path.path)
      bt.translate(path.path, [width/2 + cx, height/2 + cy])
      bt.scale(path.path, cscale)
      bt.translate(path.path, [(pathCenter[0] - baseCenter[0]) * cscale, (pathCenter[1] - baseCenter[1]) * cscale])
      print(Object.entries(path.options))
      wholeCupcake = []
      coloredPaths.forEach((path) => {
        bt.union(wholeCupcake, path.path)
      })
      bt.difference(path.path, overlap)
      drawLines(path.path, {fill: path.options.fill, width: .000001})
    })
    return wholeCupcake
  }
  else {
    let basicPaths = []
    basicPaths.push(base)
    bt.join(basicPaths, cakeTurte.path)
    bt.join(basicPaths, baseLines)
    bt.join(basicPaths, frostingPath)
    bt.join(basicPaths, toppingPaths)
    bt.originate(basicPaths)
    bt.translate(basicPaths, [width/2 + cx, height/2 + cy])
    let baseWidth = bt.bounds(cakeTurte.path).width
    bt.scale(basicPaths, cwidth / baseWidth)
    let wholeCupcake = []
    basicPaths.forEach((path) => {
      bt.union(wholeCupcake, [path])
    })
    bt.cover(basicPaths, overlap)
    drawLines(basicPaths)
    return wholeCupcake
  }
}





// Return a line for the base of a cupcake
function baseLine(startPos) {
  let line = [[[startPos, 10.5], [(startPos - 50) * (5/4) + 50, 39.5]]]
  bt.offset(line, .3)
  return line[0]
}

// Get the lines describing a sprinkle that's randomly rotated
function getSprinkle(x, y) {
  const sprinkTurt = new bt.Turtle()
  sprinkTurt.jump([x, y])
  sprinkTurt.forward(1.5)
  sprinkTurt.arc(180, 0.15)
  sprinkTurt.forward(1.5)
  sprinkTurt.arc(180, .15)
  const sprinkPath = sprinkTurt.path
  bt.rotate(sprinkPath, bt.randIntInRange(0, 360))
  bt.offset(sprinkPath, .1)
  return sprinkPath
}

// Get the lines describing a chocolate chip that's randomly rotated
function getChocChip(x, y) {
  const chipTurt = new bt.Turtle()
  chipTurt.jump([x, y])
  chipTurt.forward(2)
  chipTurt.arc(144, .5)
  chipTurt.forward(1)
  chipTurt.arc(-180, .2)
  chipTurt.left(163)
  chipTurt.arc(127, .5)
  chipTurt.arc(-66, 0.2)
  chipTurt.arc(27, 0.2)
  chipTurt.forward(1)
  chipTurt.arc(144, .5)
  const chipPath = chipTurt.path
  bt.rotate(chipPath, bt.randIntInRange(-90, 90))
  return chipPath
}

// Get the lines describing a cashew that's randomly rotated
function getCashew(x, y) {
  const cashTurt = new bt.Turtle()
  cashTurt.jump([x, y])
  cashTurt.arc(178, 1.2)
  cashTurt.arc(165, .4)
  cashTurt.arc(-43, 0.5)
  cashTurt.arc(-38, 0.88)
  cashTurt.arc(-78, 0.4)
  cashTurt.arc(185, 0.24)
  const cashewPath = cashTurt.path
  bt.scale(cashewPath, 2.5)
  bt.rotate(cashewPath, bt.randIntInRange(0, 360))
  return cashewPath
}

// Get the lines for a topping of a specific type that's been checked
// to make sure nothing clips another topping or goes outside of the frosting
function getTopping(type, x, y, frostingPath, toppingPaths) {  
  let topping = []
  switch (type) {
    case 0:
      topping = getSprinkle(x, y)
      break;
    case 1:
      topping = getChocChip(x, y)
      break;
    case 2:
      topping = getCashew(x, y)
      break;
  }
  
  let clipping = bt.difference(bt.copy(topping), frostingPath)
  let intersection = bt.intersection(bt.copy(topping), toppingPaths)
  if (clipping.length == 0 && intersection.length == 0) return topping
  return
}
