/*
@title: Bajaj
@author: Shaunak 
@snapshot: lol/gg message
*/
const t = new bt.Turtle()
const size = 100
const rand = bt.randIntInRange(0, 1)
setDocDimensions(125, 125);

if (rand < 1) {
  t.jump([20, 90])
  t.right(90)
  t.forward(60)
  t.left(90)
  t.forward(20)
  t.jump([50, 90])
  t.forward(20)
  t.right(90)
  t.forward(60)
  t.right(90)
  t.forward(20)
  t.right(90)
  t.forward(60)
  t.jump([80, 90])
  t.right(180)
  t.forward(60)
  t.left(90)
  t.forward(20)
}

if (rand > 0) {
  t.jump([50, 90])
  t.left(180)
  t.forward(30)
  t.left(90)
  t.forward(60)
  t.left(90)
  t.forward(30)
  t.left(90)
  t.forward(30)
  t.left(90)
  t.forward(10)
  t.left(90)
  t.forward(10)
  t.jump([100, 90])
  t.right(90)
  t.forward(30)
  t.left(90)
  t.forward(60)
  t.left(90)
  t.forward(30)
  t.left(90)
  t.forward(30)
  t.left(90)
  t.forward(10)
  t.left(90)
  t.forward(10)
}

drawLines(t.lines())