/*
@title: spirograph
@author: tanmayhk
@snapshot: snapshot1.png
*/

const width = 250;
const height = 250;
const rr = bt.randInRange

setDocDimensions(width, height);

var gcd_function = function(a, b) {
  if (!b) {
    return a;
  }

  return gcd_function(b, a % b);
}

var R, r, rho;
do
  {
  // Constants for spirograph (currently randomized). Snapshots have parameter names in them.
  R = Math.trunc(rr(0, width/2)); // outer radius
  r = Math.trunc(rr(0, R)); // inner radius
  rho = rr(0, r); // point in inner circle
console.log(R, r, rho);
  } while (R == 0 || r == 0 || rho ==0 || (R % r) == 0);

const rounds = R / gcd_function(r, R);

const finalLines = [];

const t = new bt.Turtle();

var theta_total = 2 * Math.PI * rounds;
var dt = theta_total / 9999;

var prev = [R - r + rho, 0]; 
for (let i = 0; i <= theta_total; i=i+dt) {
  var x1 = (R - r)*Math.cos(i) + rho*Math.cos((R - r)*i/r);
  var y1 = (R - r)*Math.sin(i) - rho*Math.sin((R - r)*i/r);
  finalLines.push([prev, [x1, y1]]);
  prev = [x1, y1];
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);