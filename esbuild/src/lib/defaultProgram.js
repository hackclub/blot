export const defaultProgram = `
// welcome to blot!

const { iteratePolylines, Turtle, cut, cover, pointInPolylines, scale, rotate, translate, originate, rand, randInRange, randIntInRange, setRandSeed, noise, getAngleAtT, getPointAtT, getNormalAtT, resample, simplify, trim, svgToPolylines, bounds, displace } = toolkit;

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
drawPolylines(finalPolylines);
`.trim()
