/*
@title: Cybertruck
@author: Vignesh
@snapshot: Cybertruck
*/


const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
// [x, y], centerPoint[0] = x, centerPoint[1] = y
const linesToDraw = []

function draw(stuffToDraw) {
  linesToDraw.push(stuffToDraw)
}

function circle(centerPoint, radius) {
    const startingPoint = [centerPoint[0], centerPoint[1] + radius]
    const rightPoint = [centerPoint[0] + radius, centerPoint[1]]
    const bottomPoint = [centerPoint[0], centerPoint[1] - radius]
    const leftPoint = [centerPoint[0] - radius, centerPoint[1]]
  
    const curve = bt.nurbs([startingPoint, rightPoint, bottomPoint, leftPoint, startingPoint], {steps: 1500, degree: 3})
    return curve;
}

// wheels
const wheelYCenter = 12;
draw(circle([32, wheelYCenter], 5))
draw(circle([32, wheelYCenter], 10))
draw(circle([32, wheelYCenter], 15))
draw(circle([96, wheelYCenter], 5))
draw(circle([96, wheelYCenter], 10))
draw(circle([96, wheelYCenter], 15))

// square body
draw([[16, 35], [16, 21]])
draw([[112, 21], [112, 38]])
draw(bt.nurbs([[16, 21], [32, 25], [48, 18],[64, 17], [80, 18] ,[96, 25],[112, 21]]))

// top
draw([[16, 35], [58, 45]])
draw([[58, 45], [112, 38]])

// windows
draw([[26, 34], [58, 41]])
draw([[26, 34], [85, 35]])
draw([[58, 41], [85, 37]])
draw([[85, 35], [85, 37]])

drawLines(linesToDraw)