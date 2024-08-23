/*
@title: Feather Quilt
@author: Amspy
@snapshot: Feather4.jpg
*/

const width = 125
const height = 125
const rotationAngle = bt.randIntInRange(1, 360) // Define the rotation angle here
const scalingFactor = 0.35 // Define the scaling factor here (made smaller for quilt space)
const quiltThickness = 10 // Thickness of the quilt edge
const stringLength = 5 // Length of the loose strings
const numStrings = 16 // Number of loose strings per edge
setDocDimensions(width, height)

// Function to create and return a feather
function createFeather() {
  // Shaft is a stretched triangle
  const shaft = bt.resample([
    [
      [0, 0],
      [1, 0],
      [0, -130],
      [-1, 0],
      [0, 0]
    ]
  ], 1)

  // Vanes are Catmull-Rom curves with varying lengths
  const vanePoints = [
    [0, 0],
    [-14, 16],
    [-22, 77],
    [0, 100],
    [15, 79],
    [14, 31],
    [0, 0]
  ];
  const vanes = [bt.catmullRom(vanePoints.map(([x, y]) => [x * (1 + bt.rand() * 0.4), y * (1 + bt.rand() * 0.3)]))]

  // Barbs are Catmull-Rom curves with varying lengths originating at the shaft
  const barbs = []
  for (let i = 0; i < shaft[0].length; i++) {
    const parity = i > shaft[0].length / 2 ? -1 : 1
    const [x, y] = shaft[0][i]
    const lengthFactor = 0.5 + bt.rand() * 1.7 // Random length factor for variability
    barbs.push(bt.catmullRom(
      [
        [x, y],
        [x + parity * 10 * lengthFactor, y - 2 * lengthFactor],
        [x + parity * 30 * lengthFactor, y]
      ]))
  }

  // Move the vanes nearer to the end of the shaft
  bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]])

  // Use the vane shape to trim the barbs!
  bt.cut(barbs, vanes)

  // Combine the two shapes
  const feather = [...shaft, ...barbs]
  bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
  bt.iteratePoints(feather, ([x, y]) => [x - 0.002 * (width / 2 - y) * (width / 2 - y), y])
  bt.rotate(feather, bt.randIntInRange(1, 360))
  bt.scale(feather, scalingFactor, [0, 0]) // Apply scaling

  return feather
}

// Function to create the quilt pattern
function createQuilt() {
  const quilt = []
  const quiltEdge = bt.resample([
    [[quiltThickness, quiltThickness], [width - quiltThickness, quiltThickness]],
    [[width - quiltThickness, quiltThickness], [width - quiltThickness, height - quiltThickness]],
    [[width - quiltThickness, height - quiltThickness], [quiltThickness, height - quiltThickness]],
    [[quiltThickness, height - quiltThickness], [quiltThickness, quiltThickness]]
  ], 1)
  quilt.push(quiltEdge)

  // Adding loose strings
  for (let i = 0; i < numStrings; i++) {
    // Top edge
    quilt.push(createLooseString([quiltThickness + i * (width - 2 * quiltThickness) / numStrings, quiltThickness], [0, -1]))
    // Bottom edge
    quilt.push(createLooseString([quiltThickness + i * (width - 2 * quiltThickness) / numStrings, height - quiltThickness], [0, 1]))
    // Left edge
    quilt.push(createLooseString([quiltThickness, quiltThickness + i * (height - 2 * quiltThickness) / numStrings], [-1, 0]))
    // Right edge
    quilt.push(createLooseString([width - quiltThickness, quiltThickness + i * (height - 2 * quiltThickness) / numStrings], [1, 0]))
  }

  return quilt.flat() // Flatten to ensure it's a single array of polylines
}

// Function to create a loose string at a given position with a given direction
function createLooseString(start, direction) {
  const [x, y] = start
  const [dx, dy] = direction
  const string = []
  const numWaves = bt.randIntInRange(2, 5) // Random number of waves in the string
  for (let i = 0; i < numWaves; i++) {
    const waveLength = stringLength / numWaves
    const waveHeight = bt.rand() * 3 // Random wave height between -1 and 1
    string.push([x + dx * i * waveLength + dy * waveHeight, y + dy * i * waveLength + dx * waveHeight])
  }
  return [bt.catmullRom(string)] // Return as an array of one polyline
}

// Draw the quilt around the edges
const quilt = createQuilt()
drawLines(quilt)

// Draw feathers in each corner
const feathers = []
const offsets = [
  [width /5, height /5],
  [3 * width /5, height /5],
  [width /5, 3 * height /5],
  [3 * width /5, 3 * height /5]
]

for (let i = 0; i < 4; i++) {
  const feather = createFeather()
  const [offsetX, offsetY] = offsets[i]
  bt.translate(feather, [offsetX - quiltThickness, offsetY - quiltThickness])
  feathers.push(feather)
}

// Draw all feathers
drawLines(feathers.flat())
