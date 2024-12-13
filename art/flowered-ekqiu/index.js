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
const randomRepeat = bt.randInRange(10, 20);
let rotation = 180 / (randomRepeat + 1);
let rotated = 0;


for (let i = 0; i < randomRepeat; i++) {
  rotated += rotation;
  const offset = bt.randInRange(1, 31.25);
  const anchor = 62.5

  if (rotated < 90) {
    let xchange = anchor * Math.sin(rotated);
    let ychange = anchor * Math.sin(90 - rotated);
    const newLine = bt.catmullRom([
      [anchor + xchange, anchor + ychange],
      [anchor + xchange - offset, anchor + ychange - offset],
      [anchor + offset, anchor - offset],
      [anchor - xchange + offset, anchor - ychange + offset],
      [anchor - xchange, anchor - ychange],
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

bt.scale(finalLines, 0.6);

// draw it
drawLines(finalLines);
