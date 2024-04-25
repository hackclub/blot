/*
@title: Ramadan Lanterns
@author: Mohammed R. Attia (Moccisor)
@snapshot: ramadan_lantern.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);
const w = 40;
const t = new bt.Turtle()

t.left(45).jump([10, 10]).forward((w / 2 - 5) * Math.sqrt(2))
t.right(45).forward(10)
t.right(45).forward((w / 2 - 5) * Math.sqrt(2))
t.right(135).forward(w)

t.right(135).up().forward((w / 2 - 5) * Math.sqrt(2)).down()

t.left(65).forward((w / 2 - 5) / Math.sin(20 * Math.PI / 180))
t.right(110).forward(w)
t.right(110).forward((w / 2 - 5) / Math.sin(20 * Math.PI / 180))

t.left(180).up().forward((w / 2 - 5) / Math.sin(20 * Math.PI / 180)).down()

t.left(65).forward((w / 2) * Math.sqrt(2))
t.left(90).forward((w / 2) * Math.sqrt(2))

t.left(180).up().forward((w / 2) * Math.sqrt(2)).down().right(45)

t.arc(360, 3).arc(360, 2)
let x = t.copy().pos;

t.jump(x).setAngle(-45 - 90 / 6).forward((w / 2) / Math.cos((45 - 90 / 6) * Math.PI / 180))
t.jump(x).setAngle(180 + (45 + 90 / 6)).forward((w / 2) / Math.cos((45 - 90 / 6) * Math.PI / 180))


t.setAngle(-90 + (20 - 40 / 6)).forward(
  ((w / 2 - 5) / Math.tan(20 * Math.PI / 180)) / Math.sin((90 - (20 - 40 / 6)) * Math.PI / 180))
let h1 = t.copy().pos;

t.jump(x).setAngle(-45 - 90 / 6).up().forward((w / 2) / Math.cos((45 - 90 / 6) * Math.PI / 180)).down()
t.setAngle(-90 - (20 - 40 / 6)).forward(
  ((w / 2 - 5) / Math.tan(20 * Math.PI / 180)) / Math.sin((90 - (20 - 40 / 6)) * Math.PI / 180))
let h2 = t.copy().pos;

t.jump(h1).setAngle(180 + (45 + 90 / 6)).forward(
  ((w / 2 - 5) / Math.tan(45 * Math.PI / 180)) / Math.sin((45 + 90 / 6) * Math.PI / 180))

t.jump(h2).setAngle(-(45 + 90 / 6)).forward(
  ((w / 2 - 5) / Math.tan(45 * Math.PI / 180)) / Math.sin((45 + 90 / 6) * Math.PI / 180))

let s = 0.50;
const lantern1 = bt.scale(t.lines(), [1, 1]);
const lantern2 = bt.scale(t.lines(), [s, s])
bt.translate(lantern2,
  [bt.bounds(lantern1).xMax + 2, bt.bounds(lantern1).yMin],
  bt.bounds(lantern2).lb);
s = 0.50
const lantern3 = bt.scale(t.lines(), [s, s])
bt.translate(lantern3,
  [bt.bounds(lantern1).xMin - 2, bt.bounds(lantern1).yMin],
  bt.bounds(lantern3).rb);

const finalLines = [];

// add turtle to final lines
bt.join(finalLines, lantern1);
bt.join(finalLines, lantern2);
bt.join(finalLines, lantern3);

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);