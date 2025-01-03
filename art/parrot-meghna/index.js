/*
@title: Parrot
@author: Meghna
@snapshot: snapshot2.png
*/

const width = 185;
const height = 182;

setDocDimensions(width, height);

const beakLength = 10
const beakW = 2.8

const finalLines = [];

const bottomEdge = [
  bt.nurbs([
    [-2, -1],
    [beakLength * 0.1, beakW],
    [beakLength * 0.8, beakW * 0.85],
    [beakLength, 2]
  ])
]


bt.translate(bottomEdge, [44.5, 88]);


const topEdge = [
  bt.nurbs([
    [-3, -1],
    [beakLength * 0.5, 4],
    [beakLength * 1.6, beakW * -1.89],
    [beakLength, 0]
  ])
]
bt.translate(topEdge, [43, 94]);
bt.rotate(topEdge, 46);


const beak = bt.join(topEdge, bottomEdge);

bt.rotate(beak, 59);
bt.translate(beak, [19, 50]);
bt.scale(beak, [1.2, 1.1]);
// draw it
//drawLines(beak);

const joint = [
  bt.nurbs([
    [-3, 4],
    [6, 1],
    [4, -2]
  ])
]
bt.translate(joint, [70, 148]);
bt.rotate(joint, 6);

//drawLines(joint);

//BEAK DONE 

//MOUTH


const mouthLine = [
  bt.nurbs([
    [29, 1],
    [23, -2],
    [19, -1]
  ])
]

bt.translate(mouthLine, [50.0, 138]);
bt.rotate(mouthLine, -25);
//drawLines(mouthLine);

const highBeak = bt.join(beak, mouthLine)

//drawLines(highBeak);


//curve at the mouth
const mouthCurve = [
  bt.nurbs([
    [-3, -97],
    [-7, -90],
    [1, -87]
  ])
]

bt.translate(mouthCurve, [79.1, 234]);
bt.rotate(mouthCurve, -129);
//drawLines(mouthCurve);





// done mouth 

// head

const headL = [
  bt.nurbs([
    [-1, -98],
    [-1, -89],
    [1, -92]
  ])
]

bt.translate(headL, [67.6, 248]);
bt.rotate(headL, -6);
//drawLines(headL);


const head2 = [
  bt.nurbs([
    [-3, -93],
    [-1, -96],
    [1, -92]
  ])
]

bt.translate(head2, [71.7, 251]);
bt.rotate(head2, 202);
//drawLines(head2);

const head = [
  bt.nurbs([
    [-15, -91],
    [6, -91],
    [2, -88]
  ])
]

bt.translate(head, [87.5, 248]);
bt.rotate(head, 171);
//drawLines(head);

const head3 = [
  bt.nurbs([
    [-15, -91],
    [-4, -91],
    [2, -88]
  ])
]

bt.translate(head3, [103.7, 244]);
bt.rotate(head3, 140);
//drawLines(head3);


const head4 = [
  bt.nurbs([
    [-28, -91],
    [-4, -91],
    [2, -88]
  ])
]

bt.translate(head4, [121.0, 226]);
bt.rotate(head4, 102);
//drawLines(head4);

const head5 = [
  bt.nurbs([
    [-7, -91],
    [-4, -91],
    [2, -88]
  ])
]

bt.translate(head5, [81.9, 221]);
bt.rotate(head5, 70);
//drawLines(head5);


//done woith headddd


const wing1 = [
  bt.nurbs([
    [-49, -70],
    [-7, -67],
    [2, -88]
  ])
]

bt.translate(wing1, [103.8, 174]);
bt.rotate(wing1, 117);
drawLines(wing1);




const wing2 = [
  bt.nurbs([
    [-41, -128],
    [25, -105],
    [2, -88]
  ])
]

bt.translate(wing2, [126.9, 204]);
bt.rotate(wing2, 63);
drawLines(wing2);



const wing3 = [
  bt.nurbs([
    [-31, -136],
    [-38, -109],
    [2, -88]
  ])
]

bt.translate(wing3, [124.4, 205]);
bt.rotate(wing3, 409);
drawLines(wing3);


const wing4 = [
  bt.nurbs([
    [-31, -136],
    [-7, -87],
    [3, -88]
  ])
]

bt.translate(wing4, [96.0, 210]);
bt.rotate(wing4, 400);
drawLines(wing4);

