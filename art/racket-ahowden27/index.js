/*
@title: tennis racket
@author: ahowden27
@snapshot: racket.png
*/

// vars to change
let numstrings = 15; // change number of strings in each direction
let degrees = 15; // rotate the racket
let scale = 1.2; // change size of the racket


const width = 125;
const height = 125;

setDocDimensions(width, height);

if (scale > 1.4) { scale = 1.4; }

const finalLines = [];

const handle = new bt.Turtle();

handle.right(90).forward(25).arc(-180, 3).forward(25).right(90);

const rckt = new bt.Turtle();
rckt.arc(360, 15);
bt.scale(rckt.path, [1.4, 1.8]);
bt.translate(rckt.path, [-3, 11.7]);

let deltai = .5 / numstrings;

for (let i = deltai; i < .5; i += deltai) {
  let strng = new bt.Turtle();
  const startpos = bt.getPoint(rckt.path, [i]);
  const endpos = bt.getPoint(rckt.path, [1 - i]);
  const wdth = startpos[0] - endpos[0];
  strng.up().goTo(startpos).down().right(180).forward(wdth);
  bt.join(finalLines, strng.lines());
}

for (let i = .25 + deltai; i < .75; i += deltai) {
  let strng = new bt.Turtle();
  let diff = 0;
  const startpos = bt.getPoint(rckt.path, [i]);
  let endpos = 0;
  if (i < .5) {
    diff = 2 * (i - .25);
    endpos = bt.getPoint(rckt.path, [i - diff]);
  } else {
    diff = 2 * (.75 - i);
    endpos = bt.getPoint(rckt.path, [i + diff]);
  }
  const hght = startpos[1] - endpos[1];
  strng.up().goTo(startpos).down().right(90).forward(hght);
  bt.join(finalLines, strng.lines());
}

// add turtle to final lines
bt.join(finalLines, handle.lines());
bt.join(finalLines, rckt.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

bt.rotate(finalLines, degrees);
bt.scale(finalLines, scale);

// draw it
drawLines(finalLines);