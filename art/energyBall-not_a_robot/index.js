/*
@title: Energy Ball
@author: not_a_robot
@snapshot: ball1.png
*/

const width = 125;
const height = 125;
const radius = 20;
const inner_fact = 0.7;
const in_radius = radius * inner_fact;
const finalLines = [];
const sample_rate = 1;
const spikes_rate = 3;
  
setDocDimensions(width, height);

// outer circle, is perfectly round
let t = new bt.Turtle();
t.jump([width/2, height/2-radius]);
t.arc(360, radius);
let tmp = bt.resample(t.lines(), sample_rate);
bt.join(finalLines, tmp);

// inner circle, lots of jagged fluctutions
t = new bt.Turtle();
t.jump([width/2, height/2-in_radius]);
t.arc(360, in_radius);
tmp = bt.resample(t.lines(), sample_rate);
// picks points randomly to extend towards outer circle by random amount
// spikes_rate is how much of points to stretch
const outer_circle = bt.iteratePoints(tmp, (pt, t) => {
  if (bt.randIntInRange(0,spikes_rate) === 0) {
    const [x, y] = pt;
    const [max_x, max_y] = bt.getPoint(finalLines, t); // corresponding point on outer circle
    const x_range = max_x - x;
    const y_range = max_y - y;
    return [x + bt.randInRange(-x_range/4, x_range),
            y + bt.randInRange(-y_range/4, y_range)];[1]
  }
  return pt;
});

// rays going out of inner circle
// rays_list is an array of an array of arrays that should be drawn by drawLines
let rays_list = []
let num_rays = 0;
bt.iteratePoints(tmp, (pt, t) => {
  const [x, y] = pt;
  if (bt.randIntInRange(0,12) === 0) {
    let end_x;
    if (x >= width/2) {
      end_x = bt.randIntInRange(width/2+radius, width); // +radius to be outside circle
    }
    else {
      end_x = bt.randIntInRange(0, width/2-radius); // -radius to be outside circle
    }
    let end_y;
    if (y >= height/2) {
      end_y = bt.randIntInRange(y, height);
    }
    else {
      end_y = bt.randIntInRange(0, y);
    }
    rays_list[num_rays] = [[x,y], [end_x, end_y]];

    num_rays++;
  }
  
  return [x, y];
});

/* add jaggedness to rays */
bt.resample(rays_list, 3);
const new_rays = bt.iteratePoints(rays_list, (pt, t) => {
  const [x, y] = pt;
  if (bt.randIntInRange(0, 3) === 0) {
    if (bt.randIntInRange(0,1) === 0) {
      return [x + bt.randIntInRange(-3, 3), y + bt.randIntInRange(-3, 3)];
    }
    else {
      return [x + bt.randIntInRange(-10, 10), y + bt.randIntInRange(-10, 10)];
    }
  }
  else {
    return [x, y];
  }
});
 
bt.join(finalLines, outer_circle);

drawLines(rays_list);
drawLines(finalLines);
