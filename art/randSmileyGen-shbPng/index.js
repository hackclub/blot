
/*
@title: Random Smiley Generator
@author: shb-png
@snapshot: smiley-guy.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

function yourShape(n, sideLength) {
  const t = new bt.Turtle()
  const angle = 180-((n - 2) * 180 / n)
  for (let i=0; i<n; i++) {
      t.forward(sideLength)
      t.left(angle)
  }
  let finalPolygon = bt.originate(t.lines())
  bt.translate(finalPolygon, [width/2, height/2])
  return finalPolygon
};
function yourCos(yourValue) {
  let finalNum = Math.cos(yourValue*(Math.PI/180))
  return finalNum

}
function yourCircle(radius, x=0, y=0, sideRes = 40, semiPercent = 100) {
  const c = new bt.Turtle()
  const innerAngle = ((sideRes - 2) * 180 / sideRes)
  const rotateAngle = 180-innerAngle
  let sideLength = 2*radius*yourCos(innerAngle/2)
  for (let i=0; i<sideRes*((semiPercent+1)/100); i++) {
      c.forward(sideLength)
      c.left(rotateAngle)
  }
  const finalCircle = bt.originate(c.lines())
  bt.translate(finalCircle, [width/2, height/2])
  bt.translate(finalCircle, [x, y])
  return finalCircle
}

//-----randomize it!!

function randNumGen (lowerBound, upperBound) {
  return Math.floor((Math.random() * (upperBound-lowerBound))+lowerBound+1)
}
// randomize eye location
const eyeX = randNumGen(22, 30) //random x between 22 and 30
const eyeY = randNumGen(6, 24) //random y between 24 and 6
//randomize eye size
const eyeSize = randNumGen(7, 14) // between 14 and 7
const eyeInSize = randNumGen(1, eyeSize-1) // minus a number between 1 and eyesize -1
//randomize mouth height and orientation
const mouthDirection = randNumGen(0,2)
let mouthOrientation = 0
if (mouthDirection == 1){
  mouthOrientation = 270
}
else{
  mouthOrientation = 90
}
const mouthSize = randNumGen(6, 20) // between 20 and 6
const mouthHeight = randNumGen(7, 29) // between 7 and 29
//-----draw base circle
drawLines(yourCircle(54))

//-----draw eyes
//eye white bit
drawLines(yourCircle(eyeSize, -eyeX, eyeY))
drawLines(yourCircle(eyeSize, eyeX, eyeY))

//center of eye
drawLines(yourCircle(eyeInSize, -eyeX, eyeY), "black")
drawLines(yourCircle(eyeInSize, eyeX, eyeY), "black")

//-----draw mouth
drawLines(bt.rotate(yourCircle(mouthSize, 0, -mouthHeight, 40, 50), mouthOrientation))
