/*
@title: lighthouse
@author: Sam B
@snapshot: snapshot 1
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const rr = bt.randInRange(10, 12);
const r = bt.randInRange(5, 6);
const rrr = bt.randInRange(3, 3.4);
const rrrr = bt.randInRange(2, 2.9);
const rrrrr = bt.randInRange(2, 2.11);

const t = new bt.Turtle()
const size = 80

t.forward(size)
t.left(103)
t.forward(size)
t.left(154)
t.forward(size)

drawLines(t.lines())
const wide = 125
const high = 125

setDocDimensions(width, height)

const sq = new bt.Turtle()
for (let i = 0; i < 4; i++) sq.forward(1).right(90)

const rect = bt.scale(sq.lines(), [20, 2])
bt.translate(rect, [width/2, height/2], bt.bounds(rect).cc)

drawLines(rect)
const thick = 125
const tall = 125

setDocDimensions(width, height)

const rec = new bt.Turtle()
for (let i = 0; i < 4; i++) rec.forward(1).right(90)

const recta = bt.scale(rec.lines(), [12, 20])
bt.translate(recta, [width/2, height/1.7], bt.bounds(recta).cc)

drawLines(recta)
const thickness = 125
const tallness  = 125

setDocDimensions(width, height)

const sq3 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq3.forward(1).right(90)

const rect3 = bt.scale(sq3.lines(), [20, 2])
bt.translate(rect3, [width/1, height/0.85], bt.bounds(rect).cc)

drawLines(rect3)
const width2 = 125;
const height2 = 125;

setDocDimensions(width, height);
const size3 = 96
const angle2 = 120/180 * Math.PI

drawLines([
    [[53, 85], [63, size3], [84 * Math.sin(angle2), 130 + 90 * Math.cos(angle2)]]
]) 
const size4 = 100
const angle3 = 120/180 * Math.PI

drawLines([
    [[11, 100], [11, size4], [72 * Math.sin(angle3), 127 + size4 * Math.cos(angle3)]]
])
const size5 = 100
const angle = 120/180 * Math.PI

drawLines([
    [[60, 69], [16, 51], [16 * Math.sin(angle), size5 + size5 * Math.cos(angle)]]
])
const width3 = 125
const height3 = 125

setDocDimensions(width, height)

const sq4 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq4.forward(1).right(90)

const rect4 = bt.scale(sq.lines(), [2, 8])
bt.translate(rect4, [width/1.99, height/1.26], bt.bounds(rect4).cc)

drawLines(rect4)
const width4 = 125
const height4 = 125

setDocDimensions(width, height)

const sq1 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq1.forward(1).right(90)

const rect1 = bt.scale(sq1.lines(), [29, 5])
bt.translate(rect1, [width/2.02, height/rr], bt.bounds(rect1).cc)

drawLines(rect1)
const sq6 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq6.forward(1).right(90)

const rect6 = bt.scale(sq6.lines(), [24, 5])
bt.translate(rect6, [width/2.02, height/r], bt.bounds(rect6).cc)

drawLines(rect6)
const sq5 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq5.forward(1).right(90)

const rect5 = bt.scale(sq5.lines(), [18, 5])
bt.translate(rect5, [width/2.02, height/rrr], bt.bounds(rect5).cc)

drawLines(rect5)
const sq7 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq7.forward(1).right(90)

const rect7 = bt.scale(sq7.lines(), [14, 5])
bt.translate(rect7, [width/2.02, height/rrrr], bt.bounds(rect7).cc)

drawLines(rect7)
const sq8 = new bt.Turtle()
for (let i = 0; i < 4; i++) sq8.forward(1).right(90)

const rect8 = bt.scale(sq8.lines(), [10, 5])
bt.translate(rect8, [width/2.02, height/rrrrr], bt.bounds(rect8).cc)

drawLines(rect8)

drawLines(rect8, { fill: "red" });
drawLines(rect7, { fill: "red" });
drawLines(rect6, { fill: "red" });
drawLines(rect5, { fill: "red" });
drawLines(rect1, { fill: "red" });
drawLines(rect4, { fill: "red" });
drawLines(rect, { fill: "red" });
drawLines(recta, { fill: "yellow" });
drawLines(rect3, { fill: "red" });

