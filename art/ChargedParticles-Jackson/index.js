/*
@title: Charged particle simulation
@author: Jackson D. Smith
@snapshot: image2.png
*/

const width = 125;
const height = 125;

// I didn't know any JS before this project,
// sorry for the *interesting* code :)

// arrow length
const SCALING = 3.0;

// distance around charges to not draw vectors
const MIN_DISTANCE = 10.0;

let path = [
  [50, 80]
];

// granularity of simulation
const dt = 0.1;

// time to run the simulation
const TIME_LIMIT = 2000;

// partical inital velocity
let velocity = [0, 0];

// partical charge
let part_charge = 1.0;

// [x, y], charge
const charges = [
  [
    [125 / 2.0, 125 / 2.0 + 10], -2
  ],
  [
    [125 / 2.0, 125 / 2.0 - 10], -2
  ],
  [
    [125 / 2.0 + 20, 125 / 2.0], 3
  ],
  [
    [125 / 2.0 - 20, 125 / 2.0], 3
  ]
];

// Where to place vector field
const START_X = 20;
const END_X = 105;
const START_Y = 20;
const END_Y = 105;
const TICK = 5;

setDocDimensions(width, height);

function draw_dot(x, y, r) {
  const DOT_RADIUS = 1;
  const dot_turtle = new bt.Turtle()
    .up()
    .goTo([x, y - r])
    .down()
    .arc(360, r);
  const path = dot_turtle.path;
  drawLines(path);
}

function draw_charge(x, y, chg) {
  draw_dot(x, y, Math.abs(chg))
  if (chg > 0) {
    draw_plus(x, y, chg / 1.3);
  } else {
    draw_minus(x, y, chg / 1.3);
  }
}

function draw_plus(x, y, s) {
  drawLines([
    [
      [x - s / 2.0, y],
      [x + s / 2.0, y]
    ]
  ]);
  drawLines([
    [
      [x, y - s / 2.0],
      [x, y + s / 2.0]
    ]
  ]);
}

function draw_minus(x, y, s) {
  drawLines([
    [
      [x - s / 2.0, y],
      [x + s / 2.0, y]
    ]
  ]);
}

function draw_vec(vector, x, y) {
  const endpoint = [x + vector[0] * SCALING, y + vector[1] * SCALING];
  const lines = [
    [
      [x, y],
      endpoint
    ]
  ];

  drawLines(lines);
  bt.trim(lines, 0.5, 1);
  bt.rotate(lines, 45, endpoint);

  drawLines(lines);

  bt.rotate(lines, -90, endpoint);

  drawLines(lines);
}

function dist(pos1, pos2) {
  return mag(vec_sub(pos1, pos2))
}

function mag(vec) {
  let x, y;
  [x, y] = vec;
  return Math.sqrt(x * x + y * y);
}

function vec_sub(vec1, vec2) {
  const x = vec1[0] - vec2[0];
  const y = vec1[1] - vec2[1];
  return [x, y]
}

function norm(vec) {
  return [vec[0] / mag(vec), vec[1] / mag(vec)]
}

// draw all the charges
for (var i = 0; i < charges.length; i++) {
  var c = charges[i];

  const pos = c[0];
  const charge = c[1];

  draw_charge(pos[0], pos[1], charge);
}

// draw all the arrows
for (var x = START_X; x < END_X; x += TICK) {
  loop: for (var y = START_Y; y < END_Y; y += TICK) {
    var vector = [0, 0];

    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      const pos = c[0];
      const charge = -c[1];
      const distance = dist(pos, [x, y]);
      if (Math.abs(distance) < MIN_DISTANCE) {
        vector = [0, 0];
        continue loop;
      }
      const u = norm(vec_sub(pos, [x, y]));
      vector[0] += u[0] * charge / (distance * distance);
      vector[1] += u[1] * charge / (distance * distance);
    }

    draw_vec(norm(vector), x, y);
  }
}

// simulate the charged particles path
out:
  for (var t = 0; t < TIME_LIMIT; t += dt) {
    let vector = [0, 0];
    let x = path[path.length - 1][0];
    let y = path[path.length - 1][1];

    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      const pos = c[0];
      const charge = -c[1];
      const distance = dist(pos, [x, y]);
      if (Math.abs(distance) < Math.abs(charge)) {
        vector = [0, 0];
        break out;
      }
      const u = norm(vec_sub(pos, [x, y]));
      vector[0] += u[0] * charge * part_charge / (distance * distance);
      vector[1] += u[1] * charge * part_charge / (distance * distance);
    }

    let dv = [vector[0] * dt, vector[1] * dt]

    velocity = [velocity[0] + dv[0], velocity[1] + dv[1]];

    let ds = [velocity[0] * dt, velocity[1] * dt];

    let s = [x + ds[0], y + ds[1]];


    path.push(s);
  }

drawLines([path]);