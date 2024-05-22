// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;



const finalLines = [];

const t = new bt.Turtle();

for (let i = 0; i < 1000; i++) {
  t.forward(i*1);
  t.right(96);
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
