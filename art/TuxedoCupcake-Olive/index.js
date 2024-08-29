/*
@title: Tuxedo Cupcake
@author: Olive
@snapshot: gallery.png
*/

// These are the things that customize the cupcake!

// Can be a set number between 30 and 70, or just a random int between those two values
const startBaseLine = bt.randIntInRange(30, 70)

// How many sprinkles on each row of cupcake
const sprinks = [bt.randIntInRange(10,20), bt.randIntInRange(7,14), bt.randIntInRange(5, 10)]
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
drawLines([base], {fill: "#000000"})


const turte = new bt.Turtle() // Cake Turte

turte.jump([75, 40])
turte.setAngle(0)
turte.arc(180, 2)
turte.goTo([25, 44])
turte.setAngle(180)
turte.arc(180, 2)

const cakeColor = cakeColors[bt.randIntInRange(0, cakeColors.length - 1)]
drawLines(turte.path, {fill: cakeColor, stroke: cakeColor})

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

drawLines(baseLines, {stroke: "#1F1F1F", width: 5})

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
drawLines(turty.path, {fill: frosting[0], stroke: frosting[1], width:16})

// Sprinkle Bounds:
// Zone 1: x -> 30-70, y -> 46-52
// Zone 2: x -> 36-64, y -> 53-61
// Zone 3: x -> 44-56, y -> 62-70

let sprinkies = [];
sprinkColors.forEach(() => {sprinkies.push([])})

function drawSprinkle(x, y) {
  const sprinkTurt = new bt.Turtle()
  sprinkTurt.jump([x, y])
  sprinkTurt.setAngle(bt.rand() * 360)
  sprinkTurt.forward(1.5)
  sprinkTurt.arc(180, 0.15)
  sprinkTurt.forward(1.5)
  sprinkTurt.arc(180, .15)

  return sprinkTurt.path[0]
}

for (let i = 0; i < sprinks[0]; i++) {
  sprinkies[bt.randIntInRange(0, sprinkies.length - 1)].push(drawSprinkle(bt.randIntInRange(30, 70), bt.randIntInRange(46, 52)))  
}
for (let i = 0; i < sprinks[1]; i++) {
  sprinkies[bt.randIntInRange(0, sprinkies.length - 1)].push(drawSprinkle(bt.randIntInRange(36, 64), bt.randIntInRange(53, 61)))  
}
for (let i = 0; i < sprinks[2]; i++) {
  sprinkies[bt.randIntInRange(0, sprinkies.length - 1)].push(drawSprinkle(bt.randIntInRange(44, 56), bt.randIntInRange(62, 70)))  
}


sprinkies.forEach((sprinkles, i) => {
  drawLines(sprinkles, {fill: sprinkColors[i], stroke: sprinkColors[i]})
})