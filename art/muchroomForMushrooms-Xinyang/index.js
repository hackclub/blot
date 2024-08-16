/*
@title: muchroomForMushrooms
@author: Xinyang Wang
@snapshot: image1.png
*/

const WIDTH = 125;
const HEIGHT = 125;

setDocDimensions(WIDTH, HEIGHT);

const finalLines = [];
const rr = bt.randInRange;
const rir = bt.randIntInRange;

// How many spots do you want on the mushroom
const MUSHROOM_SPOTS = rr(12, 16);
const GILL_DENSITY = rr(4, 7);
// Distorts the spots on the mushroom
const SPOT_STRETCH = 0.008;
// Curves the mushroom gills
const GILL_CURVE = 0.5;
// Makes spots more bumpy (going past 3 makes it look bad)
const VAR = 2;
// Changes the shape of the mushroom stem and cap
const DIFF = 2;
// Lines on the mushroom stem
const STEM_LINES = 3;

function draw_spot(sides, sideLen = 1, mushCapPatterns) {
  let pen = new bt.Turtle();
  let totalAng = (sides - 2) * 180;
  let angle = totalAng / sides;
  for (let i = 0; i < sides; ++i) {
    pen.forward(sideLen).right(180 - angle);
  }
  let curvedShape = pen.lines();

  let newSpot = [rr(14, 100), rr(60, 100)];
  bt.translate(curvedShape, newSpot, bt.bounds(curvedShape).cc);
  bt.resample(curvedShape, 4);
  bt.iteratePoints(curvedShape, ([x, y]) => [x + SPOT_STRETCH * x ** 2, y]);
  bt.iteratePoints(curvedShape, ([x, y]) => [x + rr(-VAR, VAR), y + rr(-VAR, VAR)]);

  return [bt.catmullRom(...curvedShape)];
}

function centerPolylines(polylines, documentWidth, documentHeight) {
  const cc = bt.bounds(polylines).cc;
  bt.translate(polylines, [documentWidth / 2, documentHeight / 2], cc);
}

let groundLeft = [56 + rr(-DIFF,DIFF), 12 + rr(-DIFF, DIFF)];
let groundRight = [78 + rr(-DIFF, DIFF), 13 + rr(-DIFF, DIFF)];
let capLeft = [56 + rr(-DIFF, DIFF), 47 + rr(-DIFF, DIFF)];
let capRight = [75 + rr(-DIFF, DIFF), 45 + rr(-DIFF, DIFF)];

let mushStem = [bt.catmullRom([
  groundLeft,
  [57 + rr(-DIFF, DIFF), 19 + rr(-DIFF, DIFF)],
  [58 + rr(-DIFF, DIFF), 39 + rr(-DIFF, DIFF)],
  capLeft,
  [54 + rr(-DIFF, DIFF), 54 + rr(-DIFF, DIFF)],
  [76 + rr(-DIFF, DIFF), 52 + rr(-DIFF, DIFF)],
  [80 + rr(-DIFF, DIFF), 49 + rr(-DIFF, DIFF)],
  capRight,
  [75 + rr(-DIFF, DIFF), 21 + rr(-DIFF, DIFF)],
  groundRight,
  groundLeft
])];

let capFarLeft = [19 + rr(-DIFF, DIFF), 56 + rr(-DIFF, DIFF)];
let capFarRight = [116 + rr(-DIFF, DIFF), 48 + rr(-DIFF, DIFF)];

let mushCap = [bt.catmullRom([
  capLeft,
  capFarLeft,
  [25 + rr(-DIFF, DIFF), 82 + rr(-DIFF, DIFF)],
  [43 + rr(-DIFF, DIFF), 96 + rr(-DIFF, DIFF)],
  [72 + rr(-DIFF, DIFF), 101 + rr(-DIFF, DIFF)],
  [107 + rr(-DIFF, DIFF), 83 + rr(-DIFF, DIFF)],
  capFarRight,
  capRight,
  capLeft,
])];

let mushGillRing = [bt.catmullRom([
  capFarLeft,
  [57 + rr(-DIFF, DIFF), 61 + rr(-DIFF, DIFF)],
  [92 + rr(-DIFF, DIFF), 57 + rr(-DIFF, DIFF)],
  capFarRight,
  [105 + rr(-DIFF, DIFF), 39 + rr(-DIFF, DIFF)],
  [65 + rr(-DIFF, DIFF), 38 + rr(-DIFF, DIFF)],
  [20 + rr(-DIFF, DIFF), 46 + rr(-DIFF, DIFF)],
  capFarLeft,
])];

bt.resample(mushGillRing, GILL_DENSITY);

let gillRing = [];
let gillCenter = [64 + rr(-DIFF, DIFF), 50 + rr(-DIFF, DIFF)];
for (let i = 0; i < mushGillRing[0].length; ++i) {
  let [x, y] = mushGillRing[0][i];
  gillRing.push(bt.catmullRom([
    gillCenter,
    [(x + gillCenter[0]) / 2 + rr(-GILL_CURVE, GILL_CURVE), (y + gillCenter[1]) / 2 + rr(-GILL_CURVE, GILL_CURVE)],
    [x, y],
  ]));
}


let mushCapPatterns = [];
for (let i = 0; i < MUSHROOM_SPOTS; ++i) {
  let spot = draw_spot(rir(4, 8), rr(5, 10), mushCapPatterns);
  mushCapPatterns = bt.union(spot, mushCapPatterns);
}

let mushStemLines = [];
for (let i = 0; i < STEM_LINES; ++i) {
  let x = gillCenter[0] - rr(0, 4);
  mushStemLines.push(bt.catmullRom([
    [x, gillCenter[1] - rr(0, 4)],
    [x + rr(-2,2), gillCenter[1] - rr(10, 14)],
    [x, gillCenter[1] - rr(20, 30)],
  ]));
}
// use if you want, kinda ugly
//finalLines.push(...mushStemLines);

let shadow = [bt.catmullRom([
  [60, 31],
  [40, 16],
  [83, 15],
  [95, 33],
  [71, 35],
  [60, 31],
])];
bt.cover(shadow, mushStem);
// adds shadow, doesn't look good
//drawLines(shadow);

bt.cut(mushCapPatterns, mushCap);
bt.cover(mushCapPatterns, mushGillRing);
finalLines.push(...mushCapPatterns);

bt.cover(mushCap, mushStem);
bt.cut(mushGillRing, mushCap);
bt.cut(gillRing, mushCap);
bt.cover(gillRing, mushStem);
finalLines.push(...mushStem, ...mushCap, ...mushGillRing, ...gillRing);
centerPolylines(finalLines, WIDTH, HEIGHT);

drawLines(finalLines);
