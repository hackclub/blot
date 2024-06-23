// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const boxLines = [];

const s = 1148/4;

const rot = s/125;

const pi = 3.141592;

function calc_con (rot) {
    if ((rot - Math.floor(rot)) > 0.5) {
      return ((Math.sin((rot - Math.floor(rot))*pi)/2)) * 125;
    } else {
      return ((((Math.sin((rot - Math.floor(rot)) * pi) * -1)+2)/2)) * 125;
    }
}

function calc_spiral (rot) {
    if ((rot - Math.floor(rot)) > 0.5) {
      return ((Math.sin((rot - Math.floor(rot))*pi)/2)+(rot - Math.floor(rot))) * 125;
    } else {
      return ((((Math.sin((rot - Math.floor(rot)) * pi) * -1)+2)/2)+(rot - Math.floor(rot))) * 125;
    }
}

const con1 = [
  [calc_con(rot), Math.abs(Math.sin(rot*pi)*50)],
  [calc_con(rot), (125-Math.abs(Math.sin(rot*pi)*20))],
];

const con2 = [
  [calc_con(rot+0.5), Math.abs(Math.sin((rot+0.5)*pi)*50)],
  [calc_con(rot+0.5), (125-Math.abs(Math.sin((rot+0.5)*pi)*20))]
];

const wall_con1 = [
  [calc_con(rot+0.5), Math.abs(Math.sin((rot+0.5)*pi)*50)],
  [calc_con(rot), Math.abs(Math.sin(rot*pi)*50)]
];

function calc_wall_con (rot, con) {
  if ((rot - Math.floor(rot)) > 0.5) {
    if (con == 1) {
      return 125;
    } else {
      return 0;
    }
  } else {
    if (con == 1) {
      return 0;
    } else {
      return 125;
    }
  }
}

const wall_con2 = [
  [calc_con(rot+0.5), Math.abs(Math.sin((rot+0.5)*pi)*50)],
  [calc_wall_con(rot, 1)+(Math.sin((rot+0.5)*pi*2)*-20), 0],
];

const wall_con3 = [
  [calc_con(rot), Math.abs(Math.sin(rot*pi)*50)],
  [calc_wall_con(rot, 2)+(Math.sin((rot)*pi*2)*-20), 0],
];

const roof = [
  [calc_con(rot), (125-Math.abs(Math.sin(rot*pi)*20))],
  [calc_con(rot+0.5), (125-Math.abs(Math.sin((rot+0.5)*pi)*20))]
];

const roof_con1 = [
  [calc_con(rot+0.5), (125-Math.abs(Math.sin((rot+0.5)*pi)*20))],
  [calc_wall_con(rot, 1)+(Math.sin((rot+0.5)*pi*2)*-25), 125],
];

const roof_con2 = [
  [calc_con(rot), (125-Math.abs(Math.sin(rot*pi)*20))],
  [calc_wall_con(rot, 2)+(Math.sin((rot)*pi*2)*-25), 125],
];

// add the polylines to the box lines
boxLines.push(con1);
boxLines.push(con2);
boxLines.push(wall_con1);
boxLines.push(wall_con2);
boxLines.push(wall_con3);
boxLines.push(roof);
boxLines.push(roof_con1);
boxLines.push(roof_con2);

// store ena lines here
const enaLines = [];
var enaHeadLines = [];

const face_right = [
  [62.5, 88],
  [60.7, 80],
  [62, 80.3],
  [62, 79],
  [65.5, 79],
  [62, 74],
  [62, 71],
  [71, 75],
  [68, 76],
  [69, 87],
  [62.5, 88]
];

const face_left = [
  [62.5, 88],
  [57, 86.5],
  [56.5, 90],
  [53, 81],
  [51, 81],
  [50.5, 79],
  [52, 77.5],
  [53.5, 78],
  [53.5, 79],
  [53.5, 78],
  [54.5, 74],
  [62, 71]
];

const ear = [
  [51.25, 79.25],
  [51.5, 80.25],
  [52.5, 80.25],
];

