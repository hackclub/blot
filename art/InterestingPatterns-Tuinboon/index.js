/*
@title: Interesting Patterns
@author: Tuinboon
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

let lines = bt.randIntInRange(0,20);
let offset = bt.randIntInRange(0,62.5);
const t = new bt.Turtle()

for (let i = 0; i < lines+1; i++) {
    drawLines([
      [[0, i*(height/lines)], [width - offset, 0 + offset]],
      [[i*(height/lines), height], [0 + offset, 0 + offset]],
      [[width, i*(height/lines)], [0 + offset, height - offset]],
      [[i*(height/lines), 0], [width - offset, height - offset]]
    ])
}

for (let i = 0; i < bt.randIntInRange(0,100); i+=bt.randIntInRange(0,10)) {
  t.jump([width / 2, (height / 2) - i])
  t.arc(360, i)
}

drawLines(t.lines())
