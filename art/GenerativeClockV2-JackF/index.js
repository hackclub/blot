/* 
Author: Jack F
Title: Clock
Screenshots: clock1b.png
*/

//It's literally just a clock, simple but beautiful. Correct 2 times a day

const width = 125;
const height = 125;

setDocDimensions(width, height);

const rand = bt.randIntInRange(1,60);

//the hour of the day
const hour = rand

//the minute of the day
const minute =rand

const t = new bt.Turtle();
const m = minute*6;
const hr = (hour*30)+(m/12)

t.jump([62.5, 62.5])
t.setAngle(270)
t.right(m)
t.right(90)
t.forward(0.25)
t.right(90)
t.forward(50)
t.right(45)
t.forward(0.5)
t.right(90)
t.forward(0.5)
t.right(45)
t.forward(50)
t.jump([62.5, 62.5])
t.setAngle(90)
t.right(hr)
t.left(90)
t.forward(0.5)
t.right(90)
t.forward(30)
t.right(45)
t.forward(1)
t.right(90)
t.forward(1)
t.right(45)
t.forward(30)
t.jump([64.5, 64.5])
t.setAngle(270)
t.forward(4)
t.right(90)
t.forward(4)
t.right(90)
t.forward(4)
t.right(90)
t.forward(4)
t.jump([120, 62.5])
t.setAngle(90)
t.arc(360, 57.5)
t.jump([5, 120])
t.setAngle(90)
t.jump([62.5, 122])
t.right(180)
t.forward(6)
t.jump([62.5, 2])
t.right(180)
t.forward(6)
t.jump([122, 62.5])
t.left(90)
t.forward(6)
t.jump([3, 62.5])
t.right(180)
t.forward(6)


drawLines(t.lines())