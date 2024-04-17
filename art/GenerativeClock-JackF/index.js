/* 
Author: Jack F
Title: Clock
Screenshots: clock1.png
*/

//It's literally just a clock, simple but beautiful. Correct 2 times a day

const width = 125;
const height = 125;

setDocDimensions(width, height);

const angle = bt.randIntInRange(1,360);
const t = new bt.Turtle();

t.jump([62.5, 62.5])
t.right(angle)
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
t.right(angle)
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
t.jump([5, 120])
t.forward(115)
t.right(90)
t.forward(115)
t.right(90)
t.forward(115)
t.right(90)
t.forward(115)
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
t.jump([120, 120])
t.right(135)
t.forward(13)
t.jump([120, 5])
t.right(90)
t.forward(13)
t.jump([5, 5])
t.right(90)
t.forward(13)
t.jump([5, 120])
t.right(90)
t.forward(13)

drawLines(t.lines())