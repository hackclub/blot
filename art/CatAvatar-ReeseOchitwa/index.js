/*
@title: Cat Avatar
@author: Reese O
@snapshot: CatAvatar.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

// Body
const jBoarder = bt.randInRange(5,25)
const jHeight = bt.randInRange(25,55)
const aWidth = bt.randInRange(10,20)
const body = [
  bt.nurbs([
    [jBoarder, 0],
    [jBoarder*1.5, jHeight],
    [(125- jBoarder*1.5), jHeight],
    [(125 -jBoarder), 0]
  ]),
  bt.nurbs([
    [jBoarder + aWidth, 0],
    [(jBoarder+ aWidth), jHeight*.2],
    [(jBoarder+ aWidth)*1.25, jHeight*.5]
  ]),
   bt.nurbs([
    [125- jBoarder - aWidth, 0],
    [(125-jBoarder- aWidth), jHeight*.2],
    [(125-((jBoarder+aWidth)*1.25)),jHeight*.5]
   ]),
  bt.nurbs([
    [jBoarder + aWidth+4, 0],
    [(jBoarder+aWidth)*1.3,jHeight*.5],
    [(125-((jBoarder+aWidth)*1.3)),jHeight*.5],
    [125- jBoarder - aWidth-4, 0]
  ])
]
bt.join(finalLines, body);

//Head
const hWidth = bt.randInRange(10,25)
const hHeight = bt.randInRange(40,80)
const hBase = bt.bounds(body).ct[1]
const head = [
  bt.nurbs([
    [62.5, hBase],
    [hWidth, jHeight + hHeight/2],
    [62.5, jHeight + hHeight + 10],
    [125 - hWidth, jHeight + hHeight/2],
    [62.5, hBase]
   ], { steps: 1000, degree: 3 })
]
bt.translate(head, [0,-(bt.bounds(head).cb[1]-bt.bounds(body).ct[1])]) 
bt.join(finalLines, head);

// Nose
const hCentreX = bt.bounds(head).cc[0]
const hCentreY = bt.bounds(head).cc[1]
const nWidth = bt.randInRange(5,7)
const nHeight = bt.randInRange(2,7)
const nose = [
  bt.nurbs([
    [hCentreX, hCentreY],
    [hCentreX - nWidth, hCentreY + nHeight],
    [hCentreX + nWidth, hCentreY + nHeight],
    [hCentreX, hCentreY]
  ]),
]

bt.translate(nose, [0,-15]) 
if ((bt.bounds(nose).cb[1] - bt.bounds(body).ct[1]) <5){
  bt.translate(nose, [0,5]) 
}

bt.join(finalLines, nose);

// Mouth Lines

const myTurtle = new bt.Turtle()
myTurtle.jump([bt.bounds(nose).cb[0],bt.bounds(nose).cb[1]])
myTurtle.right(120)
myTurtle.arc(200,2)
myTurtle.jump([bt.bounds(nose).cb[0],bt.bounds(nose).cb[1]])
myTurtle.right(135)
myTurtle.arc(-200,2)


// Right Eye
const eWidth = bt.randInRange(3,5)
const eHeight = bt.randInRange(5,7)
const nCentreLX = bt.bounds(nose).lc[0]
const nCentreRX = bt.bounds(nose).rc[0]
const nCentreY = bt.bounds(nose).cc[1]
const rEye = [  
  bt.nurbs([
    [nCentreRX, nCentreY],
    [nCentreRX + eWidth, nCentreY + eHeight],
    [nCentreRX + eWidth*2, nCentreY],
    [nCentreRX + eWidth, nCentreY - eHeight],
    [nCentreRX, nCentreY]
    ], { steps: 500, degree: 3 })
]
bt.translate(rEye, [4,4]) 
bt.join(finalLines, rEye)

//Left Eye
const lEye = [  
  bt.nurbs([
    [nCentreLX, nCentreY],
    [nCentreLX - eWidth, nCentreY + eHeight],
    [nCentreLX - eWidth*2, nCentreY],
    [nCentreLX - eWidth, nCentreY - eHeight],
    [nCentreLX, nCentreY]
    ],{ steps: 500, degree: 3 })
]
bt.translate(lEye, [-4,4]) 
bt.join(finalLines, lEye)

//Left Ear
const earHeight = bt.randInRange(5,15)
const earWidth = bt.randInRange(10,20)
const hTopX = bt.bounds(head).ct[0]
const hTopY = bt.bounds(head).ct[1]
const hLeftX = bt.bounds(head).lc[0]
const hLeftY = bt.bounds(head).lc[1]
const lEar = [[
    [hTopX-5,hTopY],
    [hLeftX + (hTopX - hLeftX)/2, hTopY + earHeight],
    [hLeftX, hLeftY ]
]]
bt.join(finalLines, lEar)

// Right Ear
const hRightX = bt.bounds(head).rc[0]
const hRightY = bt.bounds(head).rc[1]
const rEar = [[
    [hTopX+5,hTopY],
    [hRightX + (hTopX - hRightX)/2, hTopY + earHeight],
    [hRightX, hRightY]
]]

bt.join(finalLines, rEar)

//Forehead Lines
const lLength = bt.randInRange(5,20)
const lLength2 = bt.randInRange(5,20)

myTurtle.jump([hTopX, hTopY])
myTurtle.setAngle(270)
myTurtle.forward(lLength)
myTurtle.jump([hTopX+5, hTopY])
myTurtle.forward(lLength2)
myTurtle.jump([hTopX-5, hTopY])
myTurtle.forward(lLength2)

// Left Whiskers
const wL1 = bt.randInRange(15,40)
const wL2 = bt.randInRange(15,40)
const wL3 = bt.randInRange(15,30)
myTurtle.jump([hLeftX+5, hLeftY-5])
myTurtle.setAngle(180)
myTurtle.arc(wL1,30)
myTurtle.jump([hLeftX+7, hLeftY-7])
myTurtle.arc(wL2,30)
myTurtle.jump([hLeftX+7, hLeftY-10])
myTurtle.arc(wL3,25)

// Right Whiskers
myTurtle.jump([hRightX-5, hRightY-5])
myTurtle.setAngle(-360)
myTurtle.arc(-wL1,30)
myTurtle.jump([hRightX-7, hRightY-7])
myTurtle.arc(-wL2,30)
myTurtle.jump([hRightX-7, hRightY-10])
myTurtle.arc(-wL3,25)

bt.join(finalLines, myTurtle.lines())


drawLines(finalLines);


