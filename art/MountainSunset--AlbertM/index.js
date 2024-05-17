/*
@title: Mountain Sunrise
@author: AlbertM
@snapshot: Mountain1.png
*/

// Adjustable Parameters
bt.setRandSeed(800);
const NUMBIRDS = bt.randIntInRange(0,5);
const MAX_ITERATION = 8
const ANGLE_CHANGE = bt.randIntInRange(30,45);
const CLIFF_WIDTH = 2

// Set Doc Dimensions
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Define Random Numbers for Variation 
const randnum = bt.randIntInRange(10, 50)
const randnum2 = bt.randIntInRange(10, 25)
const cliffLines = [];
const birdLines = [];

// Cliffs
const cliff1 = [
  bt.nurbs([
    [30, 0],
    [randnum + 30, 15],
    [randnum + 70, 20],
    [width, 25]
  ], { steps: 20, degree: 3 })
]
bt.iteratePoints(cliff1, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

const cliff2 = [
  bt.nurbs([
    [50, 20],
    [randnum2 + 40, 35],
    [randnum2 + 70, 40],
    [width, 40]
  ], { steps: 20, degree: 3 })
]
bt.iteratePoints(cliff2, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

const cliff3 = [
  bt.nurbs([
    [85, 50],
    [randnum2 + 80, 55],
    [randnum2 + 90, 60],
    [width, 65]
  ], { steps: 12, degree: 3 })
]
bt.iteratePoints(cliff3, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

const cliff4 = [
  bt.nurbs([
    [20, 20],
    [randnum2 + 80, 65],
    [randnum2 + 90, 80],
    [110, 85],
    [width, height - 30]
  ], { steps: 75, degree: 3 })
]
bt.iteratePoints(cliff4, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 3 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

const cliff6 = [
  bt.nurbs([
    [0, 90],
    [15, 85],
    [5 + randnum2, 85],
    [15 + randnum2, 80]
  ], { steps: 10, degree: 2 })
]
bt.iteratePoints(cliff6, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 25, { octaves: 4 }) * 10 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

// Sun 
const sun = new bt.Turtle();
sun.jump([60 + randnum2, 100]);
sun.arc(360, 7);
drawLines(sun.lines(), {fill: 'red'});

// Birds 
let y_shift = -5;
for (let i = 0; i < NUMBIRDS; i++){
  let xshift = i * 8;
  if (y_shift == -5){
    y_shift = 0;}
  else{
    y_shift = -5;}
  const bird = [
    bt.nurbs([
      [randnum2 + xshift + 8, 110 + y_shift],
      [randnum2 + xshift + 10, 113 + y_shift],
      [randnum2 + xshift + 12, 110 + y_shift],
      [randnum2 + xshift + 14, 113 + y_shift],
      [randnum2 + xshift + 16, 110 + y_shift]
    ])
  ]
  bt.join(birdLines, bird)
}

//Edge of Cliff
drawLines([[[width, 0], [width, height - 30]]], {width: CLIFF_WIDTH})

// Draw Cliff and Birds
bt.join(cliffLines, cliff1, cliff2, cliff3, cliff4, cliff6);
drawLines(cliffLines,  {width: CLIFF_WIDTH});
drawLines(birdLines);

// Tree inspired by "Fractal Tree" by maggieClaireBelle
const t = new bt.Turtle();

function tree(prevBranchEnd, angle, branchLen, iteration, max_iteration, angle_change, left_shift, right_shift) {
  if (iteration > max_iteration) {
    return
  }

  // Left branch from a node
  t.jump(prevBranchEnd)
  t.setAngle(angle + angle_change)
  t.forward(branchLen)

  const end = () => t.path.at(-1).at(-1);
  tree(end(), angle + angle_change, branchLen * 2/3 * left_shift, iteration + 1, MAX_ITERATION, ANGLE_CHANGE, left_shift, right_shift)

  // Right branch from a node
  t.jump(prevBranchEnd)
  t.setAngle(angle - angle_change)
  t.forward(branchLen)

  tree(end(), angle - angle_change, branchLen * 2/3 * right_shift, iteration + 1, MAX_ITERATION, ANGLE_CHANGE, left_shift, right_shift)
}

tree([100,15], 90, 10, 1, MAX_ITERATION, ANGLE_CHANGE, 1, 3/4)
tree([100,43], 90, 8, 1, (MAX_ITERATION-2) , ANGLE_CHANGE, 3/4, 1)
tree([100,67], 90, 6, 1, (MAX_ITERATION-4) , ANGLE_CHANGE, 1, 3/4)
tree([100,86], 90, 4, 1, (MAX_ITERATION-4) , ANGLE_CHANGE, 4/6, 1.1)

// Draw Trunk
drawLines([[[100, 0], [100, 87]]], {width: 7, stroke: 'brown'})

// Draw Tree Branch
drawLines(t.lines(), {stroke: 'red', width: 2})
