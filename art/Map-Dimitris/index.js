/*
@title: Map
@author: Dimitris Toulis
@snapshot: 0.png
*/

/*
# Blot Map

A blot program that generates a map with a river, trees and a city with houses, trees and roads

## Configuration

You can set a seed by setting the `seed` constant

### River Options

- maxAngleTan: Tangent of maximum angle the river can make from the vertical axis
- paddingX: Padding from the sides
- maxWidth: Maximum width of the river
- minWidth: Minimum width of the river

### Tree Options

- N: Number of trees
- paddingX: Padding from the sides
- paddingY: Padding from the top and bottom
- riverDistance: Minimum distance from the river

### Fish Options

- N: Number of fish
- padding: Minimum distance between fish (as fraction of the length of the river)
- maxSize: Maximum size multiplier
- minSize: Minimum size multiplier
- angleVariation: Maximum variation from river angle

### House Options

- chimneyChance: Chance of having a chimney 
- windowChance: Chance of having a window

### City Options

- criticalSize: Number of houses after which the probability of generating another one drops
- firstRiverDistance: Minimum distance from the river for the first house
- padding: Padding for the city
- riverDistance: Minimum distance from the river for all houses
- skipChance: Chance to skip drawing a house
- treeReplaceChance: Chance to draw a tree insted of skipping a house

### Road Option

- dashSize: Size of dashes in the center of the road
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const seed = null
if (seed != null) bt.setRandSeed(seed)

const options = {
  river: {
    maxAngleTan: 0.2,
    paddingX: 10,
    maxWidth: 7,
    minWidth: 2
  },
  tree: {
    N: 50,
    bushReplaceChance: 0.3,
    paddingX: 5,
    paddingY: 15,
    riverDistance: 5
  },
  fish: {
    N: 12,
    padding: 0.025,
    maxSize: 1.5,
    minSize: 0.75,
    angleVariation: 20
  },
  house: {
    chimneyChance: 0.5,
    windowChance: 0.2
  },
  city: {
    criticalSize: 35,
    firstRiverDistance: 10,
    padding: 8,
    riverDistance: 6,
    skipChance: 0.5,
    treeReplaceChance: 0.4,
  },
  road: {
    dashSize: 0.25
  }
}

// Object drawing functions

function drawRiver() {
  const river = [[], []];
  const { maxAngleTan, paddingX, maxWidth, minWidth } = options.river;
  let rw = bt.randInRange(minWidth, maxWidth)
  let x = bt.randInRange(paddingX + rw, width - paddingX - rw)
  river[0].push([x - rw, 0])
  river[1].push([x + rw, 0])
  for (let y = 0; y < height;) {
    y += bt.randInRange(10, 22)
    if (y > height - 5) y = height

    rw += bt.randInRange(Math.max(-1, minWidth - rw), Math.min(1, maxWidth - rw))

    x += bt.randInRange(Math.max(-y * maxAngleTan, paddingX + rw - x), Math.min(y * maxAngleTan, width - paddingX - rw - x))

    river[0].push([x - rw, y])
    river[1].push([x + rw, y])
  }
  return [bt.catmullRom(river[0]), bt.catmullRom(river[1])]
}

function drawBush(pos, base) {
  const turtle = new bt.Turtle()
  turtle.up()
  turtle.forward(base)
  turtle.down()
  turtle.left(45)
  turtle.arc(270, base / (Math.sqrt(2)))
  turtle.apply(turtle => {
    const pls = turtle.path;
    bt.resample(pls, .2);
    bt.iteratePoints(pls, (pt, t) => {
      const [x, y] = pt;
      const mag = Math.sin(t * 7 * Math.PI * 2) * (bt.rand() / 8);
      const norm = bt.getNormal(pls, t);

      return [
        x + norm[0] * mag,
        y + norm[1] * mag
      ]
    })
  })
  turtle.right(135)
  turtle.forward(-base)
  return bt.translate([bt.catmullRom(turtle.lines()[0])], pos)
}

function drawTree(pos) {
  const height = bt.randInRange(2, 5)
  const turtle = new bt.Turtle()
    .down()
    .step([0, height])
    .step([0, -height])
    .step([1, 0])
    .step([0, height])
    .up()
    .step([-1, 0])
    .down()
  return bt.translate([turtle.lines()[0], ...drawBush([0, height], 1)], pos)
}

function drawTreeOrBush(pos) {
  return bt.rand() <= options.tree.bushReplaceChance ? drawBush([pos[0] + 0.5, pos[1]], 2) : drawTree([pos[0] + 1, pos[1]])
}

function drawFish(pos, angle) {
  const turtle = new bt.Turtle()
    .setAngle(angle - 270)
    .forward(1)
    .right(120)
    .forward(1)
    .right(120)
    .forward(1)
    .up()
    .right(180)
    .forward(1)
    .down()
    .arc(-60, 2)
    .up()
    .arc(60, -2)
    .down()
    .right(60)
    .arc(60, 2)
    .up()
    .setAngle(angle)
    .forward(-0.6)
    .right(90)
    .down()
    .arc(-360, -0.1)
  return bt.scale(bt.translate(turtle.lines(), pos), bt.randInRange(options.fish.minSize, options.fish.maxSize))
}

function drawHouse(pos) {
  const turtle = new bt.Turtle().left(90)
  for (let i = 0; i < 4; i++) {
    turtle.forward(3)
    turtle.right(90)
  }
  turtle
    .forward(3)
    .right(30)
    .forward(3)
    .right(120)
    .forward(3)
  if (bt.rand() <= options.house.chimneyChance) {
    turtle
      .forward(-1.5)
      .setAngle(90)
      .forward(1)
      .right(90)
      .forward(0.5)
      .right(90)
      .forward(1 + 0.5 * Math.sqrt(3))
  }
  if (bt.rand() <= options.house.windowChance) {
    turtle
      .jump([1, 4])
      .setAngle(90)
      .arc(360, -0.5)
      .right(90)
      .forward(1)
      .jump([1.5, 4.5])
      .setAngle(270)
      .forward(1)
  }
  turtle
    .jump([1.25, 0])
    .setAngle(90)
    .forward(1)
    .right(90)
    .forward(0.5)
    .right(90)
    .forward(1)
  return bt.translate(turtle.lines(), pos)
}

const allRoadPoints = []
function createRoad([x, y]) {
  const points = [[x, y]]
  const sides = [[], []]
  const offsets = [[5, 0], [-5, 0], [0, 8], [0, -8]]
  while (true) {
    shuffle(offsets)
    for (let i = 0; i < 4; i++) {
      if (points.findIndex((a) => (a[0] == x + offsets[i][0] && a[1] == y + offsets[i][1])) != -1 ||
        allRoadPoints.findIndex((a) => (a[0] == x + offsets[i][0] && a[1] == y + offsets[i][1])) != -1 ||
        !bt.pointInside([cityHull], [x + offsets[i][0], y + offsets[i][1]]) ||
        nearRiver([x + offsets[i][0], y + offsets[i][1]], 5)) continue
      x += offsets[i][0]
      y += offsets[i][1]
      break
    }
    const last = (points.at(-1)[0] == x && points.at(-1)[1] == y)

    if (points.length == 1) {
      if (points[0][0] == x) {
        sides[0].push([points.at(-1)[0] + Math.sign(points.at(-1)[1] - y) * 0.5, points.at(-1)[1]])
        sides[1].push([points.at(-1)[0] - Math.sign(points.at(-1)[1] - y) * 0.5, points.at(-1)[1]])
      }
      if (points[0][1] == y) {
        sides[0].push([points.at(-1)[0], points.at(-1)[1] - Math.sign(points.at(-1)[0] - x) * 0.5])
        sides[1].push([points.at(-1)[0], points.at(-1)[1] + Math.sign(points.at(-1)[0] - x) * 0.5])
      }
      points.push([x, y])
      continue
    }

    if (y == points.at(-1)[1] && y == points.at(-2)[1]) {
      sides[0].push([points.at(-1)[0], points.at(-1)[1] - Math.sign(points.at(-2)[0] - x) * 0.5])
      sides[1].push([points.at(-1)[0], points.at(-1)[1] + Math.sign(points.at(-2)[0] - x) * 0.5])
    }
    else if (x == points.at(-1)[0] && x == points.at(-2)[0]) {
      sides[0].push([points.at(-1)[0] + Math.sign(points.at(-2)[1] - y) * 0.5, points.at(-1)[1]])
      sides[1].push([points.at(-1)[0] - Math.sign(points.at(-2)[1] - y) * 0.5, points.at(-1)[1]])
    } else if (x == points.at(-1)[0] && points.at(-1)[1] == points.at(-2)[1]) {
      sides[0].push([points.at(-1)[0] + Math.sign(points.at(-1)[1] - y) * 0.5, points.at(-1)[1] - Math.sign(points.at(-2)[0] - x) * 0.5])
      sides[1].push([points.at(-1)[0] - Math.sign(points.at(-1)[1] - y) * 0.5, points.at(-1)[1] + Math.sign(points.at(-2)[0] - x) * 0.5])
    } else if (y == points.at(-1)[1] && points.at(-1)[0] == points.at(-2)[0]) {
      sides[0].push([points.at(-1)[0] + Math.sign(points.at(-2)[1] - y) * 0.5, points.at(-1)[1] - Math.sign(points.at(-1)[0] - x) * 0.5])
      sides[1].push([points.at(-1)[0] - Math.sign(points.at(-2)[1] - y) * 0.5, points.at(-1)[1] + Math.sign(points.at(-1)[0] - x) * 0.5])
    }

    if (last) break;
    points.push([x, y])
  }
  allRoadPoints.push(...points)
  const road = [...sides, [sides[0][0], sides[1][0]], [sides[0].at(-1), sides[1].at(-1)]]
  const center = [points]
  bt.resample(center, options.road.dashSize)
  let i = 0;
  bt.iteratePoints(center, (pt, _) => (i++) % 3 == 0 ? "BREAK" : pt)
  return [...road, ...center]
}

// Helpers

class Queue {
  constructor() {
    this._elements = [];
    this._offset = 0;
  }
  enqueue(element) {
    this._elements.push(element);
    return this;
  }
  dequeue() {
    if (this.isEmpty()) return null;

    const first = this.front();
    this._offset += 1;

    if (this._offset * 2 < this._elements.length) return first;

    this._elements = this._elements.slice(this._offset);
    this._offset = 0;
    return first;
  }
  front() {
    return this.size() > 0 ? this._elements[this._offset] : null;
  }
  back() {
    return this.size() > 0 ? this._elements[this._elements.length - 1] : null;
  }
  size() {
    return this._elements.length - this._offset;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

function randWithCond(min, max, cond) {
  let x = bt.randIntInRange(min, max)
  let y = bt.randIntInRange(min, max)
  while (!cond(x, y)) {
    x = bt.randIntInRange(min, max)
    y = bt.randIntInRange(min, max)
  }
  return [x, y]
}

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(bt.rand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// Modified from https://github.com/indy256/convexhull-js
function convexHull(points) {
  points.sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

  const n = points.length;
  const hull = [];

  for (let i = 0; i < 2 * n; i++) {
    let j = i < n ? i : 2 * n - 1 - i;
    while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
      hull.pop();
    hull.push(points[j]);
  }

  return hull;
}
function removeMiddle(a, b, c) {
  var cross = (a[0] - b[0]) * (c[1] - b[1]) - (a[1] - b[1]) * (c[0] - b[0]);
  var dot = (a[0] - b[0]) * (c[0] - b[0]) + (a[1] - b[1]) * (c[1] - b[1]);
  return cross < 0 || cross == 0 && dot <= 0;
}

// Drawing code

// River
const river = drawRiver()

const riverCenter = river[0].map((p, i) => ([(p[0] + river[1][i][0]) / 2, (p[1] + river[1][i][1]) / 2]))
const closedRiver = [...river[0], ...river[1].reverse(), river[0][0]]

drawLines(river)

// Fish
let t = 0
for (let i = 0; i < options.fish.N; i++) {
  t += bt.randInRange(options.fish.padding, Math.min((1 - t) / (options.fish.N - i), 1 - t - options.fish.padding))
  drawLines(drawFish(bt.getPoint([riverCenter], t), bt.getAngle([riverCenter], t) + bt.randInRange(-options.fish.angleVariation, options.fish.angleVariation)))
}


// City

function nearRiver([x, y], dist) {
  for (let ox = -dist; ox <= dist; ox++) {
    for (let oy = -dist; oy <= dist; oy++) {
      if (bt.pointInside([closedRiver], [x + ox, y + oy])) return true
    }
  }
  return false
}

let size = 0
const queue = new Queue()
const visited = []
const setVisited = ([x, y]) => visited[x + width * y] = true
const getVisited = ([x, y]) => visited[x + width * y]

const firstHouse = randWithCond(options.city.padding, width - options.city.padding, (x, y) => !nearRiver([x, y], options.city.firstRiverDistance))
queue.enqueue(firstHouse)
setVisited(firstHouse)

const cityPoints = []
const roadStarts = []

while (!queue.isEmpty()) {
  const [x, y] = queue.dequeue()
  if (bt.rand() < (1 - options.city.skipChance)) {
    drawLines(drawHouse([x, y]))
    size++
    cityPoints.push([x, y], [x + 3, y], [x, y + 6], [x + 3, y + 6])
    roadStarts.push([x - 1, y - 1])
  } else if (bt.rand() < options.city.treeReplaceChance) {
    drawLines(drawTreeOrBush([x, y]))
    cityPoints.push([x, y], [x, y + 6])
  }
  for (let ox = -5; ox <= 5; ox += 5) {
    if (x + ox < options.city.padding || x + ox > width - options.city.padding) continue
    for (let oy = -8; oy <= 8; oy += 8) {
      if (y + oy < options.city.padding || y + oy > height - options.city.padding) continue
      if (bt.rand() <= (size <= options.city.criticalSize ? 1 : 1 / (size - options.city.criticalSize)) && !getVisited([x + ox, y + oy]) && !nearRiver([x + ox, y + oy], options.city.riverDistance)) {
        queue.enqueue([x + ox, y + oy])
        setVisited([x + ox, y + oy])
      }
    }
  }
}

const cityHull = convexHull(cityPoints)

// Road
drawLines(createRoad([firstHouse[0] - 1, firstHouse[1] - 1]))
let roadStart = roadStarts[bt.randIntInRange(1, roadStarts.length - 1)]
while (allRoadPoints.findIndex((a) => (a[0] == roadStart[0] && a[1] == roadStart[1])) != -1) {
  roadStart = roadStarts[bt.randIntInRange(1, roadStarts.length - 1)]
}
drawLines(createRoad(roadStart))

// Trees

function nearCity([x, y]) {
  for (let ox = -6; ox <= 6; ox++) {
    for (let oy = -6; oy <= 6; oy++) {
      if (bt.pointInside([cityHull], [x + ox, y + oy])) return true
    }
  }
  return false
}

const trees = []
function onTree([x, y]) {
  return trees.some(([tx, ty]) => {
    if (Math.abs(y - ty) <= 6 && Math.abs(x - tx) <= 2) return true
    return false
  })
}

for (let i = 0; i < options.tree.N; i++) {
  let x = bt.randInRange(options.tree.paddingX, width - options.tree.paddingX)
  let y = bt.randInRange(options.tree.paddingY, height - options.tree.paddingY)
  while (
    nearCity([x, y]) || nearRiver([x, y], options.tree.riverDistance) || onTree([x, y])
  ) {
    x = bt.randInRange(options.tree.paddingX, width - options.tree.paddingX)
    y = bt.randInRange(options.tree.paddingY, height - options.tree.paddingY)
  }
  trees.push([x, y])
  drawLines(drawTreeOrBush([x, y]))
}