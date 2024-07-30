/*
@title: Burger
@author: Dhyan99
@snapshot: image-1.png
*/

setDocDimensions(1250, 700);

// Settings
const seedTop = 7426;
//

let pattyY;
let lettuceY;
let tomatoYStart;

const yVals = [415,342.5,280]
const receiptYVals = [410,330,250]
const receiptXVals = [900,870,840]
const items = ["lettuce","patty","tomato"]

function setOrder(o,pos) {
  switch(o){
    case 0:
      lettuce(50,pos)
      break;
    case 1:
      patty(50,pos)
      break;
    case 2:
      tomato(50,pos)
      break;
  }
}
bt.setRandSeed(seedTop)
for(let i = 0; i<3; i++){
const rand = bt.randIntInRange(0, 2)
setOrder(rand,yVals[i])
  switch(rand){
    case 0:
        l(receiptXVals[i] + 100,receiptYVals[i])
        e(receiptXVals[i] + 150,receiptYVals[i])
        t(receiptXVals[i] + 200,receiptYVals[i])
        break;
    case 1:
        p(receiptXVals[i] + 100,receiptYVals[i])
        a(receiptXVals[i] + 150,receiptYVals[i])
        t(receiptXVals[i] + 200,receiptYVals[i])
        break;
    case 2:
        t(receiptXVals[i] + 100,receiptYVals[i])
        o(receiptXVals[i] + 150,receiptYVals[i])
        m(receiptXVals[i] + 200,receiptYVals[i])
  }
}

function last3digits(number) {
    let lastThreeDigits = number % 1000;
    let digitsArray = lastThreeDigits.toString().split('').map(Number);
    return digitsArray;
}

const seedBottom = ((seedTop * 63) % 42) + 79;

const myTurtleTop = new bt.Turtle();
myTurtleTop.jump([600, 390]);
myTurtleTop.right(-90);
myTurtleTop.arc(180, 200);
myTurtleTop.goTo([600, 390]);
let polylinesTop = myTurtleTop.lines();
bt.scale(polylinesTop, [1.5, 0.8]);
bt.setRandSeed(seedTop);

const sesameSeedsTop = [];
const numSeedsTop = 35;

for (let i = 0; i < numSeedsTop; i++) {
  const x = bt.randInRange(180, 600);
  const y = bt.randInRange(440, 515);

  sesameSeedsTop.push([
    [x, y],
    [x + 2, y + 5],
    [x - 2, y + 5],
    [x, y]
  ]);
}

const myTurtleBottom = new bt.Turtle();
myTurtleBottom.jump([200, 225]);
myTurtleBottom.right(90);
myTurtleBottom.arc(180, 200);
myTurtleBottom.goTo([200, 225]);
let polylinesBottom = myTurtleBottom.lines();
bt.scale(polylinesBottom, [1.5, 0.8]);
bt.setRandSeed(seedBottom);

const sesameSeedsBottom = [];
const numSeedsBottom = 35;

for (let i = 0; i < numSeedsBottom; i++) {
  const x = bt.randInRange(180, 600);
  const y = bt.randInRange(100, 175);

  sesameSeedsBottom.push([
    [x, y],
    [x + 2, y + 5],
    [x - 2, y + 5],
    [x, y]
  ]);
}


bt.setRandSeed(seedTop)

function patty(x,y){
pattyY = y - 20
const pattyTurtle = new bt.Turtle();
pattyTurtle.jump([115, pattyY]);
pattyTurtle.right(180);
pattyTurtle.arc(180, 20);
const pattyDetail = 1150;
const pattyAmplitude = 1;

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5);
  const y = pattyY - 40 + pattyAmplitude * Math.sin(i * Math.PI / 10);
  pattyTurtle.goTo([x, y]);
}
pattyTurtle.arc(180, 20);

