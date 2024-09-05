// welcome to blot!
/*
@title: SinBall
@author: Hrushal Nikhare
@snapshot: the name of the snapshot file you want in the gallery
*/
// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = width;

setDocDimensions(width, height);

let circle = []; // Circle

let clarity = 20 // no of steps for catmullRom higher is smoother but takes more time
let pecent_area = 0.75 //percent of canvas to cover
let r = (width*pecent_area)/2; // radius
let cx = width / 2; // x coord of the center
let cy = height / 2; // y coord of the center
let steps = 11; // density of sinwaves
let rotation = 10; // rotate them waves
let waveIntensity = 4; //Make waves more intense


// Polar Coordinate Circle Generator
for (let a = 0; a <= 2 * Math.PI; a += .1) {
  let x = cx + r * Math.cos(a);
  let y = cy + r * Math.sin(a);
  circle.push([x, y])
}

circle.push(circle[0]) // complete the circle

function sinwavegen(y) {
  let polyline = [] // temp storage
  for (let x = 0; x <= width; x++) {
    polyline.push([x, Math.sin(x)*waveIntensity + y]) // for every x coordinate generate a y coord and push it
  }
  return bt.catmullRom(polyline,clarity) // S M O O T H  O P E R A T O R 🎶
  // return polyline
}

let sinwaves = [];

for (let y = 0; y <= height; y += steps) {
  sinwaves.push(bt.rotate([sinwavegen(y)], rotation)[0]) // convert into array rotate it and then undo the array conversion
  // if any polyline doesnt work try wrapping it in [] or doing [0] =)
}

circle = bt.catmullRom(circle,clarity*0.1) // come on

var startTime = performance.now()

let sinwav = bt.cut(sinwaves,[circle])

var endTime = performance.now()

let final = bt.join(sinwav, [circle])

// final = bt.nurbs(final,3)

// console.log(`Call to Cut  took ${endTime - startTime} milliseconds`)
drawLines(final);



// drawLines([circle]);

// drawLines(bt.cut(sinwaves,[circle])) // works!!

// drawLines(bt.difference([circle],sinwaves)) // nothing else works?
