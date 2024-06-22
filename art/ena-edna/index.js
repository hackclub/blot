// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

const s = 0;

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
  [calc_wall_con(rot, 1), 0],
];

const wall_con3 = [
  [calc_con(rot), Math.abs(Math.sin(rot*pi)*50)],
  [calc_wall_con(rot, 2), 0],
];

const roof = [
  [calc_con(rot), (125-Math.abs(Math.sin(rot*pi)*20))],
  [calc_con(rot+0.5), (125-Math.abs(Math.sin((rot+0.5)*pi)*20))]
];

//const root_con1 = [
//  [calc_con(rot+0.5), Math.abs(Math.sin((rot+0.5)*pi)*50)],
//  [calc_wall_con(rot, 1), 0],
//];

// add the polyline to the final lines
finalLines.push(con1);
finalLines.push(con2);
finalLines.push(wall_con1);
finalLines.push(wall_con2);
finalLines.push(wall_con3);
finalLines.push(roof);

// draw it
drawLines(finalLines);