//const bodyAll = bt.join(bottomEdge,topEdge,mouthLine,mouthCurve, headL,head2, head, head3,head4,head5,wing1,wing2,wing3,wing4);

//bt.translate(bodyAll, [31,7]);

//drawLines(bodyAll);

//DONE WINGS 

const toes1 = [
  bt.nurbs([
    [22, -97],
    [7, -98],
    [3, -88]
  ])
]

bt.translate(toes1, [72.4, 152]);
bt.rotate(toes1, 597);
drawLines(toes1);


const toes2 = [
  bt.nurbs([
    [10, -77],
    [10, -86],
    [3, -88]
  ])
]

bt.translate(toes2, [83.7, 140]);
bt.rotate(toes2, 519);
drawLines(toes2);


const toes3 = [
  bt.nurbs([
    [5, -84.7],
    [5, -91],
    [3, -88]
  ])
]

bt.translate(toes3, [90.5, 150]);
bt.rotate(toes3, 395);
drawLines(toes3);


const toes4 = [
  bt.nurbs([
    [4, -85.5],
    [7, -87],
    [3, -88]
  ])
]

bt.translate(toes4, [79.6, 141]);
bt.rotate(toes4, 268);
drawLines(toes4);

const toes5 = [
  bt.nurbs([
    [5, -82.1],
    [12, -93],
    [3, -88]
  ])
]

bt.translate(toes5, [73.4, 139]);
bt.rotate(toes5, 279);
drawLines(toes5);

const nail = [
  ([
    [0, 0],
    [0, 0],
    [-1, 3]
  ])
]

bt.translate(nail, [76.4, 47]);
bt.rotate(nail, 354);
drawLines(nail);


const nail2 = [
  ([
    [0, 0],
    [0, 0],
    [-1, 3]
  ])
]

bt.translate(nail2, [77.5, 47]);
bt.rotate(nail2, 354);
drawLines(nail2);

const nail3 = [
  ([
    [0, 4],
    [1, 0],
    [-1, 3]
  ])
]

bt.translate(nail3, [77.9, 44]);
bt.rotate(nail3, 397);
drawLines(nail3);

const nail4 = [
  ([
    [0, 0],
    [0, 0],
    [-1, 3]
  ])
]

bt.translate(nail4, [84.3, 50]);
bt.rotate(nail4, 354);
drawLines(nail4);


const nail5 = [
  ([
    [0, 0],
    [0, 0],
    [-1, 3]
  ])
]

bt.translate(nail5, [85.6, 51]);
bt.rotate(nail5, 354);
drawLines(nail5);

const nail6 = [
  ([
    [0, 1],
    [1, 0],
    [-1, 0]
  ])
]

bt.translate(nail6, [85.8, 50]);
bt.rotate(nail6, 368);
drawLines(nail6);

// toe nails done 
//other foot

// other foot
const foot = [
  ([
    [-16, 20],
    [-6, 12],
    [-1, 0]
  ])
]


bt.translate(foot, [107.6, 43]);
bt.rotate(foot, 451);
//drawLines(foot);


const foot2 = [
  bt.nurbs([
    [-13, 13],
    [-10, 12],
    [-1, 0]
  ])
]

bt.translate(foot2, [111.0, 45]);
bt.rotate(foot2, 438);
//drawLines(foot2);


const foot3 = [
  bt.nurbs([
    [6, 4],
    [5, 14],
    [-1, 0]
  ])
]

bt.translate(foot3, [90.2, 41]);
bt.rotate(foot3, 523);
//drawLines(foot3);



// other leg nails
const nailO = [
  bt.nurbs([
    [4, 0],
    [-1, 2],
    [-1, 0]
  ])
]

bt.translate(nailO, [109.2, 58]);
bt.rotate(nailO, 665);
//drawLines(nailO);



const nailF = [
  ([
    [0, 0],
    [0, 0],
    [-1, 4]
  ])
]

bt.translate(nailF, [90.0, 38]);
bt.rotate(nailF, 354);
//drawLines(nailF);


const nailW = [
  ([
    [0, 0],
    [0, 0],
    [-1, 3]
  ])
]

bt.translate(nailW, [91.4, 39]);
bt.rotate(nailW, 354);
//drawLines(nailW);

const nailL = [
  ([
    [0, 4],
    [1, 0],
    [-1, 3]
  ])
]

bt.translate(nailL, [92.3, 36]);
bt.rotate(nailL, 397);
//drawLines(nailL);


