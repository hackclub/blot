/*
@title: Tangere
@author: InfinityCity18
@snapshot: polynomial.png
*/

const width = 250;
const height = 250;
const scale = 21;
const x_limit = 4.9;
const y_limit = 3.6;
const f_left = 129;
const f_right = 129;
const diff_accuracy = 0.02;
const tangents_diff = bt.randInRange(0.1, 0.40);
const left_tangent = -2;
const right_tangent = 8;
const rotation = 1.1;
const mv_right = 112.5;
const mv_up = 123.2;

//You can provide your own function here, just remember to also provide its derivative
function f(x) {
  return Math.sin(x);
}

function df(x) {
  return Math.cos(x);
}

function get_tangent_points(a) {
  //right end
  var right;
  if (get_y_from_x_tangent(x_limit, a) < y_limit) {
    //x_limit is "better"
    right = [x_limit, get_y_from_x_tangent(x_limit, a)]
  } else {
    //y_limit is "better"
    right = [get_x_from_y_tangent(y_limit, a), y_limit]
  }

  //left end
  var left;
  if (get_y_from_x_tangent(-x_limit, a) > -y_limit) {
    //x_limit is "better"
    left = [-x_limit, get_y_from_x_tangent(-x_limit, a)]
  } else {
    //y_limit is "better"
    left = [get_x_from_y_tangent(-y_limit, a), -y_limit]
  }
  if (df(a) > 0) {
    return [left, right];
  } else {
    return [right, left];
  }
}

function get_y_from_x_tangent(x, a) {
  return df(a) * (x - a) + f(a)
}

function get_x_from_y_tangent(y, a) {
  return (y + a * df(a) - f(a)) / (df(a));
}

setDocDimensions(width, height);

var function_points = []
var tangent_line_pairs = []
var box = [[[0.0, 0.0], [width, 0.0], [width, height], [0.0, height]]];

for (let i = f_left; i <= f_right; i += diff_accuracy) {
  function_points.push([i, f(i)]);
}

for (let i = left_tangent; i <= right_tangent; i += tangents_diff) {
  var l = get_tangent_points(i);
  //bt.scale(l, scale);
  //drawLines(l);
  tangent_line_pairs.push(l);
}

function_points = [function_points]

bt.scale(function_points, scale);
bt.scale(tangent_line_pairs, scale);

bt.rotate(function_points, rotation);
bt.rotate(tangent_line_pairs, rotation);

bt.translate(function_points, [mv_right, mv_up]);
bt.translate(tangent_line_pairs, [mv_right, mv_up]);


drawLines(tangent_line_pairs);
//drawLines(function_points);