for (let i = 0; i < pattyDetail; i++) {
  const x = 115 + (i * 0.5);
  const y = pattyY + pattyAmplitude * Math.sin(i * Math.PI / 10);
  pattyTurtle.goTo([x, y]);
}
const randx = bt.randInRange(200, 450)
pattyTurtle.step([0, 10])
pattyTurtle.goTo([115, pattyY + 10])
pattyTurtle.step([0, -10])
pattyTurtle.step([randx, 0])
pattyTurtle.up()
pattyTurtle.step([0, 10])
pattyTurtle.down()
pattyTurtle.goTo([randx + 150, pattyY - 60])
pattyTurtle.goTo([randx + 210, pattyY + 10])

let pattyPolylines = pattyTurtle.lines();
drawLines(pattyPolylines)
}


function lettuce(x,y){
  lettuceY = y - 35.0
const squiggleTurtle = new bt.Turtle();
squiggleTurtle.jump([115, lettuceY]);
squiggleTurtle.right(0);
const squiggleDetail = 150;
const squiggleAmplitude = 35;
const randDist = bt.randInRange(5, 10)
for (let h = 0; h < 3; h++) {
  for (let i = 0; i < squiggleDetail; i++) {
    const x = 100 + (i * 4) + (randDist * h);
    const y = lettuceY + squiggleAmplitude * Math.sin(i * Math.PI / 10);
    if (i == 0) {
      squiggleTurtle.jump([x, y]);
    } else {
      squiggleTurtle.goTo([x, y]);
    }
  }
}
let squigglePolylines = squiggleTurtle.lines();
drawLines(squigglePolylines)
}


function tomato(x,y){
const tomatoTurtle = new bt.Turtle();
const numTomatoes = 4;
const tomatoRadius = 32;
const tomatoThickness = 11;
const tomatoXStart = x + 300;
tomatoYStart = y - 100;

bt.setRandSeed(bt.randInRange(0,100008) + 50)
bt.setRandSeed(seedTop + bt.randInRange(0,100008))

for (let i = 0; i < numTomatoes; i++) {
  const x = tomatoXStart + i * 53;
  const y = tomatoYStart;
  let yrand = 0;
  if (i % 2 == 0) {
    yrand = 65
  }
  const xrand = bt.randInRange(-10, 10)

  tomatoTurtle.jump([x - tomatoRadius + xrand, y + yrand]);
  tomatoTurtle.right(0);
  tomatoTurtle.arc(360, tomatoRadius);

  tomatoTurtle.jump([x - tomatoRadius + xrand, y - tomatoThickness + yrand]);
  tomatoTurtle.right(0);
  tomatoTurtle.arc(360, tomatoRadius);

  tomatoTurtle.jump([x - tomatoRadius + xrand, y + yrand]);
  tomatoTurtle.goTo([x - tomatoRadius + xrand, y - tomatoThickness + yrand]);

}

let tomatoPolylines = tomatoTurtle.lines();
bt.scale(tomatoPolylines, [3, 0.5])
drawLines(tomatoPolylines)
}

  
const receiptTurtle = new bt.Turtle();
const receiptX = 850
const xVals = [925,1000,1075]

receiptTurtle.jump([receiptX, 550]);
receiptTurtle.step([276,0])
receiptTurtle.arc(-35,108)
receiptTurtle.arc(-88,43)
receiptTurtle.arc(48,476)
receiptTurtle.step([-317,0])
receiptTurtle.right(-191)
receiptTurtle.arc(-57,257)
receiptTurtle.arc(53,243)
receiptTurtle.up()
receiptTurtle.step([15,-130])
receiptTurtle.down()
receiptTurtle.step([305,0])
receiptTurtle.up()
receiptTurtle.step([-30,-80])
receiptTurtle.down()
receiptTurtle.step([-305,0])
receiptTurtle.up()
receiptTurtle.step([-30,-80])
receiptTurtle.down()
receiptTurtle.step([320,0])
receiptTurtle.up()
receiptTurtle.step([0,-80])
receiptTurtle.down()
receiptTurtle.step([-328,0])
receiptTurtle.up()
receiptTurtle.step([20,-80])
receiptTurtle.down()
receiptTurtle.step([320,0])
const last3 = last3digits(seedTop)
for(let i = 0; i<3; i++){
  let input = last3[i]
  const y = 540
      switch (input) {
        case 0:
            zero(xVals[i], y);
            break;
        case 1:
            one(xVals[i], y);
            break;
        case 2:
            two(xVals[i], y);
            break;
        case 3:
            three(xVals[i], y);
            break;
        case 4:
            four(xVals[i], y);
            break;
        case 5:
            five(xVals[i], y);
            break;
        case 6:
            six(xVals[i], y);
            break;
        case 7:
            seven(xVals[i], y);
            break;
        case 8:
            eight(xVals[i], y);
            break;
        case 9:
            nine(xVals[i], y);
            break;
        default:
            break;
    }
}
let receiptPolylines = receiptTurtle.lines();

