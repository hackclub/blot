/*
@title: Koch's Eye
@author: Adwaya Gupta
@snapshot: depth5.png
*/

setDocDimensions(500, 500);
let turtle = new bt.Turtle();
const n = 8

function kochCurve(length, depth) {
    if (depth === 0) turtle.forward(length);
    else {
        kochCurve(length / 3, depth - 1);
        turtle.left(60);
        kochCurve(length / 3, depth - 1);
        turtle.right(120);
        kochCurve(length / 4, depth - 1);
        turtle.left(60);
        kochCurve(length / 3, depth - 1);
    }
}

function kochSnowflake(length, depth) {
    for (let i = 0; i < 3; i++) {
        kochCurve(length, depth);
        turtle.right(120);
    }
}

function drawPattern(length, depth) {
    if (depth !== 0) {
      kochSnowflake(length, depth);
      drawLines(bt.translate(turtle.lines(), [250,250],bt.bounds(turtle.lines()).cc))
      turtle = new bt.Turtle()
      drawPattern(length/1.5,depth-1)
    }
}

drawPattern(500,n);
let pupil = new bt.Turtle()
for (let i = 0; i < n; i++) 
    pupil.forward(0.8*500/Math.sqrt(3)*2*Math.sin(180/n * Math.PI/180)).right(360/n)
drawLines(bt.translate(pupil.lines(), [250, 250], bt.bounds(pupil.lines()).cc))

drawLines([
  bt.catmullRom([[-250,260], [250,510], [750,260]]), 
  bt.catmullRom([[-250,260], [250,520], [750,260]]), 
  bt.catmullRom([[-250,260], [250,530], [750,260]]),
  bt.catmullRom([[-250,260], [250,-10], [750,260]]), 
  bt.catmullRom([[-250,260], [250,-20], [750,260]]), 
  bt.catmullRom([[-250,260], [250,-30], [750,260]]), 
])
