/*
@title: Flute
@author: Apoorv
@snapshot: Snap1.png
*/
const d = 360;
const len = d / 2;
const gir = len / 18;
const ix = len / 2;
const iy = len;
const dark_green = '#006400';
const brown = '#964B00';


const t = new bt.Turtle();


t.jump([ix, iy]);
t.forward(len);
t.arc(360, gir / 2);
t.up();
t.arc(180, gir / 2);
t.down();
t.forward(len);
t.arc(180, gir / 2);
t.up();
t.arc(180, gir / 2);
t.down();
t.right(180);





t.forward(len / 10);
t.right(180);

for (let i = 0; i < 6; i++) {
  t.arc(360, gir / 4);
  t.right(180);
  t.up();
  t.forward(gir);
  t.down();
  t.right(180);
}





for (let i = 0; i < 2; i++) {
  t.right(180);
  t.up();
  t.forward(gir);
  t.down();
  t.right(180);
  t.arc(180, gir / 2);
  t.up();
  t.arc(180, gir / 2);
  t.down();
  t.right(180)
  t.up();
  t.forward(gir / 2)
  t.down();
  t.right(180);
  t.arc(180, gir / 2);
  t.up();
  t.arc(180, gir / 2);
  t.down();
}

t.jump([ix, iy + gir]);
t.right(180);
t.up();
t.forward(gir);
t.down();
t.right(180);
t.arc(180, gir / 2);

t.jump([ix + len, iy + gir]);
t.right(180);
t.up();
t.forward(gir);
t.down();
t.arc(180, gir / 2);
t.up();
t.arc(180, gir / 2);
t.down();




t.up()
t.forward(2 * gir);
t.down()
t.arc(360, gir / 4);
t.up();
t.forward(len / 3)
t.down();



drawLines(t.lines(), { stroke: brown });

//----------------------------------------------------------------------


const p = new bt.Turtle();


const rr = bt.randInRange
const p1 = [rr(10, 25) * 0.6, rr(5, 25) * 0.6];
const p2 = [rr(25, 50) * 0.6, rr(25, 50) * 0.6];
const p3 = [rr(50, 75) * 0.6, rr(50, 75) * 0.6];
const x1 = p1[0];
const y1 = p1[1];
const x2 = p2[0];
const y2 = p2[1];
const x3 = p3[0];
const y3 = p3[1];
const p01 = [rr(10, 25) * -0.6, rr(5, 25) * 0.6];
const p02 = [rr(25, 50) * -0.6, rr(25, 50) * 0.6];
const p03 = [rr(50, 75) * -0.6, rr(50, 75) * 0.6];
const x01 = p01[0];
const y01 = p01[1];
const x02 = p02[0];
const y02 = p02[1];
const x03 = p03[0];
const y03 = p03[1];


const n = new bt.Turtle();
n.jump([(ix + gir), (iy + gir)])
n.left(60);
n.arc(0.5, 150);

for (let i = 0; i < 40; i++) {
  n.arc(0.25, 150);
  let pos = n.pos;

  let curve1 = bt.catmullRom([pos, [pos[0] + x1, pos[1] + y1],
    [pos[0] + x2, pos[1] + y2]
  ]);
  drawLines([curve1], { stroke: dark_green });
  let curve2 = bt.catmullRom([pos, [pos[0] + x01, pos[1] + y01],
    [pos[0] + x02, pos[1] + y02]
  ]);
  drawLines([curve2], { stroke: dark_green });
}

drawLines(n.lines());

let pos = n.pos;

let ax1 = (pos[0] + 20);
let ay1 = (pos[1] + 10);
let ax2 = (pos[0] + 10);
let ay2 = (pos[1] + 40);
let ax3 = pos[0];
let ay3 = (pos[1] + 50);

let bx1 = (pos[0] - 20);
let by1 = (pos[1] + 10);
let bx2 = (pos[0] - 10);
let by2 = (pos[1] + 40);
let bx3 = pos[0];
let by3 = (pos[1] + 50);

const a = bt.catmullRom([pos, [ax1, ay1],
  [ax2, ay2],
  [ax3, ay3]
]);
const b = bt.catmullRom([pos, [bx1, by1],
  [bx2, by2],
  [bx3, by3]
]);

drawLines([a], { fill: 'green' });
drawLines([b], { fill: dark_green });


const i = new bt.Turtle();

i.jump([pos[0], pos[1] + 2]);
i.arc(360, 14);

drawLines(i.lines(), { fill: 'yellow' });

const f = new bt.Turtle();

f.jump([pos[0], pos[1] + 5]);
for (let i = 0; i < 90; i++) {
  f.arc(4, 12);
  let p = f.position;
  f.goTo([pos[0], pos[1] + 12]);
  f.jump(p);
  drawLines(f.lines(), { stroke: 'blue' });
}

//----------------------------------------------------------------------

const ran_a = rr(60, 120);

const u = new bt.Turtle();
u.jump([(ix + gir), iy]);
u.right(60);
u.forward(4);

u.left(ran_a);
for (let i = 0; i < 4; i++) {
  let ran = rr(150, 210);
  u.right(180);
  u.arc(360 + ran, 3);
}
u.right(180)
u.arc(540, 5);
u.right(180)
u.arc(360, 1);

const v = new bt.Turtle();
v.jump([(ix + gir), iy]);
v.right(120);
v.forward(4);

v.left(ran_a);
for (let i = 0; i < 6; i++) {
  let ran = bt.randIntInRange(150, 210);
  v.right(180);
  v.arc(360 + ran, 3);
}
v.right(180)

v.arc(540, 5);
v.right(180)
v.arc(360, 1);

drawLines(u.lines());
drawLines(v.lines());
