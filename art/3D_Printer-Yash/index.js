/*
@title: 3D_Printer
@author: Yash S.
@snapshot: image1.png
*/

const width = 100;
const height = 100;

//Editable values!!
const x = bt.randInRange(25, 65);
const y = bt.randInRange(31, 62);
const rail_width = 1; // Can be 1 or 2!

setDocDimensions(width, height);

const t = new bt.Turtle();

//Base
t.jump([10, 10]);
t.setAngle(90);
t.arc(-90, 10);
t.setAngle(0);
t.goTo([35, 20]);
t.goTo([35, 10]);
t.goTo([10, 10]);
t.jump([65, 20]);
t.goTo([80, 20]);
t.arc(-90, 10);
t.goTo([65, 10]);
t.goTo([65, 20]);
t.jump([57, 15]);

//Center block
const center_block = [
  [
    [35, 20],
    [65, 20],
    [65, 10],
    [35, 10],
  ],
];
drawLines(center_block);

t.arc(360, 2);

//Screen and Knob
const screen = [
  [
    [38, 18],
    [38, 12],
    [53, 12],
    [53, 18],
    [38, 18],
  ],
];
drawLines(screen);

//Y Axis
const left_arm = [
  [
    [20, 20],
    [20, 75],
    [22, 75],
    [22, 20],
    [23, 20],
    [23, 75],
    [25, 75],
    [25, 20],
  ],
];
drawLines(left_arm);

const right_arm = [
  [
    [75, 20],
    [75, 75],
    [77, 75],
    [77, 20],
    [78, 20],
    [78, 75],
    [80, 75],
    [80, 20],
  ],
];
drawLines(right_arm);

const top = [
  [
    [17, 75],
    [17, 80],
    [83, 80],
    [83, 75],
    [17, 75],
  ],
];
drawLines(top);

//Plate
const plate = [
  [
    [40, 20],
    [40, 22],
    [30, 22],
    [30, 24],
    [70, 24],
    [70, 22],
    [60, 22],
    [60, 20],
    [55, 20],
    [55, 22],
    [45, 22],
    [45, 20],
    [40, 20],
    [40, 22],
    [60, 22],
  ],
];
drawLines(plate);

//X Axis
const x_axis_left = [
  [
    [25, y],
    [x, y],
    [x, y + rail_width],
    [25, y + rail_width],
    [25, y + (5 - rail_width)],
    [x, y + (5 - rail_width)],
    [x, y + 5],
    [25, y + 5],
  ],
];
drawLines(x_axis_left);

const x_axis_right = [
  [
    [75, y],
    [x + 10, y],
    [x + 10, y + rail_width],
    [75, y + rail_width],
    [75, y + (5 - rail_width)],
    [x + 10, y + (5 - rail_width)],
    [x + 10, y + 5],
    [75, y + 5],
  ],
];
drawLines(x_axis_right);

//Extruder

t.jump([x, y + 7]);
t.setAngle(90);
t.arc(-90, 1);
t.goTo([x + 9, y + 8]);
t.arc(-90, 1);
t.goTo([x + 10, y - 4]);
t.arc(-90, 1);
t.goTo([x + 1, y - 5]);
t.arc(-90, 1);
t.goTo([x, y + 7]);

let pos = null;

t.jump([x + 1, y + 2]);
t.setAngle(-90);
for (let a = 0; a <= 20; a++) {
  t.arc(18, 4);
  pos = t.pos;
  t.goTo([x + 5, y + 2]);
  t.goTo(pos);
}

t.jump([x + 4, y - 5]);
t.goTo([x + 4, y - 6]);
t.goTo([x + 6, y - 6]);
t.jump([x + 4, y - 6]);
t.goTo([x + 4.75, y - 7]);
t.goTo([x + 5.25, y - 7]);
t.goTo([x + 6, y - 6]);
t.goTo([x + 6, y - 5]);

let wire = [];
t.jump([x + 6, y + 8]);
let turtle = t.pos;
let offset = 0;
for (let i = 1; i <= 150; i++) {
  let curves = [
    bt.nurbs([
      [turtle[0] + offset, turtle[1]],
      [60, 90 - offset],
      [75, 78 - offset],
    ]),
  ];
  bt.join(wire, curves);
  offset = offset - 0.01;
}
drawLines(wire);

drawLines(t.lines());
