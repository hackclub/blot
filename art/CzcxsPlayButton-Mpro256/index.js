/*
@title: Czcx'sPlaybutton
@author: Mpro256
@snapshot: mainsnapshot.png
*/

const width = 200
const height = 250
setDocDimensions(200,250)

const allLines = []

allLines.push(...bt.text("Awarded to ", [39, 79], bt.randInRange(3.89, 5)))
allLines.push(...bt.text("czcx", [75, 59], bt.randInRange(3, 3.9)))
allLines.push(...bt.text("For Surpassing 500 Subscribers", [13, 43], bt.randInRange(2, 2.5)))

//top yt logo line
drawLines([
  [
    [177, 209],
    [28, 210]
  ]
]);
// right line of yt logo
drawLines([
  [
    [177, 130],
    [177, 208]
  ]
]);
//bottom yt logo line
drawLines([
  [
    [177, 130],
    [30, 131]
  ]
]);
//left line yt logo
drawLines([
  [
    [28, 130],
    [28, 209]
  ]
]);

//INNER YT LOGO STARTS HERE

drawLines([
  [
    [104, 139],
    [62, 170]
  ]
]);

drawLines([
  [
    [104, 140],
    [103, 190]
  ]
]);

drawLines([
  [
    [104, 191],
    [62, 170]
  ]
]);


drawLines(allLines)