const hair = [
  [75, 75],
  [74.5, 85],
  [69, 94],
  [69, 95.5],
  [68, 94.5],
  [66.5, 98],
  [67, 95],
  [55, 94],
  [49, 86],
  [49.5, 50],
  [75, 75]
];

const eye_left = [
  [54.5, 83],
  [57.5, 85],
  [60.5, 84],
  [57.5, 81.5],
  [56.5, 82],
  [56, 81.5],
  [56, 82.5],
  [54.5, 83]
];

const eye_left_line = [
  [57.5, 85],
  [57.5, 81.5]
];

const eye_right_top = bt.catmullRom([[62.5, 83.7], [66, 85], [68.5, 83.2]])

const eye_right_bottom = [
  [62.5, 83.7],
  [68.5, 83.2],
];

const eye_right_line = [
  [66, 85],
  [65.6, 83.45]
];

const shirt_flap_right = [
  [65.5, 69.5],
  [62, 67.5],
  [63.5, 66],
  [67, 68],
  [65.5, 69.5]
]

const shirt_flap_left = [
  [58.5, 69.5],
  [62, 67.5],
  [60.5, 66],
  [57, 68],
  [58.5, 69.5]
];

const shirt_flap_line = [
  [58.5, 69.5],
  [65.5, 69.5],
  [62, 67.5],
  [58.5, 69.5]
];

const chest_top_1 = [
  [67, 68],
  [70, 60],
  [54, 60],
  [57, 68]
];

const chest_top_2 = [
  [65.25, 67],
  [67, 61.5],
  [57, 61.5],
  [58.75, 67]
];

const chest_bottom = [
  [70, 60],
  [65.5, 45],
  [62, 43.5],
  [58.5, 45],
  [54, 60]
];

const chest_bottom_right = [
  [67, 60],
  [63.75, 44.25]
];

const chest_bottom_left = [
  [57, 60],
  [60.25, 44.25]
];

const arm_left_sleeve = [
  [57, 68],
  [49.5, 64],
  [49, 62],
  [51.5, 56.5],
  [54.45, 58.5]
];

const arm_left_sleeve_line = [
  [49, 62],
  [57, 68]
];

const arm_left_upper_1 = [
  [49.25, 63],
  [44, 60.5],
  [45, 60],
  [49.5, 60.9],
];

const arm_left_upper_2 = [
  [45, 60],
  [44, 55],
  [51, 57.6],
  [49.5, 60.9]
];

const arm_left_mid = [
  [44, 60.5],
  [42, 60.5],
  [44, 55]
];

const arm_left_lower_1 = [
  [42, 60.5],
  [27, 62],
  [26.5, 60],
  [43.272727, 57]
];

const arm_left_lower_2 = [
  [26.5, 60],
  [25.5, 59],
  [44, 55],
  [43.272727, 57]
];

const arm_left_thumb = [
  [27, 62],
  [25.5, 63.5],
  [21.5, 63.5],
  [21.5, 62.5],
  [24.5, 62],
  [24.5, 61],
  [25.5, 59]
];

const arm_left_hand = [
  [25.5, 59],
  [23, 58.5],
  [23.5, 62.166666]
];

const arm_left_fingers_1 = [
  [23, 58.5],
  [21.5, 59],
  [19.75, 59],
  [19, 60.25],
  [21.5, 60.25],
  [21.5, 61.5],
  [21, 62],
  [19, 62.5],
  [19, 64],
  [23, 63.75],
  [23.8, 63.5]
];

const arm_left_fingers_2 = [
  [19, 60.25],
  [18.75, 62.25],
  [19, 62.5]
];

const arm_left_fingers_3 = [
  [21.5, 61.5],
  [22, 62.4166666]
];

const skirt_upper_1 = [
  [66.4, 48],
  [68.5, 47],
  [68.25, 43],
  [62, 42],
  [55.75, 43],
  [55.5, 47],
  [57.6, 48]
];

const skirt_upper_2 = [
  [65.5, 45],
  [67.5, 46]
];

const skirt_upper_3 = [
  [58.5, 45],
  [56.5, 46]
];

