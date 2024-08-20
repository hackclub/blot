/*
@title: BloTV
@author: Hudson
@snapshot: 1.svg
*/
const width = 125;
const height = 125;
bt.setRandSeed(1) // Set to 0 to disable static
const staticSpacing = 1.0;
const staticThreshold = 0.5;
const label = true;
setDocDimensions(width, height);

// store final lines here
let finalLines = [];

// create a polyline
const polyline = [
  [10, 20],
  [10, 105],
  [115, 105],
  [115, 20],
  [10, 20]
];

// add the polyline to the final lines

const screen = [
  [20, 30],
  [20, 95],
  [105, 95],
  [105, 30],
  [20, 30]
]
finalLines.push(screen)
const staticLines = [];
for (var i = 0; i < 125; i += staticSpacing) {
  for (var j = 31; j < 125; j += staticSpacing) {
    if ((bt.rand() > staticThreshold) & (bt.pointInside(finalLines, [i, j]))) {
      staticLines.push([
        [i, j],
        [i + staticSpacing, j]
      ])
    }
  }
}
const ant = [
  [50, 105],
  [50, 115],
  [75, 115],
  [75, 105],
];
finalLines.push(polyline);
finalLines.push(...staticLines);
finalLines.push(ant);

finalLines = bt.translate(finalLines, [0, -10])

const poke1 = [
  [62.5, 105],
  [50, 115],
];
finalLines.push(poke1)
const poke2 = [
  [62.5, 105],
  [75, 115],
];
finalLines.push(poke2)
const turtle = new bt.Turtle()
turtle.jump([75, 115])
turtle.setAngle(-45)
turtle.arc(360, 1.2)
turtle.jump([50, 115])
turtle.setAngle(45)
turtle.arc(360, 1.2)

turtle.jump([23, 14])
turtle.setAngle(10)
turtle.arc(360, 1.0)
turtle.jump([20, 14])
turtle.setAngle(10)
turtle.arc(360, 1.0)
turtle.jump([25, 15])
turtle.setAngle(0)
turtle.forward(10)

if (label) {


  turtle.jump([12, 93])
  //B
  turtle.forward(3)
  turtle.setAngle(-45)
  turtle.forward(1)
  turtle.setAngle(-90)
  turtle.forward(2)
  turtle.setAngle(-135)
  turtle.forward(1)
  turtle.setAngle(180)
  turtle.forward(3)
  turtle.forward(-3)
  turtle.setAngle(-45)
  turtle.forward(1)
  turtle.setAngle(-90)
  turtle.forward(2)
  turtle.setAngle(-135)
  turtle.forward(1)
  turtle.setAngle(-180)
  turtle.forward(3)
  turtle.setAngle(0)
  //START BASELINE
  //turtle.forward(28)
  //turtle.forward(-28)
  //END BASELINE
  turtle.setAngle(90)
  turtle.forward(6.83)

  turtle.jump([18, 93])
  //l
  turtle.setAngle(-90)
  turtle.forward(6.83)

  turtle.jump([21, 90.585])
  //o
  turtle.setAngle(0)
  turtle.forward(2)
  turtle.setAngle(-45)
  turtle.forward(1)
  turtle.setAngle(-90)
  turtle.forward(3)
  turtle.setAngle(-135)
  turtle.forward(1)
  turtle.setAngle(180)
  turtle.forward(2)
  turtle.setAngle(135)
  turtle.forward(1)
  turtle.setAngle(90)
  turtle.forward(3)
  turtle.setAngle(45)
  turtle.forward(1)

  turtle.jump([25, 93])
  //T
  turtle.setAngle(0)
  turtle.forward(4)
  turtle.up()
  turtle.forward(-2)
  turtle.down()
  turtle.setAngle(-90)
  turtle.forward(6.83)

  const V = [
    [31, 93],
    [33, 86.17],
    [35, 93]
  ]

  finalLines.push(V)
}

// draw it
drawLines(finalLines);
drawLines(turtle.lines())