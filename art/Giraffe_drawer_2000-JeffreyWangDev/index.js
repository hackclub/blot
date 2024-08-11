/*
@title: yourTitle
@author: yourName
@snapshot: 0.png
*/



let size = [125,125]
// let ranSeed = 123221345;
// bt.setRandSeed(ranSeed);


setDocDimensions(size[0],size[1])
var polylines = [[[0, 0], [10, 10], [20, 20]]];
polylines = bt.translate(polylines,[126/2,125/2])

function drawCircle(x,y,r){
  const myTurtle = new bt.Turtle()
    .jump([x, y-r])
    .arc(360,r);
  const position = myTurtle.pos; // Gets the current position of the turtle
  const path = myTurtle.path;
  drawLines(path)
}

function drawGiraffe(x,y,bodySize,legSize,neckSize,headSize){
  const myTurtle = new bt.Turtle()
    .jump([x, y-bodySize])
    .up()
    .arc(30,bodySize)
    .down()
    .arc(130,bodySize)
    .up()
    .arc(40,bodySize)
    .down()
    .arc(130,bodySize)
    .setAngle(-90)
    .forward(legSize)
    .left(90)
    .forward(bodySize/3)
    .left(90)
    .forward(legSize)
    .right(90)
    .forward(bodySize/3)
    .right(90)
    .forward(legSize)
    .left(90)
    .forward(bodySize/3)
    .left(90)
    .forward(legSize)
    .setAngle(0)
    .jump([x, y-bodySize])
    .up()
    .arc(30,bodySize)
    .arc(130,bodySize)
    .down()
    .setAngle(90)
    .forward(neckSize)
    .setAngle(0)
    .arc(90,headSize)
    .setAngle(90)
    .forward(headSize)
    .arc(90,headSize)
    .forward(bodySize/2.9*2)
    .arc(90,headSize)
    .forward(headSize)
    .arc(90,headSize)
    .right(90)
    .forward(neckSize)
    .up()
    
    // Face
    .forward(0-neckSize)
    .setAngle(90)
    .arc(90,headSize)
    .down()
    .setAngle(0)
    .forward(bodySize/2.9*2+headSize*2)
    .up()
    .setAngle(180)
    .forward((bodySize/2.9*2+headSize*2)/4*3)
    .setAngle(-90)
    .forward(-headSize/3)
    .setAngle(-90)
    .arc(30,bodySize/2.9/2+headSize/2)
    .down()
    .arc(120,bodySize/2.9/2+headSize/2)
    .up()
    .arc(300,bodySize/3.3/2+headSize/2)
    .down()
    .setAngle(-90)
    .forward(headSize/2)
    .right(90)
    .forward(headSize/2)
    .right(180)
    .forward(headSize)
    .right(180)
    .forward(headSize/2)
    .up()
    .right(90)
    .forward(headSize*5/2)
    .right(90)
    .forward(bodySize/2.9)
    .setAngle(90)
    .down()
    .arc(360,1)
    .up()
    .setAngle(0)
    .forward(0-bodySize/2.9*2)
    .setAngle(-90)
    .down()
    .arc(360,1)
    .setAngle(0)
    .up()


    // Antennas
    .jump([x, y-bodySize])
    .up()
    .arc(30,bodySize)
    .arc(130,bodySize)
    .arc(40,bodySize)
    .arc(130,bodySize)
    .setAngle(-90)
    .forward(legSize)
    .left(90)
    .forward(bodySize/3)
    .left(90)
    .forward(legSize)
    .right(90)
    .forward(bodySize/3)
    .right(90)
    .forward(legSize)
    .left(90)
    .forward(bodySize/3)
    .left(90)
    .forward(legSize)
    .setAngle(0)
    .jump([x, y-bodySize])
    .arc(30,bodySize)
    .arc(130,bodySize)
    .setAngle(90)
    .forward(neckSize)
    .setAngle(0)
    .arc(90,headSize)
    .setAngle(90)
    .forward(headSize)
    .arc(90,headSize)
    .down()
    .setAngle(80)
    .forward(headSize)
    .setAngle(0)
    .arc(360,0.5)
    .setAngle(80)
    .up()
    .forward(-headSize)
    .setAngle(180)
    .forward(bodySize/2.9*2)
    .down()
    .setAngle(100)
    .forward(headSize)
    .setAngle(0)
    .arc(360,0.5)
  const position = myTurtle.pos; // Gets the current position of the turtle
  const path = myTurtle.path;
  drawLines(path)
}
const head = bt.rand()*6+2;
const neck = bt.rand()*60;
const body = bt.rand()*25;
const legs = bt.rand()*30;
  drawGiraffe(125/2,125/3,body,legs,neck,head)
