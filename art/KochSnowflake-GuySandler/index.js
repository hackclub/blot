/*
@title: Koch Snowflake Fractal
@author: Guy Sandler
@snapshot: the name of the snapshot file you want in the gallery
*/

// Koch Snowflake Fractal by Guy Sandler
// to learn more go to khanacademy.org/math/geometry-home/geometry-volume-surface-area/koch-snowflake/v/koch-snowflake-fractal
const detail = 5 // how much detail/loops in the function (min 0, don't go past 7 (it's possible but will break your computer))

const width = 125;
const height = 125;
setDocDimensions(width, height);

const fractal = [];

const t = new bt.Turtle();

function snowflake(turtle, sample, length) { // recursive function because fractals repeat themself
  if (sample == 0) {
    turtle.forward(length) // ends recursive function
  }
  else {
    for (let angle of [60, -120, 60, 0]) {
      snowflake(turtle, sample-1, length/3)
      turtle.left(angle)
    }
  }
}
for (let i = 0; i < 3; i++) {
  snowflake(t, detail, 100) // original run, (turtle, sample, size)
  t.right(120)
}
// add turtle to final lines
bt.join(fractal, t.lines());

// center piece
const cc = bt.bounds(fractal).cc;
bt.translate(fractal, [width / 2, height / 2], cc);

// draw it
drawLines(fractal, { fill: "none", stroke: "black", width: 1 });
