/*
title: Star Destroyers Among the Stars
author: I.K.
snapshot 1: Screenshot 2024-08-30 215118.png
snapshot 2: Screenshot 2024-08-30 215938.png
snapshot 3: Screenshot 2024-08-30 220020.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height)

const finalLines = [];

const t = new bt.Turtle();

let counter = 0

while (counter <= 20) {
  let bam = 70

  let sigh = 125

  let yeet = bt.randIntInRange(1, bam)

  let nope = bt.randIntInRange(1, sigh)

  let yoink = bt.randIntInRange(1, sigh)

  let yahoo = bt.randIntInRange(1, sigh)

  let farmer = bt.randIntInRange(1, sigh)
  
  drawLines([
      [[yoink, nope], [yoink + (yeet / 4), nope - yeet]],
      [[yoink + (yeet / 4), nope - yeet], [yoink, nope - (yeet * (3/4))]],
      [[yoink, nope], [yoink - (yeet / 4), nope - yeet]],
      [[yoink - (yeet / 4), nope - yeet], [yoink, nope - (yeet * (3/4))]],
  ])

  drawLines([
      [[yahoo, farmer], [yahoo, farmer + 3]],
      [[yahoo, farmer + 3], [yahoo + 3, farmer + 3]],
      [[yahoo + 3, farmer + 3], [yahoo + 3, farmer]],
      [[yahoo + 3, farmer], [yahoo, farmer]],
  ])
  counter++;
}


