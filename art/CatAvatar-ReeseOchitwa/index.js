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

const noseTT = new bt.Turtle()
noseTT.jump([bt.bounds(nose).cb[0]+0.5,bt.bounds(nose).cb[1]])
noseTT.right(130)
noseTT.arc(200,2)
noseTT.jump([bt.bounds(nose).cb[0]-0.5,bt.bounds(nose).cb[1]])
noseTT.right(125)
noseTT.arc(-200,2)
bt.join(finalLines, noseTT.lines())


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

const lYay = bt.randIntInRange(0,1)
const sYay = bt.randIntInRange(0,1)

if (lYay){
//Lashes
const lashes = new bt.Turtle()
lashes.jump([bt.bounds(lEye).lc[0]-2.1, bt.bounds(lEye).lt[1]-1])
lashes.setAngle(-60)
lashes.arc(90, 2)
lashes.jump([bt.bounds(lEye).lc[0]-2.0, bt.bounds(lEye).lt[1]-3])
lashes.setAngle(-30)
lashes.arc(70, 2)

bt.cover(lashes.lines(), lEye)

lashes.jump([bt.bounds(rEye).rc[0]-.75, bt.bounds(rEye).rt[1]-1.5])
lashes.setAngle(-30)
lashes.arc(90, 2)
lashes.jump([bt.bounds(rEye).rc[0]-.1, bt.bounds(rEye).rt[1]-3])
lashes.setAngle(-35)
lashes.arc(70, 2)

bt.cover(lashes.lines(), rEye)

bt.join(finalLines, lashes.lines())
}

if (sYay){
//Sleepy eyes
const sleepy = new bt.Turtle()

sleepy.jump([bt.bounds(lEye).lc[0], bt.bounds(lEye).lc[1]])
sleepy.forward(eWidth*1.3)

sleepy.jump([bt.bounds(rEye).lc[0], bt.bounds(rEye).lc[1]])
sleepy.forward(eWidth*1.3)


bt.join(finalLines, sleepy.lines())
}

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
bt.cover(lEar, head)
bt.join(finalLines, lEar)

// Right Ear
const hRightX = bt.bounds(head).rc[0]
const hRightY = bt.bounds(head).rc[1]
const rEar = [[
    [hTopX+5,hTopY],
    [hRightX + (hTopX - hRightX)/2, hTopY + earHeight],
    [hRightX, hRightY]
]]
bt.cover(rEar, head)
bt.join(finalLines, rEar)

const pattern = bt.randIntInRange(0,3)

if (pattern == 1){
//Forehead Lines
const stripes = new bt.Turtle()
const lLength = bt.randInRange(5,20)
const lLength2 = bt.randInRange(5,20)

stripes.jump([hTopX, hTopY])
stripes.setAngle(270)
stripes.forward(lLength)
stripes.jump([hTopX+5, hTopY])
stripes.forward(lLength2)
stripes.jump([hTopX-5, hTopY])
stripes.forward(lLength2)

bt.join(finalLines, stripes.lines())
} else if (pattern == 2){

//Eye Circles

const circRad = eHeight+2
const circRad2 = eHeight+1
const circle = new bt.Turtle()
circle.jump([bt.bounds(lEye).cb[0]-1,bt.bounds(lEye).cb[1]-eHeight/2])
circle.arc(360,circRad)
circle.jump([bt.bounds(rEye).cb[0]+1,bt.bounds(rEye).cb[1]-eHeight/2])
circle.arc(360,circRad2)

bt.join(finalLines, circle.lines())
} else if (pattern == 3){

//Calico
const calico = [  
  bt.nurbs([
    [bt.bounds(lEar).lb[0],bt.bounds(lEar).lb[1]],
    [bt.bounds(lEar).lb[0]+15,bt.bounds(lEar).lb[1]],
    [bt.bounds(lEar).rb[0],hTopY],  
  ]),
  bt.nurbs([
    [bt.bounds(rEar).rb[0],bt.bounds(rEar).lb[1]],
    [bt.bounds(rEar).rb[0]-15,bt.bounds(rEar).lb[1]],
    [bt.bounds(rEar).lb[0],hTopY],  
  ])
]
  bt.join(finalLines, calico)
} else{

}

// Left Whiskers
const whiskers = new bt.Turtle()
const wL1 = bt.randInRange(15,40)
const wL2 = bt.randInRange(15,40)
const wL3 = bt.randInRange(15,30)
whiskers.jump([hLeftX+5, hLeftY-5])
whiskers.setAngle(180)
whiskers.arc(wL1,30)
whiskers.jump([hLeftX+7, hLeftY-7])
whiskers.arc(wL2,30)
whiskers.jump([hLeftX+7, hLeftY-10])
whiskers.arc(wL3,25)

// Right Whiskers
whiskers.jump([hRightX-5, hRightY-5])
whiskers.setAngle(-360)
whiskers.arc(-wL1,30)
whiskers.jump([hRightX-7, hRightY-7])
whiskers.arc(-wL2,30)
whiskers.jump([hRightX-7, hRightY-10])
whiskers.arc(-wL3,25)

bt.join(finalLines, whiskers.lines())


// collar
const cYay = bt.randIntInRange(0,1)
if (cYay){
const collarRad = bt.randInRange(3,6)
const collar = new bt.Turtle()
collar.jump([bt.bounds(head).cb[0], bt.bounds(head).cb[1]-collarRad*2])
collar.arc(360, collarRad)

bt.join(finalLines, collar.lines())
}


drawLines(finalLines);


