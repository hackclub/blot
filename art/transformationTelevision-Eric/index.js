/*
@title: Transformation Television
@author: Eric
@snapshot: 0.png
*/

const size = 125;
setDocDimensions(size, size);

// defines how the plane should get projected: change new_coords and watch the moire effect!
// first array x positions, second is y
var old_coords = [[-30, -30, 33, 33], [-27, 9, -27, 9]];
var new_coords = [[-30, -30, 33, 33], [-27, 9, -33, 16]];
// to view it normally, set new_coords to old_coords

// linear algebra helpers, only for 3x3 matrices
// https://gist.github.com/jremmen/9454479
const transpose = a => a[0].map((x, i) => a.map(y => y[i]));
const dotproduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
const mmultiply = (a, b) => a.map(x => transpose(b).map(y => dotproduct(x, y)));
const scale = (a, scalar) => a.map(x => x.map(val => val * scalar));
const det3 = ([[a,b,c],[d,e,f],[g,h,i]]) => a*(e*i-f*h) - b*(d*i-g*f) + c*(d*h-e*g);
const inv3 = ([[a,b,c],[d,e,f],[g,h,i]]) => {
  let det = det3([[a,b,c],[d,e,f],[g,h,i]]);
  if (det == 0) return [[a,b,c],[d,e,f],[g,h,i]];
  return scale(transpose([[e*i-h*f, -(d*i-g*f), d*h-g*e],[-(b*i-c*h), a*i-g*c, -(a*h-b*g)],[b*f-e*c, -(a*f-d*c), a*e-d*b]]), 1/det);
}
const scale_by_coefficients = ([[a,b,c],[d,e,f],[g,h,i]], [[x], [y], [z]]) => [[a*x,b*y,c*z],[d*x,e*y,f*z],[g*x,h*y,i*z]];

// changes a coords matrix into two matrices of coords in homogeneous coords
// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript/339033#339033
const homogenate = ([[x1, x2, x3, x4], [y1, y2, y3, y4]]) => [[[x1, x2, x3], [y1, y2, y3], [1, 1, 1]], [[x4],[y4],[1]]];
// matrix A takes lines from basis vectors to the old coordinates,
// so A inverse old coordinates to the basis vectors of our projective space.
// B is basis -> new coords, so B * A^-1 takes us all the way from old coords to new coords.
var [A, b] = homogenate(old_coords);
var coefficients = mmultiply(inv3(A), b);
A = scale_by_coefficients(A, coefficients);
var B;
[B, b] = homogenate(new_coords);
coefficients = mmultiply(inv3(B), b);
B = scale_by_coefficients(B, coefficients);
const TRANSFORMATION_MATRIX = mmultiply(B, inv3(A));

function transform_point([x, y], t) {
  // Coords from the transformation matrix are still homogenous coords, so they
  // need to be divided by the third element (a sort of scalar).
  var [[a], [b], [c]] = mmultiply(TRANSFORMATION_MATRIX, [[x], [y], [1]]);
  return [a/c, b/c];
}

const t = new bt.Turtle();
// helper function for all of those RECTS
// Fascinating how a few simple tweaks can draw
// circles, parallelograms, etc...
function rect(left, bottom, width, height, radius, options = {}) {
  let turtle = options.turtle ? options.turtle : t;
  turtle.jump([left, bottom]);
  turtle.setAngle(0);
  let bend = options.bend ? options.bend : 0;
  for (let i = 0; i < 4; i += 1) {
    turtle.forward(i % 2 == 0 ? width : height);
    if (radius != 0) {
      turtle.arc(90 + bend * (i % 2 == 0 ? -1 : 1), radius);
    } else {
      turtle.left(90 + bend * (i % 2 == 0 ? -1 : 1));
    }
  }
}

// ==========================================
// draws a TV in normal space
rect(-30, -27, 63, 36, 2);
// left
rect(-27, -24, 39, 31, 1);
rect(-26, -22, 36, 29, 0);
for (let r = 0; r < 28; r++) {
  rect(-26, -21 + r, 36, 0, 0);
}
for (let c = 0; c < 37; c++) {
  rect(-26 + c, -22, 0, 29, 0);
}
//right
rect(16, -24, 14, 33, 0);
// speaker
for (let i = 0; i < 7; i++) {
  rect(17.5, -21 + i * 2, 11, -1, 0);
}
// Wait... these aren't rects!
rect(23, -7, 0, 0, 3);
rect(23, 1, 0, 0, 3);
// antenna
rect(4, 13, 0, 40, 1, {bend: 28});
rect(2, 13, 0, 36, 1, {bend: -37});
// feet
rect(-23, -37, 4, 9, 1, {bend: 28});
rect(22, -37, 4, 9, 1, {bend: -28});
// ==========================================

const polylines = t.lines();
var modified = bt.iteratePoints(polylines, transform_point);
const finalLines = [];
bt.join(finalLines, modified);

// center piece
const bounds = bt.bounds(finalLines);
bt.translate(finalLines, [size / 2, size / 2], bounds.cc);
bt.scale(finalLines, Math.min(size / 2 / bounds.rt[0], size / 2 / bounds.rt[1]));

// draw it!
drawLines(finalLines);