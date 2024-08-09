/*
@title: Flowers in the Sun
@author: Aryan
@snapshot: 1.png
*/

const width = 125;
const height = 125;

const numrays = 15;
const numflowers = 10; //is multiplied by 4

const xCircle = bt.randIntInRange(15, 110);
const yCircle = bt.randIntInRange(90,110);
const rCircle = bt.randIntInRange(5,10);

setDocDimensions(width, height);
const t = new bt.Turtle();

// store final lines here
const finalLines = [];

//draw the sun
function sunDraw(X,Y,radius){
  circleDraw(X,Y,radius);

  var curangle = 0
  for (let i = 0; i < numrays; i++) {
    linedraw(X,Y,radius, curangle);
    t.right(curangle);
    curangle += 360/numrays;
  }
}
// draw the lines for the sun
function linedraw(X,Y,length, angle){
  t.up();
  t.goTo([X,Y]);
  t.left(angle);
  t.forward(length+2);
  t.down()
  //starts drawing line
  t.forward(2)
}
// draw the sun circle
function circleDraw(X, Y, radius) {
  t.jump([X, Y - radius]);
  t.down();
  t.arc(360, radius);
}
//draw a petal for flower
function Petal() {
  t.forward(2);
  t.arc(180, 1);
  t.forward(2);
  t.right(180)
}
//draw a flower
function drawFlower(x, y) {
  t.jump([x,y]); 
  for (let i = 0; i < 8; i++) {
    Petal();
    t.right(45);
  }
}
//draw a flower field
function drawField(){
  for(let i=0; i<4; i++){
    for(let j=0; j<numflowers; j++){
      drawFlower(bt.randIntInRange(5, 120), bt.randIntInRange(3*i+10, 3+10*(i+1)));
    }
  }
}
//draws a horizon kinda thing

// draw it
sunDraw(xCircle, yCircle, rCircle);
drawField();
drawLines(t.lines());
drawLines(finalLines);