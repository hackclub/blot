// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

const colorsArray = [
    "Tomato", "yellow", "grey"
]
setDocDimensions(width, height);
bt.rand(0);
const color = colorsArray[bt.randInRange(0,3)]
bt.rand(75)
drawLines([
  [
    [115, bt.randInRange(12,117)],
    [74, 121],
    [bt.randInRange(57,118), 102],
    [88, 4],
    [123, 46],
    [104, 16],
    [0, bt.rand()],
    [5,6],
    [bt.randInRange(0,110), 63],
    [90,bt.rand()],
    [85,0],
    [bt.randInRange(76,125), 60],
  ]
  ], { fill: "pink" })

bt.rand(50)
drawLines([
  [
    [60,125],
    [80, 6],
    [103,12],
    [bt.randInRange(40,125),117],
    [103,109],
    [107, 39],
    [5, 80],
  ]
  ], {fill: "green"})

bt.rand(100);
drawLines([
  [
    [0, bt.rand()],
    [bt.randInRange(0,110), 63],
    [90,bt.rand()],
    [bt.randInRange(76,125), 60],
    [104,12],
    [bt.randInRange(40,125),117],
    [81,125],
    [100, 39],
    [15, bt.randInRange(12,117)],
    [36, 121],
    [bt.randInRange(57,118), 102],
  ]
  ], { fill: "red" })

const r = 10

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

t.up()
t.forward(r)
t.down()
let x = width / 2
let y = height / 2

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

for (let a = 0; a < toRadians(360); a+=0.01) {
  x = Math.cos(a) * r 
  y = Math.sin(a) * r
  t.goTo([x,y])
}

  x = Math.cos(0) * r + 80
  y = Math.sin(0) * r 
  t.jump([x,y])

for (let a = 0; a < toRadians(360); a+=0.01) {
  x = Math.cos(a) * r + 80
  y = Math.sin(a) * r 
  t.goTo([x,y])
}


// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

drawLines(finalLines);