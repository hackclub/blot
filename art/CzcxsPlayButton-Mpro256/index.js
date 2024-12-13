/*
@title: CzcxsPlaybutton
@author: Mpro256
@snapshot: mainsnapshot.png
*/

const width = 125
const height = 125
setDocDimensions(125,125)

const allLines = []

allLines.push(...bt.text("Awarded to ", [39, 32], bt.randInRange(1, 2.6)))
allLines.push(...bt.text("czcx", [52, 23], bt.randInRange(1, 1.1)))
allLines.push(...bt.text("For Surpassing 500 Subscribers", [17, 13], bt.randInRange(1, 1.3)))

//top yt logo line
drawLines([
  [
    [100, 108],
    [28, 107]
  ]
]);
// right line of yt logo
drawLines([
  [
    [99, 109],
    [99, 66]
  ]
]);
//bottom yt logo line
drawLines([
  [
    [28, 65],
    [99, 65]
  ]
]);
//left line yt logo
drawLines([
  [
    [29, 108],
    [29, 65]
  ]
]);

//INNER YT LOGO STARTS HERE

drawLines([
  [
    [84, 83],
    [51, 68]
  ]
]);

drawLines([
  [
    [51, 97],
    [52, 69]
  ]
]);

drawLines([
  [
    [49, 98],
    [86, 81]
  ]
]);


drawLines(allLines)