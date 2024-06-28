/*
@title: face to face
@author: Marco Samuele BELOTTI
@snapshot: faceToFace.png
*/

const width = 400;

setDocDimensions(width, width);
const wit = 0
//distance:
let center = width / 2
let origin = center - 50
let radius_m = width / 400 * 75
let radius_M = width / 400 * 125
let radius = bt.randIntInRange(radius_m, radius_M)
let eyes_semi_dis = radius * 2 / 5 / 2
let L_brow = origin
let L_hair = radius + Math.cos(45)
let L_nose = origin + radius - Math.cos(45)*radius*1.3
let Lato = ((L_hair * 2 * Math.sqrt(2)) / 2)
let chin_sem_len = width / 40
let L_eyes = origin + radius / 100 * 65 - L_brow / 50
let nose_semi_len = eyes_semi_dis / 2
let mouth_semi_len = radius * 2 / 5


let final = []
if(wit==true){
  var myTurtle = new bt.Turtle()
    .up()
    .goTo([center, origin])
    .down()
    .arc(360, radius)
    .left(90)
    .forward(radius)
    .left(90)
    .forward(radius)
    .left(180)
    .forward(radius * 2)
    .left(180)
    .forward(radius)
    .right(90)
    .forward(radius)
    .jump([center, origin + radius])
    .up()
    .setAngle(45)
    .forward(L_hair)
    .setAngle(-90)
    .down()
    .forward(Lato)
    .right(90)
    .forward(Lato)
    .right(90)
    .forward(Lato)
    .right(90)
    .forward(Lato)
    .jump([center, origin + radius])
  var position = myTurtle.pos; 
  var path = myTurtle.path; 
  final = final.concat(path)
}

let temp = [bt.catmullRom([
  [center - Math.sin(38.5) * radius, L_brow + radius],
  [center - Math.sin(38.4) * radius, L_brow],
  [center - chin_sem_len * 2.5, center - radius - radius / 8],
  [center + chin_sem_len * 2.5, center - radius - radius / 8],
  [center + Math.sin(38.4) * radius, L_brow],
  [center + Math.sin(38.5) * radius, L_brow + radius]
], 100)]
final = final.concat(temp)

temp = [bt.catmullRom([
  [center - Math.sin(38.4) * radius, L_brow],
  [center - Math.sin(38.55) * radius, (L_brow + radius)],
  [center - radius / 2, (center + radius * 1.3)/100*90],
  [center, (center + radius * 1.48)/100*90],
  [center + radius / 2, (center + radius * 1.3)/100*90],
  [center + Math.sin(38.55) * radius, (L_brow + radius)],
  [center + Math.sin(38.4) * radius, L_brow]
], 100)]
final = final.concat(temp)

temp = [bt.catmullRom([
  [center - Math.sin(38.4) * radius, L_brow],
  [center - Math.sin(38.5) * radius, L_brow + radius],
  [center - radius / 2, (center + radius * 1.2)/100*90],
  [center, (center + radius * 1.29)/100*90],
  [center + radius / 2, (center + radius * 1.2)/100*90],
  [center + Math.sin(38.5) * radius, L_brow + radius],
  [center + Math.sin(38.4) * radius, L_brow]
], 100)]
final = final.concat(temp)

var myTurtle = new bt.Turtle()
  .up()
  .goTo([center - eyes_semi_dis * 1.6, L_eyes])
  .down()
  .arc(360, radius / 5.5)
  .up()
  .goTo([center + eyes_semi_dis * 1.6, L_eyes])
  .down()
  .arc(360, radius / 5.5)
var position = myTurtle.pos; 
var path = myTurtle.path; 
final = final.concat(path)

var myTurtle = new bt.Turtle()
  .up()
  .goTo([center - eyes_semi_dis * 1.6, L_eyes/100*103.5])
  .down()
  .arc(360, radius / 10)
  .up()
  .goTo([center + eyes_semi_dis * 1.6, L_eyes/100*103.5])
  .down()
  .arc(360, radius / 10)
var position = myTurtle.pos; 
var path = myTurtle.path; 
final = final.concat(path)

temp = [bt.catmullRom([
  [center - radius/10*4, origin],
  [center - radius/10*3, origin/100*95],
  [center, origin/100*90],
  [center + radius/10*3, origin/100*95],
  [center + radius/10*4, origin]
], 100)]
final = final.concat(temp)

temp = [bt.catmullRom([
  [center - radius/10*4, origin],
  [center + radius/10*4, origin]
], 100)]
final = final.concat(temp)

temp = [bt.catmullRom([
  [center + radius/100, L_nose/100*125],
  [center - radius/10, L_nose],
  [center + radius/10, L_nose]
], 100)]
final = final.concat(temp)

drawLines(final)