const rightFoot = bt.join(foot, foot2, foot3, nailO, nailF, nailW, nailL);
bt.rotate(rightFoot, 11);
bt.scale(rightFoot, [0.9, 0.9]);
bt.translate(rightFoot, [1, 5]);

drawLines(rightFoot);

// Rightfoot Done

const lowerB = [
  bt.nurbs([
    [-5, 8],
    [-5, 5],
    [-1, 3]
  ])
]

bt.translate(lowerB, [88.9, 62]);
bt.rotate(lowerB, 350);
drawLines(lowerB);

const lowerB2 = [
  bt.nurbs([
    [-1, 7],
    [-3, 5],
    [-1, 3]
  ])
]

bt.translate(lowerB2, [97.1, 55]);
bt.rotate(lowerB2, 437);
drawLines(lowerB2);


const lowerB3 = [
  bt.nurbs([
    [-7, 12],
    [-3, 3],
    [-1, 3]
  ])
]

bt.translate(lowerB3, [115.4, 54]);
bt.rotate(lowerB3, 445);
drawLines(lowerB3);


// basic body done 
//DETAILS 

// face details 

const randsize = bt.rand() * 2 + 3
const base = 50
const radius = base / randsize
var xoff = bt.rand() * 2 + 87
var yoff = bt.rand() * 2 + 87.5
const divise = bt.rand() * .04 + 1.4


//pupil
const shiny = [
  bt.nurbs([
    [xoff + radius, 0 + yoff],
    [xoff + radius / divise, radius / divise + yoff],
    [xoff, 0 + radius + yoff],
    [xoff - radius / divise, radius / divise + yoff],
    [xoff + -radius, 0 + yoff],
    [xoff - radius / divise, -radius / divise + yoff],
    [xoff, 0 - radius + yoff],
    [xoff + radius / divise, -radius / divise + yoff],
    [xoff + radius, 0 + yoff]
  ])
]
bt.scale(shiny, [0.1, -0.1]);
bt.translate(shiny, [-5, 63]);
//drawLines(shiny);
const sun = [
  bt.nurbs([
    [xoff + radius, 0 + yoff],
    [xoff + radius / divise, radius / divise + yoff],
    [xoff, 0 + radius + yoff],
    [xoff - radius / divise, radius / divise + yoff],
    [xoff + -radius, 0 + yoff],
    [xoff - radius / divise, -radius / divise + yoff],
    [xoff, 0 - radius + yoff],
    [xoff + radius / divise, -radius / divise + yoff],
    [xoff + radius, 0 + yoff]
  ])
]
bt.scale(sun, [0.2, -0.2]);
bt.translate(sun, [-4, 63]);
bt.difference(sun, shiny);

const filledSun = bt.copy(sun);


//drawLines(filledSun,{fill:"black"});
 




const eye = [
  bt.nurbs([
    [-4, 6],
    [-1, 2],
    [-1, 4]
  ])
]

bt.translate(eye, [89.7, 144]);
bt.rotate(eye, 407);
//drawLines(eye);


const faceD = [
  bt.nurbs([
    [-15, 16],
    [-15, 6],
    [-1, 3]
  ])
]

bt.translate(faceD, [89.0, 143]);
bt.rotate(faceD, 589);
//drawLines(faceD);

const faceL2 = [
  bt.nurbs([
    [-4, 3],
    [-2, 3],
    [-1, 4]
  ])
]

bt.translate(faceL2, [92.8, 147]);
bt.rotate(faceL2, 399);
//drawLines(faceL2);


const faceL3 = [
  bt.nurbs([
    [-4, 7],
    [-3, 4],
    [-1, 4]
  ])
]

bt.translate(faceL3, [79.7, 143]);
bt.rotate(faceL3, 398);
//drawLines(faceL3);

const faceL4 = [
  bt.nurbs([
    [-4, 4],
    [-4, 1],
    [-3, 2]
  ])
]

bt.translate(faceL4, [87.2, 146]);
bt.rotate(faceL4, 418);
//drawLines(faceL4);

const faceL5 = [
  bt.nurbs([
    [-4, 4],
    [-4, 1],
    [-3, 2]
  ])
]

bt.translate(faceL5, [89.9, 142]);
bt.rotate(faceL5, 418);
//drawLines(faceL5);


//head combineee

