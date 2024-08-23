const width = 125
const height = 125
const rotationAngle = bt.randIntInRange(1, 360) // Define the rotation angle here
const scalingFactor = 0.4 // Define the scaling factor here
//const numberOfFeathers = 4 // Number of feathers to be drawn

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

// Draw feathers in each corner
const feathers = []
const offsets = [
  [width / 4, height / 4], 
  [3 * width / 4, height / 4], 
  [width / 4, 3 * height / 4], 
  [3 * width / 4, 3 * height / 4]
]

for (let i = 0; i < 4; i++) {
  const feather = createFeather()
  const [offsetX, offsetY] = offsets[i]
  bt.translate(feather, [offsetX - 22, offsetY - 22])
  feathers.push(feather)
}

// Draw all feathers
drawLines(feathers.flat())
bt.merge(feathers.flat());