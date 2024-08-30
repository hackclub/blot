/*
@title: BlotStrawberry
@author: Vanessa Tan
@snapshot: 1.png
*/

const width = 125
const height = 125

setDocDimensions(width, height)

const sharpness = bt.randIntInRange(35,42)
const tall = bt.randIntInRange(85,92)
const berry = bt.catmullRom([[75, 25], [90, sharpness], [100, 80], [75, tall], [50,80], [60,sharpness], [75, 25]])
const leaves = bt.catmullRom([[75, tall], [bt.randIntInRange(47,52), tall+bt.randIntInRange(3,8)], [bt.randIntInRange(47,52), tall+bt.randIntInRange(9, 16)], [75, tall], [bt.randIntInRange(53,65), tall+bt.randIntInRange(8,12)],[bt.randIntInRange(53,65), tall+bt.randIntInRange(12,17)], [75,tall], [bt.randIntInRange(66,72),tall + bt.randIntInRange(6,11)],[bt.randIntInRange(68,78), tall+bt.randIntInRange(10,19)], [75, tall], [bt.randIntInRange(76,82), tall+bt.randIntInRange(3,9)], [bt.randIntInRange(80,87), tall+bt.randIntInRange(11,15)], [75, tall], [bt.randIntInRange(85,92), tall+bt.randIntInRange(5,12)], [bt.randIntInRange(94,100), tall+bt.randIntInRange(11,19)], [75, tall]])
drawLines([berry])
drawLines([leaves])

//seeds
const seeds = bt.randIntInRange(8, 12);
for (let i = 0;i<seeds;i++) { 
  const startx = bt.randIntInRange(65,80);
  const starty = bt.randIntInRange(35, tall-10);
  const seed =  bt.catmullRom([[startx, starty], [startx+ bt.randIntInRange(1,2),starty+bt.randIntInRange(1,3)]])
  drawLines([seed])
}
for (let i = 0;i<seeds;i++) { 
  const startx = bt.randIntInRange(65,80);
  const starty = bt.randIntInRange(35, tall-10);
  const seed =  bt.catmullRom([[startx+ bt.randIntInRange(1,2),starty+bt.randIntInRange(1,3)],[startx, starty]])
  drawLines([seed])
}
