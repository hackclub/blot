/*
@title: Simple Tree
@author: spectralo
@snapshot: best.png
*/

const width = 125;
const height = 125;
const REPETITIONS = 5

setDocDimensions(width, height);

const t = new bt.Turtle()


t.forward(62.5)
t.left(90)
t.forward(30)

let y = 30

let i = 0
while (i < REPETITIONS) {
  let length = bt.randIntInRange(5, 7)
  let angle = bt.randIntInRange(5, 10)
  let number = bt.randIntInRange(2, 10)
  let direction = bt.randIntInRange(1, 2)
  let decalage = bt.randIntInRange(-20,20)

  let newy = y - decalage
  if (newy < 10) {
    decalage = 0
  }
  else if (newy > 50){
    decalage = 0
  }
  t.left(180)
  t.forward(decalage)
  y = y - decalage
  t.left(180)
  
  let a = 0

  while (a < number) {
    if (direction == 1) {
      t.left(angle)
    } else {
      t.right(angle)
    }
    t.forward(length)
    a += 1
  }

  let h = 0
  let xturtle = t.pos[0]
  let yturtle = t.pos[1]
  t.setAngle(0)
  t.jump([xturtle,yturtle-10])
  while (h != 100) {
    t.forward(1)
    t.left(360/100)
    h += 1
  }
  t.jump([62.5,30])
  t.setAngle(90)

  i += 1
}





// draw it
drawLines(t.lines());
