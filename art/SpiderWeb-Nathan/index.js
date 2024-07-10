/*
@title: SpiderWeb
@author: Nathan
@snapshot: snap3.png
*/
//randNum is the variable that tracks how spacious the lines should be. it is set to a random integer


const width = 250;
const height = 250;

setDocDimensions(width, height);

var lines = []

function drawTRSlope(point1Y, point2X, gap) {
  for (let i = 0; i < 125 / gap; i++) {
    lines.push([[125, point1Y], [point2X, 125]])
    point1Y -= gap;
    point2X += gap;
  }
}
function drawBRSlope(point1Y, point2X, gap) {
  for (let i = 0; i < 125 / gap; i++) {
    lines.push([[125, point1Y], [point2X, 125]])
    point1Y -= gap;
    point2X -= gap;
  }
}

function drawStar(gap) {
  let min = parseInt(125 / gap) * gap
  let max = parseInt(250 / gap) * gap
  drawTRSlope(max + gap, min, gap)
  drawTRSlope(min, gap, gap)
  drawBRSlope(max, min, gap)
  drawBRSlope(min + gap, max, gap)
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
let randNum = getRandomArbitrary(1, 10);
drawStar(randNum)

drawLines(lines)