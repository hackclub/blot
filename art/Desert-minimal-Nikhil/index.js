/*
@title: Desert 
@author: Nikhil
@snapshot: Desert-minimal.png
*/

const width = 180;
const height = 115;

setDocDimensions(width, height);
const turtle = new bt.Turtle()


//constants
const sunRad = 9;
const sunRays = 20;
const randomrays = bt.randIntInRange(5, 8)
const randomrays1 = bt.randIntInRange(10, 17)
const random = bt.randInRange;
const randnum1 = bt.randIntInRange(10, 30)
const randnum2 = bt.randIntInRange(10, 30)
const finalLines = [];
const randx = bt.randIntInRange(0, 10)
const randy = bt.randIntInRange(30, 60)

// Pyramid 1
const leftmount = [
  bt.nurbs([
    [0, randy + 0],
    [randnum1, 79],
    [randnum1, 60],
    [67.5, randy + 0]
  ])
]

bt.iteratePoints(leftmount, (pt, t) => {
  const [x, y] = pt;
  const freq = 0;
  const dy = bt.noise(t * 25, { octaves: -1 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})
bt.join(finalLines, leftmount);


// pyramid 2
const rightmount = [
  bt.nurbs([
    [67.5, randy + 0],
    [randnum2 + 70, 90],
    [randnum2 + 70, 60],
    [width, randy + 0]
  ])
]

bt.iteratePoints(rightmount, (pt, t) => {
  const [x, y] = pt;
  const freq = 1.00;
  const dy = bt.noise(t * 25, { octaves: -1 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})
bt.join(finalLines, rightmount);


//sun
turtle.jump([sunRad, height]).setAngle(270).down().arc(-90, sunRad); // circle
for (let i = 1; i < sunRays + 65; i++) {
  let angle = -i / (sunRays + 1) * 90;
  let distance = i % 2 == 1 ? randomrays1 : randomrays;
  turtle.jump([sunRad, height]).setAngle(270).down().arc(angle, sunRad); // go to pos
  turtle.setAngle(angle).up().forward(0.2).down().forward(distance); // sun ray
}

const sunraystrim = [[[48, 115], [10, 168], [20, 20]]];
bt.trim(sunraystrim, 0.25, 0.75);


// random cactus position

//cactus1
const r1posx = bt.randIntInRange(4.0, 17)
const r1posy = bt.randIntInRange(2.3, 4.8)
//cactus2
const r2posx = bt.randIntInRange(3.0, 1.5)
const r2posy = bt.randIntInRange(1.8, 4.0)
//cactus3
const r3posx = bt.randIntInRange(1.0, 1.1)
const r3posy = bt.randIntInRange(1.8, 5.0)


// random cactus shape - inspired from augustin

//cactus1
//right
const rc1 = bt.randIntInRange(13, 21)
const rc2 = bt.randIntInRange(35, 45)
//mid
const rc3 = bt.randIntInRange(41, 49)
const rc4 = bt.randIntInRange(50, 70)
//left
const rc6 = bt.randIntInRange(20, 33)
const rc7 = bt.randIntInRange(37, 62)
const rc10 = bt.randIntInRange(0, -3)
//bottom
const rc8 = bt.randIntInRange(15, 25)
const rc9 = bt.randIntInRange(9, 14)

//cactus2
//right
const rc11 = bt.randIntInRange(13, 21)
const rc12 = bt.randIntInRange(35, 45)
//mid
const rc13 = bt.randIntInRange(41, 49)
const rc14 = bt.randIntInRange(50, 70)
//left
const rc16 = bt.randIntInRange(20, 33)
const rc17 = bt.randIntInRange(37, 62)
const rc110 = bt.randIntInRange(0, -3)
//bottom
const rc18 = bt.randIntInRange(15, 25)
const rc19 = bt.randIntInRange(9, 14)

//cactus3
//right
const rc21 = bt.randIntInRange(13, 21)
const rc22 = bt.randIntInRange(35, 45)
//mid
const rc23 = bt.randIntInRange(51, 65)
const rc24 = bt.randIntInRange(60, 80)
//left
const rc26 = bt.randIntInRange(20, 33)
const rc27 = bt.randIntInRange(37, 62)
const rc210 = bt.randIntInRange(0, -3)
//bottom
const rc28 = bt.randIntInRange(15, 25)
const rc29 = bt.randIntInRange(9, 14)


//cactus

const cactus1 = [
  bt.nurbs([
    [9, rc8],
    [7, 25],
    [6, rc6],
    [rc10, 35],
    [rc10, rc7],
    [5, 35],
    [7, 33],
    [5, rc3],
    [10, rc4],
    [16, rc3],
    [13, 33],
    [15, 29],
    [16, 33],
    [15, 36],
    [21, rc2],
    [20, 33],
    [20, 31],
    [rc1, 25],
    [11, 21],
    [rc9, rc8]  ])
];

const cactus2 = [
  bt.nurbs([
    [9, rc18],
    [7, 25],
    [6, rc16],
    [rc110, 35],
    [rc110, rc17],
    [5, 35],
    [7, 33],
    [5, rc13],
    [10, rc14],
    [16, rc13],
    [13, 33],
    [15, 29],
    [16, 33],
    [15, 36],
    [21, rc12],
    [20, 33],
    [20, 31],
    [rc11, 25],
    [11, 21],
    [rc19, rc18]  ])
];

const cactus3 = [
  bt.nurbs([
    [9, rc28],
    [7, 25],
    [6, rc26],
    [rc210, 35],
    [rc210, rc27],
    [5, 35],
    [7, 33],
    [5, rc23],
    [10, rc24],
    [16, rc23],
    [13, 33],
    [15, 29],
    [16, 33],
    [15, 36],
    [21, rc22],
    [20, 33],
    [20, 31],
    [rc21, 25],
    [11, 21],
    [rc29, rc28]  ])
];


// centering

function centerPolylines(polylines, documentWidth, documentHeight) {
  const cc = bt.bounds(polylines).cc;
  bt.translate(polylines, [documentWidth / 5.0, documentHeight / 1.3], cc);
};

function centerCactus1(cactus1, documentWidth, documentHeight) {
  const cc = bt.bounds(cactus1).cc;
  bt.translate(cactus1, [documentWidth / r1posx, documentHeight / r1posy], cc);
};

function centerCactus2(cactus2, documentWidth, documentHeight) {
  const cc = bt.bounds(cactus2).cc;
  bt.translate(cactus2, [documentWidth / r2posx, documentHeight / r2posy], cc);
};

function centerCactus3(cactus3, documentWidth, documentHeight) {
  const cc = bt.bounds(cactus3).cc;
  bt.translate(cactus3, [documentWidth / 1.1, documentHeight / r3posy], cc);
};



//printing

let sun = turtle.lines()
centerCactus1(cactus1, width, height)
centerCactus2(cactus2, width, height)
centerCactus3(cactus3, width, height)
centerPolylines(sun, width, height)
drawLines(sun);
drawLines(finalLines);
drawLines(cactus1);
drawLines(cactus2);
drawLines(cactus3);
