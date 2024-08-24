/*
@title: Tableizer
@author: Daniel Davidson
@snapshot: snapshot(45).png
*/
// The number in the snapshot is the seed used.
// https://github.com/danieliscrazy
bt.setRandSeed(45)
const width = 125;
const height = 125;
const rand = bt.randIntInRange(0, 63);
const tableLength = bt.randIntInRange(20, 60);
const tableWidth = bt.randIntInRange(20, 60);
const legLength = bt.randIntInRange(10, 20);
const t = new bt.Turtle()
const tarea = new bt.Turtle()
const cup = new bt.Turtle()


setDocDimensions(width, height);


tarea.jump([62.5, 23 + legLength])
tarea.left(30)
tarea.forward(tableLength*0.7)
tarea.left(120)
tarea.forward(tableWidth*0.7)
tarea.left(60)
tarea.forward(tableLength*0.7)
tarea.left(120)
tarea.forward(tableWidth*0.7)

t.jump([62.5,23])
t.left(90)

t.forward((legLength + 3))
t.up()
t.forward(-(legLength + 3))
t.down()
t.right(60)
t.forward(2)
t.left(60)
t.forward(legLength)
t.left(120)
t.forward(2)
t.right(120)
t.forward((-legLength))
t.left(60)
t.forward(2)
t.right(60)
t.forward(legLength)
t.right(120)
t.forward(2)
t.left(120)
t.right(60)
t.forward(tableLength) 
t.forward(-2)
t.left(60)
t.forward(-(legLength))
t.right(60)
t.forward(2)
t.left(60)
t.forward(legLength)
t.left(120)
t.forward(2)
t.left(60)
t.forward((legLength)) 
t.right(120)
t.forward(2)
t.left(120)
t.forward((-legLength)+2)
t.left(120)
t.forward(4)
t.left(60)
t.forward(3)
t.left(120)
t.forward(tableLength)
t.up()
t.forward(-tableLength)
t.down()
t.right(60)
t.forward(tableWidth)
t.left(60)
t.forward(tableLength)
t.left(120)
t.forward(tableWidth)
t.up()
t.forward(-tableWidth)
t.down()
t.right(60)
t.forward(3)
t.forward(legLength)
t.left(60)
t.forward(2)
t.left(120)
t.forward(legLength)
t.up()
t.forward(-legLength)
t.down()
t.right(60)
t.forward(2)
t.left(60)
t.forward(legLength - 2)
t.left(60)
t.forward(4)
t.forward(-tableWidth)

const bounds = bt.bounds(tarea.lines())
const xMin = bounds.xMin
const xMax = bounds.xMax
const yMin = bounds.yMin
const yMax = bounds.yMax
let cupX = bt.randIntInRange(xMin, xMax)
let cupY = bt.randIntInRange(yMin, yMax)
while (!bt.pointInside(tarea.lines(), [cupX, cupY - 12])){
cupX = bt.randIntInRange(xMin, xMax)
cupY = bt.randIntInRange(yMin, yMax)
}


cup.jump([cupX, cupY])
cup.arc(360, 3)
cup.arc(86.7, 3)
cup.forward(-12)
cup.arc(360, 2.37)
cup.arc(186, 2.37)
cup.forward(-12)
cup.arc(180, 3)


const scale = bt.scale(cup.lines(), [1, 0.5])
drawLines(bt.cover(t.lines(), scale))
drawLines(scale)