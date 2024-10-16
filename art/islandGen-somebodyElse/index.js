/*
@title: islandGen
@author: somebodyElse
@snapshot: island1.png
*/

//doc dimensions
const width = 125;
const height = 125;

//the army of turtles
const t = new bt.Turtle();
const t2 = new bt.Turtle();
const t3 = new bt.Turtle();
const t4 = new bt.Turtle();

//misc variables
let heightMid = bt.randInRange(71,87);
let heightLeft = heightMid //- bt.randInRange(3,8);
let heightRight = heightMid //- bt.randInRange(3,8);
let angl = bt.randInRange(4,10);
let cloudNum = 4 //bt.randIntInRange(2,6)
let grassNum = bt.randIntInRange(10,20)
let horizonHeight = 43
//let buildNum = 3 //HAS to be even, 0 to turn off

//doc dimensions, the return
setDocDimensions(width, height);



// store final lines here

const finalLines = [];
const secondLines = [];

function building() {  
  t4.jump([bt.randInRange(20,40), heightLeft]);
  actualBuilding()
  t4.jump([bt.randInRange(50,70), heightLeft]);
  actualBuilding()
  t4.jump([bt.randInRange(80,100), heightLeft]);
  actualBuilding()
}

function actualBuilding() {
  let b1Height = bt.randInRange(5,8)
  let b1Angle = bt.randInRange(7,11)
  let b2Height = bt.randInRange(10,20)
  let b2Angle = bt.randInRange(7,11)
  let b1len = bt.randInRange(3,5)
  let b2len = bt.randInRange(2, 5)
  
  t4.setAngle(90);
  t4.forward(b1Height);
  t4.setAngle(10);
  t4.forward(b1len);
  t4.setAngle(270);
  t4.forward(b1Height+(b1Angle/2));
  t4.left(180);
  t4.forward(b2Height);
  t4.setAngle(b2Angle)
  t4.forward(b2len)
  t4.setAngle(270);
  t4.forward(b2Height+(b2Angle/2))
};
//finalLines.push(building)
const island = [
  [10, heightLeft], [115, heightRight], //main line
  [/*105*/ bt.randInRange(95,105),/*35*/ bt.randInRange(30,40)] , [bt.randInRange(90,92), heightRight-angl],
  [85 + bt.randInRange(-10,10), heightMid-20], [bt.randInRange(60,65), heightMid - bt.randInRange(10,46)], /* middle? */
  [30-bt.randInRange(-5,5), heightLeft-bt.randInRange(5,10)], [20, heightLeft-angl*bt.randInRange(2,3)],
  /*[bt.randInRange(10,15),bt.randInRange(35,45)]*/ [10, heightLeft]
];

finalLines.push(island);



const horizon = [
  [0,horizonHeight],[125,horizonHeight]
]
secondLines.push(horizon);

function moons(){
  t.right(bt.randInRange(0,359));
  t.jump([bt.randInRange(20,105),bt.randInRange(85, 105)]);
  t.arc(360, bt.randInRange(5,10));
  t.up();
  t.right(180);
  t.forward(bt.randInRange(5,10));
  t.down();
  t.arc(360, bt.randInRange(1,4.5));
  //bt.offset(t.path, 1);
};

function clouds(){
  t2.jump([bt.randInRange(10, 105), bt.randInRange(45,65)]);
  t2.forward(-1.5)
  t2.forward(13.5)
  t2.arc(100,4)
  t2.left(7)
  t2.arc(100,4)
  t2.right(104)
  t2.arc(150,4)
  t2.left(-110)
  t2.arc(100,4)
  t2.left(-7)
  t2.arc(103,4)
  t2.setAngle(bt.randInRange(0,5))
}

function grass(){
  t3.jump([bt.randIntInRange(10, 105), bt.randIntInRange(10,30)/*10,10*/])
  let t3LastPos = t3.pos
  t3.setAngle(90)
  t3.arc(bt.randInRange(40,70), 4)
  t3.jump(t3LastPos)
  t3.setAngle(89)
  t3.arc(bt.randInRange(-40,-70), 4)
}

// transform lines using the toolkit
//bt.rotate(finalLines, 45);

// draw it
/*
for (let i =0; i<cloudNum; i++) {
  clouds();
}
*/
for (let i =0; i<grassNum; i++) {
  grass();
}

building();
moons();
grass();
bt.cover(t.path, finalLines)
bt.cover(finalLines, t2.path)

bt.cover(t4.path, finalLines)
bt.cover(t.path, t4.path)

bt.cover(secondLines, t.path)
bt.cover(secondLines, t2.path)
bt.cover(secondLines, finalLines)

drawLines(finalLines)
drawLines(secondLines)

//t.path.push(cl)

//bt.offset(t.path, 1);

//drawLines(t.path)
//drawLines(finalLines)
//clouds();
drawLines(t.lines())
drawLines(t2.lines())
drawLines(t3.lines())
drawLines(t4.lines())

//drawLines(finalLines);