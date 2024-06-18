// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

/*
@title: simply (the best) skyline
@author: Marco Samuele BELOTTI
@snapshot: simply (the best) skyline
*/

const rr = bt.randInRange
const width = 125;
const height = 125;
const num = 10
const centro = [width / 2, height / 2]


function tondo(inizio, fine) {
  let curve = bt.catmullRom([inizio, centro, fine])
  return curve
}

function pipedo(inizio) {
  const max = 15
  const min = 5
  let l0 = rr(5, width) % max + min
  let l1 = rr(5, height) % max + min
  let pp = [
    [inizio[0], inizio[1]],
    [inizio[0] += l0, inizio[1]],
    [inizio[0], inizio[1] + l1],
    [inizio[0] -= l0, inizio[1] + l1],
    [inizio[0], inizio[1]]
  ]
  let ppf = []
  for (let i = 0, j = 0; i < pp.length; i++, j += 3) {
    ppf[j] = pp[i]
    ppf[j + 1] = centro
    ppf[j + 2] = pp[i]
  }
  return ppf
}

function randomp() {
  return [(rr(10, width) * Math.sqrt(width * width + height * height)) % width, (rr(10, height) * Math.sqrt(width * width + height * height)) % height]
}


setDocDimensions(width, height);
let points = []
for (let i = 0; i < num; i += 2) {
  let poi = randomp()
  let por = pipedo(poi)
  points = points.concat(por)
  points = points.concat([centro])
}
console.log(points)
drawLines([
  points
])