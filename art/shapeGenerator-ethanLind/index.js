//starting variables
const xStart = 60
const yStart = 60
const lineCount = 90
const angle = 10
const growth = .1
const startAngle = 0
const baseLine = 1
//code
var i = 0
const width = 120;
const height = 120;
var line = baseLine
const t = new bt.Turtle()
t.jump([xStart, yStart])
t.right(startAngle)
do {
  t.forward(line)
  t.right(angle)
  var line = line + growth
  i++;
} while (i < lineCount)

drawLines(t.lines())