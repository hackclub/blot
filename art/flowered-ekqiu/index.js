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
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create repeats
const randomRepeat = bt.randInRange(25, 100);
let rotation = 180 / (randomRepeat + 1);
let rotated = 0;

const offset = bt.randInRange(1, 31.25);

for (let i = 0; i < randomRepeat; i++) {
  rotated += rotation;

  if (rotated < 90) {
    let xchange = 62.5 * Math.sin(rotated);
    let ychange = 62.5 * Math.sin(90 - rotated);
    const newLine = bt.catmullRom([
      [62.5 + xchange, 62.5 + ychange],
      [62.5 + xchange - offset, 62.5 + ychange - offset],
      [62.5 - xchange + offset, 62.5 - ychange + offset],
      [62.5 - xchange, 62.5 - ychange],
    ]);
    finalLines.push(newLine);
  } else if (rotated > 90) {
    let xchange = 62.5 * Math.sin(180 - rotated);
    let ychange = 62.5 * Math.sin(rotated - 90);
    const newLine = bt.catmullRom([
      [62.5 + xchange, 62.5 + ychange],
      [62.5 + xchange - offset, 62.5 + ychange - offset],
      [62.5 - xchange + offset, 62.5 - ychange + offset],
      [62.5 - xchange, 62.5 - ychange],
    ]);
    finalLines.push(newLine);
  } else if ((rotated = 90)) {
    let xchange = 62.5;
    let ychange = 0;
    const newLine = bt.catmullRom([
      [62.5 + xchange, 62.5 + ychange],
      [62.5 + xchange - offset, 62.5 + ychange - offset],
      [62.5 - xchange + offset, 62.5 - ychange + offset],
      [62.5 - xchange, 62.5 - ychange],
    ]);
    finalLines.push(newLine);
  }
}

bt.scale(finalLines, 0.6);

// draw it
drawLines(finalLines);
