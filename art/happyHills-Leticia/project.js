/*
@Title: Happy Hills
@author: Leticia
@snapshot: Example 1.png
*/

let fill = bt.randInRange(.1,.5)
function hilltop(size, turn){
    for (let i=0; i<turn; i++){
    h.forward(size)
    h.right(1)
  }
}

function round(size, turn){
  for (let i=0; i<turn; i++){
    f.forward(size)
    f.right(1)
  }
}

function eye(size){
  f.setAngle(0)
  for (let i = size; i > 0;){
    f.arc(360,i)
    i=i-fill
  }
}

function mouth(size){
  f.arc(180,size)
}

const width = 125;
const height = 125;

const h = new bt.Turtle()
const size1 = .25

for(let i=0; i<4; i++){
  h.forward(width)
  h.left(90)
}

drawLines(h.lines())
h.jump([0,99.75])

//Hills

//first hill
h.left(10)
for (let i=0; i<100; i++){
  h.forward(size1)
  h.right(1)
}


h.forward(54.5)

drawLines(h.lines())

//second hill
let size2 = 0.33
h.jump([13.4,0])
h.left(180)
h.forward(20)
hilltop(size2, 180,h)
h.forward(20)
drawLines(h.lines())

//third hill
h.jump([33.5,39])
h.left(180)
h.forward(18)
let size3 = .29
hilltop(size3, 135,h)
drawLines(h.lines())
h.setAngle(-90)
h.forward(68.8)
h.left(180)
h.up

//fourth hill
h.forward(68.8)
drawLines(h.lines())
h.down
let size4 = .35
hilltop(size4, 180)
h.forward(25)

drawLines(h.lines())

//fifth hill
h.jump([78,0])
h.left(180)
h.forward(7.1)
let size5 = .703
hilltop(size5, 100)

drawLines(h.lines())

//Faces

//first face
const f = new bt.Turtle()
f.jump([2,90])
f.forward(3)
f.right(90)
let m1=.026
round(m1, 180)
f.jump([11,90])
f.right(185)
round(m1-.001,180)
drawLines(f.lines())

//second face
f.jump([23,21])
eye(2.75)
f.jump([28.5,24.5])
f.setAngle(270)
mouth(3.5)
f.jump([41.25,21])
eye(2.75)
drawLines(f.lines())

//third face
f.jump([42,57.5])
eye(2.2)
f.jump([47,60.5])
f.setAngle(270)
mouth(2.9)
f.left(90)
f.forward(5.8)
f.jump([57.5,57.5])
eye(2.2)
drawLines(f.lines())

//fourth face
f.jump([75,70])
f.setAngle(97.5)
mouth(3.5)
f.jump([79,71.6])
f.setAngle(270)
mouth(3.2)
f.jump([96,69])
f.setAngle(83.5)
mouth(3.5)
drawLines(f.lines())

//fifth face
f.jump([95,6])
eye(6)
for (let i = 1; i < 5; i++){
  f.jump([108,15])
  f.setAngle(270)
  mouth(7.5)
}
drawLines(f.lines())

//Sun

//shape
f.jump([105,93])
f.setAngle(0)
let rayLength = [21,8.1,7.8,10.2,6,10.2,48,79.5,10.5,47.5]
for (let i = 0; i < 10; i++){
  f.arc(36,13)
  let sun = f.pos
  f.right(90)
  f.forward(rayLength[i])
  f.jump(sun)
  f.left(90)
}
drawLines(f.lines())

//face
f.jump([98,103.5])
eye(2.5)
f.jump([103,106.25])
f.setAngle(270)
mouth(2.6)
f.jump([112.5,103.5])
eye(2.5)
drawLines(f.lines())


