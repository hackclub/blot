export const defaultProgram = 

`
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

// create a polyline
const polyline = [
  [30, 90],
  [100, 90],
  [100, 30],
  [30, 30],
  [30, 90]
];

// add the polyline to the final lines
finalLines.push(polyline);

// transform lines using the toolkit
bt.rotate(finalLines, 45);

// draw it
drawLines(finalLines);
`.trim()