//const headDirection = Math.random()>0.5?1:-1;
//const wholeHead = bt.join(beak,joint,mouthLine,highBeak,mouthCurve,headL,head2,head,head3,head4,head5,shiny,sun,eye,
          //                faceD,faceL2,faceL3,faceL4,faceL5);
//bt.translate(wholeHead,[42,8]);
//bt.translate(wholeHead,[85.4,104]);
//bt.scale(wholeHead,[headDirection,1]);

//drawLines(wholeHead);


//feather detail
const hairH = [
  bt.nurbs([
    [-5, 9],
    [2, 11],
    [-1, 4]
  ])
]

bt.translate(hairH, [105.6, 98]);
bt.rotate(hairH, 204);
drawLines(hairH);


const hair2 = [
  bt.nurbs([
    [-7, 6],
    [0, 11],
    [-1, 4]
  ])
]

bt.translate(hair2, [112.7, 96]);
bt.rotate(hair2, 204);
drawLines(hair2);



const featherD = [
  bt.nurbs([
    [-5, 2],
    [-9, 6],
    [-1, 4]
  ])
]

bt.translate(featherD , [116.8, 98]);
bt.rotate(featherD , 140);
drawLines(featherD );

const feather3 = [
  bt.nurbs([
    [-4, 2],
    [-5, 8],
    [-1, 4]
  ])
]

bt.translate(feather3 , [119.7, 97]);
bt.rotate(feather3, 158);
drawLines(feather3 );

const feather4 = [
  bt.nurbs([
    [-4, 5],
    [2, 9],
    [-1, 4]
  ])
]

bt.translate(feather4 , [103.8, 85]);
bt.rotate(feather4, 205);
drawLines(feather4 );


const feather5 = [
  bt.nurbs([
    [-3, 8],
    [6, 9],
    [-1, 4]
  ])
]

bt.translate(feather5 , [105.5, 84]);
bt.rotate(feather5, 246);
drawLines(feather5 );


const feather6 = [
  bt.nurbs([
    [-3, 8],
    [1, 11],
    [-1, 4]
  ])
]

bt.translate(feather6 , [110.7, 82]);
bt.rotate(feather6, 204);
drawLines(feather6 );


const feather7 = [
  bt.nurbs([
    [2, 4],
    [6, 9],
    [5, 0]
  ])
]

bt.translate(feather7 , [109.9, 84]);
bt.rotate(feather7, 213);
drawLines(feather7);

const feather8 = [
  bt.nurbs([
    [2, 2],
    [8, 9],
    [5, 0]
  ])
]

bt.translate(feather8 , [113.4, 84]);
bt.rotate(feather8, 213);
drawLines(feather8);

// right feather done 
//left feather

const feather9 = [
  bt.nurbs([
    [7, -2],
    [-1, -4],
    [5, 0]
  ])
]

bt.translate(feather9 , [71.1, 105]);
bt.rotate(feather9, 95);
drawLines(feather9);


const feather10 = [
  bt.nurbs([
    [7, -2],
    [-1, -4],
    [5, 0]
  ])
]

bt.translate(feather10 , [68.2, 105]);
bt.rotate(feather10, 68);
drawLines(feather10);


const feather11 = [
  bt.nurbs([
    [7, -2],
    [-1, -4],
    [5, 0]
  ])
]

bt.translate(feather11 , [72.3, 93]);
bt.rotate(feather11, 68);
drawLines(feather11);

const feather12 = [
  bt.nurbs([
    [7, -2],
    [-1, -4],
    [5, 0]
  ])
]

bt.translate(feather12 , [69.9, 93]);
bt.rotate(feather12, 68);
drawLines(feather12);

//featgher detail done
// body detail

const atBeak = [
  bt.nurbs([
    [7, 20],
    [-5, 4],
    [5, 0]
  ])
]

bt.translate( atBeak , [83.5, 134]);
bt.rotate( atBeak, 154);
//drawLines( atBeak);

const atBeak2= [
  bt.nurbs([
    [4, 6],
    [9, 3],
    [5, 0]
  ])
]

bt.translate( atBeak2 , [90.8, 135]);
bt.rotate( atBeak2, 280);
//drawLines( atBeak2);

//head combineee

const headDirection = bt.rand()>0.5?1:-1;
const wholeHead = bt.join(joint,highBeak,mouthCurve,headL,head2,head,head3,head4,head5,shiny,sun,eye,
                          faceD,faceL2,faceL3,faceL4,faceL5,atBeak,atBeak2);//beak,mouthline are inclued
