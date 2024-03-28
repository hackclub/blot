// check out the workshop tab to get started
// welcome to blot!
// check out this guide to learn how to program here
// https://blot.hackclub.com/editor?guide=start

/*
@title: funny text generator
@author: Alan An
@snapshot: blog!2.png
*/

const width = 400;
const height = 205;

let input = "abcdefghijklmnopqrstuvwxyz";
input = "blog!-alan";

setDocDimensions(width, height);

drawLines([
  //[[0,0], [width, height]]
  
])

bt.setRandSeed(14);

const finalPolylines = [];
const t = new bt.Turtle();

// for (let i = 0; i < 51; i++) {
//   t.forward(i);
//   t.right(91);
// }

function startOf(x,y){
  t.up();
  t.setAngle(0);
  t.goTo([x,y]);
  t.down();
}
function fd(size){
  t.forward(size);
}

function upperA(x,y,size){
  t.up();
  t.goTo([x,y]);
  t.setAngle(70);
  t.down();
  t.forward(size);
  t.right(140);
  t.forward(size);
  t.up();
  t.goTo([x+(size/7),y+(size/2.5)]);
  t.setAngle(0);
  t.down();
  t.forward(size/2.5);
}
function upperB(x,y,size){
  t.up();
  t.goTo([x+size/5,y]);
  t.setAngle(90);
  t.down();
  t.forward(size);
  t.right(90);
  t.arc(-180,size/4);
  t.left(180);
  t.arc(-180,size/4);
}
function upperC(x,y,size){
  startOf(x+size/2,y+size);
  t.arc(200, -size/2);
}
function upperD(x,y,size){
  startOf(x + size/5,y);
  t.setAngle(90);
  t.forward(size);
  t.right(90);
  t.arc(-180,size/2);
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
function upperF(x,y,size){
  startOf(x,y);
  t.setAngle(90);
  t.forward(size);
  t.right(90);
  t.forward(size/1.5);
  t.up();
  t.goTo([x,y+size/2]);
  t.down();
  t.forward(size/1.5);
}
function upperG(x,y,size) {
  startOf(x+size/2.7, y+size);
  t.arc(270,-size/2.1);
  t.right(90);
  t.forward(size/2);
}
function upperH(x,y,size){
  startOf(x + size/5,y);
  t.setAngle(90);
  t.forward(size);
  t.up();
  t.goTo([x+size/5,y+size/2]);
  t.setAngle(0);
  t.down();
  fd(size/2.1);
  t.goTo([x+size/2.1+size/5,y]);
  t.setAngle(90);
  t.down();
  fd(size);
}
function upperI(x,y,size){
  startOf(x+size/2,y);
  t.setAngle(90);
  fd(size);
  t.right(90);
  fd(size/3);
  t.right(180);
  fd(size/3*2);
  t.up()
  t.left(90);
  fd(size);
  t.down();
  t.right(270);
  fd(size/3*2);
}
function upperJ(x,y,size){
  startOf(x+size/2,y+size/4);
  t.setAngle(90);
  fd(size/4*3);
  t.right(90);
  fd(size/3);
  t.right(180);
  fd(size/3*2);
  startOf(x+size/2,y+size/4);
  t.setAngle(90);
  t.arc(-180,-size/5)
}
function upperK(x,y,size){
  startOf(x+size/6,y);
  t.setAngle(90);
  fd(size);
  startOf(x+size/6,y+size/2);
  t.setAngle(50);
  fd(size/1.7);
  startOf(x+size/6,y+size/2);
  t.setAngle(-50);
  fd(size/1.7);
}
function upperL(x,y,size){
  startOf(x+size/8,y);
  t.setAngle(90);
  fd(size);
  startOf(x+size/8,y);
  fd(size/3*2);
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
function upperN(x,y,size){
  startOf(x,y);
  t.setAngle(90);
  fd(size);
  t.right(150);
  fd(size*1.1)
  t.left(150);
  fd(size);
}
function upperO(x,y,size){
  startOf(x+size/2.5,y);
  t.arc(-180,-size/2.1);
  t.arc(-180,-size/2.1);
}
function upperP(x,y,size){
  t.up();
  t.goTo([x+size/5,y]);
  t.setAngle(90);
  t.down();
  t.forward(size);
  t.right(90);
  t.arc(-180,size/4);
}
function upperQ(x,y,size){
  startOf(x+size/2.5,y);
  t.arc(-180,-size/2.1);
  t.arc(-180,-size/2.1);
  startOf(x+size/2.5,y+size/3);
  t.setAngle(-50);
  fd(size/2);
}
function upperR(x,y,size){
  t.up();
  t.goTo([x+size/5,y]);
  t.setAngle(90);
  t.down();
  t.forward(size);
  t.right(90);
  t.arc(-180,size/4);
  t.setAngle(-60);
  fd(size/1.7);
}
function upperS(x,y,size){
  startOf(x+size/5,y+size);
  t.arc(180,-size/4);
  t.arc(-180,-size/4);
}
function upperT(x,y,size){
  startOf(x+size/3,y);
  t.setAngle(90);
  fd(size);
  t.right(90);
  fd(size/5*2);
  t.right(180);
  fd(size/5*4);  
}
function upperU(x,y,size){
  startOf(x,y+size);
  t.setAngle(270);
  fd(size/3*2);
  t.arc(180,size/3);
  fd(size/3*2);
}
function upperV(x,y,size){
  startOf(x,y+size);
  t.setAngle(-70);
  fd(size);
  t.setAngle(70);
  fd(size);
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
function upperX(x,y,size){
  startOf(x,y+size);
  t.setAngle(-50);
  fd(size);
  startOf(x+size/5*3,y+size);
  t.setAngle(240);
  fd(size);
}
function upperY(x,y,size){
  startOf(x+size/2, y);
  t.setAngle(90);
  fd(size/2);
  t.setAngle(45);
  fd(size/1.75)
  startOf(x+size/2, y+size/2);
  t.setAngle(135);
  fd(size/1.75)
}
function upperZ(x,y,size){
  startOf(x+size/8,y+size/5*4);
  fd(size/5*4);
  t.setAngle(230);
  fd(size);
  t.setAngle(0);
  fd(size/5*4)
}
function dash(x,y,size){
  startOf(x+size/5,y+size/2);
  fd(size*4/5);  
}
function ex(x,y,size){
  startOf(x+size/2,y+size);
  t.setAngle(270);
  fd(size*5/6);
  t.up();
  fd(size/7)
  t.down();
  t.arc(360,0.25);
}
function quest(x,y,size){
  startOf(x+size/2,y+size/2);
  t.setAngle(270);
  fd(size*2/6);
  t.up();
  fd(size/7)
  t.down();
  t.arc(360,0.25);
  startOf(x+size/2,y+size/2);
  t.arc(270,size/4);
}
function period(x,y,size){
  startOf(x+size/7,y+size/20);
  t.arc(360,0.25);
}
function colon(x,y,size){
  startOf(x+size/2,y+size*3/4)
  t.arc(360,0.25)
  startOf(x+size/2,y+size*1/4)
  t.arc(360,0.25)
}
function comma(x,y,size){
  startOf(x+size/7,y+size/20);
  t.arc(360,0.25);
  t.setAngle(-60);
  fd(1);
}
function openParn(x,y,size){
  startOf(x+size/2.5,y);
  t.arc(-180,-size/2.1);
}
function closeParn(x,y,size){
  startOf(x+size/2.5,y+size);
  t.arc(-180,size/2.1);
}
function semicolon(x,y,size){
  startOf(x+size/2,y+size*3/4)
  t.arc(360,0.25)
  startOf(x+size/2,y+size*1/4)
  t.arc(360,0.25)
  t.setAngle(-60);
  fd(1);
}
function equAL(x,y,size){
  startOf(x+size/2,y+size*3/4)
  fd(size/3*2);
  startOf(x+size/2,y+size*1/4)
  fd(size/3*2);
}
function thwee(x,y,size){
  t.up();
  t.goTo([x+size/5,y]);
  t.setAngle(90);
  t.forward(size);
  t.down()
  t.right(90);
  t.arc(-180,size/4);
  t.left(180);
  t.arc(-180,size/4);
}
function angy(x,y,size){
  startOf(x,y+size);
  t.setAngle(-30);
  fd(size);
  t.setAngle(210);
  fd(size);
}
function madj(x,y,size){
  startOf(x+size,y+size);
  t.setAngle(210);
  fd(size);
  t.setAngle(-30);
  fd(size);
}

//upperA(0,0,100);
//upperB(0,0,100);
//upperC(0,0,100);

function write(){
  let x = 0;
  let y = 0;
  let size = 10;
  input = input.toUpperCase();
  for (let i = 0; i < input.length; i++){
    if(input.charAt(i) == 'A'){
      upperA(x,y,size);
    }
    if(input.charAt(i) == 'B'){
      upperB(x,y,size);
    }
    if(input.charAt(i) == 'C'){
      upperC(x,y,size);
    }
    if(input.charAt(i) == 'D'){
      upperD(x,y,size);
    }
    if(input.charAt(i) == 'E'){
      upperE(x,y,size);
    }
    if(input.charAt(i) == 'F'){
      upperF(x,y,size);
    }
    if(input.charAt(i) == 'G'){
      upperG(x,y,size);
    }
    if(input.charAt(i) == 'H'){
      upperH(x,y,size);
    }
    if(input.charAt(i) == 'I'){
      upperI(x,y,size);
    }
    if(input.charAt(i) == 'J'){
      upperJ(x,y,size);
    }
    if(input.charAt(i) == 'K'){
      upperK(x,y,size);
    }
    if(input.charAt(i) == 'L'){
      upperL(x,y,size);
    }
    if(input.charAt(i) == 'M'){
      upperM(x,y,size);
    }
    if(input.charAt(i) == 'N'){
      upperN(x,y,size);
    }
    if(input.charAt(i) == 'O'){
      upperO(x,y,size);
    }
    if(input.charAt(i) == 'P'){
      upperP(x,y,size);
    }
    if(input.charAt(i) == 'Q'){
      upperQ(x,y,size);
    }
    if(input.charAt(i) == 'R'){
      upperR(x,y,size);
    }
    if(input.charAt(i) == 'S'){
      upperS(x,y,size);
    }
    if(input.charAt(i) == 'T'){
      upperT(x,y,size);
    }
    if(input.charAt(i) == 'U'){
      upperU(x,y,size);
    }
    if(input.charAt(i) == 'V'){
      upperV(x,y,size);
    }
    if(input.charAt(i) == 'W'){
      upperW(x,y,size);
    }
    if(input.charAt(i) == 'X'){
      upperX(x,y,size);
    }
    if(input.charAt(i) == 'Y'){
      upperY(x,y,size);
    }
    if(input.charAt(i) == 'Z'){
      upperZ(x,y,size);
    }
    if(input.charAt(i) == '-'){
      dash(x,y,size);
    }
    if(input.charAt(i) == '!'){
      ex(x,y,size);
    }
    if(input.charAt(i) == '?'){
      quest(x,y,size);
    }
    if(input.charAt(i) == '.'){
      period(x,y,size);
    }
    if(input.charAt(i) == ':'){
      colon(x,y,size);
    }
    if(input.charAt(i) == ','){
      comma(x,y,size);
    }
    if(input.charAt(i) == '('){
      openParn(x,y,size);
    }
    if(input.charAt(i) == ')'){
      closeParn(x,y,size);
    }
    if(input.charAt(i) == ';'){
      semicolon(x,y,size);
    }
    if(input.charAt(i) == '='){
      equAL(x,y,size);
    }
    if(input.charAt(i) == '3'){
      thwee(x,y,size);
    }
    if(input.charAt(i) == '>'){
      angy(x,y,size);
    }
    if(input.charAt(i) == '<'){
      madj(x,y,size);
    }
    
    
    
    x += size;
    if(x >= width){
      x = 0;
      y -= 20;
    }
  }
}

write();

// add turtle to final lines
bt.join(finalPolylines, t.lines());

// center piece
const cc = bt.bounds(finalPolylines).cc;
bt.translate(finalPolylines, [width / 2, height / 2], cc);

// draw it
drawLines(finalPolylines);