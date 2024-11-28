//INGREEDIANTS:CODE:

const width = 125;
const height = 125;

setDocDimensions(width, height);


const finalLines = [];
const myTurtle = new bt.Turtle()
myTurtle.up()
myTurtle.goTo([110,61])
// TURTLE ATTACK!!!!!!
myTurtle.down()
myTurtle.goTo([53,72])
myTurtle.left(16)
myTurtle.left(-8)
myTurtle.forward(47)
myTurtle.left(160)
myTurtle.forward(38)
myTurtle.right(160)
myTurtle.forward(30)
myTurtle.left(160)
myTurtle.forward(24)
myTurtle.right(160)
myTurtle.forward(18)
myTurtle.left(160)
myTurtle.forward(15)
myTurtle.right(160)
myTurtle.forward(11)
myTurtle.left(160)
myTurtle.forward(9)
myTurtle.right(160)
myTurtle.forward(7)
myTurtle.up()
myTurtle.left(180)
myTurtle.forward(47)
//myTurtle.down()
//myTurtle.forward(9)
//myTurtle.left(160)
//myTurtle.forward(3)
//myTurtle.right(141)
//myTurtle.forward(3)
//myTurtle.left(161)
//myTurtle.forward(9)
//myTurtle.left(143)
//myTurtle.forward(2)
//myTurtle.left(235)
//myTurtle.forward(1.7)

//TURTLE! REATREAT!!!

for (let i = 0; i < 10; i++) {
  let rand1=bt.rand()
  let rand2=(1-rand1)*(bt.rand())
  let x= 36 + rand1*44 + rand2*92
  let y= 47 + rand1*58 - rand2*0
  myTurtle.up()
  myTurtle.goTo([x,y])
  myTurtle.down()
  myTurtle.forward(9)
  myTurtle.left(160)
  myTurtle.forward(3)
  myTurtle.right(141)
  myTurtle.forward(3)
  myTurtle.left(161)
  myTurtle.forward(9)
  myTurtle.left(143)
  myTurtle.forward(2)
  myTurtle.left(235)
  myTurtle.forward(1.7)
  myTurtle.up()
  myTurtle.goTo([128,42])
  myTurtle.down()
}
myTurtle.setAngle(-155)
myTurtle.arc(-54,99)
const polyline = [
  [78, 54],
  [128, 39],
  [97, 0],
  [54, 3],
  [37, 48],
  [114,60],
  
  [127,40],
 
];
//#DDCC00
const polyline2 = [
  [36,47],
  [80,110],
  [128,39]
  ]
// add the polyline to the final lines

finalLines.push(polyline,polyline2);

// transform lines using the toolkit
bt.rotate(finalLines, 3);

// draw it
//const lines= bt.join(finalLines, myTurtle.lines());
//drawLines(polyline2, {fill: "red"})
bt.join(finalLines, myTurtle.lines());
bt.translate(finalLines, [-20, 0])
drawLines(finalLines)
bt.randInRange(37,68);

































// too far




























// stop!!!!























// please





































//hello random people who decided to scroll all the way down 👏👏👏👏👏👏WELLDONE😁😁
