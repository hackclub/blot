

/*
@title: Shamrock generator
@author: Eoin
@snapshot: image1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];
const Smrck = [];

const t = new bt.Turtle();
t.jump([-18,-1]);

//------------------------ Adjustable Variables ------------------------
const Num_of_rounds = 9 // Number of spiralleaf rotations (3 leaves rotated)
const stringiness = 0.88 // Affects the seperation os strings and stringiness of stem
const basestringnum = 6 // Changes the number of stem strings
const _3leafseperation = 0.050 // Changes size of spiral and end location of turtle at each spiral
const terrain_roughness = 1.2 // Amplifies crests and troughs in terrain
const m_wv = bt.randInRange(0.5,1)//2.2 //Changes rotation of two waves
const rotation_of_wave = 71 // changes the wave arc length
const opp_wave = 20 // changes wave seperation (opposite sides)
//======================================================================
//======================================================================

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

bt.join(Smrck, t.lines());
bt.scale(Smrck, 0.5, origin = [0, 0])
bt.simplify(Smrck, 0.0);
bt.merge(Smrck);
bt.rotate(Smrck, 13, [0, 0]);
const Smrck_reflect = bt.copy(Smrck);


// Ripple around stem

const boundingBox = bt.bounds(Smrck);
const bottomleft = boundingBox.lb;
const bottomright = boundingBox.rb;
const bttc = boundingBox.cb;
const l = new bt.Turtle();
const diameter = (bottomleft.at(0)^2 - bottomright.at(0)^2)^(1/2) + (bottomleft.at(1)^2 - bottomright.at(1)^2)^(1/2);
const radius_ = 3*diameter/2;//10 // diameter/2
const cntr_x = 0;
const cntr_y = 0;

l.up();
for (let å = 0; å < rotation_of_wave; å++) {
  l.goTo([(radius_ * Math.cos(m_wv+å/25) + bttc.at(0))-3.5, (radius_ * Math.sin(m_wv+å/25)/10 + bttc.at(1)) ]);
  l.down();
}

l.up();
for (let å = rotation_of_wave+opp_wave; å < (rotation_of_wave+72); å++) {
  l.goTo([(radius_ * Math.cos(m_wv+å/25) + bttc.at(0))-3.5, (radius_ * Math.sin(m_wv+å/25)/10 + bttc.at(1)) ])
  l.down();
}
const copiedripple = bt.copy(l.lines());
bt.scale(copiedripple, 3.7, origin = [-2,bttc.at(1)]) //3.7
const modified_ripple_copy = bt.iteratePoints(copiedripple, (pt, t) => {
  const [x, y] = pt;
  return [x, (y-1) + terrain_roughness*bt.noise([4.2, 2.8, x*0.5])]; //Adding noise to create uneven terrain
});
bt.join(Smrck, copiedripple);

// REFLECTION of shamrock
const Lightsource = bt.randInRange(90,210) //88
bt.rotate(Smrck_reflect, Lightsource, [bttc.at(0),bttc.at(1)]);
bt.scale(Smrck_reflect, [-1.6,0.2], origin = [0, 0]);
bt.translate(Smrck_reflect, [3, -29]);

const modifiedPolylines = bt.iteratePoints(Smrck_reflect, (pt, t) => {
  const [x, y] = pt;
  return [x, y + terrain_roughness*bt.noise([4.2, 2.8, x*0.5])]; //Adding noise to create uneven terrain
});
//bt.apply(Smrck_reflect+bt.randInRange(-0.1,0.1));
bt.join(Smrck, Smrck_reflect);


bt.join(Smrck, l.lines());
// add turtle to final lines

bt.join(finalLines, Smrck);

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
