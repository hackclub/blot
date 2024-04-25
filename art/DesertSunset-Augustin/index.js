/*
@title: Desert Sunset
@author: Augustin Z 
@snapshot: desert2.png
*/
const width = 125
const height = 125
setDocDimensions(width, height);

const randx = bt.randIntInRange(0, 10)
//I thought the changing y-values looked nauseous when you run it continuously
const randy = bt.randIntInRange(32, 32)

const birdLines = []
const birdleft = [
  bt.nurbs([
    [0,0],
    [3,6],
    [6,0]
  ])
]
const birdright = [
  bt.nurbs([
    [6,0],
    [10,6],
    [12,0]
  ])
]
const birdleft1 = [
  bt.nurbs([
    [15,0],
    [18,6],
    [21,0]
  ])
]
const birdright1 = [
  bt.nurbs([
    [21,0],
    [25,6],
    [27,0]
  ])
]

const birdleft2 = [
  bt.nurbs([
    [9,5],
    [12,11],
    [15,5]
  ])
]
const birdright2 = [
  bt.nurbs([
    [15,5],
    [19,11],
    [21,5]
  ])
]

bt.join(birdLines, birdleft, birdright, birdleft1, birdright1, birdleft2, birdright2)
const randinsky = bt.randIntInRange(75,115)
const randinskx = bt.randIntInRange(0,96)
bt.translate(birdLines, [randinskx,randinsky], [0,0])
bt.copy(birdLines)



const sun = [
  bt.nurbs([
    [32.5, randy + 20],
    [32.5, randy + 45],
    [62.5, randy + 63],
    [92.5, randy + 45],
    [92.5, randy + 20]
  ])
]

const cactus = [
  bt.nurbs([
    [10, 0],
    [10, 20],
    [0, 30],
    [0, 40],
    [3, 50],
    [5, 35],
    [7, 32],
    [8, 60],
    [10, 65],
    [12, 60],
    [13, 28],
    [14, 26],
    [15, 27],
    [16, 35],
    [17, 37],
    [18, 34],
    [19, 30],
    [19, 25],
    [13, 16],
    [14, 0]
  ])
]


const road = [
  [
    [15, 0],
    [57.5, randy + 20],
    [67.5, randy + 20],
    [110, 0]
  ]
]

const land = [
  [
    [0, randy + 20],
    [125, randy + 20],
    [125, 0],
    [0, 0]
  ]
]

const sky = [
  [
    [0, randy + 20],
    [125, randy + 20],
    [125, height],
    [0, height]
  ]
]

/*for (let i = 0; i < 51; i++) {
  t.forward(i);
}
*/
const randomnum = bt.randIntInRange(10, 50)
const randomnum2 = bt.randIntInRange(10, 50)
const finalLines = [];

const leftmount = [
  bt.nurbs([
    [0, randy + 20],
    [randomnum, 79],
    [randomnum, 60],
    [57.5, randy + 20]
  ])
]

const rightmount = [
  bt.nurbs([
    [67.5, randy + 20],
    [randomnum2 + 70, 76],
    [randomnum2 + 70, 55],
    [width, randy + 20]
  ])
]

bt.iteratePoints(rightmount, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})
bt.join(finalLines, rightmount);

bt.iteratePoints(leftmount, (pt, t) => {
  const [x, y] = pt;
  const freq = 3.58;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})
bt.join(finalLines, leftmount);

//shadows

const rightshadow = [
  bt.nurbs([
    [67.5, randy + 20],
    [randomnum2 + 70, 45],
    [randomnum2 + 70, 55],
    [width, randy + 20]
  ])
]

bt.iteratePoints(rightshadow, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 25, { octaves: 3 }) * -17 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

const leftshadow = [
  bt.nurbs([
    [0, randy + 20],
    [randomnum, 40],
    [randomnum, 50],
    [57.5, randy + 20]
  ])
]

bt.iteratePoints(leftshadow, (pt, t) => {
  const [x, y] = pt;
  const freq = 0.85;
  const dy = bt.noise(t * 25, { octaves: 3 }) * -17 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})




//road lines
const t = new bt.Turtle();
for (let i = 0; i < 3; i++) {
  t.jump([62 - i, randy + 20 - 6 * i * (i + 1 / 2)])
  t.forward(2 * (i + 1))
  t.right(80)
  t.forward(5 * (i + 1))
  t.left(-100)
  t.forward(4 * (i + 1))
  t.right(100)
  t.forward(5 * (i + 1))
  t.right(-100)
  t.right(180)
}




// draw it

drawLines(sky, { fill: "Tomato" });
drawLines(land, { fill: "Peru" });
drawLines(sun, { fill: "orange" });
drawLines(finalLines, { fill: "Black" });
drawLines(leftshadow, { fill: "Sienna" });
drawLines(rightshadow, { fill: "Sienna" });
drawLines(road, { fill: "gray" });
drawLines(t.lines(), { fill: "yellow" });
drawLines(cactus, { fill: "YellowGreen" });
drawLines(birdLines);