/*
@title: Collatz-Inspired Kite
@author: Kate Xu
@snapshot: snapshot1.png
*/


/*
parameters:
- number of kite strings (num_branches)
- initial number for Collatz conjecture (number)
*/

// setting up canvas
const t = new bt.Turtle()
const initial = [65, 30]
const width = 125;
const height = 125;
setDocDimensions(width, height);

// drawing black border (can you change color to white?)
for (let i = 0; i < 4; i++) {
  t.forward(125)
  t.left(90)
  t.forward(0.2)
  t.left(90)
  t.forward(125)
  t.right(90)
  t.forward(0.5)
  t.right(90)
  t.forward(125)
  t.left(90)
}

// Kite body
t.up()
t.goTo(initial)
t.setAngle(10)
t.down()
t.forward(-40)
var kitePoint = t.pos
t.left(75)
t.forward(16)
t.left(130)
t.forward(-16)
t.left(110)
t.forward(32)
t.right(158)
t.forward(40)
t.up()
t.goTo(kitePoint)
t.down()
t.right(122.5)
t.arc(30, 54.8)
t.up()
t.goTo([36.3, 36.7])
t.down()
t.arc(360, 0.8)
t.left(20)
t.arc(-21, -100)

// Kite shading
t.up()
t.goTo(kitePoint)
t.setAngle(45)
t.forward(0.8)
t.setAngle(10)
var angle = t.angle
var dots = 40
var distance = 0.5
t.down()
for (var lines = 0; lines < 20; lines++) {
  for (var i = 0; i < dots; i++) {
    t.forward(0.5)
    t.up()
    t.forward(distance)
    t.down()
  }

  t.up()
  t.setAngle(45)
  t.forward(0.5)
  t.setAngle(angle+180 % 360)
  t.down()
  var angle = t.angle
  var dots = dots - 4
  var distance = distance + 0.05
}

// Collatz conjecture visualization
function collatz(number, num_branches) {
  for (var i = 0; i < num_branches; i++) {

      // starting branch at initial point
      t.up()
      t.goTo(initial)
      t.setAngle(bt.randIntInRange(-15, 55))
      t.down()

      // drawing branch
      for (let test = 0; test < bt.randIntInRange(5, 30); test++) {
        if (number % 2 == 0) {
          var number = number/2
          t.forward(number*2)
          t.left(20)
          drawLines(t.lines())
        } else {
          var number = 3*number + 1
          t.forward(number*2)
          t.right(20)
          drawLines(t.lines())
        }
      }
  }
}

// running the function with parameters
collatz(4, 6);
