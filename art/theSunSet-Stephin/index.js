/*
@title: TheSunSet
@author: StephinS
@snapshot: mainImage.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

bt.setRandSeed(14);

const t = new bt.Turtle()

const roof = bt.catmullRom([ [10, 46], [26, 68], [41, 46]])
const river = [
  ...bt.catmullRom([[0, 0],[26, 13], [71, 17], [110, 36], [125, 50]]),
  ...bt.catmullRom([[125, 16], [103, 8],[67, 1], [0, 0] ])
]
const mountain1 = bt.catmullRom([ [0, 78], [34, 109], [76, 76]])
const mountain2 = bt.catmullRom([ [67, 85], [93, 110], [125, 76]])

t.jump([12, 50]).right(90).forward(20).left(90).forward(27).left(90).forward(20).left(90).forward(27)

t.jump([48, 102]).right(118)
for (let x = 0; x < 129; x++) {
    t.forward(0.3)
    t.right(1)
}
function startOf(x,y){
  t.up();
  t.setAngle(0);
  t.goTo([x,y]);
  t.down();
}
function fd(size){
  t.forward(size);
}
function upperW(x,y,size){
  startOf(x,y+size);
  t.setAngle(-80);
  fd(size);
  t.setAngle(70);
  fd(size/2);
  t.setAngle(-70);
  fd(size/2);
  t.setAngle(80);
  fd(size);
}
function upperE(x,y,size){
  startOf(x,y);
  t.setAngle(90);
  t.forward(size);
  t.right(90);
  t.forward(size/1.5);
  t.up();
  t.goTo([x,y+size/2]);
  t.down();
  t.forward(size/1.5);
  t.up();
  t.goTo([x,y]);
  t.down();
  t.forward(size/1.5);
}
function upperL(x,y,size){
  startOf(x+size/8,y);
  t.setAngle(90);
  fd(size);
  startOf(x+size/8,y);
  fd(size/3*2);
}
function upperC(x,y,size){
  startOf(x+size/2,y+size);
  t.arc(200, -size/2);
}
function upperO(x,y,size){
  startOf(x+size/2.5,y);
  t.arc(-180,-size/2.1);
  t.arc(-180,-size/2.1);
}
function upperM(x,y,size){
  startOf(x,y);
  t.setAngle(90);
  fd(size);
  t.right(130);
  fd(size/2);
  t.left(80);
  fd(size/2);
  t.setAngle(270);
  fd(size);
}
upperW(30, 115, 5)
upperE(35, 115, 5)
upperL(40, 115, 5)
upperC(45, 115, 5)
upperO(50, 115, 5)
upperM(55, 115, 5)
upperE(60, 115, 5)


function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}
const drawBirds=(x, y, scale)=>{
  t.setAngle(0)
 t.jump([x, y]).forward(scale*2.5).right(45).forward(scale*2).right(180).forward(scale*2).right(45).forward(scale*2.5)  
}

const birdSeed = getRandomInt(1, 15)
for(let i=0; i < birdSeed; i++){
  drawBirds(getRandomInt(10, 120), getRandomInt(90, 120), 1)
}


drawLines([roof, ...t.lines(), river, mountain1, mountain2])
