/**
@title:  My Flower
@author:  Gwen Tigges
@snapshot:  
*/

const width = 120;
const height = 120;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

const rr = bt.randInRange

const start = rr(15,40)

const w = rr(1,10)
const center = 60
const sides = rr(5, center-start)
const petal = bt.catmullRom([
  [center-w,center-start],
  [center-w*2, sides],
  [center,5],
  [center+w*2, sides],
  [center+w,center-start]
]);
//drawLines([petal])


const rand = bt.randIntInRange
const numPet = rand(5,15)
for (let b = 0; b < 4; b++)
  {
    bt.scale([petal], [.8, .8], [center,center])
    bt.rotate([petal], 360/numPet/2, [center, center])
for (let a = 0; a < numPet; a++) {
  
  bt.rotate([petal], 360/numPet, [center, center])
    drawLines([petal])
}
}

const stem = bt.catmullRom([[center,center], [center + w, center/2], [center,0]])
drawLines([stem])

const middle = bt.catmullRom([[center,center], [center-w,center-w],[center,center-3*w],[center+w,center-w],[center,center]])
for (let m = 0; m<20; m++)
  {
    bt.rotate([middle], 360/20, [center,center])
drawLines([middle])
  }