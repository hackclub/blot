// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
//const polyline = [
//  [30, 90],
//  [100, 90],
//  [100, 30],
//  [30, 30],
//  [30, 90]
//];

const s = 125;

const rot = s/125;

const pi = 3.141592

function calc_con1 (rot):
    

const con1 = [
  [Math.sin(rot/2 * pi) * 125, 20],
  [Math.sin(rot/2 * pi) * 125, 105],
];

//var k;
//var c

//if (s > 90) {
//  k = (s - 125)*-1;
//  c = k/3;
//} else {
//  k = 0;
//  c = 0;
//}

//const roof = [
//  [k, 125 - c],
//  [s, 105],
//  [125, 125]
//];

//const floor = [
//  [k, c],
//  [s, 20],
//  [125, 0]
//];

//const roof_floor_con = [
//  [s, 20],
//  [s, 105]
//];

// add the polyline to the final lines
finalLines.push(con1);

// transform lines using the toolkit
//bt.rotate(finalLines, 45);

// draw it
drawLines(finalLines);
