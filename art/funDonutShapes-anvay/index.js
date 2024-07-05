/*
@title: funDonutShapes
@author: anvay
@snapshot: donut#1
*/

const { Turtle, join, bounds, rotate, scale, translate, randInRange, randIntInRange } = blotToolkit;

let t = new Turtle();
let plotShift = 62.5;
let radius = randInRange(10, 30);
let scaler = 1.6;

function rectangle(size) {
  let t = new Turtle();
  let tpoly = [];
  t.forward(size / 2);
  t.right(90);
  t.forward(size / 16);
  t.right(90);
  t.forward(size / 2);
  t.right(90);
  t.forward(size / 16);
  return t.lines();
}

function triangle(size) {
  let t = new Turtle();
  let tpoly = [];
  t.forward(size);
  t.right(120);
  t.forward(size);
  t.right(120);
  t.forward(size);
  return t.lines();
}

function sprinkles(topFrosting, topIC, leftIC, rightIC) {
  let sprinkles = [];
  for (let i = 0; i < radius * 3; i++) {
    let sprinkleLength = radius / 7;
    let sprinklePoly = [];
    let sprinkleType = randIntInRange(0, 1) === 0 ? rectangle(sprinkleLength) : triangle(sprinkleLength);
    let rotation = randInRange(0, 360);
    // sprinkle.rotate(rotation); // Uncomment if needed later
    let y = randInRange(topFrosting, plotShift + radius - sprinkleLength);
    let xBoundry = Math.sqrt((radius ** 2 - ((y - plotShift) ** 2))) * 1.6;
    let x = randInRange(plotShift - xBoundry + sprinkleLength, plotShift + xBoundry - sprinkleLength);
    translate(sprinkleType, [x, y]);
    if (y < (topIC) && (leftIC < x < rightIC)) {
    } else {
      join(sprinkles, sprinkleType);
    }
  }
  return sprinkles;
}

function frosting() {
  let allofthem = new Turtle();
  let allofthempoly = [];
  let waves = randIntInRange(3, 7);
  if (waves % 2 == 0) {
    waves = waves + 1;
  }

  for (let i = 0; i < waves; i++) {
    let wave = new Turtle();
    let wavePoly = [];
    wave.arc(-180, radius / 4);
    wavePoly.push(...wave.lines());
    let scaler = 1.11 * (5 / waves);
    translate(wavePoly, [plotShift, plotShift]);
    rotate(wavePoly, 90, [plotShift, plotShift]);
    scale(wavePoly, [scaler, 1]);
    translate(wavePoly, [(radius / 4) * scaler - (radius / 4), 0]);
    translate(wavePoly, [(-1.4 * radius), -1 * (radius / 2)]);
    for (let j = 0; j < i; j++) {
      if (j % 2 == 0) {
        rotate(wavePoly, 180, [bounds(wavePoly).rb[0], bounds(wavePoly).rb[1]]);
      } else {
        rotate(wavePoly, 180, [bounds(wavePoly).rt[0], bounds(wavePoly).rt[1]]);
      }
    }
    join(allofthempoly, wavePoly);
  }
  return allofthempoly;
}

let tpoly = [];
t.arc(-360, radius);
tpoly.push(...t.lines());
translate(tpoly, [plotShift, plotShift + radius]);
scale(tpoly, [scaler, 1]);

let t1poly = [];
let t1 = new Turtle();
t1.arc(-178, radius / 3);
t1poly.push(...t1.lines());
rotate(t1poly, 270, [0, -radius / 3.5]);
scale(t1poly, [1.4, 0.5]);
translate(t1poly, [plotShift, plotShift + (radius / 3)]);

let t2poly = [];
let t2 = new Turtle();
t2.arc(-178, radius / 3);
t2poly.push(...t2.lines());
rotate(t2poly, 90, [0, -radius / 3.5]);
scale(t2poly, [0.9, 0.3]);
translate(t2poly, [(bounds(t1poly).cc[0] - radius / 10) + 1.0, plotShift]);

let wave = frosting();
let wavePoly = [];
let sprinklees = sprinkles(bounds(wave).ct[1], bounds(t1poly).ct[1], bounds(t1poly).lc[0], bounds(t1poly).rc[0]);

drawLines(t1poly);
drawLines(t2poly);
drawLines(tpoly);
drawLines(wave);
drawLines(sprinklees);