bt.translate(wholeHead,[-85,-103]);
bt.translate(wholeHead,[85.4,103]);
bt.scale(wholeHead,[headDirection,1]);

const flipPosition = headDirection ===-1? [15,3]:[0,0];
bt.translate(wholeHead,flipPosition);

//const pivotPoint =[88,135];
//const rotationAngle = headDirection === -1? -30 : 30;
//bt.rotate(wholeHead, rotationAngle, pivotPoint);

if(headDirection === -1) {
  bt.rotate(wholeHead,-13,[80,125]);
}



drawLines(wholeHead);

//drawLines(filledSun,{fill:"black"});







const atbody= [
  bt.nurbs([
    [7, 4],
    [10, 0],
    [5, 0]
  ])
]

bt.translate( atbody , [76.4, 108]);
bt.rotate( atbody, -68);
drawLines( atbody);

const atbody2= [
  bt.nurbs([
    [7, 4],
    [10, 0],
    [5, 0]
  ])
]

bt.translate( atbody2 , [82.9, 101]);
bt.rotate( atbody2, -68);
drawLines( atbody2);

const atbody3= [
  bt.nurbs([
    [7, 4],
    [10, 0],
    [5, 0]
  ])
]

bt.translate( atbody3 , [79.0, 99]);
bt.rotate( atbody3, -68);
drawLines( atbody3);



const atbody4= [
  bt.nurbs([
    [7, 4],
    [10, 0],
    [5, 0]
  ])
]

bt.translate( atbody4 , [83.8, 93]);
bt.rotate( atbody4, -68);
drawLines( atbody4);


const atbody5= [
  bt.nurbs([
    [7, 4],
    [10, 0],
    [5, 0]
  ])
]

bt.translate( atbody5 , [91.9, 83]);
bt.rotate( atbody5, -68);
drawLines( atbody5);

//detail done 
// log

const log= [
  ([
    [7, 32],
    [5, 0],
    [5, 0]
  ])
]

bt.translate( log, [62.5, 53]);
bt.rotate( log, -105);
drawLines(log);

const log2= [
  bt.nurbs([
    [6, 6],
    [5, 0],
    [5, 0]
  ])
]

bt.translate( log2, [88.4, 56]);
bt.rotate( log2, -105);
drawLines(log2);


const log3= [
  bt.nurbs([
    [6, 24],
    [5, 0],
    [5, 0]
  ])
]

bt.translate( log3, [112.8, 44]);
bt.rotate( log3, -104);
drawLines(log3);

const log4= [
  bt.nurbs([
    [6, 27],
    [5, 0],
    [5, 0]
  ])
]

bt.translate( log4, [101.7, 29]);
bt.rotate( log4, -106);
drawLines(log4);


const log5= [
  bt.nurbs([
    [6, 16],
    [5, 0],
    [5, 0]
  ])
]

bt.translate( log5, [79.8, 40]);
bt.rotate( log5, -103);
drawLines(log5);


const log6= [
  bt.nurbs([
    [6, 28],
    [5, 0],
    [5, 0]
  ])
]

bt.translate( log6, [56.4, 42]);
bt.rotate( log6, -105);
drawLines(log6);

const log7= [
  bt.nurbs([
    [-17, 14],
    [-20, 4],
    [-18, 0]
  ])
]

bt.translate( log7, [68.0, 60]);
bt.rotate( log7, -14);
drawLines(log7);


const randsize1 = 50.3
const base1 = -157
const radius1 = base1 / randsize1
var xoff1 = 125
var yoff1 =  43.6
const divise1 = -0.2 + 1.0

//logCircle
const log8 = [
  bt.nurbs([
    [-6+xoff1 + radius1, 0 + yoff1],
    [0+xoff1 + radius1 / divise1, radius1 / divise1 + yoff1],
    [1+xoff1, -2 + radius1 + yoff1],
    [3+xoff1 - radius1 / divise1, radius1 / divise1 + yoff1],
    [8+xoff1 + -radius1, 0 + yoff1],
    [6+xoff1 - radius1 / divise1, -radius1 / divise1 + yoff1],
    [-2+xoff1, 5 - radius1 + yoff1],
    [-4+xoff1 + radius1 / divise1, -radius1 / divise1 + yoff1],
    [-6+xoff1 + radius1, 0 + yoff1]
  ])
]

bt.rotate(log8,-113);
drawLines(log8);

//Log finish

