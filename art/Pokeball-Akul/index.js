/*
@title: Pokeball
@author: Akul Saju
@snapshot: snapshot1.png
*/

const width = 125
const height = 125
setDocDimensions(width, height)
const finalLines = [];
const t = new bt.Turtle()
const t2 = new bt.Turtle()

// Change the design of the Pokéball!
let style = bt.randIntInRange(1, 3)
if (style === 1) { // Standard Pokéball!
  t.jump([28, 38]);
  t.arc(45, 50)
  t.arc(50, 50)
  t.arc(25, 50)
  t.arc(50, 50)
  t.arc(75, 50)
  t.arc(60, 50)
  t.arc(75, 50)
  t.arc(50, 50)
  t.arc(45, 50)
  t.arc(50, 50)
  t2.jump([35, 45])
  t2.arc(45, 50)
  t2.arc(50, 50)
  t2.arc(25, 50)
  t2.arc(45, 50)
  t2.arc(50, 50)
  t2.arc(45, 50)
  t2.arc(50, 50)
  t2.arc(25, 50)
  t2.arc(45, 50)
  t2.arc(50, 50)
  let standardlines = t.lines()
  let standard2lines = t2.lines()
  bt.scale(standardlines, 0.05)
  bt.scale(standard2lines, 0.10)
  drawLines(standardlines)
  drawLines(standard2lines)
} else if (style === 2) { // Great Ball!
  t.jump([18, 91])
  t.forward(28)
  t.right(90)
  t.forward(15)
  t.right(90)
  t.forward(25)
  t2.jump([77, 77.5])
  t2.forward(29)
  t2.left(90)
  t2.forward(15)
  t2.left(90)
  t2.forward(26.50)
  let greatlines = t.lines()
  let great2lines = t2.lines()
  bt.rotate(greatlines, 315)
  bt.rotate(great2lines, 230)
  drawLines(greatlines)
  drawLines(great2lines)
} else { // Ultra Ball!
  t.jump([16.5, 97])
  t.forward(36.5)
  t.right(90)
  t.forward(15)
  t.right(90)
  t.forward(26.5)
  t2.jump([70, 82.5])
  t2.forward(38)
  t2.left(90)
  t2.forward(15)
  t2.left(90)
  t2.forward(28)
  let ultralines = t.lines()
  let ultra2lines = t2.lines()
  bt.rotate(ultralines, 270)
  bt.rotate(ultra2lines, 270)
  drawLines(ultralines)
  drawLines(ultra2lines)
}

// The outline of the ball 
const ball = new bt.Turtle()
ball.arc(90, 100)
ball.arc(100, 100)
ball.arc(50, 100)
ball.arc(90, 100)
ball.arc(100, 100)
bt.join(finalLines, ball.lines())
const uniformlyScaled = bt.scale(finalLines, 0.5)
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

// The larger outline of the button
const button = new bt.Turtle();
button.arc(90, 100)
button.arc(100, 100)
button.arc(50, 100)
button.arc(90, 100)
button.arc(100, 100)
let buttonlines = button.lines()
bt.translate(buttonlines, [width / 2, height / 2], bt.bounds(button.lines()).cc);
bt.translate(buttonlines, [-2.5, 90], bt.bounds(button.lines()).cc);
bt.scale(buttonlines, 0.1)

// The smaller outline of the button
const buttonpress = new bt.Turtle();
buttonpress.arc(90, 100)
buttonpress.arc(100, 100)
buttonpress.arc(50, 100)
buttonpress.arc(90, 100)
buttonpress.arc(100, 100)
let buttonpiece = buttonpress.lines()
bt.translate(buttonpiece, [width / 2, height / 2], bt.bounds(buttonpress.lines()).cc);
bt.translate(buttonpiece, [-2.5, 90], bt.bounds(buttonpress.lines()).cc);
bt.scale(buttonpiece, 0.0655)

// The top curve across the ball
const curve = bt.catmullRom([
  [12.5, 65],
  [40, 59.25],
  [60, 65.5],
  [81, 59.25],
  [112.5, 65]
])

// The bottom curve across the ball
const bcurve = bt.catmullRom([
  [13, 54],
  [38, 48.75],
  [60, 38.5],
  [82, 48.75],
  [111.9, 54]
])

drawLines([curve])
drawLines([bcurve])
drawLines(buttonlines)
drawLines(buttonpiece)
drawLines(finalLines)