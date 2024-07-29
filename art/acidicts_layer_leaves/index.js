/*
@title Layered Leaves
@author Alex
@snapshot 1.png
*/


const height = 150
const width = 150

setDocDimensions(width, height)
const leaf = (xpos, ypos) => {
  const x = [bt.randInRange(13, 20), bt.randInRange(46, 31), bt.randInRange(95, 71), bt.randInRange(15, 24), bt.randInRange(50, 66), bt.randInRange(75,85), 88, 30, 50, 60, 75]
  const y = [bt.randInRange(10,20), bt.randInRange(50,65), bt.randInRange(75,95), bt.randInRange(6,15),bt.randInRange(30,40), bt.randInRange(55,65), bt.randInRange(85,90), bt.randInRange(18,27), bt.randInRange(42,52), bt.randInRange(55,65), bt.randInRange(45,55)]

  for (let i = 0; i < 11; i++) {
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
    [x[7], y[0] + 4],
    [x[8], y[8]],
    [x[9], y[9] -4],
    [x[10], y[9] - -10]
  ])
  const vien_1 = bt.catmullRom([
    [x[8], y[8]],
    [x[8] - 6, y[8] - bt.randInRange(2, 5)],
    [x[8] + -12, y[8] + bt.randInRange(2, 4)]
  ])

  const vien_2 = bt.catmullRom([
    [x[8], y[8]],
    [x[8] + bt.randInRange(5,10), y[8] - bt.randInRange(2, 4)],
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
