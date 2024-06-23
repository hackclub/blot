/*
@title: Cool Abstract Art
@author: Henry
@snapshot: SeededAbstract
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const seed = 9999; // Cool looking seed
const random = seedRandom(seed);

const finalLines = [];

function seedRandom(seed) {
  let m = 2147483647,
    a = 16807;
  return function() {
    seed = (seed * a) % m;
    return seed / m;
  };
}

const numPaths = 5; // 5 looks best cause 4 or 6 is ugly
for (let i = 0; i < numPaths; i++) {
  const points = [];
  const start = { x: random() * (width - 40) + 20, y: random() * (height - 40) + 20 };
  const end = { x: random() * (width - 40) + 20, y: random() * (height - 40) + 20 };
  const control1 = {
    x: (start.x + end.x) / 2 + (random() * 40 - 20),
    y: (start.y + end.y) / 2 + (random() * 40 - 20)
  };
  const control2 = {
    x: (start.x + end.x) / 2 + (random() * 40 - 20),
    y: (start.y + end.y) / 2 + (random() * 40 - 20)
  };
  points.push([start.x, start.y], [control1.x, control1.y], [control2.x, control2.y], [end.x, end.y]);

  const curve = bt.catmullRom(points);
  finalLines.push(curve);
}

// cool shapes ig
const shapes = ['circle', 'triangle', 'square'];
shapes.forEach((type, index) => {
  const center = { x: random() * (width - 50) + 25, y: random() * (height - 50) + 25 };
  const size = random() * 15 + 10;
  const shape = generateShape(type, center, size);
  finalLines.push(shape);
});

function generateShape(type, center, size) {
  const points = [];
  const numSides = type === 'circle' ? 20 : (type === 'triangle' ? 3 : 4);
  for (let i = 0; i < numSides; i++) {
    const angle = (2 * Math.PI / numSides) * i;
    points.push([
      center.x + size * Math.cos(angle),
      center.y + size * Math.sin(angle)
    ]);
  }
  points.push(points[0]); // i was wondering why my code didnt work lol
  return points;
}

// satisfying abstract art be like
drawLines(finalLines);