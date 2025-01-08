/*
@title: flowered
@author: ekqiu
@snapshot: snapshot1.png
*/

/*
  Welcome to Blot!

  To get started with learning Blot's toolkit,
  you can find a handful of guides here: https://blot.hackclub.com/guides

  You can find full documentation on Blot's toolkit by clicking the button at the top!

 Before you make a submission, there are a couple *mandatory* requirements for your PR:

 - It must be drawable in Blot! This means keeping the dimensions at 125x125 or smaller
 - It must change based on different parameters; it cannot be hardcoded.

*/
var offset

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create repeats
const randomRepeat = bt.randInRange(10, 20);
let rotation = 180 / (randomRepeat + 1);
let rotated = 0;


for (let i = 0; i < randomRepeat; i++) {
  rotated += rotation;
  const offset = bt.randInRange(1, 31.25);
  const anchor = 47.5

  if (rotated < 90) {
    let xchange = (anchor * Math.sin(rotated));
    let ychange = anchor * Math.sin(90 - rotated);
    const newLine = bt.catmullRom([
      [anchor + xchange+ bt.randInRange(-5, 5), anchor + ychange+ bt.randInRange(-5, 5)],
      [anchor + xchange - offset, anchor + ychange - offset],
      [anchor + offset+ bt.randInRange(-5, 5), anchor - offset+ bt.randInRange(-5, 5)],
      [anchor - xchange + offset, anchor - ychange + offset],
      [anchor - xchange+ bt.randInRange(-5, 5), anchor - ychange+ bt.randInRange(-5, 5)],
    ]);
    finalLines.push(newLine);
  } else if (rotated > 90) {
    let xchange = anchor * Math.sin(180 - rotated);
    let ychange = anchor * Math.sin(rotated - 90);
    const newLine = bt.catmullRom([
      [anchor + xchange, anchor + ychange],
      [anchor + xchange - offset, anchor + ychange - offset],
      [anchor + offset, anchor - offset],
      [anchor - xchange + offset, anchor - ychange + offset],
      [anchor - xchange, anchor - ychange],
    ]);
    finalLines.push(newLine);
  } else if ((rotated = 90)) {
    let xchange = anchor;
    let ychange = 0;
    const newLine = bt.catmullRom([
      [anchor + xchange, anchor + ychange],
      [anchor + xchange - offset, anchor + ychange - offset],
      [anchor + offset, anchor - offset],
      [anchor - xchange + offset, anchor - ychange + offset],
      [anchor - xchange, anchor - ychange],
    ]);
    finalLines.push(newLine);
  }
}

bt.translate(finalLines, [15, 59])
bt.rotate(finalLines, -46)

let startx = 66
let starty = -45
let endx = 61
let endy =  70.5
let change = 0
const fillers = [[startx, starty]]
let newset = (endy - starty) / (randomRepeat)
let repeatt = bt.randInRange(5,10)

for (let i = 0; i < repeatt; i++) {
  change += newset
  
  fillers.push([bt.randInRange(-25,147),starty + change])
}
fillers.push([endx, endy])
console.log(finalLines)
finalLines.push(bt.catmullRom(fillers))
console.log(fillers)
console.log(finalLines)
bt.scale(finalLines, 0.5);

// draw it
drawLines(finalLines);
