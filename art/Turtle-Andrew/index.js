/*
@title: Turtle
@author: Andrew Douglass
@snapshot: image (6).png
*/

//Art adjustments
const seed = 1;
bt.setRandSeed(seed);

const width = 200;
const height = 200;
setDocDimensions(width, height);

drawLines([
  [
    [61, 13],
    [45, 33],
    [64, 40],
    [61, 13],
    [71, 26],
    [58, 52],
    [45, 33],
    [58, 52],
    [78, 35],
    [71, 26],
    [78, 35],
    [99, 22],
    [118, 36],
    [135, 12],
    [133, 39],
    [153, 32],
    [135, 12],
    [127.2, 23],
    [137, 51],
    [153, 32],
    [137, 51],
    [118, 36],
    [137, 51],
    [158, 97],
    [142, 140],
    [178, 143],
    [200, 117],
    [195, 150],
    [178, 143],
    [174, 168],
    [195, 150],
    [174, 168],
    [142, 140],
    [174, 168],
    [135, 168],
    [124, 155],
    [142, 140],
    [124, 155],
    [113, 161],
    [119, 185],
    [101, 199],
    [83, 186],
    [101, 180],
    [119, 185],
    [101, 180],
    [83, 186],
    [88, 161],
    [101, 167],
    [101, 180],
    [101, 167],
    [113, 161],
    [101, 167],
    [88, 161],
    [78.5, 156],
    [69, 170],
    [31, 170],
    [5.5, 149.4],
    [0, 120],
    [23, 146],
    [5.5, 149.4],
    [31, 170],
    [61, 146],
    [23, 146],
    [31, 170],
    [69, 170],
    [61, 146],
    [78.5, 156],
    [61, 146],
    [41, 97],
    [58, 52]
  ]
])

const shell = new bt.Turtle();

shell.jump([58, 52])
shell.setAngle(bt.randInRange(400, 360))
shell.forward(bt.randInRange(20, 30))
shell.setAngle(bt.randInRange(400, 340))
shell.forward(bt.randInRange(20, 30))
shell.goTo([137, 51])
shell.jump([78, 35])
shell.setAngle(bt.randInRange(405, 380))
shell.forward(bt.randInRange(10, 25))
shell.setAngle(bt.randInRange(380, 360))
shell.forward(bt.randInRange(10, 25))
shell.goTo([118, 36])
shell.jump([41, 97])
shell.setAngle(bt.randInRange(380, 340))
shell.forward(bt.randInRange(30, 40))
shell.setAngle(bt.randInRange(380, 340))
shell.forward(bt.randInRange(30, 40))
shell.setAngle(bt.randInRange(380, 340))
shell.forward(bt.randInRange(30, 40))
shell.goTo([158, 97])
shell.jump([61, 146])
shell.setAngle(bt.randInRange(360, 270))
shell.forward(bt.randInRange(20, 35))
shell.setAngle(bt.randInRange(360, 270))
shell.forward(bt.randInRange(20, 35))
shell.goTo([142, 140])
shell.jump([78.5, 156])
shell.setAngle(bt.randInRange(340, 290))
shell.forward(bt.randInRange(10, 20))
shell.setAngle(bt.randInRange(380, 340))
shell.forward(bt.randInRange(10, 20))
shell.goTo([124, 155])
shell.jump([101, 167])

shell.goTo([99, 22])

drawLines(shell.lines())
drawLines([
  [
    [89, 51],
    [108, 51],
    [122, 74],
    [133, 92],
    [119, 110],
    [80, 110],
    [67, 92],
    [76, 74],
    [89, 51]
  ]
])