const logD= [
  bt.nurbs([
    [-17, 10],
    [-20, 4],
    [-18, 0]
  ])
]

bt.translate( logD, [143.7, 41]);
bt.rotate( logD, -18);
drawLines(logD);

const logD2= [
  bt.nurbs([
    [-17, 7],
    [-15, 4],
    [-18, 0]
  ])
]

bt.translate( logD2, [145.5, 42]);
bt.rotate( logD2, -18);
drawLines(logD2);


const logD3= [
  bt.nurbs([
    [-21, 2],
    [-19, 3],
    [-18, 0]
  ])
]

bt.translate( logD3, [143.4, 39]);
bt.rotate( logD3, -159);
drawLines(logD3);


const logD4= [
  bt.nurbs([
    [-23, 12],
    [-19, 3],
    [-18, 0]
  ])
]

bt.translate( logD4, [131.9, 46]);
bt.rotate( logD4, -131);
drawLines(logD4);


const logD5= [
  bt.nurbs([
    [-23, 6],
    [-19, 1],
    [-18, 0]
  ])
]

bt.translate( logD5, [121.1, 45]);
bt.rotate( logD5, -152);
drawLines(logD5);

const logD6= [
  bt.nurbs([
    [-23, 9],
    [-19, 1],
    [-18, 0]
  ])
]

bt.translate( logD6, [83.9, 62]);
bt.rotate( logD6, -139);
drawLines(logD6);


const logD7= [
  bt.nurbs([
    [-23, 5],
    [-19, 0],
    [-18, 0]
  ])
]

bt.translate( logD7, [90.0, 55]);
bt.rotate( logD7, -152);
drawLines(logD7);

// log detail complete 
//leafes

const leaf1= [
  bt.nurbs([
    [-7, 73],
    [18, -3],
    [-18, 0]
  ])
]

bt.translate( leaf1, [142.7, 53]);
bt.rotate( leaf1, -19);



const leaf2= [
  bt.nurbs([
    [-16, 36],
    [-21, 24],
    [-18, 0]
  ])
]

bt.translate( leaf2, [150.8, 93]);
bt.rotate( leaf2, -44);



const leaf3= [
  bt.nurbs([
    [-16, 61],
    [-12, 24],
    [-18, 0]
  ])
]

bt.translate( leaf3, [145.0, 55]);
bt.rotate( leaf3, -27);

const oneLeaf = bt.join(leaf1,leaf2,leaf3)
drawLines(oneLeaf);
// leaf one 
//right,up
const leaf4= [
  bt.nurbs([
    [-7, 48],
    [18, 14],
    [-18, 0]
  ])
]

bt.translate( leaf4, [155.5, 46]);
bt.rotate( leaf4, -32);



const leaf5= [
  bt.nurbs([
    [-16, 24],
    [-20, 2],
    [-18, 0]
  ])
]

bt.translate( leaf5, [169.0, 71]);
bt.rotate( leaf5, -44);



const leaf6= [
  bt.nurbs([
    [-16, 29],
    [-12, 24],
    [-18, 0]
  ])
]

bt.translate( leaf6, [167.7, 63]);
bt.rotate( leaf6, -36);

const twoLeaf = bt.join(leaf4,leaf5,leaf6);
bt.translate(twoLeaf,[-2,0]);
drawLines(twoLeaf);


// right leaves done 


const leafL1= [
  bt.nurbs([
    [-16, 29],
    [-16, 24],
    [-18, 0]
  ])
]

bt.translate( leafL1, [77.3, 60]);
bt.rotate( leafL1, 244);




const leafL2= [
    ([
    [-16, 29],
    [-16, 24],
    [-18, 0]
  ])
]

bt.translate( leafL2, [77.3, 65]);
bt.rotate( leafL2, 229);


const leafL3= [
    ([
    [-27, -1],
    [-23, -7],
    [-18, 0]
  ])
]

bt.translate( leafL3, [68.7, 90]);
bt.rotate( leafL3, 242);


const leafL4= [
  bt.nurbs([
    [-16, 29],
    [-16, 24],
    [-18, 0]
  ])
]

bt.translate( leafL4, [78.7, 66]);
bt.rotate( leafL4, 225);




const leafL5= [
    ([
    [-16, 29],
    [-16, 24],
    [-18, 0]
  ])
]

bt.translate( leafL5, [81.5, 69]);
bt.rotate( leafL5, 207);


const leafL6= [
    ([
    [-27, -1],
    [-23, -7],
    [-18, 0]
  ])
]

