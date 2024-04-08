/*
@title: Sierpiński Triangle
@author: CatR3kd
@snapshot: 7layers.png
*/

const width = 10000;
const height = 10000;
const margin = 300;
let depth = 3;

setDocDimensions(width, height);
console.log()
class Triangle {
  constructor(center, sideLength) {
    this.center = center;
    this.sideLength = sideLength;
  }

  getLines() {
    const bottomPoint = [this.center[0], this.center[1] - ((Math.sqrt(3) * this.sideLength) / 4)];
    const leftPoint = [this.center[0] - (this.sideLength / 2), this.center[1] + (Math.sqrt(3) * this.sideLength / 4)];
    const rightPoint = [this.center[0] + (this.sideLength / 2), this.center[1] + (Math.sqrt(3) * this.sideLength / 4)];

    return [
      [bottomPoint, leftPoint],
      [leftPoint, rightPoint],
      [rightPoint, bottomPoint]
    ];
  }

  getNextTriangles() {
    return [
      new Triangle([this.center[0], this.center[1] + (((Math.sqrt(3) * this.sideLength) / 4) + ((Math.sqrt(3) * this.sideLength / 2) / 4))], this.sideLength / 2), // Top triangle
      new Triangle([this.center[0] - (this.sideLength / 2), this.center[1] - (Math.sqrt(3) * this.sideLength / 8)], this.sideLength / 2), // Left triangle
      new Triangle([this.center[0] + (this.sideLength / 2), this.center[1] - (Math.sqrt(3) * this.sideLength / 8)], this.sideLength / 2) // Right triangle
    ];
  }
}

const drawingSize = ((width > height) ? height : width) - (margin * 2);
console.log(((Math.sqrt(3) * drawingSize) / 2))
const startingTopPoint = [0, ((Math.sqrt(3) * drawingSize) / 2) - ((Math.sqrt(3) * drawingSize) / 8)];
const startingLeftPoint = [-(drawingSize / 2), -(Math.sqrt(3) * drawingSize / 8)];
const startingRightPoint = [(drawingSize / 2), -(Math.sqrt(3) * drawingSize / 8)];

const startingLines = [
  [startingTopPoint, startingLeftPoint],
  [startingLeftPoint, startingRightPoint],
  [startingRightPoint, startingTopPoint]
];

let finalLines = [...startingLines];

const middleTriangle = new Triangle([0, 0], drawingSize / 2);
let lastTriangles = [middleTriangle];
let allTriangles = [middleTriangle];

for (let i = 0; i < depth; i++) {
  let newTriangles = [];
  for (let triangle of lastTriangles) {
    newTriangles.push(...triangle.getNextTriangles());
  }

  lastTriangles = newTriangles;
  allTriangles.push(...newTriangles);
}

for (let triangle of allTriangles) {
  finalLines.push(...triangle.getLines());
}

const bounds = bt.bounds(finalLines);
const cc = bounds.cc;
bt.translate(finalLines, [width / 4, (drawingSize * Math.sqrt(3) / 8) + (drawingSize / 6)], cc);

drawLines(finalLines);
