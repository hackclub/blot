/*
@title: tennis racket
@author: ahowden27
@snapshot: racket.png
*/

// vars to change
let numstrings = 20; // change number of strings in each direction
let degrees = 15; // rotate the racket
let scale = 1.3; // change size of the racket


const width = 125;
const height = 125;

setDocDimensions(width, height);

if (scale > 1.4) { scale = 1.4; }

const finalLines = [];

const handle = new bt.Turtle();

handle.right(90).forward(16).arc(-180, 1.83).forward(16).right(90);
bt.translate(handle.path, [-0.36, -5.75]);

const connector = new bt.Turtle();
connector.arc(56, 18);
bt.translate(connector.path, [-3.35, -2.56]);
bt.rotate(connector.path, 210);

const connector2 = new bt.Turtle();
connector2.arc(56, 18);
bt.translate(connector2.path, [-15.83, -2.56]);
bt.rotate(connector2.path, 93);

const connector3 = new bt.Turtle();
connector3.arc(42, 18);
bt.translate(connector3.path, [-10.65, -2.76]);
bt.rotate(connector3.path, 91);

const connector4 = new bt.Turtle();
connector4.arc(42, 18);
bt.translate(connector4.path, [-5.73, -2.76]);
bt.rotate(connector4.path, 226);

const rckt = new bt.Turtle();
rckt.arc(360, 15);
bt.scale(rckt.path, [1.2, 1.6]);
bt.translate(rckt.path, [-2.0, 15.2]);

const rcktwdth = new bt.Turtle();
rcktwdth.arc(360, 16);
bt.scale(rcktwdth.path, [1.25, 1.60]);
bt.translate(rcktwdth.path, [-2.0, 14.3]);

let deltai = .5 / numstrings;

let xvals = [];
for (let i = 0.25; i < 0.75; i += deltai) {
  xvals.push(bt.getPoint(rckt.path, i)[0]);
}

for (let i = deltai; i < 0.5; i += deltai) {
  let strng = new bt.Turtle();
  const startpos = bt.getPoint(rckt.path, i);
  const endpos = bt.getPoint(rckt.path, 1 - i);
  strng.up().goTo(startpos).down().right(180);
  for (let j = 0; j < xvals.length; j++) {
    if (xvals[j] < startpos[0] && xvals[j] > endpos[0]) {
      strng.goTo([xvals[j], startpos[1] + (.2 - .4 * (j % 2))]);
    }
  }
  strng.goTo(endpos);

  bt.join(finalLines, strng.lines());
}

for (let i = .25 + deltai; i < .75; i += deltai) {
  let strng = new bt.Turtle();
  let diff = 0;
  const startpos = bt.getPoint(rckt.path, i);
  let endpos = 0;
  if (i < .5) {
    diff = 2 * (i - .25);
    endpos = bt.getPoint(rckt.path, i - diff);
  } else {
    diff = 2 * (.75 - i);
    endpos = bt.getPoint(rckt.path, i + diff);
  }
  const hght = startpos[1] - endpos[1];
  strng.up().goTo(startpos).down().right(90).forward(hght);
  strng.up().goTo([startpos[0] + 0.02, startpos[1]]).down().forward(hght);
  strng.up().goTo([startpos[0] + 0.04, startpos[1]]).down().forward(hght);
  bt.join(finalLines, strng.lines());
}

// add turtle to final lines
bt.join(finalLines, handle.lines());
bt.join(finalLines, rckt.lines());
bt.join(finalLines, rcktwdth.lines());
bt.join(finalLines, connector.lines());
bt.join(finalLines, connector2.lines());
bt.join(finalLines, connector3.lines());
bt.join(finalLines, connector4.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

bt.rotate(finalLines, degrees);
bt.scale(finalLines, scale);

// draw it
drawLines(finalLines);