bt.translate( leafL6, [75.7, 99]);
bt.rotate( leafL6, 227);

const leafL7= [
  bt.nurbs([
    [-16, 29],
    [-16, 24],
    [-18, 0]
  ])
]

bt.translate( leafL7, [83.3, 69]);
bt.rotate( leafL7, 199);




const leafL8= [
    ([
    [-16, 29],
    [-16, 24],
    [-18, 0]
  ])
]

bt.translate( leafL8, [87.5, 71]);
bt.rotate( leafL8, 182);


const leafL9= [
    ([
    [-27, -1],
    [-23, -7],
    [-18, 0]
  ])
]

bt.translate( leafL9, [89.2, 105]);
bt.rotate( leafL9, 187);

//const anotherL = bt.join(leafL1,leafL2,leafL3);
//bt.translate (anotherL,[0,10]);
//bt.rotate(anotherL,-22);


//const anotherL2 = bt.join(leafL1,leafL2,leafL3);
//bt.translate (anotherL2,[9,0]);
//bt.rotate(anotherL2,-25);


const line1= [
    ([
    [16, -4],
    [0, 0],
    [0, 0]
  ])
]

bt.translate( line1, [63.5, 79]);
bt.rotate( line1, 80);



const line2= [
    ([
    [13, -4],
    [0, 0],
    [0, 0]
  ])
]

bt.translate( line2, [66.6, 78]);
bt.rotate( line2, 70);
const threeLeaf = bt.join(leafL1,leafL2,leafL3,leafL4,leafL5,leafL6,leafL7,leafL8,leafL9,line1,line2);
drawLines(threeLeaf);
 
//OTHER LEAVES


const leaf1LE= [
  bt.nurbs([
    [-16, 26],
    [-4, -3],
    [-18, 0]
  ])
]

bt.translate( leaf1LE, [50.2, 57]);
bt.rotate( leaf1LE, 64);



const leaf2LE= [
  bt.nurbs([
    [-16, 27],
    [-32, -1],
    [-18, 1]
  ])
]

bt.translate( leaf2LE, [53.6, 51]);
bt.rotate( leaf2LE, 66);



const leaf3LE= [
  bt.nurbs([
    [-17, 17],
    [-15, 10],
    [-18, 0]
  ])
]

bt.translate( leaf3LE, [55.8, 57]);
bt.rotate( leaf3LE, 59);


const leafLeft = bt.join(leaf1LE,leaf2LE,leaf3LE);
bt.scale(leafLeft, bt.randInRange(1, 2),[47,61]);

drawLines(leafLeft);



// other leaf 

const leaf4LE= [
  bt.nurbs([
    [-7, 47],
    [4, 31],
    [-18, 0]
  ])
]

bt.translate( leaf4LE, [50.1, 69]);
bt.rotate( leaf4LE, -143);
drawLines(leaf4LE);


const leaf5LE= [
  bt.nurbs([
    [-16, 28],
    [-22, 9],
    [-18, 0]
  ])
]

bt.translate( leaf5LE, [58.7, 94]);
bt.rotate( leaf5LE, -131);
drawLines(leaf5LE);


const leaf6LE= [
  bt.nurbs([
    [-16, 31],
    [-18, 24],
    [-18, 0]
  ])
]

bt.translate( leaf6LE, [56.0, 88]);
bt.rotate( leaf6LE, 34);
drawLines(leaf6LE);

//leafes done
// tail feather things

const feathere= [
 ([
    [-16, 26],
    [-17, 24],
    [-27, 0]
  ])
]

bt.translate( feathere, [120.2, 18]);
bt.rotate( feathere, 27);
drawLines(feathere);


const feathere1= [
 ([
    [-16, 27],
    [-20, 21],
    [-28, 0]
  ])
]

bt.translate( feathere1, [126.4, 15]);
bt.rotate( feathere1, 27);
drawLines(feathere1);

const feathere2= [
 ([
    [-6, -4],
    [0, 0],
    [0, 0]
  ])
]

bt.translate( feathere2, [105.3, 17]);
bt.rotate( feathere2, 112);
drawLines(feathere2);


const feathere3= [
 ([
    [-6, 5],
    [0, 0],
    [0, 0]
  ])
]

bt.translate( feathere3, [110.2, 9]);
bt.rotate( feathere3, 160);
drawLines(feathere3);


