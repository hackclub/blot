/*
@title: Silly Cat
@author: Michael Jao
@snapshot: silly_cat1
*/

const width = 125
const height = 125

setDocDimensions(width, height)

const finalLines = []

//random body shape (default is faceW = 70, faceH = 50)
const faceW = bt.randIntInRange(70,75)
const faceH = bt.randIntInRange(45,70)

const faceHeight = bt.randIntInRange(0,15)

const leftFace = [
  bt.nurbs([
    [0,0],
    [-(faceW/8),(faceH/6)],[-(faceW/6),(faceH/3)],[-(faceW/7.5),(faceH/1.37)],
    [0,faceH+6],
    [(faceW/6.77),(faceH/1.333)],[(faceW/6.176),(faceH/1.2988)],[(faceW/3.6207),(faceH/1.23469)],[(faceW/2)-(faceW/7),(faceH/1.23469)]
    
  ])
]

const rightFace = bt.copy(leftFace);
bt.scale(rightFace, [-1,1], [25,0])

const leftEar = [
  bt.nurbs([
    [-(faceW/14),faceH/1.38888888],[-(faceW/70),faceH/0.8621],[faceW/10,faceH/1.31579]
  ])
]

const rightEar = bt.copy(leftEar);
bt.scale(rightEar, [-1,1], [25,0])

const leftWhisker1 = [
  bt.nurbs([
    [faceW/35,faceH/5.555555],[-(faceW/6),faceH/7.14286],[-(faceW/4.11765),faceH/10]
  ])
]

const leftWhisker2 = [
  bt.nurbs([
    [faceW/35,faceH/4.166666666],[-(faceW/7),faceH/3.333333],[-(faceW/4.117647),faceH/3.333333]
  ])
]
const rightWhisker1 = bt.copy(leftWhisker1);
bt.scale(rightWhisker1, [-1,1], [25,0])

const rightWhisker2 = bt.copy(leftWhisker2);
bt.scale(rightWhisker2, [-1,1], [25,0])

const leftBody = [
  bt.nurbs([
    [0,0],
    [-(faceW/7),-(faceH/5)], [-(faceW/5.3846),-(faceH/2.5)], [-(faceW/7),-(faceH/2.272727)], [-(faceW/14),-(faceH/2.5)], [faceW/35,-(faceH/3.33333)],
    [faceW/23.33333333,-(faceH/3.125)],[-(faceW/35),-(faceH/1.66666666)],[-(faceW/35),-(faceH/1.25)],
    [faceW/23.3333333,-(faceH/1.25)],[faceW/8.75,-(faceH/1.42857)],
    [faceW/7.77777,-(faceH/1.42857)],[faceW/2.333333,-(faceH/1.42857)]

  ])
]    

const rightBody = bt.copy(leftBody);
bt.scale(rightBody, [-1,1], [25,0])

const stomach = [
  bt.nurbs([
    [25,-5],[12,-7],[7,-18],[12,-27],[25,-30],[38,-27],[44,-18],[38,-7],[25,-5]
  ])
]

const leftEye = new bt.Turtle();
leftEye.jump([46.666666, 71.428 + faceHeight]).arc(360,1)
leftEye

const rightEye = new bt.Turtle();
rightEye.jump([77.77777, 71.428 + faceHeight]).arc(360,1)

const mouth = new bt.Turtle();
mouth.right(50).jump([63.1,67.7 + faceHeight]).arc(90,5)
mouth.jump([56,67 + faceHeight]).left(280).arc(90,5)


const tongue = new bt.Turtle();
tongue.jump([60,65.8 + faceHeight]).right(90).forward(1).arc(180,3).forward(1)

bt.join(finalLines, leftFace);
bt.join(finalLines, rightFace);
bt.join(finalLines, leftEar);
bt.join(finalLines, rightEar);
bt.join(finalLines, leftWhisker1);
bt.join(finalLines, leftWhisker2);
bt.join(finalLines, rightWhisker1);
bt.join(finalLines, rightWhisker2);
bt.join(finalLines, leftBody);
bt.join(finalLines, rightBody);
bt.join(finalLines,stomach);


bt.translate(finalLines, [37,57]);

drawLines(finalLines,{width: 3});
drawLines(leftEye.lines(),0);
drawLines(rightEye.lines(),0);
drawLines(mouth.lines(),{width: 3});
drawLines(tongue.lines(),);
