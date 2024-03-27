/*
@title: linesCircles
@author: yutaro
@snapshot: s1.png
*/

// welcome to blot!

const width = 125;
const height = 125;

setDocDimensions(width, height);

const c = 3.1;
let radius = 60;
let divisions = 60;
let divAngle = 2*Math.PI/divisions;

function mathf(x){
  return x*c;
}

class vec{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

function divPos(num){
  let x = Math.cos(divAngle*num)*radius;
  let y = Math.sin(divAngle*num)*radius;
  return new vec(x,y);
}

function line(turtle,startx, starty, endx, endy){
  turtle.jump([startx,starty]);
  turtle.goTo([endx,endy]);
}

const testTurtle = createTurtle();

for (let i = 0; i < divisions; i++) {
    let x = i;
    let y = mathf(x);
    let startPos = divPos(x);
    let endPos = divPos(y);
    line(testTurtle,startPos.x,startPos.y,endPos.x,endPos.y);
}



testTurtle.translate(
  [width/2, height/2], 
  testTurtle.cc
);

testTurtle.jump(testTurtle.cb);
testTurtle.arc(360,radius);

drawTurtles([
    testTurtle
]);