const skirt_lower_1 = [
  [68.375, 45],
  [75, 39],
  [75, 36],
  [61, 32],
  [49, 36],
  [49, 39],
  [55.625, 45]
];

const skirt_lower_2 = [
  [62, 42],
  [61, 36],
  [75, 39]
];

const skirt_lower_3 = [
  [61, 32],
  [61, 36],
  [49, 39]
];

const left_leg_upper_1 = [
  [52, 35],
  [53, 29],
  [58, 27.5],
  [60.5, 28.5],
  [60, 32.33333],
];

const left_leg_upper_2 = [
  [58, 27.5],
  [57, 33.33333]
];

const left_leg_mid_1 = [
  [58, 27.5],
  [59, 23],
  [60.5, 28.5]
];

const left_leg_mid_2 = [
  [59, 23],
  [53, 29],
  [58, 27.5]
];

const left_leg_mid_3 = [
  [53, 29],
  [52, 22],
  [59, 23],
  [52, 10],
  [52, 22],
  [48, 11],
  [52, 10],
  [56, 8],
  [58, 10],
  [52.80769, 11.5]
];

const left_leg_foot_1 = [
  [58, 10],
  [58.5, 8],
  [57, 6],
  [47, 8],
]

// add the polylines to the ena head lines
enaHeadLines.push(hair);
if (Math.floor(rot+0.25) % 2 == 0) {
  enaHeadLines.push(face_right);
  enaHeadLines.push(face_left);
  enaHeadLines.push(ear);
  enaHeadLines.push(eye_left);
  enaHeadLines.push(eye_left_line);
  enaHeadLines.push(eye_right_top);
  enaHeadLines.push(eye_right_bottom);
  enaHeadLines.push(eye_right_line);
};

// add the polylines to the ena lines
enaLines.push(shirt_flap_right);
enaLines.push(shirt_flap_left);
enaLines.push(shirt_flap_line);
enaLines.push(chest_top_1);
enaLines.push(chest_top_2);
enaLines.push(chest_bottom);
enaLines.push(chest_bottom_right);
enaLines.push(chest_bottom_left);
enaLines.push(arm_left_sleeve);
enaLines.push(arm_left_sleeve_line);
enaLines.push(arm_left_upper_1);
enaLines.push(arm_left_upper_2);
enaLines.push(arm_left_mid);
enaLines.push(arm_left_lower_1);
enaLines.push(arm_left_lower_2);
enaLines.push(arm_left_thumb);
enaLines.push(arm_left_hand);
enaLines.push(arm_left_fingers_1);
enaLines.push(arm_left_fingers_2);
enaLines.push(arm_left_fingers_3);
enaLines.push(skirt_upper_1);
enaLines.push(skirt_upper_2);
enaLines.push(skirt_upper_3);
enaLines.push(skirt_lower_1);
enaLines.push(skirt_lower_2);
enaLines.push(skirt_lower_3);
enaLines.push(left_leg_upper_1);
enaLines.push(left_leg_upper_2);
enaLines.push(left_leg_mid_1);
enaLines.push(left_leg_mid_2);
enaLines.push(left_leg_mid_3);
enaLines.push(left_leg_foot_1);

//fancy stuff with ena head
if (Math.floor(rot+0.25) % 2 == 0) {
  enaHeadLines = bt.scale(enaHeadLines, [(Math.sin((rot - Math.floor(rot)) * 2 * pi)+1)/2, 1], [125/2, 125/2])
} else {
  enaHeadLines = bt.scale(enaHeadLines, [(Math.sin((rot - Math.floor(rot)) * 2 * pi)+1)/-2, 1], [125/2, 125/2])
}

// draw it

var draw_lines_1 = bt.cover(boxLines, enaLines);
draw_lines_1 = bt.cover(draw_lines_1, enaHeadLines)

drawLines(draw_lines_1);
// 0.65 because 0.75 looks weirder
if (Math.floor(rot+0.65) % 2 == 0) {
  drawLines(bt.cover(enaHeadLines, enaLines));
  drawLines(enaLines);
} else {
  drawLines(bt.cover(enaLines, enaHeadLines));
  drawLines(enaHeadLines);
}
