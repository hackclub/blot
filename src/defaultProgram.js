export const defaultProgram = `// welcome to blot!

const {
  Turtle, 

  // take and modify polylines return polylines
  iteratePoints, 
  cut, 
  cover, 
  pointInside, 
  scale, 
  rotate, 
  translate, 
  originate, 
  resample, 
  simplify, 
  trim,
  merge,  
  join, 
  copy,
  union,
  difference,
  intersect,
  xor,

  // take polylines return other
  getAngle, 
  getPoint, 
  getNormal, 
  bounds,

  // take other return polylines
  svgToPolylines, 

  // randomness
  rand, 
  randInRange, 
  randIntInRange, 
  setRandSeed, 
  noise,

  // curves
  bezierEasing 
} = toolkit;

const width = 125;
const height = 125;

setDocDimensions(width, height);

setRandSeed(14);

const finalPolylines = [];
const t = new Turtle();

for (let i = 0; i < 52; i++) {
  t.forward(i);
  t.right(91);
}

// add turtle to final lines
finalPolylines.push(...t.polylines());

// center piece
const cc = bounds(finalPolylines).cc;
translate(finalPolylines, [width / 2, height / 2], cc);

// draw it
draw(finalPolylines);
`.trim()
