/*
@title: uninterupted
@author: Nirvaan
@snapshot: scenery of the west
*/

const width = 125
const height = 125
setDocDimensions(width, height);

const ground = [
  [
    [0, 3 * 0],
    [125, 3 * 0],
    [125, height],
    [0, height]
  ]
]

const top = [
  [
    [0, 3 * height / 4],
    [125, 3 * height / 4],
    [125, height],
    [0, height]
  ]
]
const middle2 = [
  [
    [0, 4.25 * height / 6],
    [125, 4.25 * height / 6],
    [125, height],
    [0, height]
  ]
]

const middle1 = [
  [
    [0, 4 * height / 6],
    [125, 4 * height / 6],
    [125, height],
    [0, height]
  ]
]
const down = [
  [
    [0, 3 * height / 6],
    [125, 3 * height / 6],
    [125, height],
    [0, height]
  ]
]



const randsize = bt.rand() * 2 + 3
const base = 50
const radius = base / randsize
var xoff = bt.rand() * 2 + 87
var yoff = bt.rand() * 2 + 87.5
const divise = bt.rand() * .04 + 1.4

const sun = [
  bt.nurbs([
    [xoff + radius, 0 + yoff],
    [xoff + radius / divise, radius / divise + yoff],
    [xoff, 0 + radius + yoff],
    [xoff - radius / divise, radius / divise + yoff],
    [xoff + -radius, 0 + yoff],
    [xoff - radius / divise, -radius / divise + yoff],
    [xoff, 0 - radius + yoff],
    [xoff + radius / divise, -radius / divise + yoff],
    [xoff + radius, 0 + yoff]
  ])
]

const randomnum = bt.randIntInRange(10, 50)
const randomnum2 = bt.randIntInRange(10, 50)
const finalLines = [];

const mount = [
  bt.nurbs([
    [0, yoff - 30],
    [randomnum2 + 70, yoff - 10],
    [randomnum2 + 70, yoff - 10],
    [width, yoff - 30]
  ])
]

bt.iteratePoints(mount, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 10, { octaves: 3 }) * 20 * (t === 0 || t === 1 ? 0 : 1)

  return [x, y + dy]
})

const mount2 = [
  bt.nurbs([
    [0, yoff - 30],
    [randomnum2 + 70, yoff - 20],
    [randomnum2 + 70, yoff - 20],
    [width, yoff - 30]
  ])
]

bt.iteratePoints(mount2, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 15, { octaves: 3 }) * 20 * (t === 0 || t === 1 ? 0 : 1)

  return [x, y + dy]
})

const mount3 = [
  bt.nurbs([
    [0, yoff - 30],
    [randomnum2 + 70, yoff - 15],
    [randomnum2 + 70, yoff - 15],
    [width, yoff - 30]
  ])
]

bt.iteratePoints(mount3, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 12, { octaves: 900 }) * 20 * (t === 0 || t === 1 ? 0 : 1)

  return [x, y + dy]
})


const rand = 2
const xoff2 = bt.rand() * rand + 67.5 - rand / 2 - 20
const yoff2 = bt.rand() * 2 + 87.5


const river = [
  bt.nurbs([
    [xoff2 - rand / 2, height / 2 - 4],
    [xoff2 - rand / 2 + bt.rand() * rand / 3 * 20, height / 3],
    [0, 0],
    [0, 0],
    [bt.rand() * rand + 120, 0],
    [bt.rand() * rand + 120, 0],

    [bt.rand() * rand + 75, 20],

    [xoff2 - rand / 2 + bt.rand() * rand / 3 * 30 + 20, height / 3 + 10],
    [xoff2 - rand / 2 + 20, height / 2 - 4]

  ])
]

xoff = bt.rand() * 10 + 5
yoff = bt.rand() * 30 + 15

var scale = (60 - yoff) / 100


