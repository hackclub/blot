/*
@title: endlessFaces
@author: mithilp
@snapshot: image1.png
*/

const width = 200;
const height = 200;

setDocDimensions(width, height);

const rr = bt.randInRange


// eyebrows
const eyebrowStartX = rr(40,50)
const eyebrowStartY = rr(145,155)
const eyebrowMiddleX =  rr(55,65)
const eyebrowMiddleY =  rr(150,160)
const eyebrowEndX =  rr(75,90)
const eyebrowEndY =  rr(150,160)
const eyebrowLeft = bt.catmullRom([[eyebrowStartX, eyebrowStartY], [eyebrowMiddleX, eyebrowMiddleY], [eyebrowEndX, eyebrowEndY]])
const eyebrowRight = bt.catmullRom([[200-eyebrowStartX, eyebrowStartY], [200-eyebrowMiddleX, eyebrowMiddleY], [200-eyebrowEndX, eyebrowEndY]])

// eyes
const eyeStartX = rr(40,50)
const eyeStartY = rr(120,130)
const eyeMiddleTopX = rr(55,65)
const eyeMiddleTopY = rr(130,140)
const eyeMiddleBottomX = rr(55,65)
const eyeMiddleBottomY = rr(115,125)
const eyeEndX = rr(70,85)
const eyeEndY = rr(120,130)
const eyeLeftTop = bt.catmullRom([[eyeStartX,eyeStartY], [eyeMiddleTopX,eyeMiddleTopY], [eyeEndX,eyeEndY] ])
const eyeLeftBottom = bt.catmullRom([[eyeStartX,eyeStartY], [eyeMiddleBottomX,eyeMiddleBottomY], [eyeEndX,eyeEndY] ])
const eyeRightTop = bt.catmullRom([[200-eyeStartX,eyeStartY], [200-eyeMiddleTopX,eyeMiddleTopY], [200-eyeEndX,eyeEndY] ])
const eyeRightBottom = bt.catmullRom([[200-eyeStartX,eyeStartY], [200-eyeMiddleBottomX,eyeMiddleBottomY], [200-eyeEndX,eyeEndY] ])

// nose
const noseStartX = rr(90,100)
const noseStartY = rr(100, 110)
const noseTipX = rr(75,85)
const noseTipY = rr(75,85)
const noseEndX = rr(95,100)
const noseEndY = rr(75,85)
const nose = bt.catmullRom([[noseStartX,noseStartY],[noseTipX, noseTipY], [noseEndX, noseEndY] ] )

// mouth
const mouthStartX = rr(40,60)
const mouthStartY = rr(45,65)
const mouthMiddleX = rr(85,105)
const mouthMiddleY = rr(40,60)
const mouthEndX = (108, 139)
const mouthEndY = rr(45,65)
const mouth = bt.catmullRom([ [mouthStartX,mouthStartY], [mouthMiddleX,mouthMiddleY], [mouthEndX, mouthEndY] ])

// head
const top = [100, rr(170,200)]
const bottom = [100, rr(10,40)]
const sideTopX = rr(20,30)
const sideTopY = rr(140, 170)
const sideBottomX = rr(20,30)
const sideBottomY = rr(50,60)
const head = bt.catmullRom( [ bottom, [sideBottomX,sideBottomY] , [sideTopX,sideTopY], top,[200-sideTopX,sideTopY] ,[200-sideBottomX,sideBottomY],bottom   ] )

drawLines([head,mouth,nose,eyebrowLeft,eyebrowRight,eyeLeftTop,eyeLeftBottom, eyeRightTop, eyeRightBottom])