/*
@title: BlotStrawberry
@author: Vanessa Tan
@snapshot: 1.png
*/

const width = 125
const height = 125

setDocDimensions(width, height)

const sharpness = bt.randIntInRange(35,42) //y coord of berry side
const tall = bt.randIntInRange(85,92) //max y coord of berry
const length = bt.randIntInRange(18,30) //min y coord of berry
const berry = bt.catmullRom([[75, length], [90, sharpness], [100, 80], [75, tall], [50,80], [60,sharpness], [75, length]])
drawLines([berry])


//leaves
for (let i = 0;i<bt.randIntInRange(4,8);i++) { 
  const startx = bt.randIntInRange(47,100);
  const ofsetx = bt.randIntInRange(3,16); //offset of x from starting
  const ofsety = bt.randIntInRange(3,16);
  const starty = bt.randIntInRange(85,92);
  const line =  bt.catmullRom([[75,tall],[startx, starty],[startx+ofsetx, starty+ofsety],[75,tall]])
  drawLines([line])
}

const seeds = bt.randIntInRange(8, 12);
for (let i = 0;i<seeds;i++) { 
  const startx = bt.randIntInRange(65,80);
  const starty = bt.randIntInRange(35, tall-10);
  const seed =  bt.catmullRom([[startx, starty], [startx+0.5,starty-0.5],[startx- bt.randIntInRange(1,2),starty-bt.randIntInRange(1,3)],[startx-0.5, starty-0.5],[startx,starty]])
  drawLines([seed])
}


for (let i = 0;i<seeds;i++) { 
  const startx = bt.randIntInRange(65,80);
  const starty = bt.randIntInRange(35, tall-10);
  const seed =  bt.catmullRom([[startx, starty], [startx+0.5,starty-0.5],[startx+ bt.randIntInRange(1,2),starty-bt.randIntInRange(1,3)],[startx-0.5, starty-0.5],[startx,starty]])
  drawLines([seed])
}