const cactus1 = [
  bt.nurbs([
    [xoff - (5 * scale), yoff],
    [xoff - (5 * scale), yoff + height / 5 * scale],
    [xoff - (20 * scale), yoff + height / 4 * scale],
    [xoff - (25 * scale), yoff + height / 2.5 * scale],
    [xoff - (21 * scale), yoff + height / 2.3 * scale],
    [xoff - (17 * scale), yoff + height / 2.5 * scale],
    [xoff - (15 * scale), yoff + height / 3.5 * scale],
    [xoff - (7 * scale), yoff + height / 3.5 * scale],
    [xoff - (7 * scale), yoff + height / 1.7 * scale],
    [xoff - (2 * scale), yoff + height / 1.5 * scale],
    [xoff - (-3 * scale), yoff + height / 1.7 * scale],
    [xoff - (-3 * scale), yoff + height / 3 * scale],
    [xoff - (-12 * scale), yoff + height / 3 * scale],
    [xoff - (-13 * scale), yoff + height / 2.2 * scale],
    [xoff - (-17.5 * scale), yoff + height / 2 * scale],
    [xoff - (-22 * scale), yoff + height / 2.2 * scale],
    [xoff - (-22 * scale), yoff + height / 3.5 * scale],
    [xoff - (-22 * scale), yoff + height / 3.5 * scale],
    [xoff - (-8 * scale), yoff + height / 4 * scale],
    [xoff - (-8 * scale), yoff],



  ])
]


xoff = bt.rand() * 10 + 100
yoff = bt.rand() * 40 + 10

var scale = (60 - yoff) / 100

const cactus2 = [
  bt.nurbs([
    [xoff - (5 * scale), yoff],
    [xoff - (5 * scale), yoff + height / 5 * scale],
    [xoff - (20 * scale), yoff + height / 4 * scale],
    [xoff - (25 * scale), yoff + height / 2.5 * scale],
    [xoff - (21 * scale), yoff + height / 2.3 * scale],
    [xoff - (17 * scale), yoff + height / 2.5 * scale],
    [xoff - (15 * scale), yoff + height / 3.5 * scale],
    [xoff - (7 * scale), yoff + height / 3.5 * scale],
    [xoff - (7 * scale), yoff + height / 1.7 * scale],
    [xoff - (2 * scale), yoff + height / 1.5 * scale],
    [xoff - (-3 * scale), yoff + height / 1.7 * scale],
    [xoff - (-3 * scale), yoff + height / 3 * scale],
    [xoff - (-12 * scale), yoff + height / 3 * scale],
    [xoff - (-13 * scale), yoff + height / 2.2 * scale],
    [xoff - (-17.5 * scale), yoff + height / 2 * scale],
    [xoff - (-22 * scale), yoff + height / 2.2 * scale],
    [xoff - (-22 * scale), yoff + height / 3.5 * scale],
    [xoff - (-22 * scale), yoff + height / 3.5 * scale],
    [xoff - (-8 * scale), yoff + height / 4 * scale],
    [xoff - (-8 * scale), yoff],



  ])
]


drawLines(ground, { fill: "#FAA41B", stroke: "#29636A" });
drawLines(down, { fill: "#F4CA90", stroke: "#F4CA90" });
drawLines(middle1, { fill: "#C7B087", stroke: "#C7B087" });
drawLines(middle2, { fill: "#99977E", stroke: "#99977E" });
drawLines(top, { fill: "#6C7D75", stroke: "#6C7D75" });
drawLines(sun, { fill: "#FCE9BB", stroke: "#FCE9BB" });
drawLines(mount, { fill: "#B13733", stroke: "#B13733" });

drawLines(mount3, { fill: "#D13D32", stroke: "#D13D32" });
drawLines(mount2, { fill: "#F76642", stroke: "#F76642" });
drawLines(river, { fill: "#194959", stroke: "#002C40" });
drawLines(cactus1, { fill: "#639139", stroke: "#303931" });
drawLines(cactus2, { fill: "#639139", stroke: "#303931" });
//drawLines(mt2, { fill: "#7E2E49", stroke: "#002C40" });

//1E383D