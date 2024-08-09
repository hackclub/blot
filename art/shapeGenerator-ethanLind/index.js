//starting variables
var xStartMin = 30
var xStartMax = 90
var yStartMin = 30
var yStartMax = 90
var lineCount = 10
var angle = bt.randInRange(1, 360)
var growth = bt.rand()
var startAngle = bt.rand();
var baseLine = bt.randInRange(3, 90)
var xStart = bt.randInRange(xStartMin, xStartMax);
var yStart = bt.randInRange(yStartMin, yStartMax);
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