const feathere4= [
 ([
    [-6, 34],
    [0, 0],
    [0, 0]
  ])
]

bt.translate( feathere4, [110.8, 8]);
bt.rotate( feathere4, 173);
drawLines(feathere4);


const feathere5= [
 ([
    [-7, 35],
    [-2, 2],
    [0, 0]
  ])
]

bt.translate( feathere5, [118.5, 5]);
bt.rotate( feathere5, 173);
drawLines(feathere5);

const feathere6= [
 ([
    [-6, 32],
    [-5, 15],
    [0, 0]
  ])
]

bt.translate( feathere6, [114.3, 8]);
bt.rotate( feathere6, 173);
drawLines(feathere6);

const feathere7= [
 ([
    [-5, 2],
    [0, 0],
    [0, -1]
  ])
]

bt.translate( feathere7, [117.2, 7]);
bt.rotate( feathere7, 166);
drawLines(feathere7);
// tail feathers

const berry1= [
bt.nurbs ([
    [-46, 2],
    [-26, 12],
    [-13, 0]
  ])
]

bt.translate(  berry1, [68.6, 45]);
bt.rotate(  berry1, 51);
drawLines( berry1);

const berry2= [
bt.nurbs ([
    [-51, -4],
    [-26, -8],
    [-13, 0]
  ])
]

bt.translate(  berry2, [76.6, 48]);
bt.rotate(  berry2, 31);
drawLines( berry2);

const berry3= [
bt.nurbs ([
    [-37, 1],
    [-26, 3],
    [-13, 0]
  ])
]

bt.translate(  berry3, [70.0, 48]);
bt.rotate(  berry3, 44);
drawLines( berry3);


const berry4= [
bt.nurbs ([
    [-27, -11],
    [-24, 0],
    [-13, 0]
  ])
]

bt.translate(  berry4, [76.4, 49]);
bt.rotate(  berry4, 45);
drawLines( berry4);

const berry5= [
bt.nurbs ([
    [-35, -6],
    [-24, -7],
    [-13, 0]
  ])
]

bt.translate(  berry5, [84.9, 47]);
bt.rotate(  berry5, 43);
drawLines( berry5);

const berry6= [
bt.nurbs ([
    [-31, -1],
    [-18, 1],
    [-8, -5]
  ])
]

bt.translate(  berry6, [79.2, 48]);
bt.rotate(  berry6, 74);
drawLines( berry6);

// beeeries 

const randsize3 = bt.rand() * 2 + 3
const base3 = 50
const radius3= base3 / randsize3
var xoff3 = bt.rand() * 2 + 87
var yoff3 = bt.rand() * 2 + 87.5
const divise3 = bt.rand() * .04 + 1.4



const berries = [
  bt.nurbs([
    [xoff3 + radius3, 0 + yoff],
    [xoff3 + radius3 / divise3, radius3 / divise3 + yoff3],
    [xoff3, 0 + radius3 + yoff3],
    [xoff3 - radius3 / divise3, radius3 / divise3 + yoff3],
    [xoff3 + -radius3, 0 + yoff3],
    [xoff3 - radius3 / divise3, -radius3 / divise3 + yoff3],
    [xoff3, 0 - radius3 + yoff3],
    [xoff3 + radius3 / divise3, -radius3 / divise3 + yoff3],
    [xoff3 + radius3, 0 + yoff3]
  ])
]
bt.scale(berries, [0.5, 0.5]);
bt.translate(berries, [-18, -39]);
bt.rotate(berries,105);
drawLines(berries);




const berrie2= [
 berries
  ]

bt.scale(berries, [0.4, 0.4]);
bt.translate(berries, [66, 2]);
bt.rotate(berries,117);
drawLines(berries);

//more randomized leafs 


//const leafMo1 = [leaf6LE]
//bt.scale(leafMo1, [0.4, 0.4]);
//bt.translate(berries, [66, 2]);
//bt.rotate(berries,117);
//drawLines(berries);


//const leafLeft = bt.join(leaf1LE,leaf2LE,leaf3LE);
//bt.scale(leafLeft, bt.randInRange(1, 2),[47,61]);

//drawLines(leafLeft);



const leafMo1=bt.copy(leafLeft);
drawLines(leafMo1);

bt.scale(leafMo1, [0.4, 0.4]);
bt.translate(leafMo1, [96, 39]);
bt.rotate(leafMo1,278);
drawLines(leafMo1);

bt.randInRange(105,1);