function zero(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-100])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,100])
  drawLines(zeroTurtle.lines())
}

function one(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.up()
  zeroTurtle.step([50,0])
  zeroTurtle.down()
  zeroTurtle.step([0,-100])
  drawLines(zeroTurtle.lines())
}

function two(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([50,0])
  drawLines(zeroTurtle.lines())
}

function three(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  drawLines(zeroTurtle.lines())
}

function four(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,50])
  zeroTurtle.step([0,-100])
  drawLines(zeroTurtle.lines())
}

function five(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  drawLines(zeroTurtle.lines())
}

function six(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,50])
  drawLines(zeroTurtle.lines())
}

function seven(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-100])
  drawLines(zeroTurtle.lines())
}

function eight(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-50])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,100])
  drawLines(zeroTurtle.lines())
}

function nine(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([50,0])
  zeroTurtle.step([0,-100])
  zeroTurtle.step([0,50])
  zeroTurtle.step([-50,0])
  zeroTurtle.step([0,50])
  drawLines(zeroTurtle.lines())
}

function p(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([0,30])
  zeroTurtle.step([0,-60])
  drawLines(zeroTurtle.lines())
}

function a(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([0,-60])
  zeroTurtle.step([0,30])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([0,30])
  zeroTurtle.step([0,-60])
  drawLines(zeroTurtle.lines())
}

function t(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([-15,0])
  zeroTurtle.step([0,-60])
  drawLines(zeroTurtle.lines())
}

function l(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([0,-60])
  zeroTurtle.step([30,0])
  drawLines(zeroTurtle.lines())
}

function e(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([30,0])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([30,0])
  drawLines(zeroTurtle.lines())
}

function o(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([0,-60])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([0,60])
  drawLines(zeroTurtle.lines())
}

function m(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([0,-60])
  zeroTurtle.step([0,60])
  zeroTurtle.step([15,-30])
  zeroTurtle.step([15,30])
  zeroTurtle.step([0,-60])
  drawLines(zeroTurtle.lines())
}

function fancyOne(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([15,0])
  zeroTurtle.step([0,-60])
  zeroTurtle.step([15,0])
  zeroTurtle.step([-30,0])
  drawLines(zeroTurtle.lines())
}

function fancyTwo(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([30,0])
  drawLines(zeroTurtle.lines())
}

function fancyThree(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.step([30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([-30,0])
  zeroTurtle.step([30,0])
  zeroTurtle.step([0,-30])
  zeroTurtle.step([-30,0])
  drawLines(zeroTurtle.lines())
}

function dash(x,y){
  const zeroTurtle = new bt.Turtle();
  zeroTurtle.jump([x,y])
  zeroTurtle.up()
  zeroTurtle.step([0,-30])
  zeroTurtle.down()
  zeroTurtle.step([30,0])
  drawLines(zeroTurtle.lines())
}

fancyOne(900,410)
dash(950,410)
fancyTwo(870,330)
dash(920,330)
fancyThree(840,250)
dash(890,250)



/*
bt.scale(flaglines, [1, -1])
bt.scale(flaglines, [0.5, 0.5])
bt.translate(flaglines, [275, 510])
const flagX = bt.randInRange(-100, 100)
bt.translate(flaglines, [flagX, 0])
*/

drawLines(polylinesTop);
drawLines(sesameSeedsTop);
//drawLines(pattyPolylines);
//drawLines(squigglePolylines);
//drawLines(tomatoPolylines);
drawLines(polylinesBottom);
drawLines(sesameSeedsBottom);
drawLines(receiptPolylines);

//drawLines(flaglines)
