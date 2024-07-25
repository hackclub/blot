/*
@title Layered Leaves
@author Alex
@snapshot
*/


const height = 150
const width = 150

setDocDimensions(width, height)
const leaf = (xpos, ypos) => {
  const x = [bt.randInRange(13, 20), bt.randInRange(46, 31), bt.randInRange(95, 71), bt.randInRange(15, 24), bt.randInRange(50, 66), 82, 88, 30, 50, 60, 75]
  const y = [16, 65, 88, 9, 35, 58, 88, 22, 47, 58, 50]

  for (let i = 0; i < 10; i++) {
    x[i] = x[i] + xpos
    y[i] = y[i] + ypos
  }

  const curve_1 = bt.catmullRom([
    [0 + xpos, 0 + ypos],
    [x[0], y[0]],
    [x[1], y[1]],
    [x[2], y[2]]
  ])
  const curve_2 = bt.catmullRom([
    [0 + xpos, 0 + ypos],
    [x[3], y[3]],
    [x[4], y[4]],
    [x[5], y[5]],
    [x[2], y[2]]
  ])
  const center = bt.catmullRom([
    [0 + xpos, 0 + ypos],
    [x[7], y[0] + y[3]],
    [x[8], y[8]],
    [x[9], y[9]],
    [x[10], x[10]]
  ])
  const vien_1 = bt.catmullRom([
    [x[8], y[8]],
    [x[8] - 6, y[8] - bt.randInRange(2, 5)],
    [x[8] + -12, y[8] + bt.randInRange(2, 4)]
  ])

  const vien_2 = bt.catmullRom([
    [x[8], y[8]],
    [x[8] + 7, y[8] - bt.randInRange(2, 4)],
    [x[8] + 17, y[8] + bt.randInRange(2, 4)]
  ])

  drawLines([curve_1])
  drawLines([curve_2])
  drawLines([center])
  drawLines([vien_1])
  drawLines([vien_2])
}
for (let x = 0; x < 2; x++) {
  for (let y = 0; y < 2; y++) {
    leaf(x * 50, y * 40)
  }
}