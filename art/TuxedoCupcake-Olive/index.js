/*
@title: Tuxedo Cupcake
@author: Olive
@snapshot: gallery.png
*/

// These are the things that customize the cupcake!

// Because I want to allow you to see your seed, I need to randomly generate a seed to be the seed... kinda weird but it works
const seed = bt.randIntInRange(0, 999999999)

// Set to a specific if you want a seeded cupcake, otherwise just 'seed'
bt.setRandSeed(seed)

// Sets whether the cupcake is in black & white (what the blot will actually draw) vs. color (what looks better)
const color = true;

// Can be a set number between 30 and 70, or just a random int between those two values
const startBaseLine = bt.randIntInRange(30, 70)

// Toppings
const toppings = [bt.randIntInRange(10,20), bt.randIntInRange(7,14), bt.randIntInRange(5, 10)]
const sprinkColors = ["#f75c5c", "#f7975c", "#f7e55c", "#97f75c", "#5c9cf7", "#5c5cf7", "#9a5cf7", "#dc6ef0"]

// Cake colors -> Vanilla, Chocolate, Cinnamon, Lemon
const cakeColors = ["#F8ECD4", "#512D1E", "#E3BB8B", "#FFDFA1"]

// Frosting colors -> Vanilla, Chocolate, Strawberry, Passion Fruit, Caramel, Raspberry, Cherry, Pistachio, Peanut Butter, Black Sesame, Red Bean
const frostingColors = [["#F0ECE3", "#EEE9DF"], ["#7E5E50", "#6F5144"], ["#ECBDC2", "#E9B7BD"], ["#FEE9C0", "#F8DEAC"], ["#E9C9A4", "#D8BC9B"], ["#DF779C", "#D36A8F"], ["#E0A5DE", "#CC96CA"], ["#D5F5BB", "#C9ECAD"], ["#F5DCBE", "#EED3B3"], ["#5A5550", "#393632"], ["#DBBBB1", "#C1A096"]]

const width = 100;
const height = 100;

setDocDimensions(width, height);

const base = [
  [25, 40],
  [75, 40],
  [70, 10],
  [30, 10],
  [25, 40]
];
if (color) drawLines([base], {fill: "#000000"})
else drawLines([base])


const turte = new bt.Turtle() // Cake Turte

turte.jump([75, 40])
turte.setAngle(0)
turte.arc(180, 2)
turte.goTo([25, 44])
turte.setAngle(180)
turte.arc(180, 2)

const cakeColor = cakeColors[bt.randIntInRange(0, cakeColors.length - 1)]
if (color) drawLines(turte.path, {fill: cakeColor, stroke: cakeColor})
else drawLines(turte.path)


// base bottom - 30 -> 70, 40pts
// base top    - 25 -> 75, 50pts

function baseLine(startPos) {
  return [[startPos, 10.5], [(startPos - 50) * (5/4) + 50, 39.5]]
}

const baseLines = []

for (let i = startBaseLine; i > 31; i -= 3 * Math.sin(Math.PI * (i-30) / 40) + 1) {
  baseLines.push(baseLine(i))
}
for (let i = startBaseLine + 3 * Math.sin(Math.PI * (startBaseLine-30) / 40) + 1; i < 69; i += 3 * Math.sin(Math.PI * (i-30) / 40) + 1) {
  baseLines.push(baseLine(i))
}

if (color) drawLines(baseLines, {stroke: "#1F1F1F", width: 5})
else drawLines(baseLines)

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

const frosting = frostingColors[bt.randIntInRange(0, frostingColors.length - 1)]
if (color) drawLines(turty.path, {fill: frosting[0], stroke: frosting[1], width:16})
else drawLines(turty.path)


// Sprinkle Bounds:
// Zone 1: x -> 30-70, y -> 46-52
// Zone 2: x -> 36-64, y -> 53-61
// Zone 3: x -> 44-56, y -> 62-70

function drawSprinkle(x, y, sColor) {
  const sprinkTurt = new bt.Turtle()
  sprinkTurt.jump([x, y])
  sprinkTurt.forward(1.5)
  sprinkTurt.arc(180, 0.15)
  sprinkTurt.forward(1.5)
  sprinkTurt.arc(180, .15)
  const sprinkPath = sprinkTurt.path
  bt.rotate(sprinkPath, bt.randIntInRange(0, 360))
  if (color) drawLines(sprinkPath, {fill: sColor, stroke: sColor});
  else drawLines(sprinkPath)
}

function drawChocChip(x, y) {
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
  if (color) drawLines(chipPath, {fill: "#604320", stroke: "#604320"})
  else drawLines(chipPath)
}

function drawCashew(x, y) {
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
  if (color) drawLines(cashewPath, {fill: "#efc591", stroke: "#d4a973"})
  else drawLines(cashewPath)
}

function drawTopping(type, x, y, color) {
  const arr = []
  let colliding = false
  for (let i = 0; i < toppingBounds.length; i++) {
    arr.push(Math.sqrt(Math.pow(x - toppingBounds[i][0], 2) + Math.pow(y, - toppingBounds[i][1], 2)))
    if (Math.sqrt(Math.pow(x - toppingBounds[i][0], 2) + Math.pow(y - toppingBounds[i][1], 2)) <= toppingSize) {
      colliding = true
    }
  }
  if (colliding == false) {
    toppingBounds.push([x, y])
    switch (type) {
      case 0:
        drawSprinkle(x, y, color)
        break;
      case 1:
        drawChocChip(x, y)
        break;
      case 2:
        drawCashew(x, y)
        break;
    }  
  }
}

const toppingBounds = []

// Random topping: 0=sprinkles, 1=choc chips, 3=cashews
const pickedTopping = bt.randIntInRange(0, 2)
let toppingSize = 2;
if (pickedTopping == 1) toppingSize = 3;
if (pickedTopping == 2) toppingSize = 6;
for (let i = 0; i < toppings[0]; i++) {
  drawTopping(pickedTopping, bt.randIntInRange(28+pickedTopping, 72-pickedTopping), bt.randIntInRange(45+pickedTopping, 52-pickedTopping), sprinkColors[bt.randIntInRange(0, sprinkColors.length - 1)])
}
for (let i = 0; i < toppings[1]; i++) {
  drawTopping(pickedTopping, bt.randIntInRange(36+pickedTopping, 66-pickedTopping), bt.randIntInRange(53+pickedTopping, 61-pickedTopping), sprinkColors[bt.randIntInRange(0, sprinkColors.length - 1)])
}
for (let i = 0; i < toppings[2]; i++) {
  drawTopping(pickedTopping, bt.randIntInRange(42+pickedTopping, 58-pickedTopping), bt.randIntInRange(62+pickedTopping, 70-pickedTopping), sprinkColors[bt.randIntInRange(0, sprinkColors.length - 1)])
}





function drawSeed(seed) {
  
}

function drawNumber(num, numTurt) {
  switch (num) {
    case 1:
      
  }
}