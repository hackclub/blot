/*
@title: BlotPlot
@author: whatware
@snapshot: example1.png
*/

// Function definitions - To graph no function type NaN in the function field
const f1 = (x) => 3 * Math.sin(x);
const f2 = (x) => Math.log(x);
const f3 = (x) => Math.pow(x, 2);

// Precision of graph - higher is more precise, lower is faster (3 recommended)
const graphPrecision = 3;

// size of graph
const size = 128;

// graph scale - higher is more zoomed in
const scale = 6.5;



setDocDimensions(size, size);

const graphUnits = (size - 24) / (scale * 2);

function makeGraph(equation) {
  var graph = [];
  graph[0] = [];

  for (var x = -graphUnits; x < graphUnits; x += 1 / Math.pow(10, graphPrecision)) {
    var result = equation(x);
    result = (result > graphUnits) ? NaN : result;
    result = (result < -graphUnits) ? NaN : result;

    if (!isNaN(result)) {
      graph[graph.length - 1][graph[graph.length - 1].length] = [size / 2 + x * scale, size / 2 + result * scale];
    } else {
      if (graph[graph.length - 1].length == 0) {
        graph.pop();
      }
      graph[graph.length] = [];
    }
  }
  return graph;
}

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

drawLines(makeGraph(f3), { stroke: "green", width: 3 });
drawLines(makeGraph(f2), { stroke: "blue", width: 3 });
drawLines(makeGraph(f1), { stroke: "red", width: 3 });
