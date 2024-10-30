/*
@title: MusicUI
@author: MMKF
@snapshot: snapshot0.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

//all of the randomly generated vars
const vis1h = bt.randInRange(56, 83);
const vis2h = bt.randInRange(56, 83);
const vis3h = bt.randInRange(56, 83);
const vis4h = bt.randInRange(56, 83);
const vis5h = bt.randInRange(56, 83);
const vis6h = bt.randInRange(56, 83);
const vis7h = bt.randInRange(56, 83);
const vis8h = bt.randInRange(56, 83);
const vis9h = bt.randInRange(56, 83);
const vis10h = bt.randInRange(56, 83);
const indicator_d = bt.randInRange(10, 109);

// store final lines here
const finalLines = [];


const box = [
  [4, 90],
  [117, 90],
  [117, 30],
  [5, 30],
  [4, 90]
];

const play = [
  [60, 33],
  [60, 40],
  [66, 36.5],
  [60, 33]
];

const progress_line = [
  [10, 45],
  [111, 45]
];

const visuliser_box = [
  [10, 85],
  [111, 85],
  [111, 55],
  [10, 55],
  [10, 85]
];

const vis1 = [
  [11, vis1h],
  [20, vis1h],
  [20, 55],
  [11, 55],
  [11, vis1h]
];

const vis2 = [
  [30, vis2h],
  [21, vis2h],
  [21, 55],
  [30, 55],
  [30, vis2h]
];

const vis3 = [
  [40, vis3h],
  [31, vis3h],
  [31, 55],
  [40, 55],
  [40, vis3h]
];

const vis4 = [
  [50, vis4h],
  [41, vis4h],
  [41, 55],
  [50, 55],
  [50, vis4h]
];

const vis5 = [
  [60, vis5h],
  [51, vis5h],
  [51, 55],
  [60, 55],
  [60, vis5h]
];

const vis6 = [
  [70, vis6h],
  [61, vis6h],
  [61, 55],
  [70, 55],
  [70, vis6h]
];

const vis7 = [
  [80, vis7h],
  [71, vis7h],
  [71, 55],
  [80, 55],
  [80, vis7h]
];

const vis8 = [
  [90, vis8h],
  [81, vis8h],
  [81, 55],
  [90, 55],
  [90, vis8h]
];

const vis9 = [
  [100, vis9h],
  [91, vis9h],
  [91, 55],
  [100, 55],
  [100, vis9h]
];

const vis10 = [
  [110, vis10h],
  [101, vis10h],
  [101, 55],
  [110, 55],
  [110, vis10h]
];

const progress_box = [
  [indicator_d+2, 48],
  [indicator_d+2, 42],
  [indicator_d, 42],
  [indicator_d, 48],
  [indicator_d+2, 48]
];

// add the polyline to the final lines
finalLines.push(box, play, progress_line, visuliser_box, vis1, vis2, vis3, vis4, vis5, vis6, vis7, vis8, vis9, vis10, progress_box);

// draw it
drawLines(finalLines);