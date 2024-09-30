/*
@title: Maths Equations Plotter
@author: Mitang321
@snapshot: 1.png
*/

const graphPrecision = 3;

const size = 128;

const scale = 6.5;

setDocDimensions(size, size);

const graphUnits = (size - 24) / (scale * 2);

function getCoefficients() {
  return {
    linear: { m: 2, b: -5 },  // Write Values for linear equation (y = mx + b)
    quadratic: { a: 1, b: -2, c: -3 }, // Write Values for quadratic (y = ax^2 + bx + c)
    cubic: { a: 0.5, b: 1, c: -1, d: -1 }  // Write Values for cubic (y = ax^3 + bx^2 + cx + d)
  };
}

const coeffs = getCoefficients();

// y = mx + b
function linearEquation(x) {
  return coeffs.linear.m * x + coeffs.linear.b;
}

// y = ax^2 + bx + c
function quadraticEquation(x) {
  return coeffs.quadratic.a * x * x + coeffs.quadratic.b * x + coeffs.quadratic.c;
}

// y = ax^3 + bx^2 + cx + d
function cubicEquation(x) {
  return coeffs.cubic.a * x * x * x + coeffs.cubic.b * x * x + coeffs.cubic.c * x + coeffs.cubic.d;
}

// Function to create graph lines
function makeGraph(equation) {
  var graph = [];
  graph[0] = [];

  for (var x = -graphUnits; x < graphUnits; x += 1 / Math.pow(10, graphPrecision)) {
    var result = equation(x);
    result = (result > graphUnits) ? NaN : result;
    result = (result < -graphUnits) ? NaN : result;

    if (!isNaN(result)) {
      graph[graph.length - 1][graph[graph.length - 1].length] = [size / 2 + x * scale, size / 2 - result * scale];
    } else {
      if (graph[graph.length - 1].length == 0) {
        graph.pop();
      }
      graph[graph.length] = [];
    }
  }
  return graph;
}

// Create axes
const axes = [
  [
    [8, size / 2],
    [size - 8, size / 2]
  ],
  [
    [size / 2, 8],
    [size / 2, size - 8]
  ]
];

var lines = [];

for (var i = 0; i <= graphUnits; i++) {
  if (i == 0) i++;

  lines.push([
    [12, size / 2 + i * scale],
    [size - 12, size / 2 + i * scale]
  ]);
  lines.push([
    [size / 2 + i * scale, 12],
    [size / 2 + i * scale, size - 12]
  ]);

  lines.push([
    [12, size / 2 - i * scale],
    [size - 12, size / 2 - i * scale]
  ]);
  lines.push([
    [size / 2 - i * scale, 12],
    [size / 2 - i * scale, size - 12]
  ]);
}

drawLines(axes, { width: 2 });
drawLines(lines);

drawLines(makeGraph(linearEquation), { stroke: "red", width: 3 });
drawLines(makeGraph(quadraticEquation), { stroke: "blue", width: 3, dash: [5, 5] });
drawLines(makeGraph(cubicEquation), { stroke: "green", width: 3 });

