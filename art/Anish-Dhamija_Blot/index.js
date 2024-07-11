/*
@title: Unique Pices
@author: Anish Dhamija
@snapshot:1.png */



const size = 125;
const gridsize = 250;
const px_per_mm = gridsize / size;
const shaded = true;

let xrange = [-2, 0.5];
let yrange = [-1.125, 1.125];
setDocDimensions(size, size);

const shapes = [];

function mandelbrot_px(x, y) {
  let z1 = 0, z2 = 0, itr = 0;
  const max_itr = 1000;
  while (z1 * z1 + z2 * z2 <= 4 && itr <= max_itr) {
    const newz1 = z1 * z1 - z2 * z2 + x;
    z2 = 2 * z1 * z2 + y;
    z1 = newz1;
    itr++;
  }
  return itr;
}

function shade(pixsize, density) {
  const t = new bt.Turtle();
  for (let i = 0; i < pixsize; i += (1 / density)) {
    t.goTo([0, i]);
    t.down();
    t.forward(pixsize);
    t.up();
  }
  return t;
}

function map_linear(f1, f2, t1, t2, val) {
  return (val - f1) * (t2 - t1) / (f2 - f1) + t1;
}

let x_cent = 0, y_cent = 0, itr = 0;
while (itr < 10000) {
  x_cent = map_linear(0, 1, -2, 0.5, Math.random());
  y_cent = map_linear(0, 1, -1.125, 1.125, Math.random());
  itr++;
  const val = mandelbrot_px(x_cent, y_cent);
  if (val < 1000 && val > 70) {
    const zoom = Math.pow(0.1, Math.random() * 5);
    xrange = [x_cent - zoom, x_cent + zoom];
    yrange = [y_cent - zoom, y_cent + zoom];
    break;
  }
}

const pixarr = [];
for (let x = 0; x < gridsize; x++) {
  const row = [];
  for (let y = 0; y < gridsize; y++) {
    const val = mandelbrot_px(
      map_linear(0, gridsize, xrange[0], xrange[1], x),
      map_linear(0, gridsize, yrange[0], yrange[1], y)
    );
    row.push(Math.round(Math.log(val, 1.05)));
  }
  pixarr.push(row);
}

const pixels_to_render = [];
for (let y = 0; y < pixarr.length; y++) {
  const render_row = [];
  for (let x = 0; x < pixarr[0].length; x++) {
    const v = pixarr[y][x];
    if (
      (pixarr[y + 1] === undefined || pixarr[y - 1] === undefined) ||
      (v !== pixarr[y + 1][x] || v !== pixarr[y][x + 1])
    ) {
      render_row.push(v);
    } else {
      render_row.push(0);
    }
  }
  pixels_to_render.push(render_row);
}

if (shaded) {
  const t = new bt.Turtle();
  for (let y = 0; y < pixels_to_render.length; y++) {
    let block_begin = 0;
    let block_val = false;
    for (let x = 0; x < pixels_to_render[0].length; x++) {
      const cond = pixels_to_render[y][x] !== 0;
      if (cond !== block_val) {
        if (block_val) {
          t.up();
          t.goTo([block_begin / px_per_mm, y / px_per_mm]);
          t.down();
          t.goTo([x / px_per_mm, y / px_per_mm]);
        }
        block_begin = x;
        block_val = !block_val;
      }
    }
    if (block_val) {
      t.up();
      t.goTo([block_begin / px_per_mm, y / px_per_mm]);
      t.down();
      t.goTo([gridsize / px_per_mm, y / px_per_mm]);
    }
  }
  bt.join(shapes, t.lines());
} else {
  for (let y = 0; y < pixels_to_render.length; y++) {
    for (let x = 0; x < pixels_to_render[0].length; x++) {
      if (pixels_to_render[y][x] !== 0) {
        const t = new bt.Turtle();
        if (x > 0 && y < gridsize - 1 && pixels_to_render[y][x] === pixels_to_render[y + 1][x - 1]) {
          t.up();
          t.goTo([0, 0]);
          t.down();
          t.goTo([-1 / px_per_mm, 1 / px_per_mm]);
        }
        if (x < gridsize - 1 && y < gridsize - 1 && pixels_to_render[y][x] === pixels_to_render[y + 1][x + 1]) {
          t.up();
          t.goTo([0, 0]);
          t.down();
          t.goTo([1 / px_per_mm, 1 / px_per_mm]);
        }
        if (x < gridsize - 1 && pixels_to_render[y][x] === pixels_to_render[y][x + 1]) {
          t.up();
          t.goTo([0, 0]);
          t.down();
          t.goTo([1 / px_per_mm, 0]);
        }
        if (y < gridsize - 1 && pixels_to_render[y][x] === pixels_to_render[y + 1][x]) {
          t.up();
          t.goTo([0, 0]);
          t.down();
          t.goTo([0, 1 / px_per_mm]);
        }
        t.translate([x / px_per_mm, y / px_per_mm]);
        bt.join(shapes, t.lines());
      }
    }
  }
}

bt.translate(shapes, [size / 2, size / 2], bt.bounds(shapes).cc);

const circleCenter = bt.bounds(shapes).cc;
const circleRadius = bt.bounds(shapes).r + 1;

const numSegments = 100;
const circlePoints = [];
for (let i = 0; i <= numSegments; i++) {
  const angle = (Math.PI * 2 / numSegments) * i;
  const x = circleCenter[0] + circleRadius * Math.cos(angle);
  const y = circleCenter[1] + circleRadius * Math.sin(angle);
  circlePoints.push([x, y]);
}

const circleTurtle = new bt.Turtle();
circleTurtle.up();
circleTurtle.goTo(circlePoints[0]);
circleTurtle.down();
for (let i = 1; i <= numSegments; i++) {
  circleTurtle.goTo(circlePoints[i]);
}

bt.join(shapes, circleTurtle.lines());
drawLines(shapes);
