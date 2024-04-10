

/*
@title: Shamrock generator
@author: Eoin
@snapshot: image1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
t.jump([-18,-1]);

const Num_of_rounds = 9 // Number of spiralleaf rotations (3 leaves rotated)
const stringiness = 0.88 // Affects the seperation os strings and stringiness of stem
const basestringnum = 6 // Changes the number of stem strings
const _3leafseperation = 0.050 // Changes size of spiral and end location of turtle at each spiral

const pattrnr = 17.9 + bt.randInRange(0,_3leafseperation)   // Changes size of spiral and end location of turtle at each spiral
const pattrnr2 = pattrnr+200  // Changes number of rotations and end location of turtle at each spiral

// Generating Shamrock leaves
for (let z = 0; z < Num_of_rounds; z++) {
  for (let i = 0; i < pattrnr2; i++) {
    t.forward(1);
    t.right((i/pattrnr));
  }
}

// Generating stem
for (let å = 0; å < basestringnum; å++) {
  const randoffset = bt.randInRange(-1*stringiness,1*stringiness) // Changes the stringiness of the stem
  const lenrandomness = bt.randInRange(0.8,1)
  t.jump([randoffset,-20]);
  t.setAngle(250+bt.randInRange(-1,1));
  for (let i = 0; i < 54*(lenrandomness); i++) {
    t.forward(1)
    t.right(i/(26*(Math.abs(randoffset)+0.5)))
  }
  t.jump([randoffset,-20]);
  t.setAngle(258+bt.randInRange(-1,1));
  for (let i = 0; i < 54*(lenrandomness); i++) {
    t.forward(1)
    t.right(i/(81*(Math.abs(randoffset)+0.5)))
  }
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);