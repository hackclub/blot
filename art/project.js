/*
@title: Gregory
@author: Jacob Frazier
@snapshot: Final.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline


const t= Math.random()*19
const ta= Math.random()*19
const POWER =[
[t+30, ta+90],
  [ta+30, t+90],
  [-ta+30, t+90],
  [ta+30, -t+90],
  [-ta+30 ,-t+90],
  ]
for(let i = 1 ; i < 65; i++){
bt.rotate([POWER], 15)
  bt.scale([POWER], 1.001)
  drawLines([POWER])
            }


const B = Math.random()*19
const BA = Math.random()*19
const MOREE =[
  [B+90, BA+90],
  [BA+90, B+90],
   [-BA+90, B+90],
   [BA+90, -B+90],
   [-BA+90, -B+90]
   ]
  for(let i = 1 ; i < 65; i++){
  bt.rotate([MOREE], 15)
  bt.scale([MOREE], 1.001)
  drawLines([MOREE])
}
const mmm = [
  [20, 36], [100, 36],
  [20, 36],[20, 13],
  [20, 13], [100, 13],
  [100, 36],[100, 13]
  ]
const mmmr = Math.floor(Math.random()*2)
if(mmmr === 0){
for(let i = 1 ; i < 65; i++){
bt.scale ([mmm], .95)
  drawLines([mmm])
}}
  else{
  for(let i = 1 ; i < 45; i++){
bt.scale ([mmm], .85)
  drawLines([mmm])
}
};
const nose = [
[60, 66],
  [44, 49],
  [80, 49],
[60,66], [80,49]
  ]
const noser = Math.floor(Math.random()*2)
if(noser === 0){
for(let i = 1 ; i < 65; i++){
  bt.scale ([nose], .75)
drawLines([nose])
}
}
else {
for(let i = 1 ; i < 65; i++){
  bt.scale ([nose], .90)
drawLines([nose])
}
}
//Curved Lines
drawLines ([bt.catmullRom([[0, 0], [69, 34], [125, 125]], 500)]);
drawLines ([bt.catmullRom([[0, 0], [30, 50], [0, 125]], 500)]);
drawLines ([bt.catmullRom([[70, 0], [4, 123], [125, 39]], 500)]);
drawLines ([bt.catmullRom([[75, 0], [124, 83], [34, 0]], 500)]);
drawLines ([bt.catmullRom([[0, 50], [69, 100], [25, 125]], 500)]);
drawLines ([bt.catmullRom([[38, 0], [2, 46], [67, 0]], 500)]);
drawLines ([bt.catmullRom([[0, 114], [70, 120], [0, 70]], 500)]);
drawLines ([bt.catmullRom([[45, 0], [75, 123], [0, 0]], 500)]);
drawLines ([bt.catmullRom([[80, 125], [66, 68], [125, 35]], 500)]);
drawLines ([bt.catmullRom([[125, 0], [62, 55], [125, 125]], 500)]);
//The Ben Line
const quadinaros = Math.random()*117
const ben = Math.random()*117
const gasgano = Math.random()*117
const  droopyMccool = Math.random()*1000
drawLines ([bt.catmullRom([[ben, quadinaros], [quadinaros, ben], [gasgano, gasgano]], droopyMccool)]);
const mullner = [
[76.4, 34.8], [80, 38.3]
  ]
for(let i = 0; i < 439; i++){
bt.rotate([mullner], 1)
  drawLines([mullner])
}

const hairStrand = [
[50,125], [50, 90],
  [50, 90], [57, 90],
  [57, 90], [57, 125],
  [57, 125], [50, 125]
  ]
for(let i = 0; i < 300; i++){
bt.scale([hairStrand],.99)
  drawLines([hairStrand])
}
