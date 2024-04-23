/*
@title: LiveClock
@author: Ruben Stenlund
@snapshot: clock1.png
*/
const width = 125;
const height = 125;

//clock radius
const r = 30
// the length of the sticks that indicate the numbers
const stick_length = 3
// the sticks that indicate the numbers' distance from the clocks' edge.
const stick_distance_from_edge = 1
// true if you want to include the second hand - false if not
const sec = true;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

t.up()
t.forward(r)
t.down()
let x = width / 2
let y = height / 2

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

for (let a = 0; a < toRadians(360); a+=0.01) {
  x = Math.cos(a) * r
  y = Math.sin(a) * r
  t.goTo([x,y])
}
t.up()

for (let a = 0; a <= toRadians(361); a+=toRadians(360)/12) {
  x = Math.cos(a) * (r-stick_distance_from_edge)
  y = Math.sin(a) * (r-stick_distance_from_edge)
  t.goTo([x,y])
  t.down()
  x = Math.cos(a) * (r-(stick_distance_from_edge+stick_length))
  y = Math.sin(a) * (r-(stick_distance_from_edge+stick_length))
  t.goTo([x,y])
  x = Math.cos(a) * (r-stick_distance_from_edge)
  y = Math.sin(a) * (r-stick_distance_from_edge)
  t.goTo([x,y])
  t.up()
}

t.up()
t.goTo([0,0])
t.down();

let d = new Date();
let hour_angle = (d.getMinutes() + d.getHours() * 60) / 60 / 24 * 2 * 360
let minute_angle = (d.getMinutes())/ 60 * 360
let radian = toRadians(360 - hour_angle + 90);
let minute_radian = toRadians(360 - minute_angle + 90)
x = Math.cos(radian) * r/2
y = Math.sin(radian) * r/2
t.goTo([x,y])
t.goTo([0,0])
x = Math.cos(minute_radian) * r/4*3
y = Math.sin(minute_radian) * r/4*3
t.goTo([x,y])

if (sec) {
  let seconds_angle = (d.getSeconds())/60*360;
  let seconds_radian = toRadians(360 - seconds_angle + 90);
  console.log(seconds_angle)
  x = Math.cos(seconds_radian) * r/4*2.5
  y = Math.sin(seconds_radian) * r/4*2.5
  t.down()
  t.goTo([0,0])
  t.goTo([x,y])
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

drawLines(finalLines);