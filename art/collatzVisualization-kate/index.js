/*
@title: Collatz Visualization
@author: Kate Xu
@snapshot: collatz_blot.png
*/


/*
parameters:
- number of branches (num_branches)
- initial number for Collatz conjecture (number)
*/

// setting up canvas
const t = new bt.Turtle()
const initial = [40, 20]
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
collatz(12, 20);