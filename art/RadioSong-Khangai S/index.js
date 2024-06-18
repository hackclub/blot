/*
@title: RadioSong
@author: Khangai S.
@snapshot: the name of the snapshot file you want in the gallery
*/
var width = 600;
var height = 600;

setDocDimensions(width, height);

const t = new bt.Turtle()

//margins
var xMin = 100
var xMax = width - xMin
var yMin = 100
var yMax = height - yMin

var nLines = 80
var nPoints = 100

var dx = (xMax - xMin) / nPoints
var dy = (yMax - yMin) / nLines

var x = xMin
var y = yMin

//the meat of the operation

t.jump([x, y])

var mx = (xMin + xMax) / 2

for (var i = 0; i < nLines; i++) {
  var a = randNormal(mx, 50)
  var b = randNormal(30, 30)
  for (var j = 0; j < nPoints; j++) {
    x = x + dx
    var ty = y + 1000 * normalPDF(x, a, b) + bt.rand()
    t.goTo([x, ty])
  }

  x = xMin
  y = y + dy
  t.jump([x, y])
}

drawLines(t.lines())

//distribution methods

function randNormal(a, b) {
  var sum = 0
  for (var i = 0; i < 6; i += 1) {
    sum += bt.randInRange(-1, 1)
  }
  var norm = sum / 6
  return a + b * norm
}

function normalPDF(x, mu, sigma) {
  var sigma2 = Math.pow(sigma, 2)
  var numerator = Math.exp(-Math.pow((x - mu), 2) / (2 * sigma2))
  var denominator = Math.sqrt(2 * Math.PI * sigma2)
  return numerator / denominator
}