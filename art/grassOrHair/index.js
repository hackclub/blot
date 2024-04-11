/*
@title: grassOrHair
@author: mint :3
@snapshot: 
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
t.down()

let line = []

let angleScale = (bt.rand() * 3) ** 2;

let imageScale = .5

for (let i = 0; i < 100; i++) {
  t.jump([i * imageScale, 0])
  t.setAngle(90)
  for (let j = 0; j < 100; j++) {
    if (!line[j]) {
      line[j] = 0
    }
    line[j] += bt.randInRange(-angleScale, angleScale)
    t.left(line[j])
    t.forward(bt.rand() * 2 * imageScale)
  }
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
