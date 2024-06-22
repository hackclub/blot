// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const boxLines = [];

const s = 304;

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

// store final lines here
const enaLines = [];

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
  [49, 86],
  [49.5, 64],
  [56, 68],
  [57, 68],
  [58.5, 69.5],
  [65.5, 69.5],
  [67, 68],
  [75, 75],
  [74.5, 85],
  [69, 94],
  [69, 95.5],
  [68, 94.5],
  [66.5, 98],
  [67, 95],
  [55, 94],
  [49, 86]
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

const shirt_flap_bottom = [
  [67, 68],
  [63.5, 66],
  [62, 67.5],
  [60.5, 66],
  [57, 68]
];

const shirt_flap_top = [
  [58.5, 69.5],
  [62, 67.5],
  [65.5, 69.5]
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

const chest_bottom_1 = [
  [70, 60],
  [65.5, 45],
  [62, 43.5],
  [58.5, 45],
  [54, 60]
];

//const chest_bottom_2 = [
//  
//];

// add the polylines to the box lines
enaLines.push(face_right);
enaLines.push(face_left);
enaLines.push(ear);
enaLines.push(hair);
enaLines.push(eye_left);
enaLines.push(eye_left_line);
enaLines.push(eye_right_top);
enaLines.push(eye_right_bottom);
enaLines.push(eye_right_line);
enaLines.push(shirt_flap_bottom);
enaLines.push(shirt_flap_top);
enaLines.push(chest_top_1);
enaLines.push(chest_top_2);
enaLines.push(chest_bottom_1);
//enaLines.push(chest_bottom_2);

// draw it
drawLines(bt.cover(boxLines, enaLines));
drawLines(enaLines);
