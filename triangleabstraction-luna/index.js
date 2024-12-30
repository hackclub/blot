/*
@title: TriangleAbstraction
@author: Luna
@snapshot: abstract
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

const container = document.getElementById('container');
container.innerHTML = svgString;
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];
const rfinallines= [];
const random = bt.randIntInRange(1, 50);
// create a polyline
const polyline = [
  [58.0, 66.1],
  [60, 34],
  [43, 17],
  [8, 41],
  [20, 80],
  [56, 75],
  [58, 66],
  [95, 66],
  [55, 90],
  [22, 46],
  [58, 20],
  [67, 124],
  [16, 66],
  [58, 20],
  [45, 65],
  [67, 124],
  [15, 65],
  [93, 66]
];
const rpolyline = [
  [random, 77],
  [28, 15],
  [random, 107],
  [54, 39]
];
// add the polyline to the final lines
finalLines.push(polyline);
rfinallines.push(rpolyline);


// transform lines using the toolkit
bt.rotate(finalLines, 45);
bt.rotate(rfinallines, 15);

// draw it
drawLines(finalLines);
drawLines(rfinallines);